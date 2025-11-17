import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import Booking from "../models/Booking.js";
import auth from "../middleware/authMiddleware.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Initialize Razorpay instance
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// --- 1. ROUTE TO CREATE A NEW ORDER (FOR NEW BOOKINGS) ---
// This route remains unchanged
router.post("/create-order", auth, async (req, res) => {
  const { packageName, date, guests, totalAmount } = req.body;
  
  try {
    const options = {
      amount: totalAmount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    const order = await instance.orders.create(options);

    // Create our "pending" booking
    const booking = await Booking.create({
      user: req.user.id,
      packageName,
      date,
      guests,
      totalAmount,
      paymentStatus: "pending",
      razorpay_order_id: order.id,
    });

    res.json({ order, booking });
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(500).json({ message: "Error creating payment order." });
  }
});

// --- ★ 2. NEW ROUTE TO RE-CREATE AN ORDER (FOR PENDING BOOKINGS) ★ ---
router.post("/recreate-order", auth, async (req, res) => {
  const { booking_id } = req.body;
  
  try {
    // 1. Find the existing booking
    const booking = await Booking.findById(booking_id);

    // Security check: Does this booking belong to the logged-in user?
    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Check if already paid
    if (booking.paymentStatus === 'completed') {
      return res.status(400).json({ message: "This booking is already paid." });
    }

    // 2. Create new Razorpay order options from the *existing* booking
    const options = {
      amount: booking.totalAmount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    const order = await instance.orders.create(options);

    // 3. Update the *existing* booking with the *new* order ID
    booking.razorpay_order_id = order.id;
    await booking.save();

    // 4. Send back the new order and the existing booking
    res.json({ order, booking });

  } catch (err) {
    console.error("Error re-creating Razorpay order:", err);
    res.status(500).json({ message: "Error re-creating payment order." });
  }
});


// --- 3. ROUTE TO VERIFY THE PAYMENT (Works for both new and old) ---
// This route remains unchanged
router.post("/verify-payment", auth, async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    booking_id,
  } = req.body;

  try {
    // 1. Create the verification signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    // 2. Compare signatures
    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // 3. Payment is verified, find our booking and update it
    const booking = await Booking.findById(booking_id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.paymentStatus = "completed";
    booking.razorpay_payment_id = razorpay_payment_id;
    booking.razorpay_signature = razorpay_signature;
    await booking.save();
    
    res.json({ message: "Payment successful!", booking });
  } catch (err) {
    console.error("Error verifying payment:", err);
    res.status(500).json({ message: "Error verifying payment." });
  }
});

export default router;
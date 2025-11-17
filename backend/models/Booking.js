import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    packageName: String,
    date: Date,
    guests: Number,
    totalAmount: Number,
    paymentStatus: { type: String, default: "pending" },

    // ★ NEW FIELDS ADDED
    razorpay_order_id: { type: String },
    razorpay_payment_id: { type: String },
    razorpay_signature: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
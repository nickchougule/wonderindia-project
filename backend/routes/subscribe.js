import express from "express";
import Subscriber from "../models/Subscriber.js";

const router = express.Router();

// @route   POST api/subscribe
// @desc    Add a new subscriber
// @access  Public
router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Please enter an email." });
  }

  try {
    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      return res.status(400).json({ message: "You are already subscribed." });
    }

    subscriber = new Subscriber({ email });
    await subscriber.save();

    res.status(201).json({ message: "Subscription successful! Thank you." });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

export default router;
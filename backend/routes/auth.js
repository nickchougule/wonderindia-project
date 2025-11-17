import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js"; // ★ IMPORT
import crypto from "crypto"; // ★ IMPORT (Built-in Node module)

const router = express.Router();

// Helper function to generate 4-digit OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// --- ★ MODIFIED: /REGISTER ---
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user && user.isVerified) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    // If user exists but is not verified, delete them to start over
    if (user && !user.isVerified) {
      await User.deleteOne({ email });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    
    user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      otp: otp,
      otpExpires: Date.now() + 10 * 60 * 1000, // 10 minutes
      isVerified: false,
    });

    // Send verification email
    const message = `Welcome to WonderIndia!\n\nYour verification OTP is: ${otp}\n\nThis code will expire in 10 minutes.`;
    await sendEmail({
      email: user.email,
      subject: "WonderIndia - Email Verification",
      message,
    });

    res.status(201).json({ 
      message: "Registration successful. Please check your email for an OTP to verify your account.",
      email: user.email // Send back email for the frontend
    });
  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- ★ NEW: /VERIFY-EMAIL ---
router.post("/verify-email", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ 
      email, 
      otp, 
      otpExpires: { $gt: Date.now() } 
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid OTP or OTP has expired." });
    }

    // Verification successful
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Log the user in by creating a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    
    res.status(200).json({
      message: "Email verified successfully. You are now logged in.",
      token,
      user: {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// --- ★ MODIFIED: /LOGIN ---
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ★ NEW: Check if user is verified
    if (!user.isVerified) {
      // (Optional: Resend OTP)
      // const otp = generateOTP();
      // user.otp = otp;
      // user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
      // await user.save();
      // const message = `Your new verification OTP is: ${otp}`;
      // await sendEmail({ email: user.email, subject: "New OTP", message });
      
      return res.status(401).json({ 
        message: "Account not verified. Please check your email for the verification OTP.",
        notVerified: true, // Custom flag for frontend
        email: user.email
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // User is valid and verified, create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    
    res.json({
      token,
      user: {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- ★ NEW: /FORGOT-PASSWORD ---
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found with this email." });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const message = `You requested a password reset.\n\nYour password reset OTP is: ${otp}\n\nThis code will expire in 10 minutes.`;
    await sendEmail({
      email: user.email,
      subject: "WonderIndia - Password Reset",
      message,
    });

    res.status(200).json({ 
      message: "OTP sent to your email. Please check your inbox.",
      email: user.email
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- ★ NEW: /RESET-PASSWORD ---
router.post("/reset-password", async (req, res) => {
  const { email, otp, password } = req.body;
  try {
    const user = await User.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid OTP or OTP has expired." });
    }

    // Reset successful
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful. You can now login." });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
import express from "express";
import sendEmail from "../utils/sendEmail.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// @route   POST api/message
// @desc    Send a contact form message
// @access  Public
router.post("/", async (req, res) => {
  const { name, email, phone, topic, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Please fill out all required fields." });
  }

  try {
    const adminEmail = process.env.EMAIL_USER;
    const subject = `New Contact Message: ${topic || 'General Inquiry'}`;
    const messageBody = `
      You have received a new contact message from your website:

      Name: ${name}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      Topic: ${topic || 'General Inquiry'}

      Message:
      ${message}
    `;

    // Use the sendEmail utility to send the email TO THE ADMIN
    await sendEmail({
      email: adminEmail,
      subject: subject,
      message: messageBody,
    });

    res.status(200).json({ message: "Message sent successfully! We will get back to you soon." });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error. Could not send message." });
  }
});

export default router;
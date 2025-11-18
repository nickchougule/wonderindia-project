import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async (options) => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    // ★★★ THE FIX IS HERE ★★★
    host: process.env.EMAIL_HOST, // Now 'smtp-relay.brevo.com'
    port: process.env.EMAIL_PORT, // Now '587'
    secure: false, // Brevo uses false for port 587
    // ★★★ END OF FIX ★★★
    auth: {
      user: process.env.EMAIL_USER, // Your Brevo login email
      pass: process.env.EMAIL_PASS, // Your Brevo SMTP Key
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `WonderIndia <${process.env.EMAIL_USER}>`, // This will now be your Brevo email
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3. Actually send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email (Brevo) sent successfully');
  } catch (error) {
    console.error('❌ Error sending email (Brevo):', error);
    throw error;
  }
};

export default sendEmail;
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async (options) => {
  const senderEmail = process.env.EMAIL_USER;
  const apiKey = process.env.EMAIL_PASS; // Your xkeysib- key

  // Brevo API Endpoint
  const url = 'https://api.brevo.com/v3/smtp/email';

  const data = {
    sender: { 
      name: "WonderIndia", 
      email: senderEmail 
    },
    to: [
      { email: options.email }
    ],
    subject: options.subject,
    htmlContent: `
      <html>
        <body>
          <p>${options.message.replace(/\n/g, "<br>")}</p>
        </body>
      </html>
    `
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      }
    });
    
    console.log('✅ Email sent via Brevo API');
    return response.data;

  } catch (error) {
    console.error('❌ Error sending email API:', error.response ? error.response.data : error.message);
    // Important: Throw error so the frontend knows it failed
    throw new Error(error.response?.data?.message || "Email sending failed");
  }
};

export default sendEmail;
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD.replace(/\s+/g, ''),
  },
});

const sendMail = async (to, otp) => {
  try {
    console.log("Attempting to send email...");
    console.log("FROM:", process.env.USER_EMAIL);
    console.log("TO:", to);
    
    const info = await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: to,
      subject: "Reset Your Password",
      html: `<p>Your OTP for Password Reset is <b>${otp}</b>. It expires in 5 minutes.</p>`,
    });
    console.log("Email sent successfully. MessageID:", info.messageId);
  } catch (error) {
    console.error("Error sending email in sendMail function:", error);
    throw error; // Re-throw so the controller catches it
  }
};

export default sendMail;

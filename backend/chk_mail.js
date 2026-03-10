import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log("Testing Email Sending...");
const user = process.env.USER_EMAIL;
const pass = process.env.USER_PASSWORD ? process.env.USER_PASSWORD.replace(/\s+/g, '') : "";

console.log("User:", user);
console.log("Pass length:", pass.length);

if (!user || !pass) {
    console.error("Missing credentials in .env");
    process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

const sendMail = async () => {
  try {
    const info = await transporter.sendMail({
      from: user,
      to: user, // Send to self
      subject: "Test Email",
      text: "This is a test email.",
    });
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

sendMail();

const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOTP(toEmail, otp) {
  await transporter.sendMail({
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your Login OTP",
    html: `<p>Your one-time code is: <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
  });
}

module.exports = { sendOTP };
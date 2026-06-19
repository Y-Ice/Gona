const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS, not SSL
  family: 4,     // force IPv4
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOTP(toEmail, otp) {
  await transporter.sendMail({
    from: `"Gona" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your Login OTP",
    html: `<p>Your one-time code is: <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
  });
}

module.exports = { sendOTP };
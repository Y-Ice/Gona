const nodemailer = require("nodemailer");
const dns = require("dns");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  lookup: (hostname, options, callback) => {
    dns.lookup(hostname, { ...options, family: 4 }, callback);
  },
});

async function sendOTP(toEmail, otp) {
  try {
    const info = await transporter.sendMail({
      from: `"Gona" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Your Gona OTP Code",
      text: `Your one-time code is: ${otp}. It expires in 5 minutes.`,
      html: `<p>Your one-time code is: <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
    });
    console.log(`OTP email sent to ${toEmail}: ${info.response}`);
    return info;
  } catch (err) {
    console.error(`Failed to send OTP email to ${toEmail}:`, err);
    throw err;
  }
}

module.exports = { sendOTP };
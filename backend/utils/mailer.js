const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendOTP(toEmail, otp) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Gona <onboarding@resend.dev>",
      to: toEmail,
      subject: "Your Gona OTP Code",
      text: `Your one-time code is: ${otp}. It expires in 5 minutes.`,
      html: `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3efe4; padding:40px 0; font-family:Arial, Helvetica, sans-serif;">
        <tr>
          <td align="center">
            <table role="presentation" width="420" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);">

              <!-- Header -->
              <tr>
                <td style="background-color:#0d4a17; padding:28px 32px; text-align:center;">
                  <h1 style="margin:0; color:#ffffff; font-size:22px; font-weight:700; letter-spacing:0.5px;">
                    Gona
                  </h1>
                  <p style="margin:4px 0 0; color:#d7e9da; font-size:12px;">
                    Smart Farm Management Platform
                  </p>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:36px 32px 24px; text-align:center;">
                  <p style="margin:0 0 8px; color:#171305; font-size:16px; font-weight:600;">
                    Your verification code
                  </p>
                  <p style="margin:0 0 24px; color:#8b8b8b; font-size:13px;">
                    Enter this code to continue signing in to your account.
                  </p>

                  <!-- OTP box -->
                  <div style="display:inline-block; background-color:#f3efe4; border:1px solid #e6e0d3; border-radius:12px; padding:16px 32px; margin-bottom:24px;">
                    <span style="font-size:32px; font-weight:700; letter-spacing:8px; color:#0d4a17;">
                      ${otp}
                    </span>
                  </div>

                  <p style="margin:0; color:#8b8b8b; font-size:13px;">
                    This code expires in <strong style="color:#171305;">5 minutes</strong>.
                  </p>
                </td>
              </tr>

              <!-- Divider -->
              <tr>
                <td style="padding:0 32px;">
                  <hr style="border:none; border-top:1px solid #ece7d8; margin:0;" />
                </td>
              </tr>

              <!-- Footer note -->
              <tr>
                <td style="padding:20px 32px 28px; text-align:center;">
                  <p style="margin:0; color:#aaaaaa; font-size:11px; line-height:1.6;">
                    If you didn't request this code, you can safely ignore this email.<br/>
                    Never share this code with anyone, including Gona staff.
                  </p>
                </td>
              </tr>

            </table>

            <p style="margin:20px 0 0; color:#a8a8a8; font-size:11px;">
              &copy; ${new Date().getFullYear()} Gona. All rights reserved.
            </p>
          </td>
        </tr>
      </table>
      `,
    });

    if (error) {
      console.error(`Failed to send OTP email to ${toEmail}:`, error);
      throw new Error(error.message);
    }

    console.log(`OTP email sent to ${toEmail}:`, data);
    return data;
  } catch (err) {
    console.error(`Failed to send OTP email to ${toEmail}:`, err);
    throw err;
  }
}

module.exports = { sendOTP };
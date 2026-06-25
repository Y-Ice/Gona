// payment.js
// Express routes for verifying Paystack payments and handling webhooks.
// Requires: npm install express axios crypto dotenv

const express = require("express");
const axios = require("axios");
const crypto = require("crypto");

const router = express.Router();

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY; // sk_test_... or sk_live_...

/**
 * POST /api/verify-payment
 * Body: { reference: string }
 *
 * Call this from your frontend right after Paystack's popup callback fires.
 * This is the source of truth — never mark something "paid" based on the
 * frontend callback alone.
 */
router.post("/verify-payment", async (req, res) => {
  const { reference } = req.body;

  if (!reference) {
    return res.status(400).json({ status: false, message: "Reference is required" });
  }

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const { data } = response.data;

    if (data.status === "success") {
      // Payment confirmed by Paystack.
      // TODO: update your database here — e.g. mark user's subscription
      // as active, save plan name, amount, and reference for your records.
      //
      // Example:
      // await User.updateSubscription(userId, {
      //   plan: data.metadata?.custom_fields?.[0]?.value,
      //   reference: data.reference,
      //   amountPaid: data.amount / 100, // convert from kobo to naira
      //   paidAt: data.paid_at,
      // });

      return res.status(200).json({
        status: true,
        message: "Payment verified successfully",
        data: {
          reference: data.reference,
          amount: data.amount / 100,
          currency: data.currency,
          paidAt: data.paid_at,
          customerEmail: data.customer.email,
        },
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Payment was not successful",
        data,
      });
    }
  } catch (error) {
    console.error("Paystack verification error:", error.response?.data || error.message);
    return res.status(500).json({
      status: false,
      message: "Could not verify payment, please try again",
    });
  }
});

/**
 * POST /api/paystack/webhook
 *
 * Paystack will POST events here (e.g. charge.success) regardless of whether
 * the user stayed on your site. This is the most reliable confirmation source.
 *
 * IMPORTANT: this route needs the RAW request body to validate the signature,
 * so make sure express.json() has NOT already parsed it before this point,
 * or mount this route with express.raw() — see setup note at the bottom.
 */
router.post("/paystack/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const signature = req.headers["x-paystack-signature"];

  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET_KEY)
    .update(req.body)
    .digest("hex");

  if (hash !== signature) {
    // Signature doesn't match — this request did not come from Paystack.
    return res.status(401).send("Invalid signature");
  }

  const event = JSON.parse(req.body.toString());

  switch (event.event) {
    case "charge.success": {
      const { reference, amount, customer, metadata } = event.data;
      // TODO: update your database here too (idempotently — this event
      // and the /verify-payment call above may both fire for the same
      // transaction, so make sure repeating this doesn't double-credit
      // the user. Checking "is this reference already marked paid?" first
      // is usually enough).
      console.log(`Webhook: payment success for ${customer.email}, ref: ${reference}`);
      break;
    }
    case "charge.failed": {
      console.log("Webhook: payment failed", event.data.reference);
      break;
    }
    default:
      console.log(`Webhook: unhandled event type ${event.event}`);
  }

  // Always respond 200 quickly so Paystack doesn't retry unnecessarily.
  res.sendStatus(200);
});

module.exports = router;

/*
SETUP NOTES (in your main server file, e.g. app.js / server.js):

  const express = require("express");
  const paymentRoutes = require("./payment");
  require("dotenv").config();

  const app = express();

  // ⚠️ Webhook route needs the raw body, so mount it BEFORE express.json()
  // is applied globally — payment.js already scopes express.raw() to just
  // that route, so this works even with express.json() below.
  app.use("/api", paymentRoutes);
  app.use(express.json());

  app.listen(5000, () => console.log("Server running on port 5000"));

Also add to your .env (backend, not frontend):

  PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Then register the webhook URL in your Paystack dashboard:
  Settings → API Keys & Webhooks → Webhook URL
  e.g. https://yourdomain.com/api/paystack/webhook
*/

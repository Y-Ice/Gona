import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

const plans = [
  {
    id: "free",
    name: "Free",
    price: "₦0",
    cadence: "/month",
    blurb: "For getting your first bookings online.",
    features: ["Basic booking management"],
    cta: "Start free",
    highlight: false,
    payable: false,
  },
  {
    id: "monthly",
    name: "Standard",
    price: "₦2,500",
    cadence: "/month",
    amountKobo: 2500 * 100,
    blurb: "For businesses ready to grow bookings.",
    features: ["More bookings", "Reports", "Notifications"],
    cta: "Pay monthly",
    highlight: true,
    payable: true,
  },
  {
    id: "yearly",
    name: "Standard",
    price: "₦27,500",
    cadence: "/year",
    amountKobo: 27500 * 100,
    blurb: "Same Standard features, 2 months free.",
    features: [
      "More bookings",
      "Reports",
      "Notifications",
      "Get 1 months free when you pay yearly",
    ],
    cta: "Pay yearly",
    highlight: false,
    payable: true,
    badge: "Best value",
  },
];

export default function PricingSection() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [modal, setModal] = useState({ open: false, plan: null });
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (window.PaystackPop) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  const openModal = (plan) => {
    setEmail("");
    setEmailError("");
    setModal({ open: true, plan });
  };

  const closeModal = () => {
    setModal({ open: false, plan: null });
    setEmail("");
    setEmailError("");
  };

  const handlePay = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!scriptLoaded || !window.PaystackPop) {
      setEmailError("Payment is still loading, please try again.");
      return;
    }

    const plan = modal.plan;
    closeModal();
    setLoadingPlan(plan.id);

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email,
      amount: plan.amountKobo,
      currency: "NGN",
      ref: `${plan.id}_${Date.now()}`,
      metadata: {
        custom_fields: [
          {
            display_name: "Plan",
            variable_name: "plan",
            value: plan.name + " (" + plan.cadence.replace("/", "") + ")",
          },
        ],
      },
      callback: function (response) {
        setLoadingPlan(null);
        alert(`Payment successful! Reference: ${response.reference}`);
      },
      onClose: function () {
        setLoadingPlan(null);
      },
    });

    handler.openIframe();
  };

  return (
    <>
      {/* Email Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Enter your email
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              We'll send your receipt to this address after payment.
            </p>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handlePay()}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 mb-2"
            />
            {emailError && (
              <p className="text-red-500 text-sm mb-4">{emailError}</p>
            )}

            <button
              onClick={handlePay}
              className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      )}

      <section id="pricing" className="bg-slate-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-sm font-semibold tracking-wide uppercase text-amber-600 mb-2">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Simple pricing, no surprises
          </h2>
          <p className="mt-3 text-slate-600">
            Start free. Upgrade monthly or save with yearly billing.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                plan.highlight
                  ? "border-[#d4840a] bg-white shadow-xl"
                  : "border-green-700 bg-white shadow-sm"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-8 bg-[#d4840a] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most popular
                </span>
              )}
              {plan.badge && (
                <span className="absolute -top-3 left-8 bg-green-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {plan.badge}
                </span>
              )}

              <h3 className="text-lg font-semibold text-slate-900">
                {plan.name}
              </h3>
              <p className="text-sm text-slate-500 mt-1">{plan.blurb}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900">
                  {plan.price}
                </span>
                <span className="text-slate-500">{plan.cadence}</span>
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-slate-700"
                  >
                    <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={
                  plan.payable
                    ? () => openModal(plan)
                    : () => (window.location.href = "/login")
                }
                disabled={plan.payable && loadingPlan === plan.id}
                className={`mt-8 w-full rounded-lg py-3 font-medium transition-colors ${
                  plan.highlight
                    ? "bg-[#d4840a] text-white hover:bg-[#c27a09]"
                    : plan.payable
                      ? "bg-green-900 text-white hover:bg-green-800"
                      : "bg-slate-200 text-green-900 hover:bg-slate-300"
                } disabled:opacity-60`}
              >
                {plan.payable && loadingPlan === plan.id
                  ? "Processing…"
                  : plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
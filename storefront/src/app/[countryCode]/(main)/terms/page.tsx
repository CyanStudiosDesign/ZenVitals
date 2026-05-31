import React from "react"

export default function TermsAndConditions() {
  return (
    <div className="font-sans text-zinc-900 max-w-3xl mx-auto my-16">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-5xl font-medium tracking-tight mb-4 flex items-start">
          Terms & Conditions
        </h1>
        <p className="text-zinc-600 text-xl leading-relaxed font-normal">
          Welcome to ZenVitals LLP. Please read these terms carefully before
          using our website or purchasing our supplement products.
        </p>
      </header>

      <section className="space-y-10">
        {/* General Terms */}
        <div>
          <h2 className="text-3xl font-semibold mb-4 tracking-tight">
            1. Acceptance of Terms
          </h2>
          <p className="text-zinc-700 text-lg leading-relaxed">
            By accessing this website and purchasing products from ZenVitals
            LLP, you agree to be bound by these Terms and Conditions. If you do
            not agree with any part of these terms, please discontinue your use
            of our website immediately.
          </p>
        </div>

        {/* E-commerce Policies */}
        <div>
          <h2 className="text-3xl font-semibold mb-4 tracking-tight">
            2. Orders and Pricing
          </h2>
          <ul className="grid grid-cols-1 gap-y-3 ml-6 list-disc text-zinc-700 text-lg">
            <li>
              All supplements are subject to availability and we reserve the
              right to limit quantities.
            </li>
            <li>
              Prices and product descriptions are subject to change without
              notice.
            </li>
            <li>
              We reserve the right to refuse or cancel any order for any reason.
            </li>
            <li>
              Products are intended for personal use only and not for commercial
              resale.
            </li>
          </ul>
        </div>

        {/* Safety & Medical Disclaimer */}
        <div className="pt-10 border-t border-zinc-200">
          <h2 className="text-3xl font-semibold mb-4 tracking-tight">
            3. Health & Safety Disclaimer
          </h2>
          <p className="text-zinc-700 text-lg leading-relaxed mb-6">
            ZenVitals LLP provides dietary supplements designed to support
            general well-being. However, our products are not intended to
            diagnose, treat, cure, or prevent any disease. Information provided
            on this site is for informational purposes only.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-3 tracking-tight">
                Limitations of Use:
              </h3>
              <ul className="list-disc ml-6 space-y-3 text-zinc-700 text-lg">
                <li>
                  You must be at least 18 years of age to purchase products from
                  ZenVitals LLP.
                </li>
                <li>
                  Supplements should be stored properly and kept out of reach of
                  children.
                </li>
              </ul>
            </div>

            {/* Warning Box repurposed for Medical Disclaimer */}
            <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-100">
              <p className="font-bold text-zinc-900 uppercase tracking-wider text-sm mb-3">
                WARNING: MEDICAL CONSULTATION REQUIRED
              </p>
              <p className="text-zinc-600 text-base leading-relaxed mb-4">
                Always consult with a licensed healthcare professional before
                starting any new dietary supplement regimen.
              </p>
              <ul className="list-disc ml-6 space-y-3 text-zinc-600 text-base">
                <li>
                  Do not use our products as a substitute for professional
                  medical advice, diagnosis, or prescribed medications.
                </li>
                <li>
                  If you are pregnant, nursing, taking prescription medication,
                  or have a pre-existing medical condition, you must consult
                  your physician before using our supplements.
                </li>
                <li>
                  Immediately discontinue use and seek medical attention if you
                  experience any adverse reactions or side effects.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Returns */}
        <div className="pt-10 border-t border-zinc-200">
          <h2 className="text-3xl font-semibold mb-4 tracking-tight">
            4. Return Policy
          </h2>
          <p className="text-zinc-700 text-lg leading-relaxed mb-4">
            Due to health and safety regulations surrounding consumable goods,
            our return policy is strictly enforced.
          </p>
          <ul className="list-disc ml-6">
            <li className="text-zinc-700 text-lg decoration-zinc-400  cursor-pointer hover:text-black">
              7-day return policy from date of delivery
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

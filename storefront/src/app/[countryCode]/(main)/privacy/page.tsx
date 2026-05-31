import React from "react"

export default function PrivacyPolicy() {
  return (
    <div className="font-sans text-zinc-900 max-w-3xl mx-auto my-16">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-5xl font-medium tracking-tight mb-4 flex items-start">
          Privacy Policy
        </h1>
        <p className="text-zinc-600 text-xl leading-relaxed font-normal">
          At ZenVitals LLP, your privacy and data security are our top
          priorities. This policy outlines how we collect, use, and protect your
          personal information when you visit our site or purchase our
          supplements.
        </p>
      </header>

      <section className="space-y-10">
        {/* Information Collection */}
        <div>
          <h2 className="text-3xl font-semibold mb-4 tracking-tight">
            1. Information We Collect
          </h2>
          <p className="text-zinc-700 text-lg leading-relaxed mb-4">
            To provide you with the best shopping experience, we collect
            information when you register an account, place an order, or
            subscribe to our newsletter.
          </p>
          <ul className="grid grid-cols-1 gap-y-3 ml-6 list-disc text-zinc-700 text-lg">
            <li>
              <strong>Personal Details:</strong> Name, email address, shipping
              address, and phone number.
            </li>
            <li>
              <strong>Payment Information:</strong> Credit card details and
              billing addresses (processed securely via encrypted third-party
              gateways).
            </li>
            <li>
              <strong>Order History:</strong> Records of the supplements and
              products you have purchased.
            </li>
            <li>
              <strong>Usage Data:</strong> IP address, browser type, and
              interactions with our website to help us improve our platform.
            </li>
          </ul>
        </div>

        {/* Use of Information */}
        <div className="pt-10 border-t border-zinc-200">
          <h2 className="text-3xl font-semibold mb-4 tracking-tight">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc ml-6 space-y-3 text-zinc-700 text-lg">
            <li>
              To process and fulfill your orders accurately and efficiently.
            </li>
            <li>
              To communicate with you regarding order updates, shipping
              notifications, and customer support.
            </li>
            <li>
              To send promotional emails about new supplements or special offers
              (only if you have opted in).
            </li>
            <li>
              To monitor website performance and prevent fraudulent
              transactions.
            </li>
          </ul>
        </div>

        {/* Data Security & Sharing */}
        <div className="pt-10 border-t border-zinc-200">
          <h2 className="text-3xl font-semibold mb-4 tracking-tight">
            3. Data Sharing & Security
          </h2>
          <p className="text-zinc-700 text-lg leading-relaxed mb-6">
            We do not sell, trade, or rent your personal identification
            information to others. We may share generic aggregated demographic
            information with our trusted shipping and payment partners solely
            for the purpose of fulfilling your order.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-3 tracking-tight">
                Third-Party Services:
              </h3>
              <ul className="list-disc ml-6 space-y-3 text-zinc-700 text-lg">
                <li>
                  Shipping carriers (e.g., Shiprocket, Dehlivery) receive only
                  the details necessary to deliver your package.
                </li>
                <li>
                  Payment processors handle your financial data directly;
                  ZenVitals LLP does not store your full credit card number on
                  our servers.
                </li>
              </ul>
            </div>

            {/* Warning Box repurposed for Data Protection Notice */}
            <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-100">
              <p className="font-bold text-zinc-900 uppercase tracking-wider text-sm mb-3">
                NOTICE: DATA SECURITY MEASURES
              </p>
              <p className="text-zinc-600 text-base leading-relaxed mb-4">
                While we implement high-level security measures to protect your
                personal information, no method of transmission over the
                Internet is 100% secure.
              </p>
              <ul className="list-disc ml-6 space-y-3 text-zinc-600 text-base">
                <li>
                  We use SSL (Secure Socket Layer) encryption for all sensitive
                  data transmission.
                </li>
                <li>
                  You are responsible for keeping your account password
                  confidential. Do not share your login credentials with anyone.
                </li>
                <li>
                  If you suspect any unauthorized access to your account, please
                  contact our support team immediately.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* User Rights */}
        <div className="pt-10 border-t border-zinc-200">
          <h2 className="text-3xl font-semibold mb-4 tracking-tight">
            4. Your Privacy Rights
          </h2>
          <p className="text-zinc-700 text-lg leading-relaxed mb-4">
            You have the right to access, correct, or request the deletion of
            your personal data at any time. If you wish to unsubscribe from
            marketing communications or manage your cookie preferences, you can
            do so through your account settings or by contacting us.
          </p>
        </div>
      </section>
    </div>
  )
}

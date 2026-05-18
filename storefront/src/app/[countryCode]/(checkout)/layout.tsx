import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="h-16 border-b bg-white">
        <nav className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Back */}
          <LocalizedClientLink
            href="/cart"
            className="flex items-center gap-2 uppercase text-sm font-medium text-gray-600 hover:text-black flex-1"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />

            <span className="hidden sm:block">Back to shopping cart</span>
            <span className="sm:hidden">Back</span>
          </LocalizedClientLink>

          {/* Logo / Store */}
          <LocalizedClientLink
            href="/"
            className="uppercase text-lg font-semibold text-gray-700 hover:text-black"
            data-testid="store-link"
          >
            Medusa Store
          </LocalizedClientLink>

          {/* Spacer */}
          <div className="flex-1" />
        </nav>
      </div>

      {/* Content */}
      <div
        className="max-w-7xl mx-auto px-4 w-full flex-1"
        data-testid="checkout-container"
      >
        {children}
      </div>

      {/* Footer CTA */}
      <div className="py-4 w-full flex items-center justify-center border-t">
        <MedusaCTA />
      </div>
    </div>
  )
}

"use client"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <h2 className="text-2xl font-semibold">Summary</h2>

      {/* Discount */}
      <DiscountCode cart={cart} />

      <Divider />

      {/* Totals */}
      <CartTotals totals={cart} />

      {/* CTA */}
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
      >
        <button
          className="
            w-full h-10 rounded-md 
            bg-black text-white 
            text-sm font-medium 
            transition hover:bg-gray-900
          "
        >
          Go to checkout
        </button>
      </LocalizedClientLink>
    </div>
  )
}

export default Summary

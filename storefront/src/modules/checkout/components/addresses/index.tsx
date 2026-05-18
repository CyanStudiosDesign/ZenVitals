"use client"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { useToggleState } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart.shipping_address, cart.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          Shipping Address
          {!isOpen && <CheckCircleSolid />}
        </h2>

        {!isOpen && cart?.shipping_address && (
          <button
            onClick={handleEdit}
            className="text-sm text-blue-600 hover:text-blue-700"
            data-testid="edit-address-button"
          >
            Edit
          </button>
        )}
      </div>

      {/* Form */}
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div className="pt-8">
                <h2 className="text-xl font-semibold pb-6">Billing address</h2>
                <BillingAddress cart={cart} />
              </div>
            )}

            <SubmitButton
              className="mt-6 w-full"
              data-testid="submit-address-button"
            >
              Continue to delivery
            </SubmitButton>

            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          {cart && cart.shipping_address ? (
            <div className="flex gap-8">
              {/* Shipping */}
              <div
                className="flex flex-col w-1/3 text-sm"
                data-testid="shipping-address-summary"
              >
                <span className="font-medium text-gray-800 mb-1">
                  Shipping Address
                </span>
                <span className="text-gray-600">
                  {cart.shipping_address.first_name}{" "}
                  {cart.shipping_address.last_name}
                </span>
                <span className="text-gray-600">
                  {cart.shipping_address.address_1}{" "}
                  {cart.shipping_address.address_2}
                </span>
                <span className="text-gray-600">
                  {cart.shipping_address.postal_code},{" "}
                  {cart.shipping_address.city}
                </span>
                <span className="text-gray-600">
                  {cart.shipping_address.country_code?.toUpperCase()}
                </span>
              </div>

              {/* Contact */}
              <div
                className="flex flex-col w-1/3 text-sm"
                data-testid="shipping-contact-summary"
              >
                <span className="font-medium text-gray-800 mb-1">Contact</span>
                <span className="text-gray-600">
                  {cart.shipping_address.phone}
                </span>
                <span className="text-gray-600">{cart.email}</span>
              </div>

              {/* Billing */}
              <div
                className="flex flex-col w-1/3 text-sm"
                data-testid="billing-address-summary"
              >
                <span className="font-medium text-gray-800 mb-1">
                  Billing Address
                </span>

                {sameAsBilling ? (
                  <span className="text-gray-600">
                    Billing and delivery address are the same.
                  </span>
                ) : (
                  <>
                    <span className="text-gray-600">
                      {cart.billing_address?.first_name}{" "}
                      {cart.billing_address?.last_name}
                    </span>
                    <span className="text-gray-600">
                      {cart.billing_address?.address_1}{" "}
                      {cart.billing_address?.address_2}
                    </span>
                    <span className="text-gray-600">
                      {cart.billing_address?.postal_code},{" "}
                      {cart.billing_address?.city}
                    </span>
                    <span className="text-gray-600">
                      {cart.billing_address?.country_code?.toUpperCase()}
                    </span>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center py-6">
              <Spinner />
            </div>
          )}
        </div>
      )}

      <Divider className="mt-8" />
    </div>
  )
}

export default Addresses

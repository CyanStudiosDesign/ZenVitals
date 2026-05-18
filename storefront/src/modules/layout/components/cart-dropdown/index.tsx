"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { ShoppingBag } from "lucide-react"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>()
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()
    const timer = setTimeout(close, 5000)
    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) clearTimeout(activeTimer)
    open()
  }

  useEffect(() => {
    return () => {
      if (activeTimer) clearTimeout(activeTimer)
    }
  }, [activeTimer])

  const pathname = usePathname()

  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
  }, [totalItems, pathname])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full">
          <LocalizedClientLink
            className="flex gap-2 items-center hover:text-black transition"
            href="/cart"
            data-testid="nav-cart-link"
          >
            <ShoppingBag className="h-5 w-5" />
            {`(${totalItems})`}
          </LocalizedClientLink>
        </PopoverButton>

        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition duration-200 ease-out"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition duration-150 ease-in"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="hidden sm:block absolute right-0 top-full mt-1 w-[420px] bg-white border border-gray-200 shadow-lg rounded-lg"
            data-testid="nav-cart-dropdown"
          >
            {/* Header */}
            <div className="p-4 text-center border-b">
              <h3 className="text-lg font-semibold">Cart</h3>
            </div>

            {cartState && cartState.items?.length ? (
              <>
                {/* Items */}
                <div className="max-h-[400px] overflow-y-auto px-4 py-2 space-y-6">
                  {cartState.items
                    .sort((a, b) =>
                      (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-[100px_1fr] gap-4"
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                        >
                          <Thumbnail
                            thumbnail={item.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                          />
                        </LocalizedClientLink>

                        <div className="flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <div className="pr-4">
                                <h3 className="text-sm font-medium truncate">
                                  <LocalizedClientLink
                                    href={`/products/${item.product_handle}`}
                                  >
                                    {item.title}
                                  </LocalizedClientLink>
                                </h3>

                                <LineItemOptions variant={item.variant} />

                                <span className="text-xs text-gray-500">
                                  Qty: {item.quantity}
                                </span>
                              </div>

                              <LineItemPrice
                                item={item}
                                style="tight"
                                currencyCode={cartState.currency_code}
                              />
                            </div>
                          </div>

                          <DeleteButton
                            id={item.id}
                            className="text-xs text-gray-500 hover:text-red-500 mt-1"
                          >
                            Remove
                          </DeleteButton>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-4 border-t space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">
                      Subtotal{" "}
                      <span className="text-gray-500">(excl. taxes)</span>
                    </span>
                    <span className="font-semibold">
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>

                  <LocalizedClientLink href="/cart">
                    <button className="w-full py-2 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-900 transition">
                      Go to cart
                    </button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div className="py-16 flex flex-col items-center gap-4 text-sm">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-900 text-white text-xs">
                  0
                </div>
                <span className="text-gray-600">
                  Your shopping bag is empty.
                </span>

                <LocalizedClientLink href="/store">
                  <button
                    onClick={close}
                    className="px-4 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-900"
                  >
                    Explore products
                  </button>
                </LocalizedClientLink>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown

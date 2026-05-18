"use client"

import React from "react"

import { applyPromotions } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import Trash from "@modules/common/icons/trash"
import ErrorMessage from "../error-message"
import { SubmitButton } from "../submit-button"

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")

  const { promotions = [] } = cart

  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter(
      (promotion) => promotion.code !== code
    )

    await applyPromotions(
      validPromotions.filter((p) => p.code).map((p) => p.code!)
    )
  }

  const addPromotionCode = async (formData: FormData) => {
    setErrorMessage("")

    const code = formData.get("code")
    if (!code) return

    const input = document.getElementById("promotion-input") as HTMLInputElement

    const codes = promotions.filter((p) => p.code).map((p) => p.code!)

    codes.push(code.toString())

    try {
      await applyPromotions(codes)
    } catch (e: any) {
      setErrorMessage(e.message)
    }

    if (input) input.value = ""
  }

  return (
    <div className="w-full bg-white flex flex-col">
      <form action={(a) => addPromotionCode(a)} className="w-full mb-5">
        {/* Toggle */}
        <div className="flex items-center gap-2 my-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
            data-testid="add-discount-button"
          >
            Add Promotion Code(s)
          </button>
        </div>

        {/* Input */}
        {isOpen && (
          <>
            <div className="flex w-full gap-2">
              <input
                id="promotion-input"
                name="code"
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                data-testid="discount-input"
              />

              <SubmitButton
                variant="secondary"
                data-testid="discount-apply-button"
                className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Apply
              </SubmitButton>
            </div>

            <ErrorMessage
              error={errorMessage}
              data-testid="discount-error-message"
            />
          </>
        )}
      </form>

      {/* Applied Promotions */}
      {promotions.length > 0 && (
        <div className="w-full">
          <h3 className="text-sm font-medium mb-2">Promotion(s) applied:</h3>

          <div className="flex flex-col gap-2">
            {promotions.map((promotion) => (
              <div
                key={promotion.id}
                className="flex items-center justify-between w-full"
                data-testid="discount-row"
              >
                <div className="flex items-center gap-2 text-sm w-4/5 pr-1">
                  <span className="truncate" data-testid="discount-code">
                    {/* Badge */}
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        promotion.is_automatic
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {promotion.code}
                    </span>{" "}
                    (
                    {promotion.application_method?.value !== undefined &&
                      promotion.application_method.currency_code !==
                        undefined && (
                        <>
                          {promotion.application_method.type === "percentage"
                            ? `${promotion.application_method.value}%`
                            : convertToLocale({
                                amount: +promotion.application_method.value,
                                currency_code:
                                  promotion.application_method.currency_code,
                              })}
                        </>
                      )}
                    )
                  </span>
                </div>

                {/* Remove */}
                {!promotion.is_automatic && (
                  <button
                    className="flex items-center text-gray-500 hover:text-red-500"
                    onClick={() => {
                      if (!promotion.code) return
                      removePromotionCode(promotion.code)
                    }}
                    data-testid="remove-discount-button"
                  >
                    <Trash size={14} />
                    <span className="sr-only">Remove discount code</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DiscountCode

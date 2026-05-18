"use client"

import { useActionState } from "react"
import { createTransferRequest } from "@lib/data/orders"
import { Text, Heading, Input, IconButton } from "@medusajs/ui"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { CheckCircleMiniSolid, XCircleSolid } from "@medusajs/icons"
import { useEffect, useState } from "react"

export default function TransferRequestForm() {
  const [showSuccess, setShowSuccess] = useState(false)

  const [state, formAction] = useActionState(createTransferRequest, {
    success: false,
    error: null,
    order: null,
  })

  useEffect(() => {
    if (state.success && state.order) {
      setShowSuccess(true)
    }
  }, [state.success, state.order])

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Main Action Card */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-200 hover:shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Text Content */}
          <div className="flex flex-col gap-y-2 max-w-md">
            <div className="flex items-center gap-x-2 mb-1">
              <div className="w-2 h-6 bg-black rounded-full" />{" "}
              {/* Accent element */}
              <Heading level="h3" className="text-xl font-bold text-gray-900">
                Order Transfers
              </Heading>
            </div>
            <Text className="text-sm font-medium text-gray-500 leading-relaxed">
              Can&apos;t find an order? Enter your Order ID below to link a
              guest order or a missing purchase to your account.
            </Text>
          </div>

          {/* Form Content */}
          <form
            action={formAction}
            className="flex flex-col gap-y-3 w-full lg:max-w-sm"
          >
            <div className="flex flex-col gap-y-2">
              <Input
                className="w-full rounded-xl border-gray-200 focus:border-black transition-all h-11 px-4"
                name="order_id"
                placeholder="Ex: order_01H2..."
              />
              <SubmitButton
                variant="secondary"
                className="w-full sm:w-fit whitespace-nowrap self-end rounded-full bg-black text-white hover:bg-gray-800 transition-colors px-6 h-11 border-none font-bold text-xs uppercase tracking-wider"
              >
                Request Transfer
              </SubmitButton>
            </div>

            {/* Error Message */}
            {!state.success && state.error && (
              <div className="flex items-center gap-x-2 text-rose-600 bg-rose-50 p-2 px-3 rounded-lg border border-rose-100 self-end animate-in fade-in slide-in-from-top-1">
                <Text className="text-xs font-bold">{state.error}</Text>
              </div>
            )}
          </form>
        </div>

        {/* Success State Overlay/Section */}
        {showSuccess && (
          <div className="mt-8 animate-in zoom-in-95 duration-300">
            <div className="flex flex-col sm:flex-row justify-between p-5 bg-emerald-50 border border-emerald-100 rounded-2xl w-full items-center gap-4">
              <div className="flex gap-x-4 items-center">
                <div className="bg-emerald-500 p-2 rounded-full shadow-lg shadow-emerald-200">
                  <CheckCircleMiniSolid className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <Text className="text-sm font-bold text-emerald-900">
                    Transfer Requested Successfully
                  </Text>
                  <Text className="text-xs font-medium text-emerald-700/80">
                    We&apos;ve sent a confirmation email to{" "}
                    <span className="font-bold underline">
                      {state.order?.email}
                    </span>
                  </Text>
                </div>
              </div>
              <IconButton
                variant="transparent"
                className="hover:bg-emerald-100 rounded-full transition-colors"
                onClick={() => setShowSuccess(false)}
              >
                <XCircleSolid className="w-5 h-5 text-emerald-800/40" />
              </IconButton>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

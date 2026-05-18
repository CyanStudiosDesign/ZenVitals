"use client"

import { Button, Heading, Text } from "@medusajs/ui"
import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import Package from "@modules/common/icons/package"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="flex flex-col gap-y-10 w-full max-w-5xl mx-auto">
        {/* Header section for the Orders page */}
        <div className="flex flex-col gap-y-2 border-b border-gray-100 pb-6">
          <Heading level="h1" className="text-3xl font-bold text-gray-900">
            Order History
          </Heading>
          <Text className="text-gray-500">
            Check the status of recent orders, manage returns, and download
            invoices.
          </Text>
        </div>

        {/* Orders List in a clean, spaced vertical stack */}
        <div className="flex flex-col gap-y-6" data-testid="orders-container">
          {orders.map((o) => (
            <div
              key={o.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-1">
                {" "}
                {/* Slight padding to frame the OrderCard if needed */}
                <OrderCard order={o} />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Enhanced Empty State
  return (
    <div
      className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[400px] bg-white border border-dashed border-gray-200 rounded-3xl p-12 text-center"
      data-testid="no-orders-container"
    >
      <div className="bg-gray-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
        <Package size={32} className="text-gray-400" />
      </div>

      <Heading level="h2" className="text-xl font-bold text-gray-900">
        No orders yet
      </Heading>

      <Text className="text-gray-500 max-w-[280px] mt-2 mb-8">
        It looks like you haven&apos;t placed any orders. When you do, they will
        appear here.
      </Text>

      <LocalizedClientLink href="/" passHref>
        <Button
          variant="primary"
          size="large"
          className="rounded-full px-8 shadow-sm hover:shadow-md transition-all"
          data-testid="continue-shopping-button"
        >
          Explore Store
        </Button>
      </LocalizedClientLink>
    </div>
  )
}

export default OrderOverview

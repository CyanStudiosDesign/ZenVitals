import { Metadata } from "next"
import OrderOverview from "@modules/account/components/order-overview"
import { notFound } from "next/navigation"
import { listOrders } from "@lib/data/orders"
import TransferRequestForm from "@modules/account/components/transfer-request-form"
import { Heading, Text } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Orders",
  description: "Overview of your previous orders.",
}

export default async function Orders() {
  const orders = await listOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full max-w-5xl mx-auto" data-testid="orders-page-wrapper">
      {/* Header Section */}
      <div className="mb-10 flex flex-col gap-y-2 border-b border-gray-100 pb-8">
        <div className="flex items-center gap-x-3 mb-1">
          <div className="w-2 h-8 bg-black rounded-full" />
          <Heading level="h1" className="text-3xl font-bold text-gray-900">
            My Orders
          </Heading>
        </div>
        <Text className="text-gray-500 max-w-2xl">
          Track, manage, and review your order history. You can view detailed
          status updates or request a transfer for guest purchases.
        </Text>
      </div>

      <div className="flex flex-col gap-y-16">
        {/* Order History Section */}
        <section className="flex flex-col gap-y-6">
          <OrderOverview orders={orders} />
        </section>

        {/* Transfer Request Section */}
        {/* We use a subtle background or different spacing to separate the 'Action' from the 'List' */}
        <section className="flex flex-col gap-y-6 pt-8 border-t border-gray-100">
          <div className="px-1">
            <Text className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Missing an order?
            </Text>
          </div>
          <TransferRequestForm />
        </section>
      </div>
    </div>
  )
}

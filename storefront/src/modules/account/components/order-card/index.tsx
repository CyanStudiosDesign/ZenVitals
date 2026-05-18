"use client"

import { Button, Text } from "@medusajs/ui"
import { useMemo } from "react"

import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OrderCardProps = {
  order: HttpTypes.StoreOrder
}

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return (
      order.items?.reduce((acc, item) => {
        return acc + item.quantity
      }, 0) ?? 0
    )
  }, [order])

  const numberOfProducts = useMemo(() => {
    return order.items?.length ?? 0
  }, [order])

  return (
    <div className="bg-white p-6 flex flex-col" data-testid="order-card">
      {/* Top Row: ID and Status/Meta */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
            Order Number
          </span>
          <div className="text-xl font-bold text-gray-900">
            #<span data-testid="order-display-id">{order.display_id}</span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 block">
            Total Amount
          </span>
          <div
            className="text-lg font-bold text-gray-900"
            data-testid="order-amount"
          >
            {convertToLocale({
              amount: order.total,
              currency_code: order.currency_code,
            })}
          </div>
        </div>
      </div>

      {/* Meta Info Row */}
      <div className="flex items-center gap-x-4 mb-6">
        <div className="bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
          <Text
            className="text-xs font-medium text-gray-600"
            data-testid="order-created-at"
          >
            {new Date(order.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </div>
        <div className="bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
          <Text className="text-xs font-medium text-gray-600">
            {numberOfLines} {numberOfLines > 1 ? "items" : "item"}
          </Text>
        </div>
      </div>

      {/* Product Thumbnails Grid */}
      <div className="grid grid-cols-3 small:grid-cols-4 gap-4 pb-6 border-b border-gray-50">
        {order.items?.slice(0, 3).map((i) => {
          return (
            <div
              key={i.id}
              className="group flex flex-col gap-y-3"
              data-testid="order-item"
            >
              <div className="relative aspect-[29/34] w-full overflow-hidden rounded-xl bg-gray-50 border border-gray-100 transition-colors group-hover:border-gray-200">
                <Thumbnail thumbnail={i.thumbnail} images={[]} size="full" />
              </div>
              <div className="flex flex-col min-w-0">
                <Text
                  className="text-xs font-bold text-gray-900 truncate"
                  data-testid="item-title"
                >
                  {i.title}
                </Text>
                <Text className="text-xs text-gray-400">
                  Qty: <span data-testid="item-quantity">{i.quantity}</span>
                </Text>
              </div>
            </div>
          )
        })}

        {numberOfProducts > 3 && (
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <Text className="text-xs font-bold text-gray-500">
              +{numberOfProducts - 3}
            </Text>
            <Text className="text-[10px] uppercase font-bold tracking-tighter text-gray-400">
              More
            </Text>
          </div>
        )}
      </div>

      {/* Bottom Row: Actions */}
      <div className="flex justify-end pt-4">
        <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
          <Button
            data-testid="order-details-link"
            variant="secondary"
            className="rounded-full border-gray-200 hover:bg-gray-50 font-semibold text-xs"
          >
            Manage Order
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderCard

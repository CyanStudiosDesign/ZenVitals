"use client"

import { Container, Badge, Text, Heading } from "@medusajs/ui"
import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  const completion = getProfileCompletion(customer)

  return (
    <div data-testid="overview-page-wrapper" className="max-w-5xl mx-auto">
      <div className="">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-6">
          <div>
            <Heading
              level="h1"
              className="text-3xl font-bold text-gray-900"
              data-testid="welcome-message"
            >
              Hello, {customer?.first_name}
            </Heading>
            <Text className="text-gray-500 mt-1">
              Welcome back to your account dashboard.
            </Text>
          </div>
          <div className="text-right">
            <Text className="text-ui-fg-subtle text-xs uppercase tracking-widest font-semibold">
              Signed in as
            </Text>
            <Text
              className="font-medium text-gray-900"
              data-testid="customer-email"
            >
              {customer?.email}
            </Text>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Profile Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <Heading
                level="h3"
                className="text-gray-700 font-semibold text-base"
              >
                Profile Setup
              </Heading>
              <Badge
                color={completion === 100 ? "green" : "blue"}
                className="rounded-full"
              >
                {completion === 100 ? "Complete" : "In Progress"}
              </Badge>
            </div>
            <div className="flex items-end gap-x-3">
              <span className="text-4xl font-bold text-gray-900 tracking-tight">
                {completion}%
              </span>
              <span className="text-gray-400 font-medium pb-1">
                Profile Strength
              </span>
            </div>
            {/* Simple Progress Bar */}
            <div className="w-full bg-gray-100 h-2 rounded-full mt-4 overflow-hidden">
              <div
                className="bg-black h-full rounded-full transition-all duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

          {/* Addresses Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <Heading
              level="h3"
              className="text-gray-700 font-semibold text-base mb-4"
            >
              Saved Addresses
            </Heading>
            <div className="flex items-end gap-x-3">
              <span className="text-4xl font-bold text-gray-900 tracking-tight">
                {customer?.addresses?.length || 0}
              </span>
              <span className="text-gray-400 font-medium pb-1">
                Addresses on file
              </span>
            </div>
            <LocalizedClientLink
              href="/account/addresses"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 mt-4 inline-block"
            >
              Manage Addresses →
            </LocalizedClientLink>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="flex flex-col gap-y-6">
          <div className="flex items-center justify-between">
            <Heading level="h2" className="text-xl font-bold text-gray-900">
              Recent Orders
            </Heading>
            <LocalizedClientLink
              href="/account/orders"
              className="text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              View all
            </LocalizedClientLink>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {orders && orders.length > 0 ? (
              <ul
                className="divide-y divide-gray-100"
                data-testid="orders-wrapper"
              >
                {orders.slice(0, 5).map((order) => (
                  <li key={order.id} className="group">
                    <LocalizedClientLink
                      href={`/account/orders/details/${order.id}`}
                    >
                      <div className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
                        <div className="grid grid-cols-3 gap-x-8 flex-1">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-400 uppercase font-bold tracking-tighter">
                              Date
                            </span>
                            <span className="text-sm font-medium text-gray-800">
                              {new Date(order.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-400 uppercase font-bold tracking-tighter">
                              Order ID
                            </span>
                            <span className="text-sm font-medium text-gray-800">
                              #{order.display_id}
                            </span>
                          </div>
                          <div className="flex flex-col text-right pr-8">
                            <span className="text-xs text-gray-400 uppercase font-bold tracking-tighter">
                              Amount
                            </span>
                            <span className="text-sm font-bold text-gray-900">
                              {convertToLocale({
                                amount: order.total,
                                currency_code: order.currency_code,
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="bg-gray-100 p-2 rounded-full group-hover:bg-black group-hover:text-white transition-all">
                          <ChevronDown className="-rotate-90 w-4 h-4" />
                        </div>
                      </div>
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-12 text-center">
                <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-400">📦</span>
                </div>
                <Text className="text-gray-500">
                  You haven't placed any orders yet.
                </Text>
                <LocalizedClientLink
                  href="/store"
                  className="mt-4 inline-block text-sm font-bold underline"
                >
                  Start Shopping
                </LocalizedClientLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0
  if (!customer) return 0
  if (customer.email) count++
  if (customer.first_name && customer.last_name) count++
  if (customer.phone) count++
  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )
  if (billingAddress) count++
  return (count / 4) * 100
}

export default Overview

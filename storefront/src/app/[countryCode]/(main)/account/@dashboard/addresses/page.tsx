import { Metadata } from "next"
import { notFound } from "next/navigation"

import AddressBook from "@modules/account/components/address-book"
import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"
import { Heading, Text } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Addresses",
  description: "View your addresses",
}

export default async function Addresses(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const customer = await retrieveCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div
      className="w-full max-w-5xl mx-auto"
      data-testid="addresses-page-wrapper"
    >
      {/* Consistent Bento Header */}
      <div className="mb-10 flex flex-col gap-y-2 border-b border-gray-100 pb-8">
        <div className="flex items-center gap-x-3 mb-1">
          <div className="w-2 h-8 bg-black rounded-full" />
          <Heading level="h1" className="text-3xl font-bold text-gray-900">
            Shipping Addresses
          </Heading>
        </div>
        <Text className="text-gray-500 max-w-2xl">
          Manage your saved delivery locations. Adding multiple addresses allows
          for a faster checkout experience when shipping to home, work, or
          friends.
        </Text>
      </div>

      {/* Address Content Section */}
      <div className="flex flex-col gap-y-6">
        <div className="px-1">
          <Text className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Your Address Book
          </Text>
        </div>

        {/* AddressBook component handles the internal card/grid logic */}
        <AddressBook customer={customer} region={region} />
      </div>
    </div>
  )
}

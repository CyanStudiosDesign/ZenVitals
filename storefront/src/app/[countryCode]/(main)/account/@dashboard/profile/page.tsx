import { Metadata } from "next"
import ProfilePhone from "@modules/account//components/profile-phone"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"
import ProfilePassword from "@modules/account/components/profile-password"

import { notFound } from "next/navigation"
import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"
import { Heading, Text } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Profile",
  description: "View and edit your Medusa Store profile.",
}

export default async function Profile() {
  const customer = await retrieveCustomer()
  const regions = await listRegions()

  if (!customer || !regions) {
    notFound()
  }

  return (
    <div
      className="w-full max-w-5xl mx-auto"
      data-testid="profile-page-wrapper"
    >
      {/* Header Section */}
      <div className="mb-10 flex flex-col gap-y-2 border-b border-gray-100 pb-8">
        <div className="flex items-center gap-x-3 mb-1">
          <div className="w-2 h-8 bg-black rounded-full" />
          <Heading level="h1" className="text-3xl font-bold text-gray-900">
            Profile Settings
          </Heading>
        </div>
        <Text className="text-gray-500 max-w-2xl">
          Manage your personal information, security preferences, and default
          billing details to ensure a seamless checkout experience.
        </Text>
      </div>

      <div className="flex flex-col gap-y-6 w-full">
        {/* Account Details Group */}
        <section className="flex flex-col gap-y-4">
          <div className="px-1">
            <Text className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Personal Information
            </Text>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="divide-y divide-gray-50">
              <div className="p-6 sm:p-8 hover:bg-gray-50/50 transition-colors">
                <ProfileName customer={customer} />
              </div>
              <div className="p-6 sm:p-8 hover:bg-gray-50/50 transition-colors">
                <ProfileEmail customer={customer} />
              </div>
              <div className="p-6 sm:p-8 hover:bg-gray-50/50 transition-colors">
                <ProfilePhone customer={customer} />
              </div>
            </div>
          </div>
        </section>

        {/* Security / Additional Info Group */}
        <section className="flex flex-col gap-y-4 pt-4">
          <div className="px-1">
            <Text className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Billing & Security
            </Text>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="divide-y divide-gray-50">
              <div className="p-6 sm:p-8 hover:bg-gray-50/50 transition-colors">
                <ProfileBillingAddress customer={customer} regions={regions} />
              </div>
              {/* Uncomment when ready - padding ensures consistency */}
              {/* <div className="p-6 sm:p-8 hover:bg-gray-50/50 transition-colors">
                <ProfilePassword customer={customer} />
              </div> */}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

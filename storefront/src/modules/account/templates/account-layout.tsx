import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 small:py-12" data-testid="account-page">
      <div className="flex-1 w-full px-10 h-full justify-center items-center bg-white flex flex-col">
        <div className="flex w-full max-w-5xl my-8">
          {customer && <AccountNav customer={customer} />}
        </div>
        <div className="flex-1 w-full h-full ">{children}</div>
      </div>
    </div>
  )
}

export default AccountLayout

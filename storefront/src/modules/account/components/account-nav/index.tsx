"use client"

import { useState, useRef, useEffect } from "react"
import { useParams, usePathname } from "next/navigation"
import { clx } from "@medusajs/ui"
import { ArrowRightOnRectangle, GridList } from "@medusajs/icons"

import ChevronDown from "@modules/common/icons/chevron-down"
import User from "@modules/common/icons/user"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { signout } from "@lib/data/customer"

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
    <polyline
      points="20 6 9 17 4 12"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const AccountNav = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    setOpen(false)
    await signout(countryCode)
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const navItems = [
    {
      id: "overview",
      label: "Overview",
      desc: "Account dashboard and activity",
      icon: <GridList size={20} />,
      href: "/account",
    },
    {
      id: "profile",
      label: "Profile",
      desc: "Manage your personal info",
      icon: <User size={20} />,
      href: "/account/profile",
    },
    {
      id: "addresses",
      label: "Addresses",
      desc: "Manage shipping addresses",
      icon: <MapPin size={20} />,
      href: "/account/addresses",
    },
    {
      id: "orders",
      label: "Orders",
      desc: "Check your order history",
      icon: <Package size={20} />,
      href: "/account/orders",
    },
  ]

  // Logic to find the active item by checking if the current route exactly matches
  // or contains the href (with a fallback to Overview)
  const activeItem =
    navItems.find((item) => {
      const pathWithoutCountry = route.replace(`/${countryCode}`, "")
      return (
        pathWithoutCountry === item.href ||
        (item.href !== "/account" && pathWithoutCountry.startsWith(item.href))
      )
    }) || navItems[0]

  return (
    /* w-72 (18rem/288px) provides a consistent static width */
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 bg-white rounded-2xl px-4 py-3.5 shadow-sm transition-all duration-150 cursor-pointer select-none border border-gray-50"
      >
        <div className="flex items-center gap-3 text-gray-800 overflow-hidden">
          <span className="text-gray-500 shrink-0">{activeItem.icon}</span>
          <span className="font-semibold text-sm truncate">
            {activeItem.label}
          </span>
        </div>
        <div
          className={clx("transition-transform duration-300 shrink-0", {
            "rotate-180": open,
          })}
        >
          <ChevronDown />
        </div>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 py-1.5 animate-in fade-in zoom-in-95 duration-200">
          <nav>
            <ul className="flex flex-col m-0 p-0">
              {navItems.map((item) => {
                const pathWithoutCountry = route.replace(`/${countryCode}`, "")
                const isActive = pathWithoutCountry === item.href

                return (
                  <li key={item.id} className="list-none">
                    <LocalizedClientLink
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={clx(
                        "flex items-center gap-3 px-4 py-3 transition-all duration-150 hover:bg-gray-100",
                        { "bg-gray-50": isActive }
                      )}
                    >
                      <span
                        className={clx(
                          "flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-colors",
                          isActive
                            ? "bg-gray-200 text-gray-900"
                            : "bg-gray-100 text-gray-500"
                        )}
                      >
                        {item.icon}
                      </span>

                      <div className="flex-1 min-w-0 text-left">
                        <div className="text-sm font-semibold text-gray-800 leading-tight">
                          {item.label}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5 truncate">
                          {item.desc}
                        </div>
                      </div>

                      {isActive && (
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 shrink-0 animate-in zoom-in duration-300">
                          <CheckIcon />
                        </span>
                      )}
                    </LocalizedClientLink>
                  </li>
                )
              })}

              <li className="mx-4 my-1.5 border-t border-gray-100 list-none" />

              <li className="list-none">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 transition-all duration-150 hover:bg-red-50 hover:text-red-600 rounded-b-2xl"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 text-gray-400 shrink-0">
                    <ArrowRightOnRectangle />
                  </span>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-semibold leading-tight">
                      Log Out
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      Sign out of your account
                    </div>
                  </div>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}

export default AccountNav

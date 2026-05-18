"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { Menu, X, ChevronRight } from "lucide-react"
import { useToggleState } from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"

const SideMenuItems = {
  Home: "/",
  Shop: "/store",
  "Quick Test": "/quiz",
  "Results History": "/history",
  Account: "/account",
  Cart: "/cart",
}

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

const SideMenu = ({ regions, locales, currentLocale }: SideMenuProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  return (
    <div className="h-full flex items-center">
      <Popover className="h-full flex">
        {({ open, close }) => (
          <>
            {/* Trigger */}
            <Popover.Button
              data-testid="nav-menu-button"
              className="flex items-center h-full transition duration-200 focus:outline-none hover:text-black"
            >
              <Menu className="h-5 w-5" />
            </Popover.Button>

            {/* Backdrop */}
            {open && (
              <div
                className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
                onClick={close}
                data-testid="side-menu-backdrop"
              />
            )}

            {/* Panel */}
            <Transition
              show={open}
              as={Fragment}
              enter="transition duration-200 ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition duration-150 ease-in"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <PopoverPanel className="absolute inset-x-0 z-[51] m-2 h-[calc(100vh-1rem)] w-full sm:w-1/3 2xl:w-1/4 sm:min-w-min backdrop-blur-xl">
                <div
                  data-testid="nav-menu-popup"
                  className="flex flex-col h-full justify-between p-6 rounded-xl bg-black/70 text-white"
                >
                  {/* Close */}
                  <div className="flex justify-end">
                    <button data-testid="close-menu-button" onClick={close}>
                      <X />
                    </button>
                  </div>

                  {/* Links */}
                  <ul className="flex flex-col gap-6">
                    {Object.entries(SideMenuItems).map(([name, href]) => (
                      <li key={name}>
                        <LocalizedClientLink
                          href={href}
                          className="text-3xl leading-10 font-medium hover:text-gray-300 transition"
                          onClick={close}
                          data-testid={`${name.toLowerCase()}-link`}
                        >
                          {name}
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom */}
                  <div className="flex flex-col gap-6">
                    {/* Language */}
                    {!!locales?.length && (
                      <div
                        className="flex justify-between items-center"
                        onMouseEnter={languageToggleState.open}
                        onMouseLeave={languageToggleState.close}
                      >
                        <LanguageSelect
                          toggleState={languageToggleState}
                          locales={locales}
                          currentLocale={currentLocale}
                        />
                        <ChevronRight />
                      </div>
                    )}

                    {/* Country */}
                    <div
                      className="flex justify-between items-center"
                      onMouseEnter={countryToggleState.open}
                      onMouseLeave={countryToggleState.close}
                    >
                      {regions && (
                        <CountrySelect
                          toggleState={countryToggleState}
                          regions={regions}
                        />
                      )}
                      <ChevronRight />
                    </div>

                    {/* Footer */}
                    <p className="text-xs text-gray-400">
                      © {new Date().getFullYear()} ZenVitals LLP. All rights
                      reserved.
                    </p>
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

export default SideMenu

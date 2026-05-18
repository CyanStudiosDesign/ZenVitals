import { Listbox, Transition } from "@headlessui/react"
import { ChevronUpDown } from "@medusajs/icons"
import { Fragment, useMemo } from "react"

import Radio from "@modules/common/components/radio"
import compareAddresses from "@lib/util/compare-addresses"
import { HttpTypes } from "@medusajs/types"

type AddressSelectProps = {
  addresses: HttpTypes.StoreCustomerAddress[]
  addressInput: HttpTypes.StoreCartAddress | null
  onSelect: (
    address: HttpTypes.StoreCartAddress | undefined,
    email?: string
  ) => void
}

const AddressSelect = ({
  addresses,
  addressInput,
  onSelect,
}: AddressSelectProps) => {
  const handleSelect = (id: string) => {
    const savedAddress = addresses.find((a) => a.id === id)
    if (savedAddress) {
      onSelect(savedAddress as HttpTypes.StoreCartAddress)
    }
  }

  const selectedAddress = useMemo(() => {
    return addresses.find((a) => compareAddresses(a, addressInput))
  }, [addresses, addressInput])

  return (
    <Listbox onChange={handleSelect} value={selectedAddress?.id}>
      <div className="relative">
        {/* Button */}
        <Listbox.Button
          className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
          data-testid="shipping-address-select"
        >
          {({ open }) => (
            <>
              <span className="truncate">
                {selectedAddress
                  ? selectedAddress.address_1
                  : "Choose an address"}
              </span>

              <ChevronUpDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </>
          )}
        </Listbox.Button>

        {/* Options */}
        <Transition
          as={Fragment}
          leave="transition duration-100 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className="absolute z-20 mt-1 w-full max-h-60 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none text-sm"
            data-testid="shipping-address-options"
          >
            {addresses.map((address) => (
              <Listbox.Option
                key={address.id}
                value={address.id}
                className="cursor-pointer select-none px-4 py-4 hover:bg-gray-50"
                data-testid="shipping-address-option"
              >
                <div className="flex gap-4 items-start">
                  {/* Radio */}
                  <Radio
                    checked={selectedAddress?.id === address.id}
                    data-testid="shipping-address-radio"
                  />

                  {/* Content */}
                  <div className="flex flex-col text-sm text-gray-700">
                    {/* Name */}
                    <span className="font-medium">
                      {address.first_name} {address.last_name}
                    </span>

                    {/* Company */}
                    {address.company && (
                      <span className="text-gray-500">{address.company}</span>
                    )}

                    {/* Address */}
                    <div className="mt-2 text-gray-600">
                      <div>
                        {address.address_1}
                        {address.address_2 && `, ${address.address_2}`}
                      </div>
                      <div>
                        {address.postal_code}, {address.city}
                      </div>
                      <div>
                        {address.province && `${address.province}, `}
                        {address.country_code?.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default AddressSelect

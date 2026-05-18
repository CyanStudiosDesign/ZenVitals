import { HttpTypes } from "@medusajs/types"
import React from "react"

// Simple helper to replace 'clx' or 'clsx' if you don't want the dependency
const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ")

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (id: string, value: string) => void // Note: Changed 'title' to 'id' to match your onClick logic
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-gray-700">Select {title}</span>
      <div className="flex flex-wrap gap-2" data-testid={dataTestId}>
        {filteredOptions.map((v) => {
          const isSelected = v === current

          return (
            <button
              type="button"
              onClick={() => updateOption(option.id, v)}
              key={v}
              disabled={disabled}
              data-testid="option-button"
              className={cn(
                "flex-1 min-w-[60px] h-10 px-4 py-2 text-sm rounded-md border transition-all duration-150",
                isSelected
                  ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600" // Selected State
                  : "border-gray-300 bg-white text-gray-900 hover:border-gray-400 hover:bg-gray-50", // Unselected State
                disabled &&
                  "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200" // Disabled State
              )}
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect

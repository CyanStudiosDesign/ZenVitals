"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import {
  useParams,
  usePathname,
  useSearchParams,
  useRouter,
} from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import Drawer from "components/ui/slide-drawer"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const safetyData = JSON.parse(product?.metadata?.safety_info || "{}")
  console.log("info")
  console.log(safetyData)

  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    return product.variants?.find((v: any) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  const isValidVariant = useMemo(() => {
    return product.variants?.some((v: any) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) return

    if (value) params.set("v_id", value)
    else params.delete("v_id")

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  const inStock = useMemo(() => {
    if (selectedVariant && !selectedVariant.manage_inventory) return true
    if (selectedVariant?.allow_backorder) return true
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    )
      return true
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(actionsRef, "0px")

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return

    setIsAdding(true)
    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    })
    setIsAdding(false)
  }

  return (
    <div className="flex flex-col gap-4" ref={actionsRef}>
      {/* Options */}
      {(product.variants?.length ?? 0) > 1 && (
        <div className="flex flex-col gap-4">
          {(product.options || []).map((option: any) => (
            <OptionSelect
              key={option.id}
              option={option}
              current={options[option.id]}
              updateOption={setOptionValue}
              title={option.title ?? ""}
              data-testid="product-options"
              disabled={!!disabled || isAdding}
            />
          ))}

          {/* Divider */}
          <div className="h-px w-full bg-gray-200" />
        </div>
      )}

      {/* Price */}
      <ProductPrice product={product} variant={selectedVariant} />

      {/* Button */}
      <button
        onClick={handleAddToCart}
        disabled={
          !inStock ||
          !selectedVariant ||
          !!disabled ||
          isAdding ||
          !isValidVariant
        }
        className={`
          w-full h-12 rounded-full text-base font-medium
          flex items-center justify-center
          transition-all duration-200
          ${
            !inStock || !selectedVariant || !isValidVariant
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-900"
          }
        `}
        data-testid="add-product-button"
      >
        {isAdding ? (
          <span className="animate-pulse">Adding...</span>
        ) : !selectedVariant ? (
          "Select variant"
        ) : !inStock || !isValidVariant ? (
          "Out of stock"
        ) : (
          "Add to Plan"
        )}
      </button>

      {/* Conditionally render safety info section to prevent crashes */}
      {safetyData && (
        <>
          <button
            className="text-zinc-600 underline text-sm hover:text-black hover:font-medium transition-all duration-200 "
            onClick={() => setIsDrawerOpen(true)}
          >
            Important safety information
          </button>

          <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <div className="font-sans text-zinc-900 max-w-3xl mx-auto mb-16">
              <header className="mb-10">
                <h1 className="text-5xl font-medium tracking-tight mb-4 flex items-start">
                  {safetyData.brand_name || product.title}
                  {safetyData.is_registered_trademark && (
                    <span className="text-xl ml-0.5 mt-1">®</span>
                  )}
                </h1>
                <p className="text-zinc-600 text-xl leading-relaxed font-normal">
                  {safetyData.subtitle}
                </p>
              </header>

              <section className="space-y-10">
                {/* Prescribing / Document Info 
                {safetyData.documents && safetyData.documents.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-semibold mb-4 tracking-tight">
                      Product Information
                    </h2>
                    <ul className="list-disc ml-6">
                      {safetyData.documents.map((doc: any, index: number) => (
                        <li
                          key={index}
                          className="text-zinc-700 text-lg decoration-zinc-400 underline underline-offset-4 cursor-pointer hover:text-black capitalize"
                        >
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {doc.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
*/}
                {/* Side Effects List */}
                {safetyData.side_effects &&
                  safetyData.side_effects.length > 0 && (
                    <div>
                      <h2 className="text-3xl font-semibold mb-4 tracking-tight">
                        Potential side effects
                      </h2>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 ml-6 list-disc text-zinc-700 text-lg">
                        {safetyData.side_effects.map(
                          (effect: string, index: number) => (
                            <li key={index}>{effect}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {/* Safety Information */}
                <div className="pt-10 border-t border-zinc-200">
                  <h2 className="text-3xl font-semibold mb-4 tracking-tight">
                    Important safety information
                  </h2>
                  <p className="text-zinc-700 text-lg leading-relaxed mb-6">
                    {safetyData.general_safety}
                  </p>

                  <div className="space-y-6">
                    {/* Limitations of Use */}
                    {safetyData.limitations &&
                      safetyData.limitations.length > 0 && (
                        <div>
                          <h3 className="text-2xl font-semibold mb-3 tracking-tight">
                            Limitations of Use:
                          </h3>
                          <ul className="list-disc ml-6 space-y-3 text-zinc-700 text-lg">
                            {safetyData.limitations.map(
                              (limitation: string, index: number) => (
                                <li key={index}>{limitation}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {/* Dynamic Warning Boxes */}
                    {safetyData.warnings &&
                      safetyData.warnings.map((warning: any, index: number) => (
                        <div
                          key={index}
                          className="bg-zinc-50 p-6 rounded-xl border border-zinc-200"
                        >
                          <p className="font-bold text-zinc-900 uppercase tracking-wider text-sm mb-3">
                            {warning.title}
                          </p>
                          {warning.subtitle && (
                            <p className="text-zinc-600 text-base leading-relaxed mb-4">
                              {warning.subtitle}
                            </p>
                          )}
                          <ul className="list-disc ml-6 space-y-3 text-zinc-600 text-base">
                            {warning.points.map(
                              (point: string, idx: number) => (
                                <li key={idx}>{point}</li>
                              )
                            )}
                          </ul>
                        </div>
                      ))}
                  </div>
                </div>
              </section>
            </div>
          </Drawer>
        </>
      )}

      {/* Mobile Actions */}
      <MobileActions
        product={product}
        variant={selectedVariant}
        options={options}
        updateOptions={setOptionValue}
        inStock={inStock}
        handleAddToCart={handleAddToCart}
        isAdding={isAdding}
        show={!inView}
        optionsDisabled={!!disabled || isAdding}
      />
    </div>
  )
}

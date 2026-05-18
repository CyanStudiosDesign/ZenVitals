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

      <button
        className="text-zinc-600 underline text-sm hover:text-black hover:font-medium transition-all duration-200 "
        onClick={() => setIsDrawerOpen(true)}
      >
        Important safety information
      </button>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div className="font-sans text-zinc-900 max-w-3xl mx-auto mb-16">
          {/* Header Section from image_ae5702.jpg */}
          <header className="mb-10">
            <h1 className="text-5xl font-medium tracking-tight mb-4 flex items-start">
              Foundayo<span className="text-xl ml-0.5 mt-1">®</span>
            </h1>
            <p className="text-zinc-600  text-xl leading-relaxed font-normal">
              Your safety is our first priority. Learn more about key medication
              details, side effects, and other important info about your
              treatment.
            </p>
          </header>

          <section className="space-y-10">
            {/* Prescribing Info */}
            <div>
              <h2 className="text-3xl font-semibold mb-4 tracking-tight">
                Prescribing information
              </h2>
              <ul className="list-disc ml-6">
                <li className="text-zinc-700 text-lg decoration-zinc-400 underline underline-offset-4 cursor-pointer hover:text-black">
                  black box warning
                </li>
              </ul>
            </div>

            {/* Side Effects List from image_ae5702.jpg */}
            <div>
              <h2 className="text-3xl font-semibold mb-4 tracking-tight">
                Common side effects
              </h2>
              <ul className="grid grid-cols-1 gap-y-3 ml-6 list-disc text-zinc-700 text-lg">
                <li>Nausea</li>
                <li>Stomach (abdominal) pain</li>
                <li>Heartburn</li>
                <li>Constipation</li>
                <li>Headache</li>
                <li>Gas</li>
                <li>Diarrhea</li>
                <li>Swollen belly</li>
                <li>Hair loss</li>
                <li>Vomiting</li>
              </ul>
            </div>

            {/* Safety Information from image_ae5719.png */}
            <div className="pt-10 border-t border-zinc-200 ">
              <h2 className="text-3xl font-semibold mb-4 tracking-tight">
                Important safety information
              </h2>
              <p className="text-zinc-700 text-lg leading-relaxed mb-6">
                FOUNDAYO is a prescription medicine used with a reduced-calorie
                diet and increased physical activity to help adults with
                obesity, or some adults with overweight who also have
                weight-related medical problems, to lose excess body weight and
                keep the weight off.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-3 tracking-tight">
                    Limitations of Use:
                  </h3>
                  <ul className="list-disc ml-6 space-y-3 text-zinc-700 text-lg">
                    <li>
                      FOUNDAYO should not be used with other GLP-1 receptor
                      agonist medicines.
                    </li>
                    <li>
                      It is not known if FOUNDAYO is safe and effective for use
                      in children.
                    </li>
                  </ul>
                </div>

                {/* Warning Box */}
                <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-100 ">
                  <p className="font-bold text-zinc-900  uppercase tracking-wider text-sm mb-3">
                    WARNING: RISK OF THYROID C-CELL TUMORS
                  </p>
                  <p className="text-zinc-600  text-base leading-relaxed mb-4">
                    See full prescribing information for complete boxed warning.
                  </p>
                  <ul className="list-disc ml-6 space-y-3 text-zinc-600  text-base">
                    <li>
                      It is not known if FOUNDAYO will cause thyroid tumors, or
                      a type of thyroid cancer called medullary thyroid
                      carcinoma (MTC) in people.
                    </li>
                    <li>
                      Do not take FOUNDAYO if you or any of your family have
                      ever had a type of thyroid cancer called MTC, or if you
                      have an endocrine system condition called Multiple
                      Endocrine Neoplasia syndrome type 2 (MEN 2).
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Drawer>

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

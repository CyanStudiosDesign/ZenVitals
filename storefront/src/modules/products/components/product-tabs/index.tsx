"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"
import { HttpTypes } from "@medusajs/types"
import {
  AccordionContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/accordion"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}
const ProductTabs = ({ product }: ProductTabsProps) => {
  // 1. Get the raw string from metadata
  const detailsRaw = product.metadata?.details as string

  // 2. Parse it safely
  let details: any = null
  try {
    details = detailsRaw ? JSON.parse(detailsRaw) : null
  } catch (e) {
    console.error("Failed to parse product metadata details:", e)
  }
  console.log(details)

  const tabs = [
    {
      label: "Meet " + product?.title,
      show: !!details?.highlights,
      component: <HighlightTab details={details} />,
    },
    {
      label: "About the Ingredients",
      show: !!details?.ingredients,
      component: <IngredientsTab details={details} />,
    },
    {
      label: "Composition",
      show: !!details?.composition,
      component: <CompositionTab details={details} />,
    },
    {
      label: "How to Take",
      show: !!details?.usage,
      component: <UsageTab details={details} />,
    },
    {
      label: "Shipping & Returns",
      show: true,
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion>
        {tabs
          .filter((tab) => tab.show)
          .map((tab, i) => (
            <AccordionItem
              key={i}
              value={i.toString()}
              className="border-b border-gray-300 py-4 first:border-t-0"
            >
              <AccordionTrigger className="flex w-full items-center justify-between gap-4 text-left">
                <span className="text-xl font-medium text-gray-900">
                  {tab.label}
                </span>
              </AccordionTrigger>

              <AccordionContent className="s pr-8 leading-relaxed text-gray-500">
                {tab.component}
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  )
}

/** 1. Ingredients Tab **/
const HighlightTab = ({ details }: { details: any }) => (
  <div className="text-base px-8 py-8">
    <p className="mb-6 italic text-ui-fg-subtle">{details.description_main}</p>
    <div className="flex flex-col gap-y-6">
      {details.highlights?.map((highlight: any, i: number) => (
        <div key={i} className="border-l-2 border-ui-border-strong pl-4">
          <p className="text-ui-fg-subtle">{highlight}</p>
        </div>
      ))}
    </div>
  </div>
)
/** 1. Ingredients Tab **/
const IngredientsTab = ({ details }: { details: any }) => (
  <div className="text-base px-8 py-8">
    <p className="mb-6 italic text-ui-fg-subtle">
      {details.ingredients.summary}
    </p>
    <div className="flex flex-col gap-y-6">
      {details.ingredients.list?.map((ing: any, i: number) => (
        <div key={i} className="border-l-2 border-ui-border-strong pl-4">
          <span className="font-semibold block mb-1">{ing.name}</span>
          <p className="text-ui-fg-subtle">{ing.benefit}</p>
        </div>
      ))}
    </div>
  </div>
)

/** 2. Composition Tab (Table Style) **/
const CompositionTab = ({ details }: { details: any }) => (
  <div className="text-base px-8 py-8">
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-2 pb-2 border-b border-ui-border-base font-semibold uppercase text-[10px] tracking-widest text-ui-fg-muted">
        <span>Component</span>
        <span className="text-right">Strength</span>
      </div>
      {details.composition?.map((row: any, i: number) => (
        <div
          key={i}
          className="grid grid-cols-2 py-3 border-b border-ui-border-base last:border-0"
        >
          <span>{row.item}</span>
          <span className="text-right font-mono text-ui-fg-subtle">
            {row.value}
          </span>
        </div>
      ))}
    </div>
  </div>
)

/** 3. Usage Tab (Bullet Style) **/
const UsageTab = ({ details }: { details: any }) => (
  <div className="text-base px-8 py-8">
    <ul className="list-disc list-inside flex flex-col gap-y-3">
      {details.usage?.map((step: string, i: number) => (
        <li key={i} className="text-ui-fg-subtle">
          <span className="ml-2">{step}</span>
        </li>
      ))}
    </ul>
  </div>
)

/* Shipping Info */
const ShippingInfoTab = () => {
  return (
    <div className="text-base px-8 py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">Fast delivery</span>
            <p className="max-w-sm">
              Your package will arrive in 3-5 business days at your pick up
              location or in the comfort of your home.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">Bioavailability</span>
            <p className="max-w-sm text-ui-fg-subtle">
              Formulated with digestive enzymes to ensure nutrients are easily
              absorbed.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">Quality Guarantee</span>
            <p className="max-w-sm text-ui-fg-subtle">
              Every batch of Nutrilong is clinically formulated and tested for
              purity.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { truncateText } from "@lib/utils"

export default async function ProductPreview({
  product,
  region,
}: {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({ product })

  // Extracting tags for that "Cherry truffle, Blueberry" style subtext
  const ingredientPreview =
    product.tags
      ?.slice(0, 3)
      .map((t) => t.value)
      .join(", ") || "Pure Botanical Extract"

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block"
    >
      <div data-testid="product-wrapper" className="flex flex-col gap-y-4">
        {/* IMAGE CONTAINER (The "Stage") */}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#F3F3F3]">
          <div className="h-full w-full transition ease-in duration-200 group-hover:scale-105">
            <Thumbnail thumbnail={product.thumbnail} size="square" />
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex flex-col px-1 relative">
          <h3 className="text-xl font-bold text-zinc-900 font-outfit tracking-tight">
            {product.title}
          </h3>

          <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed max-w-[80%]">
            {truncateText(product.description, 70)}
          </p>

          <div className="flex items-center justify-between mt-3">
            <div className="flex flex-col">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>

            {/* THE ACTION BUTTON (Inspired by the black circle arrow) */}
            <div className="h-12 w-12 bg-zinc-900 rounded-full flex items-center justify-center text-white transition-all duration-200  group-hover:-translate-y-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}

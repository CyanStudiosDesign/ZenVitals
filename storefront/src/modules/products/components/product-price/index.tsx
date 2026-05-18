import { clx } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse rounded" />
  }

  const isSale = selectedPrice.price_type === "sale"

  return (
    <div className="flex flex-col gap-y-1 font-sans">
      <div className="flex items-center gap-x-3">
        {/* 1. The Discounted (Current) Price */}
        <span className="text-3xl font-bold text-ui-fg-base tracking-tight">
          <span
            data-testid="product-price"
            data-value={selectedPrice.calculated_price_number}
          >
            {selectedPrice.calculated_price}
          </span>
        </span>

        {/* 2. The Normal Rate (Strikethrough) & Badge */}
        {isSale && (
          <div className="flex items-center gap-x-2">
            <span
              className="text-ui-fg-muted line-through text-lg decoration-1"
              data-testid="original-product-price"
            >
              {selectedPrice.original_price}
            </span>
            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              {selectedPrice.percentage_diff}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Helper text for clarity */}
      <div className="flex flex-col">
        {!variant && (
          <span className="text-ui-fg-subtle text-xs font-medium">
            Starting from the lowest variant price
          </span>
        )}
        <p className="text-[10px] text-ui-fg-muted uppercase font-semibold tracking-widest mt-1">
          Exclusive of taxes
        </p>
      </div>
    </div>
  )
}

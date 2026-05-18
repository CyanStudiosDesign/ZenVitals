import { Text, clx } from "@medusajs/ui"
import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) return null

  const isSale = price.price_type === "sale"

  return (
    <div className="flex flex-col items-start gap-1">
      {/* 1. Original Price - Legible but secondary */}
      {isSale && (
        <span
          className="text-xs text-zinc-400 line-through decoration-zinc-300 font-medium"
          data-testid="original-price"
        >
          {price.original_price}
        </span>
      )}

      {/* 2. Main Price Container */}
      <div className="flex items-center gap-2">
        <span
          className={clx(
            "text-xl font-semibold tracking-tight font-outfit",
            isSale ? "text-zinc-900" : "text-zinc-800"
          )}
          data-testid="price"
        >
          {/* Clean currency display */}
          {price.calculated_price}
        </span>

        {/* 3. Subtle Sale Indicator - Only if on sale */}
        {isSale && (
          <span className="text-[10px] font-bold text-zinc-900 px-2 py-0.5 border border-zinc-200 rounded-md tracking-widest uppercase">
            Sale
          </span>
        )}
      </div>
    </div>
  )
}

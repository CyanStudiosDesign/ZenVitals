import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-4 mx-auto tracking-tight">
        {/* Tags + Collection */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Collection */}
          {product.collection && (
            <LocalizedClientLink
              href={`/collections/${product.collection.handle}`}
              className="text-xs font-semibold uppercase tracking-widest mr-2 text-gray-600 hover:text-black"
            >
              {product.collection.title}
            </LocalizedClientLink>
          )}

          {/* Tags */}
          {product.tags?.map((tag: any) => (
            <span
              key={tag.id}
              className="px-2.5 py-0.5 rounded-full border border-gray-300 text-[10px] font-bold uppercase tracking-wider text-gray-700"
            >
              {tag.value}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2
          className="text-4xl md:text-5xl font-bold leading-tight text-black"
          data-testid="product-title"
        >
          {product.title}
        </h2>

        {/* Description */}
        <p
          className="text-lg md:text-xl text-gray-600 whitespace-pre-line leading-relaxed"
          data-testid="product-description"
        >
          {product.description}
        </p>
      </div>
    </div>
  )
}

export default ProductInfo

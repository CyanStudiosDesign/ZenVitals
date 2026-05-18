// modules/quiz/components/ProductCard.tsx
import { useState } from "react"
import { Product } from "@/lib/data/quiz"
import { calculateDiscount } from "../utils/engine"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [inPlan, setInPlan] = useState(false)
  const discount = calculateDiscount(product.mrp, product.price)

  return (
    <div
      className={`rounded-2xl border-2 p-4 transition-all duration-300 ${
        inPlan
          ? "border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-100"
          : "border-gray-100 bg-gray-50"
      }`}
    >
      <div className="flex gap-4 items-start mb-3">
        <span className="text-3xl bg-white w-12 h-12 flex items-center justify-center rounded-xl shadow-sm">
          {product.emoji}
        </span>

        <div className="flex-1">
          <h4 className="font-bold text-sm text-gray-900 leading-tight font-outfit">
            {product.name}
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">{product.form}</p>
        </div>

        <div className="text-right">
          <div className="font-bold text-sm text-gray-900 font-outfit">
            ₹{product.price}
          </div>
          <div className="text-[10px] line-through text-gray-400">
            ₹{product.mrp}
          </div>
          <div className="text-[10px] font-bold text-emerald-600">
            -{discount}%
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-600 mb-4 leading-relaxed italic">
        "{product.desc}"
      </p>

      <button
        onClick={() => setInPlan(!inPlan)}
        className={`w-full py-2.5 rounded-xl text-xs font-bold font-mono tracking-wide transition-all ${
          inPlan
            ? "bg-white border-2 border-emerald-500 text-emerald-600"
            : "bg-emerald-600 text-white shadow-lg shadow-emerald-100"
        }`}
      >
        {inPlan ? "✓ ADDED TO PLAN" : "ADD TO PLAN"}
      </button>
    </div>
  )
}

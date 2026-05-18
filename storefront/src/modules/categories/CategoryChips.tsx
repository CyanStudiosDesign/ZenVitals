"use client"

import { HttpTypes } from "@medusajs/types"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export default function CategoryChips({
  categories,
  activeCategoryId,
}: {
  categories: HttpTypes.StoreProductCategory[]
  activeCategoryId?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSelect = useCallback(
    (categoryId: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete("page")

      if (categoryId === null) {
        params.delete("categoryId") // "All" → nothing sent
      } else {
        params.set("categoryId", categoryId)
      }

      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  return (
    <div className="flex flex-wrap gap-2 sm:px-8 px-2 mt-4 mb-2">
      {/* "All" is hardcoded, categories are dynamic */}
      {[{ id: null, name: "All" }, ...categories].map((cat) => {
        const isActive =
          cat.id === null ? !activeCategoryId : activeCategoryId === cat.id

        return (
          <button
            key={cat.id ?? "all"}
            onClick={() => handleSelect(cat.id)}
            className={[
              "inline-flex items-center px-4 py-1.5 rounded-full text-sm border transition-colors",
              isActive
                ? "bg-black text-white border-black"
                : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400 hover:text-zinc-800",
            ].join(" ")}
          >
            {cat.name}
          </button>
        )
      })}
    </div>
  )
}

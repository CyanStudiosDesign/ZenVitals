import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"
import { listCategories } from "@lib/data/categories"
import CategoryChips from "@modules/categories/CategoryChips"
import { listProductsWithSort } from "@lib/data/products"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
  categoryId,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  categoryId?: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  const categories = await listCategories({ limit: 20 })

  // fetch just for the count — cache deduplicates this with PaginatedProducts' fetch
  const {
    response: { count },
  } = await listProductsWithSort({
    page: pageNumber,
    queryParams: {
      limit: 12,
      ...(categoryId && { category_id: [categoryId] }),
    },
    sortBy: sort,
    countryCode,
  })

  return (
    <div
      className="flex flex-col small:items-start py-6 container max-w-7xl"
      data-testid="category-container"
    >
      <div className="my-8  text-2xl-semi">
        <h1 className="text-9xl font-bold">The Shop.</h1>
        <p className="max-w-2xl text-zinc-400 font-light text-xl mt-4">
          Scientifically formulated. Clinically backed. Our supplements are
          engineered to bridge the gap between biological necessity and modern
          lifestyle.
        </p>
      </div>
      <div className="w-full">
        <CategoryChips categories={categories} activeCategoryId={categoryId} />

        <div className="flex justify-between items-center mt-12 mb-4 sm:px-8 px-2">
          <div className="text-zinc-600 text-lg">
            Showing {count} formulation{count !== 1 ? "s" : ""}
          </div>
          <RefinementList sortBy={sort} />
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
            categoryId={categoryId}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate

import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import FeaturedProducts from "@modules/home/components/featured-products"

export default async function FeaturedSection({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  // 1. Fetch the region for pricing logic
  const region = await getRegion(countryCode)

  // 2. Fetch collections using your helper
  // We pass queryParams to limit the number of rails on the home page
  const { collections } = await listCollections({
    limit: "3",
  })

  return (
    <main>
      {/* Hero section would go here */}

      <div className="py-12">
        <h1>Hellooo</h1>
        <ul className="flex flex-col gap-y-12">
          {/* 3. Pass the data to the FeaturedProducts component */}
          <FeaturedProducts collections={collections} />
        </ul>
      </div>
    </main>
  )
}

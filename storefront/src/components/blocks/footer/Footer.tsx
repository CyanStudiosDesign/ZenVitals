import { Poppins, Noto_Serif_Georgian } from "next/font/google"
import {
  footerData,
  studioCard,
  legalLinks,
  iconsLink,
  copyrightText,
} from "lib/data/footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion"

// src/lib/data/footer.ts
import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export async function getCombinedFooterData() {
  // 1. Fetch dynamic data from Medusa
  const [{ collections }, productCategories] = await Promise.all([
    listCollections({ fields: "*products" }),
    listCategories(),
  ])

  // 2. Format Categories (Top-level only, sliced to 6)
  const categoryItems = (productCategories || [])
    .filter((c: any) => !c.parent_category)
    .slice(0, 6)
    .map((c: any) => ({
      title: c.name,
      link: `/categories/${c.handle}`,
      // Note: If you need to support nested children in your new map,
      // you can add a 'children' array here.
    }))

  // 3. Format Collections (Sliced to 6)
  const collectionItems = (collections || []).slice(0, 6).map((c: any) => ({
    title: c.title,
    link: `/collections/${c.handle}`,
  }))

  // 4. Create new sections for the footer
  const dynamicSections = []

  if (categoryItems.length > 0) {
    dynamicSections.push({
      heading: "Categories",
      items: categoryItems,
    })
  }

  if (collectionItems.length > 0) {
    dynamicSections.push({
      heading: "Collections",
      items: collectionItems,
    })
  }

  // 5. Append dynamicsections to static data
  return [...footerData, ...dynamicSections]
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})
const notoSerifGeorgian = Noto_Serif_Georgian({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})
const Footer = async () => {
  const footerData = await getCombinedFooterData()
  return (
    <footer
      className={`${poppins.className} w-full min-h-[calc(100vh-30rem)] bg-black`}
    >
      <section className="flex flex-col md:flex-row justify-between px-4 py-16">
        <div className="text-white flex md:block justify-center">
          <img src="/logo-w.png" alt="" className="w-64" />
        </div>
        {/*RIGHT */}
        {/* Accordion sections */}
        <Accordion className="flex flex-col px-8 md:hidden">
          {footerData.map((column) => (
            <AccordionItem
              key={column.heading}
              value={column.heading}
              className="border-b border-zinc-800"
            >
              <AccordionTrigger className="w-full flex justify-between items-center py-5 text-white text-lg">
                <span>{column.heading}</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4 pb-5 text-white">
                  {column.items.map((item: any) => (
                    <LocalizedClientLink
                      key={item.title}
                      href={item.link}
                      className="hover:underline cursor-pointer"
                    >
                      {item.title}
                    </LocalizedClientLink>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Mobile Footer */}
        <div className=" lg:columns-3 md:columns-2 hidden md:block gap-16 w-[60%] ">
          {footerData.map((column) => (
            <div
              key={column.heading}
              className="flex flex-col break-inside-avoid "
            >
              <p className="text-zinc-500 text-xs mb-4 mt-8">
                {column.heading}
              </p>
              <div className="flex flex-col gap-5 text-white text-md ">
                {column.items.map((item: any) => (
                  <LocalizedClientLink
                    key={item.title}
                    href={item.link}
                    className="hover:underline cursor-pointer"
                  >
                    {item.title}
                  </LocalizedClientLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="flex flex-col md:flex-row justify-between items-center px-10 my-8 w-full gap-8">
        {/* cyanstudios card */}
        <a
          href={studioCard.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto"
        >
          <div className="group bg-zinc-900 rounded-3xl px-4 py-4 w-full md:w-[320px] flex items-center mt-10 md:mt-0 justify-between hover:bg-white transition cursor-pointer">
            {/* Left side */}
            <div className="flex items-center gap-4 h-14 pl-8">
              {/* Imagees 
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden">
                <Image
                  src={studioCard.image}
                  alt={studioCard.name}
                  fill
                  className="object-cover"
                />
              </div>*/}

              {/* cyan studios textt */}
              <div className="flex flex-col gap-1">
                <h3
                  className={`${notoSerifGeorgian.className} text-white text-2xl font-bold leading-none group-hover:text-zinc-800 transition`}
                >
                  {studioCard.name}
                </h3>

                <p className="text-zinc-500 text-xs mt-1 pl-2 group-hover:text-zinc-400 transition">
                  {studioCard.description}
                </p>
              </div>
            </div>

            {/* Rightt icons send  */}
            <div className="text-white group-hover:text-zinc-900 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 19 22"
                className="w-6 h-6"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M18 14v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="m11 13 6.5-6.5"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.5 6H18v4.5"
                />
              </svg>
            </div>
          </div>
        </a>
        <div className="flex gap-3 items-center justify-center">
          {/* Facebook */}
          <a
            href={iconsLink.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-white transition cursor-pointer group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5 text-white group-hover:text-zinc-800 transition"
              >
                <path
                  fill="currentColor"
                  d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                />
              </svg>
            </span>
          </a>
          {/* X / Twitter */}
          <a href={iconsLink.X} target="_blank" rel="noopener noreferrer">
            <span className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center  cursor-pointer group hover:bg-white transition ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                className="h-5 w-5 text-white group-hover:text-zinc-800 transition"
              >
                <path
                  fill="currentColor"
                  d="M11.905 8.47 19.35 0h-1.764L11.12 7.353 5.956 0H0l7.809 11.12L0 20h1.764l6.827-7.766L14.044 20H20M2.4 1.302h2.71l12.476 17.46h-2.71"
                />
              </svg>
            </span>
          </a>
          {/* Instagram */}
          <a
            href={iconsLink.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center cursor-pointer group hover:bg-white transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5 text-white group-hover:text-zinc-800 transition"
              >
                <path
                  fill="currentColor"
                  d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0m0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* Legal section */}
      <div className="px-10 pb-10 pt-20 ">
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-white text-sm mb-6">
          {legalLinks.map((privacy: any) => (
            <a
              key={privacy.title}
              href={privacy.link}
              className="hover:underline cursor-pointer"
            >
              {privacy.title}
            </a>
          ))}
        </div>
        <p className="text-zinc-400 text-sm">{copyrightText}</p>
      </div>
    </footer>
  )
}

export default Footer

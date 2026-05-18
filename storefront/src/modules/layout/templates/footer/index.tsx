import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

// --- Sub-components for better readability ---

const FooterSection = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div className="flex flex-col gap-y-2">
    <span className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
      {title}
    </span>
    {children}
  </div>
)

const FooterLink = ({
  href,
  children,
  isExternal = false,
  className = "",
}: any) => {
  const baseStyles = "hover:text-gray-900 transition-colors duration-150"

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`${baseStyles} ${className}`}
      >
        {children}
      </a>
    )
  }

  return (
    <LocalizedClientLink href={href} className={`${baseStyles} ${className}`}>
      {children}
    </LocalizedClientLink>
  )
}

// --- Main Component ---

export default async function Footer() {
  const [{ collections }, productCategories] = await Promise.all([
    listCollections({ fields: "*products" }),
    listCategories(),
  ])

  return (
    <footer className="border-t border-gray-200 w-full bg-white">
      <div className="max-w-360 mx-auto px-6 flex flex-col w-full">
        <div className="flex flex-col gap-y-10 sm:flex-row items-start justify-between py-20">
          {/* Brand Logo */}
          <div className="flex-1">
            <LocalizedClientLink
              href="/"
              className="text-xl font-bold text-gray-700 hover:text-gray-900 uppercase tracking-tighter"
            >
              <img src="/WLogo.png" className="h-20"></img>
            </LocalizedClientLink>
          </div>

          {/* Links Grid */}
          <div className="text-sm text-gray-500 gap-10 md:gap-x-24 grid grid-cols-2 sm:grid-cols-3">
            {/* Categories */}
            {productCategories?.length > 0 && (
              <FooterSection title="Categories">
                <ul
                  className="flex flex-col gap-y-2"
                  data-testid="footer-categories"
                >
                  {productCategories
                    .slice(0, 6)
                    .filter((c) => !c.parent_category)
                    .map((c) => (
                      <li key={c.id} className="flex flex-col gap-y-1">
                        <FooterLink
                          href={`/categories/${c.handle}`}
                          className={
                            c.category_children?.length
                              ? "font-bold text-gray-800"
                              : ""
                          }
                        >
                          {c.name}
                        </FooterLink>

                        {c.category_children && (
                          <ul className="flex flex-col ml-3 gap-y-1 border-l border-gray-100 pl-3">
                            {c.category_children.map((child) => (
                              <li key={child.id}>
                                <FooterLink
                                  href={`/categories/${child.handle}`}
                                >
                                  {child.name}
                                </FooterLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                </ul>
              </FooterSection>
            )}

            {/* Collections */}
            {collections?.length > 0 && (
              <FooterSection title="Collections">
                <ul
                  className={`grid gap-2 ${
                    collections.length > 3
                      ? "grid-cols-1 lg:grid-cols-2"
                      : "grid-cols-1"
                  }`}
                >
                  {collections.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <FooterLink href={`/collections/${c.handle}`}>
                        {c.title}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </FooterSection>
            )}

            {/* Resources */}
            <FooterSection title="Resources">
              <ul className="flex flex-col gap-y-2">
                <li>
                  <FooterLink href="#" isExternal>
                    Instagram
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="#" isExternal>
                    FAQs
                  </FooterLink>
                </li>
              </ul>
            </FooterSection>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row w-full mb-10 justify-between items-center border-t border-gray-100 pt-8 text-gray-400 gap-y-4">
          <p className="text-xs">
            © {new Date().getFullYear()} ZenVitals. All rights reserved.
          </p>
          <p className="flex gap-x-2 txt-compact-small-plus items-center">
            Developed by Cyan Studios
          </p>
        </div>
      </div>
    </footer>
  )
}

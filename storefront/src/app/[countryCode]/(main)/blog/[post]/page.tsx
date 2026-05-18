"use client"
import { useState, useEffect } from "react"
import Image from "next/image"

// Mock Data for the Blog Post
const POST = {
  title: "Does Shilajit Actually Increase Testosterone Levels?",
  category: "Testosterone",
  author: "Daniel Yetman",
  reviewer: "Darragh O'Carroll, MD",
  publishedAt: "01/08/2026",
  sections: [
    {
      id: "what-is-shilajit",
      title: "What is Shilajit?",
      content: `Shilajit is a sticky, tar-like substance found primarily in the rocks of the Himalayas. It develops over centuries from the slow decomposition of plants. Traditionally used in Ayurvedic medicine, it contains over 84 minerals and is extremely high in fulvic acid.`,
    },
    {
      id: "testosterone-science",
      title: "The Science of Testosterone",
      content: `Clinical studies have observed that purified Shilajit can increase total testosterone, free testosterone, and dehydroepiandrosterone (DHEAS). It works by stimulating the Leydig cells in the testes to produce more testosterone naturally rather than introducing synthetic hormones.`,
    },
    {
      id: "potential-risks",
      title: "Potential Risks & Purity",
      content: `Raw Shilajit may contain heavy metal ions, free radicals, fungus, and other contaminates. Always ensure your supplement is purified and lab-tested for heavy metals like mercury and lead.`,
    },
    {
      id: "conclusion",
      title: "Final Verdict",
      content: `While evidence is growing, Shilajit is most effective when paired with a lifestyle that supports hormonal health: proper sleep, resistance training, and a balanced diet.`,
    },
  ],
}

export default function BlogPost() {
  const [activeSection, setActiveSection] = useState<string>(
    POST.sections[0].id
  )

  const sectionIds = POST.sections.map((s) => s.id)

  // --- Scroll Spy Logic (The Scanning Strip) ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        threshold: 0,
        rootMargin: "-15% 0px -70% 0px", // Same narrow strip for perfect bi-directional tracking
      }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="max-w-7xl mx-auto pb-20 px-4 mt-12 lg:mt-20">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* --- 1. STICKY SIDEBAR NAVIGATION --- */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-28">
            <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase mb-8">
              Content
            </p>
            <nav className="flex flex-col gap-y-5 border-l border-zinc-100">
              {POST.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`pl-5 text-left text-sm font-medium transition-all border-l-2 -ml-[2px] outline-none ${
                    activeSection === section.id
                      ? "border-zinc-900 text-zinc-900"
                      : "border-transparent text-zinc-400 hover:text-zinc-600"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* --- 2. MAIN BLOG CONTENT --- */}
        <main className="flex-1 max-w-2xl mx-auto lg:mx-0">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-3 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-10">
            <span>Home</span>
            <span className="text-zinc-200">/</span>
            <span className="text-zinc-900">{POST.category}</span>
          </nav>

          <header className="mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 font-outfit leading-[1.05] tracking-tight mb-10">
              {POST.title}
            </h1>

            {/* Author Meta (Hims Layout) */}
            <div className="flex items-center gap-4 mb-10 border-b border-zinc-100 pb-10">
              <div className="w-12 h-12 bg-zinc-100 rounded-full overflow-hidden relative">
                {/* Replace with real Image component */}
                <div className="w-full h-full bg-zinc-200" />
              </div>
              <div className="text-[11px] leading-relaxed">
                <p className="text-zinc-400 uppercase font-bold tracking-tight">
                  Reviewed by{" "}
                  <span className="text-zinc-900">{POST.reviewer}</span>
                </p>
                <p className="text-zinc-400 font-medium">
                  Written by {POST.author} • Published {POST.publishedAt}
                </p>
              </div>
            </div>

            {/* Key Takeaways Highlight */}
            <div className="bg-zinc-50 rounded-[2.5rem] p-8 lg:p-10 border border-zinc-100">
              <h4 className="text-sm font-bold text-zinc-900 mb-4 uppercase tracking-tight">
                Key Takeaways:
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-4 text-zinc-600 text-base leading-relaxed">
                  <span className="text-black font-black">•</span>
                  <span>
                    Purified shilajit is traditionally used for hormonal
                    support.
                  </span>
                </li>
                <li className="flex gap-4 text-zinc-600 text-base leading-relaxed">
                  <span className="text-black font-black">•</span>
                  <span>
                    Lab testing for purity is critical due to heavy metal risks.
                  </span>
                </li>
              </ul>
            </div>
          </header>

          {/* Article Sections */}
          <div className="space-y-24">
            {POST.sections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-32"
              >
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 font-outfit tracking-tight">
                  {section.title}
                </h3>
                <div className="prose prose-zinc prose-lg max-w-none text-gray-800 leading-relaxed">
                  {section.content}
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>

      {/* --- 3. FLOATING CTA POPUP (Bottom Right) --- */}
      <div className="fixed bottom-8 right-8 z-50 animate-[slideUp_0.5s_ease-out]">
        <div className="bg-white border border-zinc-100 shadow-2xl rounded-3xl p-4 flex items-center gap-5 max-w-sm">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-3xl">
            🪨
          </div>
          <div className="flex-1">
            <h5 className="text-sm font-bold text-zinc-900">Slowing down?</h5>
            <p className="text-[10px] text-zinc-400 font-medium">
              Boost natural energy with Shilajit.
            </p>
            <div className="mt-2 flex gap-2">
              <button className="px-4 py-1.5 bg-black text-white text-[10px] font-bold rounded-full">
                Shop Now
              </button>
              <button className="px-4 py-1.5 bg-zinc-100 text-zinc-600 text-[10px] font-bold rounded-full">
                Learn
              </button>
            </div>
          </div>
          <button className="absolute -top-2 -right-2 bg-white border shadow-sm rounded-full w-6 h-6 text-zinc-400 text-xs hover:text-zinc-900">
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}

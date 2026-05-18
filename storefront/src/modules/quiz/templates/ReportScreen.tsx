"use client"
import { useState, useEffect, useRef } from "react"
import { generateNarrativeReport, getRecommendations } from "../utils/engine"

interface ReportScreenProps {
  answers: any
  data?: {
    recommendations?: any[]
    vitality_score?: number
    deficiencies?: any[]
  }
}

export function ReportScreen({ answers, data }: ReportScreenProps) {
  const [activeSection, setActiveSection] = useState<string>("")

  const narrative = generateNarrativeReport(answers || {})
  const recommendations =
    data?.recommendations || getRecommendations(answers || {})
  const score = data?.vitality_score || 0

  // Combine narrative IDs and the Protocol ID for the sidebar
  const sectionIds = [...narrative.map((s) => s.category), "protocol"]

  // --- Scroll Spy Logic ---
  // --- Updated Scroll Spy Logic ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // We only want to trigger when the section enters the "Active Zone"
          // which we've defined as a strip near the top of the screen.
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        // threshold: 0 means "trigger as soon as one pixel enters the margin"
        threshold: 0,
        // rootMargin: top right bottom left
        // -15% from top: The trigger starts 15% down the screen
        // -70% from bottom: The trigger ends 30% from the top
        // This creates a "scanning strip" that works perfectly in both directions.
        rootMargin: "-15% 0px -70% 0px",
      }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [narrative, sectionIds])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="w-full mx-auto pb-20 px-4 mt-10">
      <div className="flex flex-col justify-between lg:flex-row gap-16">
        {/* 1. STICKY SIDEBAR (Hims Design) */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <p className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase mb-6">
              Content
            </p>
            <nav className="flex flex-col gap-y-4 border-l border-zinc-100">
              {narrative.map((section) => (
                <button
                  key={section.category}
                  onClick={() => scrollTo(section.category)}
                  className={`pl-4 text-left text-sm font-medium transition-all border-l-2 -ml-[2px] ${
                    activeSection === section.category
                      ? "border-zinc-900 text-zinc-900"
                      : "border-transparent text-zinc-400 hover:text-zinc-600"
                  }`}
                >
                  {section.title}
                </button>
              ))}
              <button
                onClick={() => scrollTo("protocol")}
                className={`pl-4 text-left text-sm font-medium transition-all border-l-2 -ml-[2px] ${
                  activeSection === "protocol"
                    ? "border-zinc-900 text-zinc-900"
                    : "border-transparent text-zinc-400 hover:text-zinc-600"
                }`}
              >
                Recommended Protocol
              </button>
            </nav>
          </div>
        </aside>

        {/* 2. MAIN CONTENT AREA */}
        <div className="flex-1 max-w-3xl">
          {/* Breadcrumbs (Hims style) */}
          <nav className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-8">
            <span className="text-zinc-900">Analysis Report</span>
          </nav>

          <header className="mb-12">
            <h1 className="text-5xl font-bold text-gray-900 font-outfit leading-[1.1] tracking-tight mb-6">
              Your Personalized <br /> Vitality Analysis.
            </h1>

            {/* Vitality Score "Key Takeaway" box */}
            <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100">
              <h4 className="text-sm font-bold text-zinc-900 mb-4 uppercase tracking-tight">
                Vitality Summary:
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3 text-zinc-600 text-sm leading-relaxed">
                  <span className="text-black font-bold">•</span>
                  Your overall vitality score is{" "}
                  <strong className="text-zinc-900">{score}%</strong>.
                </li>
                <li className="flex gap-1 text-zinc-600 text-sm leading-relaxed">
                  <span className="text-black font-bold">•</span>
                  Analysis suggests
                  <strong className="text-zinc-900">
                    {narrative.length} primary areas
                  </strong>
                  of nutritional optimization.
                </li>
              </ul>
            </div>
          </header>

          {/* Blog Sections */}
          <div className="space-y-24">
            {narrative.map((section, i) => (
              <article
                key={section.category}
                id={section.category}
                className="scroll-mt-32"
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-8 font-outfit tracking-tight">
                  {section.title}
                </h3>

                <div className="prose prose-zinc max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6 italic border-l-4 border-zinc-200 pl-6">
                    {section.story}
                  </p>

                  <div className="text-gray-800 leading-relaxed text-lg space-y-6">
                    {section.analysis}
                  </div>

                  {/* Impact Highlight */}
                  <div className="mt-10 p-8 bg-zinc-50 rounded-[2rem] border border-zinc-100">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                      The Clinical Impact
                    </p>
                    <p className="text-zinc-700 leading-relaxed">
                      {section.impact}
                    </p>
                  </div>
                </div>
              </article>
            ))}

            {/* Protocol Section */}
            <section
              id="protocol"
              className="scroll-mt-32 pt-16 border-t border-zinc-100"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-8 font-outfit tracking-tight">
                Recommended Protocol
              </h3>
              <div className="grid gap-4">
                {recommendations.map((product: any) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-6 p-6 bg-white rounded-[2rem] border border-zinc-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="text-5xl">{product.emoji}</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {product.desc}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-600 font-bold text-lg">
                        ₹{product.price}
                      </p>
                      <button className="mt-2 text-[10px] font-bold text-zinc-400 uppercase hover:text-zinc-900">
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
        <aside className="hidden lg:block w-64 shrink-0"></aside>
      </div>
    </div>
  )
}

// modules/quiz/templates/LoadingScreen.tsx
import { useState, useEffect } from "react"

const STEPS = [
  "Analysing biomarker patterns…",
  "Mapping nutritional deficiencies…",
  "Cross-referencing supplement protocols…",
  "Generating your health report…",
]

export function LoadingScreen() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t = setInterval(
      () => setStep((s) => Math.min(s + 1, STEPS.length - 1)),
      900
    )
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
        <div className="absolute inset-0 border-4 border-emerald-600 rounded-full border-t-transparent animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-2xl">
          🧬
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 font-outfit mb-2">
        Generating Your Report
      </h3>
      <p className="text-sm text-gray-500 h-5 transition-all duration-500">
        {STEPS[step]}
      </p>
    </div>
  )
}

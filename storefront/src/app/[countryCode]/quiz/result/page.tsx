"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useQuizData } from "@modules/quiz/context/QuizContext"
import { ReportScreen } from "@modules/quiz/templates/ReportScreen"
import { ResultCard } from "@modules/quiz/components/ResultCard"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function ResultPage() {
  const { answers, resetQuiz } = useQuizData()
  const router = useRouter()

  const [history, setHistory] = useState<any[]>([])
  const [selectedReport, setSelectedReport] = useState<any | null>(null)

  useEffect(() => {
    const savedHistory = localStorage.getItem("quiz_reports_history")
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  const handleRetake = () => {
    resetQuiz()
    setSelectedReport(null)
    router.push("/quiz")
  }

  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  // --- SCENARIO 1: Viewing a specific historical report ---
  if (selectedReport) {
    return (
      <main className="px-4 py-10 w-full mx-auto">
        <div className="max-w-7xl mx-auto flex justify-between items-center mb-8 px-4">
          <button
            onClick={() => setSelectedReport(null)}
            className="text-[10px] font-bold text-zinc-400 hover:text-zinc-900 uppercase tracking-widest transition-colors"
          >
            ← Back to History
          </button>
          <LocalizedClientLink
            href="/"
            className="text-[10px] font-bold text-zinc-400 hover:text-zinc-900 uppercase tracking-widest transition-colors"
          >
            Home
          </LocalizedClientLink>
        </div>
        <ReportScreen answers={selectedReport.answers} data={selectedReport} />
      </main>
    )
  }

  // --- SCENARIO 2: Viewing current active quiz results ---
  if (Object.keys(answers).length > 0) {
    return (
      <main className="px-4 py-10 w-full mx-auto">
        <div className="max-w-7xl mx-auto flex justify-between items-center mb-8 px-4">
          <LocalizedClientLink
            href="/"
            className="text-[10px] font-bold text-zinc-400 hover:text-zinc-900 uppercase tracking-widest transition-colors"
          >
            ← Back to Home
          </LocalizedClientLink>
          <p className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-widest">
            Live Analysis • {formatTime(Date.now())}
          </p>
        </div>
        <ReportScreen answers={answers} />
      </main>
    )
  }

  // --- SCENARIO 3: History List ---
  if (history.length > 0) {
    return (
      <main className="px-4 py-10 max-w-2xl mx-auto">
        <header className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-outfit">
              Your Reports
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Review your past health analyses.
            </p>
          </div>
          <LocalizedClientLink
            href="/"
            className="text-[10px] font-bold text-zinc-400 border-b border-zinc-200 pb-1 hover:text-black transition-colors"
          >
            BACK HOME
          </LocalizedClientLink>
        </header>

        <div className="flex flex-col gap-8">
          {history.map((report) => (
            <ResultCard
              key={report.reportId}
              report={report}
              onClick={() => setSelectedReport(report)}
            />
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4">
          <button
            onClick={() => router.push("/quiz")}
            className="text-sm font-bold text-black hover:underline"
          >
            + Take a new health quiz
          </button>
        </div>
      </main>
    )
  }

  // --- SCENARIO 4: Completely empty ---
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="bg-zinc-50 p-10 rounded-[2.5rem] border border-dashed border-zinc-200 max-w-sm w-full">
        <p className="font-outfit text-zinc-500 mb-8">
          No health analyses found.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/quiz")}
            className="w-full bg-black text-white py-4 rounded-2xl font-bold text-sm shadow-xl hover:bg-zinc-800 transition-all active:scale-95"
          >
            Start Analysis
          </button>
          <LocalizedClientLink
            href="/"
            className="w-full py-4 rounded-2xl font-bold text-sm text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            Go to Homepage
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

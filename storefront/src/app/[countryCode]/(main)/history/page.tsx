"use client"
import { useState, useEffect } from "react"
import { ReportScreen } from "@modules/quiz/templates/ReportScreen"
import { ResultCard } from "@modules/quiz/components/ResultCard" // Import here
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function ReportsHistoryPage() {
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedReport, setSelectedReport] = useState<any | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("quiz_reports_history")
    if (saved) setHistory(JSON.parse(saved))
    setLoading(false)
  }, [])

  const handleDelete = (e: React.MouseEvent, reportId: string) => {
    e.stopPropagation()
    const updatedHistory = history.filter((r) => r.reportId !== reportId)
    setHistory(updatedHistory)
    localStorage.setItem("quiz_reports_history", JSON.stringify(updatedHistory))
  }

  if (loading) return null

  if (selectedReport) {
    return (
      <div className="w-full mx-auto py-12 px-4 animate-[fadeIn_0.3s_ease-out]">
        <button
          onClick={() => setSelectedReport(null)}
          className="mb-8 text-xs font-bold text-zinc-400 hover:text-zinc-900 flex items-center gap-2"
        >
          ← BACK TO HISTORY
        </button>
        <ReportScreen answers={selectedReport.answers} data={selectedReport} />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <header className="mb-12 flex justify-between items-end">
        <h1 className="text-3xl font-bold text-gray-900 font-outfit">
          History
        </h1>
        <LocalizedClientLink
          href="/quiz"
          className="text-[10px] font-bold text-zinc-400 border-b border-zinc-200 pb-1"
        >
          NEW ANALYSIS +
        </LocalizedClientLink>
      </header>

      {history.length > 0 ? (
        <div className="flex flex-col gap-8">
          {history.map((report) => (
            <ResultCard
              key={report.reportId}
              report={report}
              onClick={() => setSelectedReport(report)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-50 rounded-[3rem] border-2 border-dashed border-zinc-100">
          <p className="text-zinc-400 font-medium">Your archive is empty.</p>
        </div>
      )}
    </div>
  )
}

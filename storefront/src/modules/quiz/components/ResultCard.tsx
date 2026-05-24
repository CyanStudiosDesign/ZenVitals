"use client"
import React from "react"

interface ResultCardProps {
  report: any
  onClick: () => void
  onDelete?: (e: React.MouseEvent, id: string) => void
}

export const ResultCard = ({ report, onClick, onDelete }: ResultCardProps) => {
  // Logic extracted for consistency
  const getThemeColor = (concerns: string[]) => {
    if (concerns.includes("hair"))
      return "bg-sky-50 text-sky-600 border-sky-100"
    if (concerns.includes("stress"))
      return "bg-pink-50 text-pink-600 border-pink-100"
    if (concerns.includes("testosterone"))
      return "bg-violet-50 text-violet-600 border-violet-100"
    return "bg-orange-50 text-orange-600 border-orange-100"
  }
  // Logic to check if the timestamp matches the current calendar day
  const isToday = (ts: number) => {
    const date = new Date(ts)
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }
  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  const formatDate = (ts: number) =>
    new Date(ts)
      .toLocaleDateString([], { day: "2-digit", month: "short" })
      .toUpperCase()

  const theme = getThemeColor(report.concerns || [])

  return (
    <div
      onClick={onClick}
      className="relative group cursor-pointer transition-all duration-300 active:scale-[0.98] w-full"
    >
      {/* Dashed Border Container */}
      <div className="absolute -inset-2 border-2 border-dashed border-zinc-100 rounded-[2.5rem] -z-10 group-hover:border-zinc-200 transition-colors" />

      {/* Main Card */}
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-zinc-100 overflow-hidden relative">
        {/* Subtle Accent Sidebar */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1.5 ${
            theme.split(" ")[0]
          }`}
        />

        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-zinc-400 tracking-tighter">
                {isToday(report.timestamp) ? "TODAY, " : ""}
                {formatDate(report.timestamp)}
              </span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 font-outfit capitalize">
              {report.concerns?.[0] || "Health"} & More
            </h3>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-zinc-300 tracking-widest">
              {formatTime(report.timestamp)}
            </span>
          </div>
        </div>

        {/* Tags / Chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(report.concerns || []).map((c: string) => (
            <span
              key={c}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${theme}`}
            >
              {c}
            </span>
          ))}
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight bg-zinc-100 text-zinc-500">
            {report.vitality_score}% Vitality
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-zinc-900 group-hover:translate-x-1 transition-transform">
            Explore report →
          </span>

          {/* Conditional Delete Button */}
          {onDelete && (
            <button
              onClick={(e) => onDelete(e, report.reportId)}
              className="p-2 rounded-full hover:bg-red-50 text-zinc-300 hover:text-red-400 transition-colors"
              title="Delete Report"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6.5m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2.5" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

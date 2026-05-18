interface ProgressBarProps {
  current: number // e.g., 3
  total: number // e.g., 10
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  // Calculate percentage for the bar width
  const pct = Math.round((current / total) * 100)

  return (
    <div className="w-full">
      {/* Progress Track */}
      <div className="w-full rounded-full h-1.5 bg-gray-200">
        {/* Fill Level */}
        <div
          className="h-1.5 rounded-full bg-black transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

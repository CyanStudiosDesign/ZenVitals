interface ProgressBarProps {
  current: number // e.g., 3
  total: number // e.g., 10
}

export function QuestionNumber({ current, total }: ProgressBarProps) {
  return (
    <div className="w-full mb-8">
      {/* Label Row */}
      <div className="flex justify-between text-xs font-medium mb-2 text-gray-500">
        <span className="font-mono tracking-widest uppercase">
          Question {current} of {total}
        </span>
      </div>
    </div>
  )
}

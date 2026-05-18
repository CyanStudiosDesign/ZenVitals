// modules/quiz/components/VitalityRing.tsx

interface VitalityRingProps {
  score: number
}

export function VitalityRing({ score }: VitalityRingProps) {
  const r = 54
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ

  // Dynamic color based on score
  const color = score >= 70 ? "#059669" : score >= 50 ? "#F59E0B" : "#EF4444"

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <svg
          width="140"
          height="140"
          viewBox="0 0 140 140"
          className="transform -rotate-90"
        >
          {/* Background Track */}
          <circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="10"
          />
          {/* Animated Progress Circle */}
          <circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={circ}
            style={{
              strokeDashoffset: offset,
              transition:
                "stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            strokeLinecap="round"
          />
        </svg>

        {/* Score Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold text-gray-900 font-outfit leading-none">
            {score}
          </span>
          <span className="text-[10px] font-bold text-gray-400 font-mono tracking-tighter mt-1">
            VITALITY
          </span>
        </div>
      </div>
    </div>
  )
}

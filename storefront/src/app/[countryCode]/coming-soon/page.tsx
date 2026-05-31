"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useEffect, useState } from "react"

const LAUNCH_DATE = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)

function getTimeLeft() {
  const diff = LAUNCH_DATE.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function UnderConstruction() {
  const [time, setTime] = useState(getTimeLeft())
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const handleSubmit = () => {
    if (email.trim()) {
      setSubmitted(true)
      setEmail("")
    }
  }

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden ">
      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #374151 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Orange glow blob — top center */}
      <div className="pointer-events-none absolute top-[-160px] left-1/2 -translate-x-1/2 w-[600px] h-[320px] rounded-full bg-orange-400 opacity-[0.12] blur-[100px]" />

      {/* Caution tape strips */}
      <div className="absolute top-0 left-0 w-full h-6 bg-[repeating-linear-gradient(90deg,#f97316_0px,#f97316_32px,#ffffff_32px,#ffffff_64px)] opacity-90" />
      <div className="absolute bottom-0 left-0 w-full h-6 bg-[repeating-linear-gradient(90deg,#ffffff_0px,#ffffff_32px,#f97316_32px,#f97316_64px)] opacity-90" />

      {/* Main card */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span className="text-xs tracking-[0.3em] uppercase border border-orange-400/60 text-orange-500 px-4 py-1.5 rounded-full bg-orange-50">
            Site Under Construction
          </span>
        </div>

        {/* SVG Illustration */}
        <div className="flex justify-center mb-10">
          <svg
            viewBox="0 0 320 220"
            width="320"
            height="220"
            aria-label="Construction illustration with crane, building, and hard hat"
          >
            {/* Ground */}
            <rect x="0" y="185" width="320" height="35" fill="#f3f4f6" />
            <rect x="0" y="183" width="320" height="4" fill="#e5e7eb" />

            {/* Building skeleton floors — upper (dashed/incomplete) */}
            {[140, 110, 80, 50].map((y, i) => (
              <g key={i}>
                <rect
                  x="70"
                  y={y}
                  width="120"
                  height="28"
                  rx="1"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="1.5"
                  strokeDasharray={i === 0 ? "0" : "4 3"}
                  opacity={i === 0 ? 1 : 0.45 + i * 0.1}
                />
                <line
                  x1="110"
                  y1={y}
                  x2="110"
                  y2={y + 28}
                  stroke="#f97316"
                  strokeWidth="0.8"
                  opacity="0.25"
                />
                <line
                  x1="150"
                  y1={y}
                  x2="150"
                  y2={y + 28}
                  stroke="#f97316"
                  strokeWidth="0.8"
                  opacity="0.25"
                />
              </g>
            ))}

            {/* Completed lower floors */}
            <rect
              x="70"
              y="140"
              width="120"
              height="44"
              rx="1"
              fill="#fff7ed"
              stroke="#f97316"
              strokeWidth="1.5"
            />
            <rect
              x="84"
              y="150"
              width="20"
              height="24"
              rx="1"
              fill="#f97316"
              opacity="0.18"
            />
            <rect
              x="116"
              y="150"
              width="20"
              height="24"
              rx="1"
              fill="#f97316"
              opacity="0.18"
            />
            <rect
              x="150"
              y="150"
              width="20"
              height="24"
              rx="1"
              fill="#f97316"
              opacity="0.18"
            />

            {/* Scaffolding left */}
            <line
              x1="58"
              y1="40"
              x2="58"
              y2="185"
              stroke="#9ca3af"
              strokeWidth="2"
            />
            <line
              x1="70"
              y1="40"
              x2="70"
              y2="185"
              stroke="#9ca3af"
              strokeWidth="2"
            />
            {[55, 80, 110, 140, 168].map((y) => (
              <line
                key={y}
                x1="58"
                y1={y}
                x2="70"
                y2={y}
                stroke="#9ca3af"
                strokeWidth="1.5"
              />
            ))}
            {[55, 80, 110, 140, 168].map((y, i) =>
              i % 2 === 0 ? (
                <line
                  key={y}
                  x1="58"
                  y1={y}
                  x2="70"
                  y2={y + 25}
                  stroke="#9ca3af"
                  strokeWidth="0.8"
                  opacity="0.5"
                />
              ) : (
                <line
                  key={y}
                  x1="70"
                  y1={y}
                  x2="58"
                  y2={y + 25}
                  stroke="#9ca3af"
                  strokeWidth="0.8"
                  opacity="0.5"
                />
              )
            )}

            {/* Scaffolding right */}
            <line
              x1="190"
              y1="40"
              x2="190"
              y2="185"
              stroke="#9ca3af"
              strokeWidth="2"
            />
            <line
              x1="202"
              y1="40"
              x2="202"
              y2="185"
              stroke="#9ca3af"
              strokeWidth="2"
            />
            {[55, 80, 110, 140, 168].map((y) => (
              <line
                key={y}
                x1="190"
                y1={y}
                x2="202"
                y2={y}
                stroke="#9ca3af"
                strokeWidth="1.5"
              />
            ))}

            {/* Crane mast */}
            <rect x="228" y="40" width="8" height="145" rx="1" fill="#d1d5db" />
            {/* Crane arm */}
            <rect x="160" y="36" width="120" height="7" rx="2" fill="#e5e7eb" />
            <rect x="236" y="36" width="44" height="7" rx="2" fill="#d1d5db" />
            <rect x="272" y="20" width="12" height="24" rx="2" fill="#d1d5db" />

            {/* Crane cables */}
            <line
              x1="200"
              y1="43"
              x2="200"
              y2="75"
              stroke="#9ca3af"
              strokeWidth="1"
            />
            <line
              x1="215"
              y1="43"
              x2="215"
              y2="75"
              stroke="#9ca3af"
              strokeWidth="1"
            />
            <rect x="196" y="75" width="22" height="10" rx="2" fill="#d1d5db" />
            <path
              d="M207 85 Q207 96 215 96 Q215 88 207 88"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="1.5"
            />

            {/* Crane brace lines */}
            {[80, 110, 140, 162].map((y, i) =>
              i % 2 === 0 ? (
                <line
                  key={y}
                  x1="228"
                  y1={y}
                  x2="236"
                  y2={y + 22}
                  stroke="#e5e7eb"
                  strokeWidth="0.8"
                />
              ) : (
                <line
                  key={y}
                  x1="236"
                  y1={y}
                  x2="228"
                  y2={y + 22}
                  stroke="#e5e7eb"
                  strokeWidth="0.8"
                />
              )
            )}

            {/* Hard hat */}
            <ellipse cx="38" cy="181" rx="16" ry="5" fill="#e5e7eb" />
            <ellipse cx="38" cy="175" rx="15" ry="9" fill="#f97316" />
            <rect x="23" y="178" width="30" height="4" rx="1" fill="#ea580c" />
            <rect
              x="34"
              y="168"
              width="8"
              height="6"
              rx="1"
              fill="#fdba74"
              opacity="0.7"
            />

            {/* Bricks */}
            {[
              [14, 179],
              [20, 174],
              [10, 174],
              [16, 169],
            ].map(([x, y], i) => (
              <rect
                key={i}
                x={x}
                y={y}
                width="18"
                height="7"
                rx="1"
                fill="#fed7aa"
                stroke="#fb923c"
                strokeWidth="0.5"
              />
            ))}

            {/* Sparkles */}
            {[
              [96, 42],
              [130, 30],
              [168, 48],
            ].map(([x, y], i) => (
              <g key={i} opacity="0.65">
                <circle cx={x} cy={y} r="2" fill="#f97316" />
                <line
                  x1={x - 5}
                  y1={y}
                  x2={x + 5}
                  y2={y}
                  stroke="#f97316"
                  strokeWidth="0.8"
                />
                <line
                  x1={x}
                  y1={y - 5}
                  x2={x}
                  y2={y + 5}
                  stroke="#f97316"
                  strokeWidth="0.8"
                />
              </g>
            ))}

            {/* Progress bar under building */}
            <rect
              x="70"
              y="184"
              width="120"
              height="3"
              rx="1.5"
              fill="#e5e7eb"
            />
            <rect
              x="70"
              y="184"
              width="72"
              height="3"
              rx="1.5"
              fill="#f97316"
            />
          </svg>
        </div>

        {/* Headline */}
        <h1 className="text-center text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-3">
          Something big
          <br />
          <span className="text-orange-500">is being built.</span>
        </h1>

        <p className="text-center text-gray-400 text-sm sm:text-base leading-relaxed mb-10 max-w-md mx-auto">
          Our team is hard at work laying the foundation. We'll be live soon —
          hang tight and be the first to know.
        </p>

        <LocalizedClientLink href="/" className="flex justify-center mb-8">
          <span className="text-lg tracking-[0.3em] uppercase border-2 cursor-pointer hover:opacity-70 border-orange-400 text-orange-500 px-12 py-1.5 rounded-full bg-orange-50">
            Go back to home
          </span>
        </LocalizedClientLink>

        {/* Progress */}
        <div className="mt-10 max-w-sm mx-auto">
          <div className="flex justify-between text-[11px] text-gray-400 mb-2 tracking-wider uppercase">
            <span>Progress</span>
            <span>60%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            <div className="h-full w-[60%] bg-orange-500 rounded-full relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-orange-300 rounded-full shadow-[0_0_6px_#fb923c]" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

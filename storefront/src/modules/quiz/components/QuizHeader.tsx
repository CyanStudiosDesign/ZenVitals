"use client"

import Link from "next/link"
import { ProgressBar } from "../components/ProgressBar"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface QuizHeaderProps {
  currentStep: number
  totalSteps: number
}

export function QuizHeader({ currentStep, totalSteps }: QuizHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur-md border-b ">
      <div className="w-full mx-auto pt-4">
        {/* Top Row: Logo & Exit */}
        <div className="flex px-8 items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="font-bold text-2xl">
              <span className="italic font-light lowercase">zen</span>Vitals
            </div>
          </div>

          {/* Exit Button */}
          <LocalizedClientLink
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-red-500 transition-colors font-mono tracking-tight"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            EXIT
          </LocalizedClientLink>
        </div>

        {/* Bottom Row: Progress Bar (Only during Quiz) */}
        <div className="animate-[slideIn_0.3s_ease-out]">
          <ProgressBar current={currentStep} total={totalSteps} />
        </div>
      </div>
    </header>
  )
}

"use client"

import React, { useState } from "react"
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, X } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function QuizLandingPage() {
  const [hasStarted, setHasStarted] = useState(false)

  return (
    <div className="relative min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-6">
      {/* Top Navigation / Exit Button */}
      <div className="absolute top-8 left-0 w-full px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* Optional: Add a small logo or step indicator here */}
        </div>

        <LocalizedClientLink
          href="/"
          className="group flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors duration-200"
        >
          <span className="text-xs font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            Exit
          </span>
          <div className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm group-hover:border-gray-300">
            <X className="w-5 h-5" />
          </div>
        </LocalizedClientLink>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mt-12">
        {/* Header Image or Icon Section */}
        <div className="bg-[#F3F4F6] py-12 flex justify-center">
          <div className="h-20 w-20 bg-white rounded-2xl shadow-sm flex items-center justify-center">
            <ShieldCheck className="w-10 h-10 text-gray-800" />
          </div>
        </div>

        <div className="p-8 md:p-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">
            Personalized Wellness Assessment
          </h1>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed">
            Take a 2-minute assessment to discover the right supplements and
            biological protocols tailored to your specific health goals.
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 border-y border-gray-50 py-8">
            <div className="flex flex-col items-center gap-2 text-center">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                2 Min Assessment
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <CheckCircle2 className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                Science-Backed
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <ShieldCheck className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                Privacy Focused
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <LocalizedClientLink
              href="/quiz/general"
              className="w-full bg-[#374151] hover:bg-[#1F2937] text-white font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg shadow-gray-200"
            >
              Start My Assessment
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </LocalizedClientLink>

            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
              Secure & Confidential
            </p>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-12 flex items-center gap-8 opacity-40 grayscale contrast-125">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-900">
          Clinical Grade
        </span>
        <div className="h-1 w-1 bg-gray-400 rounded-full" />
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-900">
          Expert Verified
        </span>
      </div>
    </div>
  )
}

// modules/quiz/components/GuestNameInput.tsx
"use client"

import { useState } from "react"
import Input from "@modules/common/components/input"

export default function GuestNameInput({
  onContinue,
}: {
  onContinue: (name: string) => void
}) {
  const [fullName, setFullName] = useState("")

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] justify-center flex flex-col items-center animate-in fade-in slide-in-from-right-4 duration-500">
      <h1 className="text-5xl md:text-6xl font-medium tracking-tight mb-2 font-outfit">
        Welcome,
      </h1>
      <h2 className="text-3xl md:text-4xl font-medium text-zinc-400 mb-12 font-outfit">
        What is your name?
      </h2>

      <div className="flex flex-col gap-y-4 max-w-md w-full">
        <Input
          label="Full Name"
          name="full_name"
          autoComplete="none"
          required
          onChange={(e) => setFullName(e.target.value)}
          icon={<UserIcon />}
        />

        <button
          onClick={() => onContinue(fullName)}
          disabled={!fullName.trim()}
          className="w-full mt-4 py-4 px-4 rounded-full font-semibold text-white transition-all active:scale-[0.98] bg-[#007AFF] disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

const UserIcon = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

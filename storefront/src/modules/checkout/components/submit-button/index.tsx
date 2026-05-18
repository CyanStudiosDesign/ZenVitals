"use client"

import React from "react"
import { useFormStatus } from "react-dom"

export function SubmitButton({
  children,
  variant = "primary",
  className = "",
  "data-testid": dataTestId,
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "transparent" | "danger" | null
  className?: string
  "data-testid"?: string
}) {
  const { pending } = useFormStatus()

  const base =
    "w-full flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary: "bg-black text-white hover:bg-gray-900",
    secondary: "border border-gray-300 text-gray-800 hover:bg-gray-100",
    transparent: "bg-transparent text-gray-700 hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  }

  return (
    <button
      type="submit"
      disabled={pending}
      data-testid={dataTestId}
      className={`${base} ${variants[variant || "primary"]} ${className}`}
    >
      {pending ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  )
}

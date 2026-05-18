"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

type ToastType = "success" | "error" | "info"

interface Toast {
  id: number
  message: string
  type: ToastType
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback(
    (message: string, type: ToastType = "success") => {
      const id = Date.now()
      setToasts((prev) => [...prev, { id, message, type }])

      // Auto-remove after 4 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 4000)
    },
    []
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-5 right-5 z-100 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// Internal Item Component for animations
const ToastItem = ({ toast }: { toast: Toast }) => {
  const bgStyles = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-zinc-900",
  }

  return (
    <div
      className={`${
        bgStyles[toast.type]
      } text-white px-6 py-3 rounded-xl shadow-lg 
      animate-in fade-in slide-in-from-right-4 duration-300 pointer-events-auto flex items-center gap-3`}
    >
      <span className="text-sm font-medium">{toast.message}</span>
    </div>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) throw new Error("useToast must be used within ToastProvider")
  return context
}

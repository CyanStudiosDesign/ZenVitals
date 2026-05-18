"use client"
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"

interface QuizContextType {
  answers: Record<string, any>
  setAnswers: (id: string, val: any) => void
  guestName: string
  setGuestName: (name: string) => void
  resetQuiz: () => void
  saveReportToHistory: (report: any) => void
}

export const QuizContext = createContext<QuizContextType | undefined>(undefined)

export function QuizProvider({ children }: { children: ReactNode }) {
  // 1. Initialize answers from storage (Progress persistence)
  const [answers, setAnswersState] = useState<Record<string, any>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("active_quiz_progress")
      return saved ? JSON.parse(saved) : {}
    }
    return {}
  })

  // guestName is kept purely in memory, not localStorage
  const [guestName, setGuestName] = useState<string>("")

  // 2. Auto-save progress to storage whenever answers change
  useEffect(() => {
    localStorage.setItem("active_quiz_progress", JSON.stringify(answers))
  }, [answers])

  const setAnswers = (id: string, val: any) => {
    setAnswersState((prev) => ({ ...prev, [id]: val }))
  }

  const resetQuiz = () => {
    setAnswersState({})
    setGuestName("")
    localStorage.removeItem("active_quiz_progress")
  }

  // 3. Finalize and Save to History using TimeStamp
  const saveReportToHistory = (report: any) => {
    if (typeof window === "undefined") return

    const history = JSON.parse(
      localStorage.getItem("quiz_reports_history") || "[]"
    )

    const reportEntry = {
      ...report,
      reportId: `report_${Date.now()}`, // Unique timestamp ID
      timestamp: new Date().getTime(),
    }

    // Keep the most recent 15 reports
    const updatedHistory = [reportEntry, ...history].slice(0, 15)
    localStorage.setItem("quiz_reports_history", JSON.stringify(updatedHistory))

    // Clear active progress once finalized
    localStorage.removeItem("active_quiz_progress")
  }

  return (
    <QuizContext.Provider
      value={{
        answers,
        setAnswers,
        guestName,
        setGuestName,
        resetQuiz,
        saveReportToHistory,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export const useQuizData = () => {
  const context = useContext(QuizContext)
  if (!context) throw new Error("useQuizData must be used within QuizProvider")
  return context
}

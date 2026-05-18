"use client"
import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  PRIMARY_QUESTION,
  QUESTION_BUNDLES,
  LIFESTYLE_QUESTIONS,
} from "@lib/data/quiz"
import { retrieveCustomer } from "@lib/data/customer"
import { useQuizData } from "../context/QuizContext"
import { compileFinalReport } from "../utils/engine" // Import your compiler

// Components
import { QuestionScreen } from "./QuestionScreen"
import { LoadingScreen } from "./LoadingScreen"
import GuestNameInput from "../components/GuestName"

export default function QuizManager() {
  const router = useRouter()
  const { answers, setAnswers, setGuestName, guestName, saveReportToHistory } =
    useQuizData()

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [showNameInput, setShowNameInput] = useState(false)
  const [phase, setPhase] = useState<"quiz" | "loading">("quiz")
  const [qIndex, setQIndex] = useState(0)

  // 1. Check Auth Status
  useEffect(() => {
    retrieveCustomer()
      .then((c) => {
        setIsLoggedIn(!!c)
        if (!c) setShowNameInput(true)
      })
      .catch(() => {
        setIsLoggedIn(false)
        setShowNameInput(true)
      })
  }, [])

  // 2. DYNAMIC QUEUE RECONSTRUCTION
  // This ensures that if the user refreshes, the queue is rebuilt from saved answers
  const queue = useMemo(() => {
    const newQueue = [PRIMARY_QUESTION]
    const selectedIssues = (answers.primary_concern as string[]) || []

    selectedIssues.forEach((issue) => {
      if (QUESTION_BUNDLES[issue]) {
        newQueue.push(...QUESTION_BUNDLES[issue])
      }
    })

    if (selectedIssues.length > 0) {
      newQueue.push(...LIFESTYLE_QUESTIONS)
    }

    return newQueue
  }, [answers.primary_concern])

  const handleAnswerChange = (id: string, value: any) => {
    setAnswers(id, value)
    // Queue now updates automatically via useMemo above
  }

  const handleNext = () => {
    if (qIndex < queue.length - 1) {
      setQIndex(qIndex + 1)
    } else {
      // --- THE FINALIZE STEP ---
      setPhase("loading")

      // 1. Compile the full Narrative/Product report
      const report = compileFinalReport(answers, guestName)

      // 2. Save it to localStorage history with a timestamp
      saveReportToHistory(report)

      // 3. Navigate after a short delay for the "Clinical" feel
      setTimeout(() => {
        const target = isLoggedIn
          ? "/quiz/result"
          : "/quiz/login?redirect=/quiz/result"
        router.push(target)
      }, 2500)
    }
  }

  if (isLoggedIn === null) return <LoadingScreen />

  return (
    <div className="min-h-screen">
      <main className=" w-full mx-auto">
        {showNameInput ? (
          <GuestNameInput
            onContinue={(name) => {
              setGuestName(name)
              setShowNameInput(false)
            }}
          />
        ) : phase === "quiz" ? (
          <QuestionScreen
            question={queue[qIndex]}
            answers={answers}
            onAnswer={handleAnswerChange}
            onNext={handleNext}
            onBack={() => setQIndex((i) => Math.max(0, i - 1))}
            isFirst={qIndex === 0}
            progress={{ current: qIndex + 1, total: queue.length }}
          />
        ) : (
          <LoadingScreen />
        )}
      </main>
    </div>
  )
}

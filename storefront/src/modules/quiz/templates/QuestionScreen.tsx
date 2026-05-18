// modules/quiz/templates/QuestionScreen.tsx
import { ProgressBar } from "../components/ProgressBar"
import { OptionButton } from "../components/OptionsButton"
import { QuestionNumber } from "../components/QuestionNumber"
import { QuizHeader } from "../components/QuizHeader"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface QuestionScreenProps {
  question: any
  answers: any
  onAnswer: (id: string, value: any) => void
  onNext: () => void
  onBack: () => void
  isFirst: boolean
  progress: { current: number; total: number }
}

export function QuestionScreen({
  question,
  answers,
  onAnswer,
  onNext,
  onBack,
  isFirst,
  progress,
}: QuestionScreenProps) {
  const currentVal = answers[question.id]
  const isMulti = question.type === "multi"

  const handleToggle = (val: string) => {
    if (isMulti) {
      const prev = currentVal || []
      const next = prev.includes(val)
        ? prev.filter((v: string) => v !== val)
        : [...prev, val]
      onAnswer(question.id, next)
    } else {
      onAnswer(question.id, val)
    }
  }

  const isSelected = (val: string) =>
    isMulti ? (currentVal || []).includes(val) : currentVal === val

  const canProceed = isMulti ? (currentVal || []).length > 0 : !!currentVal

  return (
    <div className="w-full flex flex-col items-center">
      <nav className="w-full flex flex-col mb-10">
        <div className="h-14 w-full flex px-10 items-center">
          <LocalizedClientLink
            href="/"
            className="text-zinc-400 hover:text-black"
          >
            Exit
          </LocalizedClientLink>
        </div>
        <ProgressBar current={progress.current} total={progress.total} />
      </nav>
      <div className="max-w-2xl w-full p-4 animate-[slideIn_0.4s_ease-out]">
        <QuestionNumber current={progress.current} total={progress.total} />

        <div className="mb-6">
          <h2 className="text-3xl font-medium text-gray-900 font-outfit">
            {question.text}
          </h2>
          <p className="text-sm text-gray-500">{question.sub}</p>
        </div>

        <div className="flex flex-col gap-3 mb-8">
          {question.options.map((opt: any) => (
            <OptionButton
              key={opt.value}
              option={opt}
              selected={isSelected(opt.value)}
              onClick={() => handleToggle(opt.value)}
            />
          ))}
        </div>

        <div className="flex items-center justify-between px-4">
          {!isFirst ? (
            <button
              onClick={onBack}
              className="text-sm font-medium text-gray-500 font-outfit"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={onNext}
            disabled={!canProceed}
            className={`px-8 py-3 rounded-full font-semibold text-sm transition-all font-outfit ${
              canProceed
                ? "bg-black text-white shadow-lg"
                : "bg-zinc-600 text-gray-200 cursor-not-allowed"
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}

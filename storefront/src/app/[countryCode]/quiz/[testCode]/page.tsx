import { retrieveCustomer } from "@lib/data/customer"
import QuizManager from "@modules/quiz/templates/QuizManager"
import { Outfit, DM_Mono } from "next/font/google"

// 1. Initialize Fonts using Next.js Font Optimization
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
})

export default async function QuizPage() {
  const customer = await retrieveCustomer().catch(() => null)

  return (
    <div className={`${outfit.variable} ${dmMono.variable} font-sans`}>
      {/* 2. Inject Animations via standard HTML Style tag */}
      <style>
        {`
          @keyframes quizSlideIn {
            from { opacity: 0; transform: translateY(18px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-quiz-slide {
            animation: quizSlideIn 0.5s ease-out forwards;
          }
        `}
      </style>

      {/* 3. Main Page Wrapper */}
      <div className="min-h-screen font-outfit">
        {/* The Hub */}
        <QuizManager />
      </div>
    </div>
  )
}

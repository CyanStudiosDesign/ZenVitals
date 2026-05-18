import { QuizProvider } from "@modules/quiz/context/QuizContext"

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // The Provider wraps everything within the /quiz directory
    // This allows /quiz/page.tsx and /quiz/result/page.tsx to share 'answers'
    <QuizProvider>
      <section className="min-h-screen bg-[#F5F5F7]">
        {/* You can add a global footer or shared sidebar here if needed */}
        {children}
      </section>
    </QuizProvider>
  )
}

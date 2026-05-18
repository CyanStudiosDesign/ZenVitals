// app/quiz/login/page.tsx
import LoginTemplate from "@modules/account/templates/login-template"

export default function QuizLoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F7]">
      <div className="w-full max-w-2xl px-6">
        <h2 className="text-center text-zinc-400 font-medium mb-4 font-outfit uppercase tracking-widest text-xs">
          Last Step: Save your results
        </h2>
        {/* Your reusable LoginTemplate */}
        <LoginTemplate />
      </div>
    </div>
  )
}

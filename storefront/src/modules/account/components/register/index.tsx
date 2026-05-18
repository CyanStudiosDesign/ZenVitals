"use client"

import { useActionState, useState, useContext } from "react" // 1. Added useContext
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { signup } from "@lib/data/customer"
import { useFormStatus } from "react-dom"
import { QuizContext } from "@modules/quiz/context/QuizContext" // 2. Import the Context directly
import GoogleAuthButton from "@modules/common/components/google-auth-btn"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
  redirectTo?: string
}

const Register = ({ setCurrentView, redirectTo }: Props) => {
  // 3. Use the raw context instead of the strict hook
  const quizContext = useContext(QuizContext)

  // 4. Safely extract guestName (fallback to empty string if outside QuizProvider)
  const guestName = quizContext?.guestName || ""

  const [fullName, setFullName] = useState(guestName || "")
  const [step, setStep] = useState(guestName ? 2 : 1)

  const [message, formAction] = useActionState(signup, null)
  const { pending } = useFormStatus()

  const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.29-8.16 2.29-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  )

  return (
    <div className="max-w-7xl p-4 w-full min-h-[calc(100vh-20rem)] flex flex-col items-center transition-all duration-500">
      <form className="w-full" action={formAction}>
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <input type="hidden" name="full_name" value={fullName} />

        {/* STEP 1: NAME */}
        <div
          className={`w-full mt-20 flex flex-col items-center ${
            step !== 1 ? "hidden" : "block"
          } animate-in fade-in slide-in-from-right-4 duration-500`}
        >
          <h1 className="text-6xl font-medium tracking-tight mb-2 font-outfit">
            Welcome,
          </h1>
          <h2 className="text-4xl font-medium text-zinc-400 mb-12 font-outfit">
            What is your name?
          </h2>

          <div className="flex flex-col gap-y-4 max-w-md w-full">
            <Input
              label="Full Name"
              name="full_name_display"
              required
              value={fullName}
              autoComplete="none"
              onChange={(e) => setFullName(e.target.value)}
              icon={<UserIcon />}
            />
            <button
              type="button"
              disabled={!fullName.trim()}
              onClick={() => setStep(2)}
              className="w-full mt-4 py-3 px-4 rounded-full font-semibold text-white bg-[#007AFF] transition-all active:scale-[0.98]"
            >
              Continue
            </button>
          </div>
        </div>

        {/* STEP 2: ACCOUNT */}
        <div
          className={`w-full animate-in fade-in slide-in-from-right-4 duration-500 ${
            step !== 2 ? "hidden" : "block"
          }`}
        >
          <h1 className="text-6xl font-medium tracking-tight mb-6 font-outfit">
            Create Account
          </h1>

          {/* Social Auth */}
          <div className="w-full flex gap-3 mb-6">
            <GoogleAuthButton redirectTo={redirectTo} />
          </div>

          <div className="w-[90%] h-0.5 bg-zinc-100 rounded-full mx-auto my-6" />

          <div className="flex flex-col w-full gap-y-4">
            <Input label="Email address" name="email" required type="email" />
            <Input label="Phone" name="phone" type="tel" />
            <Input label="Password" name="password" required type="password" />
          </div>

          <ErrorMessage error={message} />

          <div className="flex gap-2 w-full mt-4">
            {/* 5. Check if guestName exists in context to hide/show the back button */}
            {!guestName && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full py-3 px-4 rounded-full bg-zinc-800 text-white border border-zinc-200 transition-all active:scale-[0.98]"
              >
                Go back
              </button>
            )}
            <button
              type="submit"
              disabled={pending}
              className="w-full py-3 px-4 rounded-full font-semibold text-white bg-[#007AFF] transition-all active:scale-[0.98] flex items-center justify-center"
            >
              {pending ? "Creating..." : "Create Account"}
            </button>
          </div>
        </div>
      </form>

      <span className="text-center w-full text-sm mt-8">
        Already a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="font-bold underline"
        >
          Sign in
        </button>
      </span>
    </div>
  )
}
// ─── LOCAL ICON COMPONENTS ──────────────────────────────────────────────────

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

const EmailIcon = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="M2 8l10 6 10-6" />
  </svg>
)

const PhoneIcon = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.81 12.81 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
)

const LockIcon = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 018 0v4" />
  </svg>
)

const LoadingSpinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

export default Register

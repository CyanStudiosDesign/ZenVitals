"use client"

import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import GoogleAuthButton from "@modules/common/components/google-auth-btn"
import Input from "@modules/common/components/input"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
  redirectTo?: string // Add redirectTo to props
}

const Login = ({ setCurrentView, redirectTo }: Props) => {
  const [message, formAction] = useActionState(login, null)
  const { pending } = useFormStatus()

  return (
    <div
      className="max-w-7xl p-4 w-full flex flex-col items-start"
      data-testid="login-page"
    >
      <h1 className="text-6xl font-medium tracking-tight mb-6">Sign In</h1>
      <p className="text-zinc-700 mb-4 text-sm">Sign in with open account</p>

      <div className="w-full flex gap-3 mb-4">
        <GoogleAuthButton redirectTo={redirectTo} />
      </div>

      <div className="w-[90%] h-0.5 bg-zinc-100 rounded-full mx-auto my-4"></div>

      <p className="text-zinc-700 text-sm mb-8">
        Or continue with email address
      </p>

      <form className="w-full" action={formAction}>
        {/* Pass the redirect URL to the Login Server Action */}
        <input type="hidden" name="redirectTo" value={redirectTo} />

        <div className="flex flex-col w-full gap-y-4">
          <Input
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
            icon={<EmailIcon />}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            icon={<LockIcon />}
          />
        </div>

        <ErrorMessage error={message} data-testid="login-error-message" />

        <button
          type="submit"
          disabled={pending}
          data-testid="sign-in-button"
          className="w-full mt-6 py-3 px-4 rounded-full font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center bg-[#007AFF] text-[16px]"
        >
          {pending ? <LoadingSpinner /> : "Sign in"}
        </button>
      </form>

      <span className="text-center w-full text-sm mt-6">
        Don't have an account?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="font-bold underline"
          data-testid="register-button"
        >
          Sign up
        </button>
        .
      </span>
    </div>
  )
}

// Icons and Spinner extracted for cleaner code flow
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

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 814 1000" fill="currentColor">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 440.9 0 300.3 0 258.6c0-204.7 135.3-312.8 269.1-312.8 75.4 0 138.1 49.9 184.9 49.9 44.6 0 114.5-52.9 198.9-52.9 31.6 0 131.8 2.6 198.9 108.1zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
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
  <svg
    className="animate-spin h-5 w-5 text-white"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)

export default Login

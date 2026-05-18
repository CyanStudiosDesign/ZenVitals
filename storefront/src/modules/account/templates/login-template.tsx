"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")
  const searchParams = useSearchParams()

  // Look for ?redirect=/path in the URL, default to /account
  const redirectTo = searchParams.get("redirect") || "/account"

  return (
    <div className="w-full max-w-2xl mx-auto flex justify-center px-8 py-8">
      {currentView === "sign-in" ? (
        <Login setCurrentView={setCurrentView} redirectTo={redirectTo} />
      ) : (
        <Register setCurrentView={setCurrentView} redirectTo={redirectTo} />
      )}
    </div>
  )
}

export default LoginTemplate

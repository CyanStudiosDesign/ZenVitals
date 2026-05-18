"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { decodeToken } from "react-jwt"
import { sdk } from "@lib/config"
import { finalizeRegistration, setServerAuthToken } from "@lib/actions/auth"
import { useToast } from "@lib/context/toast-context"
// ... imports

export default function GoogleCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { showToast } = useToast()

  const queryParams = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  )

  useEffect(() => {
    let isMounted = true

    const validateCallback = async () => {
      try {
        // 1. Get the initial token from Google callback
        const token = await sdk.auth.callback("customer", "google", queryParams)

        if (token && isMounted) {
          sdk.client.setToken(token)
          const decoded = decodeToken(token) as any

          // 2. Check if this is a new registration (missing actor_id)
          if (!decoded.actor_id) {
            await sdk.store.customer.create({
              email: decoded.user_metadata.email,
              first_name: decoded.user_metadata.given_name || "Guest",
              last_name: decoded.user_metadata.family_name || "User",
            })
            showToast("Account created successfully! SignIn Again.", "success")

            // IMPORTANT: Give Medusa a moment to link the Auth Identity to the Customer
            await new Promise((res) => setTimeout(res, 800))
          }

          // 3. ALWAYS refresh the token after potential creation
          // This ensures the token now contains the new 'actor_id'
          const { token: refreshedToken } = await sdk.auth.refresh()

          const finalToken = refreshedToken || token

          // 4. Sync both the SDK and the Server Cookie
          sdk.client.setToken(finalToken)
          await setServerAuthToken(finalToken)

          // 5. Final redirect
          const destination =
            localStorage.getItem("post_login_redirect") || "/account"
          router.push(destination)
        }
      } catch (error) {
        if (isMounted) {
          console.error("Auth Failed", error)
          showToast("Login failed. Please try again.", "error")
          router.push("/account?error=failed")
        }
      }
    }

    validateCallback()
    return () => {
      isMounted = false
    }
  }, [queryParams])

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900" />
    </div>
  )
}

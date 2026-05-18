"use server"

import { cookies } from "next/headers"
import { sdk } from "@lib/config"
import { decodeToken } from "react-jwt"

export async function setServerAuthToken(token: string) {
  const cookieStore = await cookies()
  const decoded = decodeToken(token) as any

  console.log(`[Server Action] Setting Cookie. ActorID: "${decoded.actor_id}"`)

  await cookieStore.set("_medusa_jwt", token, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  })

  console.log(`[Server Action] Cookie set successfully.`)
}

export async function finalizeRegistration(initialToken: string) {
  const cookieStore = await cookies()

  // 1. Manually set the token for this specific server-side SDK call
  sdk.client.setToken(initialToken)
  const decoded = decodeToken(initialToken) as any

  try {
    // 2. Create the profile
    await sdk.store.customer.create({
      email: decoded.user_metadata.email,
      first_name: decoded.user_metadata.given_name || "Guest",
      last_name: decoded.user_metadata.family_name || "User",
    })

    // 3. Internal Refresh: The server waits for the sync
    // We do one immediate refresh attempt
    const { token: newToken } = await sdk.auth.refresh()

    if (newToken) {
      // 4. Set the FINAL cookie with path "/" and "lax"
      cookieStore.set("_medusa_jwt", newToken, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
      })
      return { success: true }
    }
  } catch (error) {
    console.error("Server-side registration error:", error)
    return { success: false }
  }
  return { success: false }
}

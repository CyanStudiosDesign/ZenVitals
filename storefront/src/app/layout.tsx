import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "../styles/globals.css"
import { ToastProvider } from "@lib/context/toast-context"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className="light">
      <body className="flex flex-col h-full">
        <ToastProvider>
          <main className="relative">{props.children}</main>
        </ToastProvider>
      </body>
    </html>
  )
}

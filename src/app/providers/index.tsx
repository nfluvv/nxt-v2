"use client"

import { Suspense, type PropsWithChildren } from "react"

import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"

import { QueryProvider } from "./query-provider"
import { ThemeProvider } from "./theme-provider"
import { TwaGuard } from "./twa-guard"
import { TelegramAutoLogin } from "./telegram-auto-login"
import { AppLoading } from "./app-loading"

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <SessionProvider>
        <QueryProvider>
          <TwaGuard>{children}</TwaGuard>
          <Suspense fallback={<AppLoading />}>
            <TelegramAutoLogin />
          </Suspense>
          <Toaster
            position="top-center"
            toastOptions={{
              className: "toast",
              duration: 3000,
            }}
          />
        </QueryProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}

"use client"

import { useSyncExternalStore } from "react"
import { AppLoading } from "./app-loading"

const IsDev = process.env.NODE_ENV === "development"

const subscribe = () => () => {}
const getSnapshot = () => Boolean(window.Telegram?.WebApp?.initData)
const getServerSnapshot = () => null

export function TwaGuard({ children }: { children: React.ReactNode }) {
  const isTelegram = useSyncExternalStore<boolean | null>(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )

  if (IsDev) return <>{children}</>

  if (isTelegram === null) {
    return <AppLoading />
  }

  if (!isTelegram) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-6 text-center">
        <h1 className="text-xl font-bold">
          This app is only available in Telegram 💎
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Please open this app via official bot link.
        </p>
      </div>
    )
  }

  return <>{children}</>
}

"use client"

import { useEffect, useSyncExternalStore } from "react"

const subscribe = () => () => {}
const getSnapshot = () => Boolean(window.Telegram?.WebApp?.initData)
const getServerSnapshot = () => null // unknown during SSR/hydration

export function TwaGuard({ children }: { children: React.ReactNode }) {
  const isTelegram = useSyncExternalStore<boolean | null>(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )

  useEffect(() => {
    if (isTelegram) {
      const tg = window.Telegram!.WebApp
      tg?.ready()
      tg?.expand()
    }
  }, [isTelegram])

  if (isTelegram === null) return <div>Loading...</div>

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

"use client"

import { useEffect, useRef } from "react"
import { signIn, useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "@/shared/i18n/navigation"

const safeNext = (v: string | null) =>
  v && v.startsWith("/") && !v.startsWith("//") ? v : "/dashboard"

async function getInitData(): Promise<string | null> {
  const real = window.Telegram?.WebApp?.initData
  if (real) return real

  if (process.env.NODE_ENV === "development") {
    const fromUrl = new URLSearchParams(location.search).get("mockUser")
    if (fromUrl) localStorage.setItem("mockUser", fromUrl)
    const id = localStorage.getItem("mockUser") ?? "1"

    const res = await fetch(`/api/dev/init-data?id=${id}`)
    return (await res.json()).initData
  }
  return null
}

export function TelegramAutoLogin() {
  const { status } = useSession()
  const router = useRouter()
  const next = safeNext(useSearchParams().get("next"))
  const started = useRef(false)

  useEffect(() => {
    window.Telegram?.WebApp?.ready()
    window.Telegram?.WebApp?.expand()

    if (status === "loading" || started.current) return
    started.current = true
    const wasLoggedIn = status === "authenticated"

    void (async () => {
      const initData = await getInitData()
      if (!initData) return

      const res = await signIn("telegram", { initData, redirect: false })
      if (res?.error) {
        started.current = false
        return
      }
      if (wasLoggedIn) router.refresh()
      else router.replace(next)
    })()
  }, [status, router, next])

  return null
}

"use client"

import { useEffect, useRef } from "react"
import { signIn, useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "@/shared/i18n/navigation"

const safeNext = (v: string | null) =>
  v && v.startsWith("/") && !v.startsWith("//") ? v : null

const HANDLED_KEY = "startParamHandled"

function getStartTarget(): string | null {
  if (sessionStorage.getItem(HANDLED_KEY)) return null

  const p = window.Telegram?.WebApp?.initDataUnsafe?.start_param
  const match = p ? /^deck_([A-Za-z0-9]{10,40})$/.exec(p) : null
  if (!match) return null

  sessionStorage.setItem(HANDLED_KEY, "1")
  return `/decks/${match[1]}`
}

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
    if (status === "loading" || started.current) return
    started.current = true

    void (async () => {
      const initData = await getInitData()
      if (!initData) return

      const res = await signIn("telegram", { initData, redirect: false })
      if (res?.error) {
        started.current = false
        return
      }

      const target = next ?? getStartTarget()
      if (target) router.replace(target)
      else router.refresh()
    })()
  }, [status, router, next])

  return null
}

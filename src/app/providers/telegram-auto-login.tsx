"use client"

import { useEffect, useRef } from "react"
import { signIn, useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "@/shared/i18n/navigation"

const safeNext = (v: string | null) =>
  v && v.startsWith("/") && !v.startsWith("//") ? v : "/dashboard"

export function TelegramAutoLogin() {
  const { status } = useSession()
  const router = useRouter()
  const next = safeNext(useSearchParams().get("next"))
  const started = useRef(false)

  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (!tg?.initData) return

    tg.ready()
    tg.expand()

    if (status !== "unauthenticated" || started.current) return
    started.current = true

    signIn("telegram", { initData: tg.initData, redirect: false }).then(
      (res) => {
        if (res?.error) {
          started.current = false
          return
        }
        router.replace(next)
      }
    )
  }, [status, router, next])

  return null
}

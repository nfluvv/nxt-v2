"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { Container, Loader } from "@/shared/client/ui"

export function AuthGate() {
  const t = useTranslations("auth")
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setTimedOut(true), 8000)
    return () => clearTimeout(id)
  }, [])

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-3 px-6 text-center">
      {timedOut ? (
        <>
          <p className="text-base font-medium">{t("openInTelegramTitle")}</p>
          <p className="text-sm text-muted-foreground">
            {t("openInTelegramDescription")}
          </p>
        </>
      ) : (
        <main>
          <Container className="flex items-center justify-center">
            <Loader />
          </Container>
        </main>
      )}
    </div>
  )
}

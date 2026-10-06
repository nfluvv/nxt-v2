"use client"

import { useEffect } from "react"
import { useThemeStore } from "@/features/toggle-theme/store/theme-store"

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const store = useThemeStore.getState()

    store.init()

    return () => {
      useThemeStore.getState().destroy()
    }
  }, [])

  return <>{children}</>
}

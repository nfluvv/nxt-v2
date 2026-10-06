"use client"

import { create } from "zustand"

export type Theme = "light" | "dark" | "system"
export type ResolvedTheme = "light" | "dark"

export type TelegramThemeParams = {
  bg_color?: string
  text_color?: string
  hint_color?: string
  link_color?: string
  button_color?: string
  button_text_color?: string
  secondary_bg_color?: string

  header_bg_color?: string
  accent_text_color?: string
  section_bg_color?: string
  section_header_text_color?: string
  subtitle_text_color?: string
  destructive_text_color?: string
}

type TelegramWebApp = {
  ready: () => void
  expand: () => void

  colorScheme: ResolvedTheme
  themeParams: TelegramThemeParams

  onEvent: (
    event: "themeChanged",
    callback: () => void
  ) => void

  offEvent: (
    event: "themeChanged",
    callback: () => void
  ) => void
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

const STORAGE_KEY = "theme"

const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === "undefined") {
    return "light"
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

const resolveTheme = (theme: Theme): ResolvedTheme => {
  if (theme === "system") {
    return getSystemTheme()
  }

  return theme
}

const applyResolvedTheme = (theme: ResolvedTheme) => {
  const root = document.documentElement

  root.classList.toggle("dark", theme === "dark")
  root.style.colorScheme = theme
}

const setCssVariable = (
  name: string,
  value: string | undefined
) => {
  if (!value) return

  document.documentElement.style.setProperty(name, value)
}

const applyTelegramTheme = (
  params: TelegramThemeParams
) => {
  setCssVariable("--background", params.bg_color)
  setCssVariable("--foreground", params.text_color)

  setCssVariable(
    "--card",
    params.section_bg_color ?? params.bg_color
  )

  setCssVariable(
    "--card-foreground",
    params.text_color
  )

  setCssVariable(
    "--popover",
    params.section_bg_color ?? params.bg_color
  )

  setCssVariable(
    "--popover-foreground",
    params.text_color
  )

  setCssVariable(
    "--primary",
    params.button_color
  )

  setCssVariable(
    "--primary-foreground",
    params.button_text_color
  )

  setCssVariable(
    "--secondary",
    params.secondary_bg_color
  )

  setCssVariable(
    "--secondary-foreground",
    params.text_color
  )

  setCssVariable(
    "--muted",
    params.secondary_bg_color
  )

  setCssVariable(
    "--muted-foreground",
    params.hint_color
  )

  setCssVariable(
    "--accent",
    params.secondary_bg_color
  )

  setCssVariable(
    "--accent-foreground",
    params.text_color
  )

  setCssVariable(
    "--border",
    params.hint_color
      ? `color-mix(in srgb, ${params.hint_color} 25%, transparent)`
      : undefined
  )

  setCssVariable(
    "--input",
    params.hint_color
      ? `color-mix(in srgb, ${params.hint_color} 25%, transparent)`
      : undefined
  )

  setCssVariable(
    "--ring",
    params.button_color
  )

  setCssVariable(
    "--link",
    params.link_color
  )

  setCssVariable(
    "--header",
    params.header_bg_color
  )

  setCssVariable(
    "--accent-text",
    params.accent_text_color
  )

  setCssVariable(
    "--section-header",
    params.section_header_text_color
  )

  setCssVariable(
    "--subtitle",
    params.subtitle_text_color
  )

  setCssVariable(
    "--destructive",
    params.destructive_text_color
  )

  setCssVariable(
    "--destructive-foreground",
    params.button_text_color
  )
}

type ThemeState = {
  theme: Theme
  resolvedTheme: ResolvedTheme

  isTelegram: boolean
  telegramThemeParams: TelegramThemeParams | null

  initialized: boolean

  init: () => void
  setTheme: (theme: Theme) => void
  syncWithSystem: () => void

  destroy: () => void
}

let themeChangedHandler: (() => void) | null = null
let mediaQuery: MediaQueryList | null = null
let mediaQueryHandler: (() => void) | null = null

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "system",
  resolvedTheme: "light",

  isTelegram: false,
  telegramThemeParams: null,

  initialized: false,

  init: () => {
    if (typeof window === "undefined") {
      return
    }

    const webApp = window.Telegram?.WebApp

    if (webApp) {
      webApp.ready()

      webApp.expand()

      const params = webApp.themeParams
      const resolvedTheme = webApp.colorScheme

      applyTelegramTheme(params)
      applyResolvedTheme(resolvedTheme)

      set({
        theme: "system",
        resolvedTheme,
        isTelegram: true,
        telegramThemeParams: params,
        initialized: true,
      })

      themeChangedHandler = () => {
        const nextParams = webApp.themeParams
        const nextTheme = webApp.colorScheme

        applyTelegramTheme(nextParams)
        applyResolvedTheme(nextTheme)

        set({
          resolvedTheme: nextTheme,
          telegramThemeParams: nextParams,
        })
      }

      webApp.onEvent(
        "themeChanged",
        themeChangedHandler
      )

      return
    }

    const stored = localStorage.getItem(STORAGE_KEY)

    const theme: Theme =
      stored === "light" ||
      stored === "dark" ||
      stored === "system"
        ? stored
        : "system"

    const resolvedTheme = resolveTheme(theme)

    applyResolvedTheme(resolvedTheme)

    set({
      theme,
      resolvedTheme,
      isTelegram: false,
      telegramThemeParams: null,
      initialized: true,
    })

    if (theme === "system") {
      mediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      )

      mediaQueryHandler = () => {
        const nextTheme = getSystemTheme()

        applyResolvedTheme(nextTheme)

        set({
          resolvedTheme: nextTheme,
        })
      }

      mediaQuery.addEventListener(
        "change",
        mediaQueryHandler
      )
    }
  },

  setTheme: (theme) => {
    if (get().isTelegram) {
      return
    }

    const resolvedTheme = resolveTheme(theme)

    localStorage.setItem(STORAGE_KEY, theme)

    applyResolvedTheme(resolvedTheme)

    set({
      theme,
      resolvedTheme,
    })
  },

  syncWithSystem: () => {
    if (get().isTelegram) {
      return
    }

    if (get().theme !== "system") {
      return
    }

    const resolvedTheme = getSystemTheme()

    applyResolvedTheme(resolvedTheme)

    set({
      resolvedTheme,
    })
  },

  destroy: () => {
    const webApp = window.Telegram?.WebApp

    if (
      webApp &&
      themeChangedHandler
    ) {
      webApp.offEvent(
        "themeChanged",
        themeChangedHandler
      )
    }

    if (
      mediaQuery &&
      mediaQueryHandler
    ) {
      mediaQuery.removeEventListener(
        "change",
        mediaQueryHandler
      )
    }

    themeChangedHandler = null
    mediaQuery = null
    mediaQueryHandler = null
  },
}))

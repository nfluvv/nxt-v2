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

const setCssVariable = (name: string, value: string | undefined) => {
  if (!value) return

  document.documentElement.style.setProperty(name, value)
}

const TELEGRAM_VARS = [
  "--background",
  "--foreground",
  "--card",
  "--card-foreground",
  "--popover",
  "--popover-foreground",
  "--primary",
  "--primary-foreground",
  "--secondary",
  "--secondary-foreground",
  "--muted",
  "--muted-foreground",
  "--accent",
  "--accent-foreground",
  "--border",
  "--input",
  "--ring",
  "--destructive",
  "--destructive-foreground",
  "--link",
  "--header",
  "--accent-text",
  "--section-header",
  "--subtitle",
] as const

const applyTelegramTheme = (p: TelegramThemeParams) => {
  const root = document.documentElement
  TELEGRAM_VARS.forEach((name) => root.style.removeProperty(name))

  const page = p.secondary_bg_color ?? p.bg_color
  const card = p.section_bg_color ?? p.bg_color

  const tint = (percent: number) =>
    p.hint_color && card
      ? `color-mix(in srgb, ${p.hint_color} ${percent}%, ${card})`
      : undefined

  const line = p.hint_color
    ? `color-mix(in srgb, ${p.hint_color} 25%, transparent)`
    : undefined

  setCssVariable("--background", page)
  setCssVariable("--foreground", p.text_color)

  setCssVariable("--card", card)
  setCssVariable("--card-foreground", p.text_color)
  setCssVariable("--popover", card)
  setCssVariable("--popover-foreground", p.text_color)

  setCssVariable("--primary", p.button_color)
  setCssVariable("--primary-foreground", p.button_text_color)

  setCssVariable("--secondary", tint(14))
  setCssVariable("--secondary-foreground", p.text_color)
  setCssVariable("--muted", tint(14))
  setCssVariable("--muted-foreground", p.hint_color)
  setCssVariable("--accent", tint(20))
  setCssVariable("--accent-foreground", p.text_color)

  setCssVariable("--border", line)
  setCssVariable("--input", line)
  setCssVariable("--ring", p.button_color)

  setCssVariable("--destructive", p.destructive_text_color)
  setCssVariable("--destructive-foreground", p.button_text_color)

  setCssVariable("--link", p.link_color)
  setCssVariable("--header", p.header_bg_color)
  setCssVariable("--accent-text", p.accent_text_color)
  setCssVariable("--section-header", p.section_header_text_color)
  setCssVariable("--subtitle", p.subtitle_text_color)
}

const syncTelegramChrome = (webApp: TelegramWebApp) => {
  try {
    if (webApp.isVersionAtLeast("6.1")) {
      webApp.setHeaderColor("secondary_bg_color")
      webApp.setBackgroundColor("secondary_bg_color")
    }
    if (webApp.isVersionAtLeast("7.10")) {
      webApp.setBottomBarColor("secondary_bg_color")
    }
  } catch {}
}

// поэтому "мы в Telegram" определяем по initData / platform
const getTelegramWebApp = (): TelegramWebApp | null => {
  const webApp = window.Telegram?.WebApp
  if (!webApp) return null

  return webApp.initData || webApp.platform !== "unknown" ? webApp : null
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

    if (get().initialized) {
      return
    }

    const webApp = getTelegramWebApp()

    if (webApp) {
      webApp.ready()
      webApp.expand()

      const params = webApp.themeParams
      const resolvedTheme = webApp.colorScheme

      applyTelegramTheme(params)
      applyResolvedTheme(resolvedTheme)
      syncTelegramChrome(webApp)

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
        syncTelegramChrome(webApp)

        set({
          resolvedTheme: nextTheme,
          telegramThemeParams: nextParams,
        })
      }

      webApp.onEvent("themeChanged", themeChangedHandler)

      return
    }

    const stored = localStorage.getItem(STORAGE_KEY)

    const theme: Theme =
      stored === "light" || stored === "dark" || stored === "system"
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

    mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    mediaQueryHandler = () => get().syncWithSystem()
    mediaQuery.addEventListener("change", mediaQueryHandler)
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

    if (webApp && themeChangedHandler) {
      webApp.offEvent("themeChanged", themeChangedHandler)
    }

    if (mediaQuery && mediaQueryHandler) {
      mediaQuery.removeEventListener("change", mediaQueryHandler)
    }

    themeChangedHandler = null
    mediaQuery = null
    mediaQueryHandler = null

    set({ initialized: false })
  },
}))

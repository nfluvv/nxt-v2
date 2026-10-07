import type { WebApp } from "@twa-dev/types"

declare global {
  interface TelegramThemeColors {
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

  interface TelegramWebApp {
    initData: string
    platform: string
    colorScheme: "light" | "dark"
    themeParams: TelegramThemeColors

    ready(): void
    expand(): void
    isVersionAtLeast(version: string): boolean
    setHeaderColor(color: string): void
    setBackgroundColor(color: string): void
    setBottomBarColor(color: string): void
    onEvent(event: string, handler: () => void): void
    offEvent(event: string, handler: () => void): void
    openInvoice(
      url: string,
      callback?: (status: "paid" | "cancelled" | "failed" | "pending") => void
    ): void
  }

  interface Window {
    Telegram?: {
      WebApp?: WebApp
    }
  }
}

export {}

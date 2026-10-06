import type { Telegram } from "@telegram-apps/types"

declare global {
  interface Window {
    Telegram?: Telegram
  }
}

export {}
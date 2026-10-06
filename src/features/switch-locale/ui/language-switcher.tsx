"use client"

import { useState, useTransition } from "react"
import { useLocale, useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { Check, Globe } from "lucide-react"

import { usePathname, useRouter } from "@/shared/i18n/navigation"
import { routing } from "@/shared/i18n/routing"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  SettingsRow
} from "@/shared/client/ui"
import { cn } from "@/shared/client/lib/utils"

import { localeLabels } from "../config/locale-labels"

export function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher")
  const locale = useLocale()
  const pathname = usePathname()
  const params = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSelect = (nextLocale: string) => {
    if (nextLocale === locale) {
      setOpen(false)
      return
    }

    window.Telegram?.WebApp?.HapticFeedback?.selectionChanged()

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- next-intl
        { pathname, params },
        { locale: nextLocale }
      )
      setOpen(false)
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SettingsRow
          icon={<Globe className="size-5" />}
          label={t("title")}
          value={localeLabels[locale] ?? locale.toUpperCase()}
          disabled={isPending}
        />
      </DialogTrigger>

      <DialogContent className="w-[calc(100%-2rem)] max-w-sm rounded-2xl p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>

        <ul className="flex flex-col gap-1.5">
          {routing.locales.map((loc) => {
            const active = loc === locale
            return (
              <li key={loc}>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleSelect(loc)}
                  className={cn(
                    "flex min-h-12 w-full items-center justify-between rounded-xl px-4 text-left text-base transition-colors active:bg-muted disabled:opacity-60",
                    active ? "bg-muted font-medium" : "bg-transparent"
                  )}
                >
                  <span>{localeLabels[loc] ?? loc}</span>
                  {active && <Check className="size-4 text-primary" />}
                </button>
              </li>
            )
          })}
        </ul>
      </DialogContent>
    </Dialog>
  )
}

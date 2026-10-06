"use client"

import { Home, User } from "lucide-react"
import { Link, usePathname } from "@/shared/i18n/navigation"
import { siteConfig } from "@/shared/client/config/site"
import { cn } from "@/shared/client/lib/utils"
import { useTranslations } from "next-intl"

function haptic() {
  window.Telegram?.WebApp?.HapticFeedback?.selectionChanged()
}

export function BottomNavItems({ isAuthed }: { isAuthed: boolean }) {
  const pathname = usePathname()
  const t = useTranslations("navigation")

  const items = [
    { href: siteConfig.routes.home, label: t("home"), icon: Home },
    // { href: "/admin", label: t("settings"), icon: Settings },
    { href: "/profile", label: t("profile"), icon: User },
  ] as const

  const visible = isAuthed
    ? items
    : items.filter((i) => i.href === siteConfig.routes.home)

  if (visible.length < 2) return null

  const isActive = (href: string) =>
    href === siteConfig.routes.home
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`)

  const activeIndex = visible.findIndex((i) => isActive(i.href))
  const count = visible.length

  return (
    <ul className="relative mx-auto grid h-16 max-w-md auto-cols-fr grid-flow-col px-0">
      <li
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-2 left-0 flex justify-center",
          "transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.34,1.3,0.64,1)] motion-reduce:transition-none",
          activeIndex === -1 ? "opacity-0" : "opacity-100"
        )}
        style={{
          width: `${100 / count}%`,
          transform: `translateX(${Math.max(activeIndex, 0) * 100}%)`,
        }}
      >
        <span className="h-8 w-14 rounded-full bg-primary/15" />
      </li>

      {visible.map(({ href, label, icon: Icon }) => {
        const active = isActive(href)

        return (
          <li key={href} className="min-w-0">
            <Link
              href={href}
              onClick={haptic}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex h-full touch-manipulation flex-col items-center gap-0.5 pt-2 select-none [-webkit-tap-highlight-color:transparent]",
                "transition-colors duration-200",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <span className="flex h-8 w-14 items-center justify-center">
                <Icon
                  className="size-5.5 transition-transform duration-150 group-active:scale-90"
                  strokeWidth={active ? 2.4 : 1.8}
                />
              </span>
              <span
                className={cn(
                  "max-w-full truncate px-1 text-[11px] leading-none",
                  active ? "font-semibold" : "font-medium"
                )}
              >
                {label}
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

import type { ReactNode } from "react"

import { cn } from "@/shared/client/lib/utils"

type SettingsGroupProps = {
  title?: string
  children: ReactNode
  className?: string
}

export function SettingsGroup({
  title,
  children,
  className,
}: SettingsGroupProps) {
  return (
    <section className={cn("flex w-full flex-col gap-2", className)}>
      {title && (
        <h3 className="px-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {title}
        </h3>
      )}
      <div className="divide-y divide-border/60 overflow-hidden rounded-2xl bg-card">
        {children}
      </div>
    </section>
  )
}

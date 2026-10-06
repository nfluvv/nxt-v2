import type { ComponentProps, ReactNode } from "react"
import { ChevronRight } from "lucide-react"

import { Link } from "@/shared/i18n/navigation"
import { cn } from "@/shared/client/lib/utils"

type BaseProps = {
  icon: ReactNode
  label: string
  value?: ReactNode
  showChevron?: boolean
  className?: string
}

type RowLinkProps = BaseProps &
  Omit<ComponentProps<typeof Link>, keyof BaseProps | "children">

type RowButtonProps = BaseProps &
  Omit<ComponentProps<"button">, keyof BaseProps | "children"> & {
    href?: undefined
  }

type SettingsRowProps = RowLinkProps | RowButtonProps

export function SettingsRow(props: SettingsRowProps) {
  const { icon, label, value, showChevron = true, className, ...rest } = props

  const classes = cn(
    "flex min-h-14 w-full items-center gap-3 px-4 text-left transition-colors active:bg-muted disabled:opacity-60",
    className
  )

  const content = (
    <>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
        {icon}
      </span>
      <span className="flex-1 text-base font-medium">{label}</span>
      {value && <span className="text-sm text-muted-foreground">{value}</span>}
      {showChevron && <ChevronRight className="size-4 text-muted-foreground" />}
    </>
  )

  if (props.href) {
    return (
      <Link className={classes} {...(rest as Omit<RowLinkProps, keyof BaseProps>)}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} {...(rest as ComponentProps<"button">)}>
      {content}
    </button>
  )
}
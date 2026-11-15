import type { SVGProps } from "react"

export function BitcoinIcon({
  className = "size-4",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.5 7.5v9" />
      <path d="M9.5 7.5h3.25a2 2 0 0 1 0 4H9.5" />
      <path d="M9.5 11.5h3.75a2.25 2.25 0 0 1 0 4.5H9.5" />
      <path d="M11 6v1.5M13 6v1.5M11 16v1.5M13 16v1.5" />
    </svg>
  )
}

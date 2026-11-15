import type { SVGProps } from "react"

export function GiftIcon({
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
      <path d="M3 7h18v4H3z" />
      <path d="M4 11h16v9H4z" />
      <path d="M12 7v13" />
      <path d="M12 7c-1-3-5-3.5-5-1.5S10 7 12 7z" />
      <path d="M12 7c1-3 5-3.5 5-1.5S14 7 12 7z" />
    </svg>
  )
}

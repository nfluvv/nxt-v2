import type { SVGProps } from "react"

export function TonIcon({
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
      <path d="M5 5h14l-7 15z" />
      <path d="M12 5v15" />
      <path d="M5 5l7 8 7-8" />
    </svg>
  )
}

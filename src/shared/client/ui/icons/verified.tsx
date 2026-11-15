import type { SVGProps } from "react"

export function VerifiedIcon({
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
      <path d="M12 2l2.4 1.9 3-.2 1.1 2.8 2.6 1.6-.9 2.9.9 2.9-2.6 1.6-1.1 2.8-3-.2L12 22l-2.4-1.9-3 .2-1.1-2.8L3 16l.9-2.9L3 10.2l2.6-1.6 1.1-2.8 3 .2z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </svg>
  )
}

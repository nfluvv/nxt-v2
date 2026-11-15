import type { SVGProps } from "react"

export function UsdtIcon({
  className = "size-4",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM7 7h10v2h-4v1.2c2.3.1 4 .6 4 1.3s-1.7 1.2-4 1.3V17h-2v-4.2c-2.3-.1-4-.6-4-1.3s1.7-1.2 4-1.3V9H7z"
      />
    </svg>
  )
}

import type { SVGProps } from "react"

export function EthereumIcon({
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
      <path fill="currentColor" d="M12 2l-7 10.2 7 4.1 7-4.1z" />
      <path fill="currentColor" d="M5 13.5l7 4.1 7-4.1L12 22z" />
    </svg>
  )
}

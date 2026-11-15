import { Loader2 } from "lucide-react"

interface LoaderProps {
  className?: string
  size?: number
}

export const Loader = ({ className = "", size = 24 }: LoaderProps) => {
  return (
    <div
      className={`flex h-full w-full items-center justify-center ${className}`}
    >
      <Loader2 size={size} className="animate-spin text-primary" />
    </div>
  )
}

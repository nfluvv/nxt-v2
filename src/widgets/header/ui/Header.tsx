import { getCurrentUser } from "@/entities/user/api/queries"
import { BottomNavItems } from "./BottomNavItems"

export async function Header() {
  const user = await getCurrentUser()

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/85 backdrop-blur-md"
      style={{
        paddingBottom:
          "max(env(safe-area-inset-bottom), var(--tg-safe-area-inset-bottom, 0px))",
      }}
    >
      <BottomNavItems isAuthed={!!user} />
    </nav>
  )
}

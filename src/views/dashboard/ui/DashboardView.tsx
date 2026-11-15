import { getCurrentUser } from "@/entities/user/api/queries"
import { Container } from "@/shared/client/ui"
import { AuthGate } from "@/features/telegram-auth"
import { getTranslations } from "next-intl/server"


export async function DashboardView() {
  const t = await getTranslations("dashboard")

  const user = await getCurrentUser()
  if (!user) return <AuthGate />

  return (
    <main className="py-2">
      <Container>
        <div>
          <h1 className="text-3xl font-black">{t("title")}</h1>
          <p className="text-muted-foreground">{t("decription")}</p>
        </div>
      </Container>
    </main>
  )
}

import { notFound } from "next/navigation"

import { getCurrentUser } from "@/entities/user/api/queries"
import { UserProfile } from "@/widgets/user-profile-card"
import { LanguageSwitcher } from "@/features/switch-locale"
import { getTranslations } from "next-intl/server"
import { Container } from "@/shared/client/ui"

export async function UserProfileView() {
  const profile = await getCurrentUser()
  const t = await getTranslations("profile")

  if (!profile) notFound()

  return (
    <main>
      <Container>
        <UserProfile profile={profile} />

        <div className="flex justify-between items-center mt-6">
          <h2 className="text-lg font-semibold">{t("lang")}</h2>
          <LanguageSwitcher />
        </div>
      </Container>
    </main>
  )
}

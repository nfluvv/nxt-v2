import { notFound } from "next/navigation"

import { getCurrentUser } from "@/entities/user/api/queries"
import { UserProfile } from "@/widgets/user-profile-card"
import { LanguageSwitcher } from "@/features/switch-locale"
import { getTranslations } from "next-intl/server"
import { Container, SettingsGroup, SettingsRow } from "@/shared/client/ui"
import { GitHubIcon } from "@/shared/client/ui/icons"
import { PremiumRow } from "@/features/buy-premium"
import { User } from "lucide-react"

export async function UserProfileView() {
  const profile = await getCurrentUser()
  const t = await getTranslations("profile")

  if (!profile) notFound()

  return (
    <main>
      <Container>
        <UserProfile profile={profile} />

        <div className="mt-8 flex flex-col gap-8">
          <SettingsGroup title={t("subscription")}>
            <PremiumRow
              premiumUntil={profile.premiumUntil?.toISOString() ?? null}
              active={
                !!profile.premiumUntil && profile.premiumUntil > new Date()
              }
            />
          </SettingsGroup>

          <SettingsGroup title={t("settings")}>
            <LanguageSwitcher />
          </SettingsGroup>

          {profile.role === "ADMIN" && (
            <SettingsGroup title={t("admin")}>
              <SettingsRow
                icon={<User className="size-5" />}
                label={t("adminSub")}
                href="/admin"
              />
            </SettingsGroup>
          )}

          <SettingsGroup title={t("links")}>
            <SettingsRow
              icon={<GitHubIcon className="size-5" />}
              label="GitHub"
              href="https://github.com/nfluvv"
              target="_blank"
            />
            <SettingsRow
              icon={<GitHubIcon className="size-5" />}
              label="Repository"
              href="https://github.com/nfluvv/nxt-v2"
              target="_blank"
            />
          </SettingsGroup>
        </div>
      </Container>
    </main>
  )
}

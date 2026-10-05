import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/client/ui"

import { ProfileIdentity } from "./ProfileIdentity"

type UserProfileProps = {
  profile: {
    id: string
    name: string | null
    username: string | null
    image: string | null
  }
}

export function UserProfile({ profile }: UserProfileProps) {
  const initial = (profile.name ?? "?").charAt(0).toUpperCase()

  return (
    <div className="flex items-center flex-col text-center mt-4 overflow-hidden bg-background shadow-none border-0">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <Avatar className="size-24 shrink-0 rounded-full border-4 border-background bg-background sm:size-28">
          <AvatarImage
            src={profile.image ?? undefined}
            alt={profile.name ?? ""}
          />

          <AvatarFallback className="rounded-xl bg-muted text-3xl font-semibold">
            {initial}
          </AvatarFallback>
        </Avatar>
      </div>

      <ProfileIdentity name={profile.name} username={profile.username} />
    </div>
  )
}

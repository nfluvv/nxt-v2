type ProfileIdentityProps = {
  name: string | null
  username: string | null
}

export function ProfileIdentity({ name, username }: ProfileIdentityProps) {
  return (
    <div className="mt-2">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold tracking-tight">
          {name ?? "No name"}
        </h1>
      </div>

      <p className="mt-0.5 text-sm text-muted-foreground">
        @{username ?? "unknown"}
      </p>
    </div>
  )
}

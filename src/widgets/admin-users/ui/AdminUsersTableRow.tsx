import Link from "next/link"

import { RoleSelect } from "@/features/update-user-role"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  TableCell,
  TableRow,
} from "@/shared/client/ui"

import type { AdminUsersResponse } from "../api/use-admin-users-query"

type AdminUsersTableRowProps = {
  user: AdminUsersResponse["users"][number]
  currentUserId?: string
  onRoleChangeSuccess: () => void
}

export function AdminUsersTableRow({
  user,
  currentUserId,
  onRoleChangeSuccess,
}: AdminUsersTableRowProps) {
  const label = user.name ?? user.username ?? user.telegramId
  const initial = label.charAt(0).toUpperCase()

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage src={user.image ?? undefined} alt={user.name ?? ""} />

            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>

          {user.username ? (
            <Link
              href={`/u/${user.username}`}
              className="font-medium hover:underline"
            >
              {user.name ?? user.username}
            </Link>
          ) : (
            <span className="font-medium">{user.name ?? "—"}</span>
          )}
        </div>
      </TableCell>

      <TableCell className="font-mono text-xs text-muted-foreground">
        {user.telegramId}
      </TableCell>

      <TableCell>
        <RoleSelect
          userId={user.id}
          userLabel={label}
          currentRole={user.role}
          disabled={user.id === currentUserId}
          onSuccess={onRoleChangeSuccess}
        />
      </TableCell>
    </TableRow>
  )
}

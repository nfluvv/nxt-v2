import "server-only"

import { cache } from "react"
import { prisma } from "@/shared/server/db/prisma"
import { auth } from "@/auth"

const PAGE_SIZE = 20

export const getCurrentUser = cache(async () => {
  const session = await auth()
  if (!session?.user?.id) return null

  return prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      image: true,
      username: true,
      role: true,
      createdAt: true,
      premiumUntil: true,
    },
  })
})

type GetAllUsersParams = {
  query?: string
  page?: number
}

export const getAllUsers = async ({
  query = "",
  page = 1,
}: GetAllUsersParams = {}) => {
  const q = query.trim()

  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" as const } },
          { username: { contains: q, mode: "insensitive" as const } },
          { telegramId: q },
        ],
      }
    : {}

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        username: true,
        telegramId: true,
        image: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.user.count({ where }),
  ])

  return {
    users,
    total,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
    page,
  }
}

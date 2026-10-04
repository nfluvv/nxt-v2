import "server-only"
import { prisma } from "@/shared/server/db/prisma"
import { generateUniqueUsername } from "@/entities/user/lib/generate-username"
import type { TelegramUser } from "@/shared/server/telegram/verify-init-data"

export async function findOrCreateTelegramUser(tg: TelegramUser) {
  const telegramId = String(tg.id)
  const name = [tg.first_name, tg.last_name].filter(Boolean).join(" ")
  const image = tg.photo_url ?? null

  const existing = await prisma.user.findUnique({ where: { telegramId } })
  if (existing) {
    if (existing.name !== name || existing.image !== image) {
      return prisma.user.update({
        where: { id: existing.id },
        data: { name, image },
      })
    }
    return existing
  }

  try {
    const username = await generateUniqueUsername(tg.username ?? tg.first_name)
    return await prisma.user.create({
      data: { telegramId, name, image, username },
    })
  } catch {
    const created = await prisma.user.findUnique({ where: { telegramId } })
    if (created) return created
    throw new Error("Failed to create user")
  }
}

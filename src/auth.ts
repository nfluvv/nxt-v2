import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { prisma } from "@/shared/server/db/prisma"
import { authConfig } from "@/auth.config"
import { verifyInitData } from "@/shared/server/telegram/verify-init-data"
import { findOrCreateTelegramUser } from "@/entities/user/api/find-or-create-telegram-user"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: "telegram",
      credentials: { initData: {} },
      async authorize(credentials) {
        const tgUser = verifyInitData(String(credentials?.initData ?? ""))
        if (!tgUser) return null
        return findOrCreateTelegramUser(tgUser)
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,

    jwt: async ({ token, user, trigger }) => {
      if (user?.id) {
        token.id = user.id
        token.role = (user.role as "USER" | "ADMIN") ?? "USER"
        token.username = user.username ?? null
      }

      if (token.id && (user || trigger === "update")) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { role: true, name: true, image: true, username: true },
        })

        if (dbUser) {
          token.role = dbUser.role
          token.name = dbUser.name
          token.picture = dbUser.image
          token.username = dbUser.username
        }
      }
      return token
    },

    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as "USER" | "ADMIN"
        session.user.name = token.name ?? null
        session.user.image = token.picture ?? null
        session.user.username = token.username as string | null
      }
      return session
    },
  },
})

import "server-only"
import { createHmac, timingSafeEqual } from "node:crypto"
import { z } from "zod"

const userSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string().optional(),
  username: z.string().optional(),
  photo_url: z.string().optional(),
  language_code: z.string().optional(),
})

export type TelegramUser = z.infer<typeof userSchema>

const MAX_AGE_SEC = 60 * 60 // initData старше часа не принимаем

export function verifyInitData(initData: string): TelegramUser | null {
  try {
    const params = new URLSearchParams(initData)
    const hash = params.get("hash")
    if (!hash) return null
    params.delete("hash")

    const dataCheckString = [...params.entries()]
      .sort(([a], [b]) => (a < b ? -1 : 1))
      .map(([k, v]) => `${k}=${v}`)
      .join("\n")

    const secret = createHmac("sha256", "WebAppData")
      .update(process.env.TELEGRAM_BOT_TOKEN!)
      .digest()
    const expected = createHmac("sha256", secret)
      .update(dataCheckString)
      .digest("hex")

    if (hash.length !== expected.length) return null
    if (!timingSafeEqual(Buffer.from(hash), Buffer.from(expected))) return null

    const authDate = Number(params.get("auth_date"))
    if (!authDate || Date.now() / 1000 - authDate > MAX_AGE_SEC) return null

    const user = userSchema.safeParse(JSON.parse(params.get("user") ?? "null"))
    return user.success ? user.data : null
  } catch {
    return null
  }
}

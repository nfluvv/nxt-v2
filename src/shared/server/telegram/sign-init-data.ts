import "server-only"
import { createHmac } from "node:crypto"

export function signInitData(user: {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
}) {
  const params = new URLSearchParams({
    auth_date: String(Math.floor(Date.now() / 1000)),
    query_id: "dev",
    user: JSON.stringify(user),
  })

  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([k, v]) => `${k}=${v}`)
    .join("\n")

  const secret = createHmac("sha256", "WebAppData")
    .update(process.env.TELEGRAM_BOT_TOKEN!)
    .digest()

  params.set(
    "hash",
    createHmac("sha256", secret).update(dataCheckString).digest("hex")
  )
  return params.toString()
}

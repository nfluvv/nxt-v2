import { prisma } from "@/shared/server/db/prisma"
import { tgApi } from "@/shared/server/telegram/bot-api"
import { markOrderPaid } from "@/entities/order/api/mark-order-paid"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  if (
    req.headers.get("x-telegram-bot-api-secret-token") !==
    process.env.TELEGRAM_WEBHOOK_SECRET
  ) {
    return new Response("Forbidden", { status: 403 })
  }

  const update = await req.json()

  if (update.pre_checkout_query) {
    const q = update.pre_checkout_query
    const order = await prisma.order.findUnique({
      where: { id: q.invoice_payload },
      include: { user: { select: { telegramId: true } } },
    })

    const ok =
      !!order &&
      order.status === "PENDING" &&
      q.currency === "XTR" &&
      q.total_amount === order.stars &&
      String(q.from.id) === order.user.telegramId

    await tgApi(
      "answerPreCheckoutQuery",
      ok
        ? { pre_checkout_query_id: q.id, ok: true }
        : {
            pre_checkout_query_id: q.id,
            ok: false,
            error_message: "The order is invalid",
          }
    )
  }

  const payment = update.message?.successful_payment
  if (payment) {
    await markOrderPaid(
      payment.invoice_payload,
      payment.telegram_payment_charge_id,
      payment.total_amount
    )
  }

  return new Response("ok")
}

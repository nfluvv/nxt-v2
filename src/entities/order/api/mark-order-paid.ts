import "server-only";
import { prisma } from "@/shared/server/db/prisma";
import { PRODUCTS, type ProductId } from "../config/products";

export async function markOrderPaid(orderId: string, chargeId: string, paidStars: number) {
  await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({ where: { id: orderId } });
    if (!order || order.stars !== paidStars) {
      console.error("[stars] order mismatch", { orderId, chargeId, paidStars });
      return; // деньги получены, но заказ не сошёлся: разберите вручную по логу
    }

    // Атомарно: при повторной доставке события count будет 0, и товар не выдастся дважды
    const { count } = await tx.order.updateMany({
      where: { id: orderId, status: "PENDING" },
      data: { status: "PAID", chargeId, paidAt: new Date() },
    });
    if (count === 0) return;

    await PRODUCTS[order.productId as ProductId].fulfill(tx, order);
  });
}
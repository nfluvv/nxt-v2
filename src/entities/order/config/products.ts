import type { Order, Prisma } from "@prisma/client";

type Fulfill = (tx: Prisma.TransactionClient, order: Order) => Promise<void>;

const grantPremium = (days: number): Fulfill => async (tx, order) => {
  const user = await tx.user.findUniqueOrThrow({
    where: { id: order.userId },
    select: { premiumUntil: true },
  });

  const now = new Date();
  const base = user.premiumUntil && user.premiumUntil > now ? user.premiumUntil : now;

  await tx.user.update({
    where: { id: order.userId },
    data: { premiumUntil: new Date(base.getTime() + days * 86_400_000) },
  });
};

export const PRODUCTS = {
  premium_month: {
    title: "Premium на 1 месяц",
    description: "Доступ к premium на 30 дней",
    stars: 50,
    fulfill: grantPremium(30),
  },
} satisfies Record<
  string,
  { title: string; description: string; stars: number; fulfill: Fulfill }
>;

export type ProductId = keyof typeof PRODUCTS;
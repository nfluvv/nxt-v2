"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { createStarsInvoice } from "../api/create-stars-invoice";
import type { ProductId } from "@/entities/order/config/products";

export function BuyButton({ productId, label }: { productId: ProductId; label: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const handleBuy = async () => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return toast.error("Откройте приложение в Telegram");

    setPending(true);
    const res = await createStarsInvoice(productId);
    if (!res.success) {
      setPending(false);
      return toast.error(res.error);
    }

    tg.openInvoice(res.url, (status) => {
      setPending(false);
      if (status === "paid") {
        toast.success("Оплачено");
        // Webhook может прийти с задержкой в секунду, поэтому обновляем данные несколько раз
        [500, 2000, 5000].forEach((ms) => setTimeout(() => router.refresh(), ms));
      } else if (status === "failed") {
        toast.error("Не удалось оплатить");
      }
    });
  };

  return (
    <button onClick={handleBuy} disabled={pending}>
      {label}
    </button>
  );
}
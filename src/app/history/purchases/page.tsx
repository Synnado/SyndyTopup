"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import HistoryList, { type HistoryItem } from "@/components/HistoryList";

// TODO: ข้อมูลตัวอย่างไปก่อน รอต่อกับ backend จริงค่อยดึงประวัติการซื้อจริงของผู้ใช้มาแทน
const PURCHASE_HISTORY: HistoryItem[] = [
  {
    id: "1",
    title: "ไอดี Valorant Immortal 3",
    subtitle: "9 ส.ค. 2569 · 21:14",
    amount: 1590,
    status: "success",
  },
  {
    id: "2",
    title: "ไอเทม Free Fire Bundle",
    subtitle: "7 ส.ค. 2569 · 13:02",
    amount: 649,
    status: "success",
  },
  {
    id: "3",
    title: "ไอดี Minecraft Java+Bedrock",
    subtitle: "3 ส.ค. 2569 · 16:47",
    amount: 590,
    status: "pending",
  },
  {
    id: "4",
    title: "ฝากดูแลไอดี Wild Rift 1 เดือน",
    subtitle: "30 ก.ค. 2569 · 10:15",
    amount: 399,
    status: "success",
  },
];

export default function PurchaseHistoryPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // ถ้ายังไม่ได้ล็อกอิน เด้งกลับไปหน้า login อัตโนมัติ
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-24">
        <p className="text-sm text-muted">กำลังโหลด...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <ShoppingBag size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">
            ประวัติการซื้อสินค้า
          </h1>
          <p className="text-sm text-muted">รายการสั่งซื้อทั้งหมดของคุณ</p>
        </div>
      </div>

      <HistoryList
        items={PURCHASE_HISTORY}
        emptyText="ยังไม่มีประวัติการซื้อสินค้า"
      />
    </main>
  );
}
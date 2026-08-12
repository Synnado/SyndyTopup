"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Receipt } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import HistoryList, { type HistoryItem } from "@/components/HistoryList";

// TODO: ข้อมูลตัวอย่างไปก่อน รอต่อกับ backend จริงค่อยดึงประวัติเติมเงินจริงของผู้ใช้มาแทน
const TOPUP_HISTORY: HistoryItem[] = [
  {
    id: "1",
    title: "เติมเกม ROV 300 บาท",
    subtitle: "10 ส.ค. 2569 · 14:22",
    amount: 300,
    status: "success",
  },
  {
    id: "2",
    title: "เติม Genshin Impact 980 เพชร",
    subtitle: "8 ส.ค. 2569 · 20:05",
    amount: 550,
    status: "success",
  },
  {
    id: "3",
    title: "เติม PUBG Mobile UC 660",
    subtitle: "5 ส.ค. 2569 · 09:41",
    amount: 349,
    status: "pending",
  },
  {
    id: "4",
    title: "เติมเกม Valorant Point 1750",
    subtitle: "2 ส.ค. 2569 · 18:30",
    amount: 599,
    status: "failed",
  },
];

export default function TopupHistoryPage() {
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
          <Receipt size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">ประวัติเติมเงิน</h1>
          <p className="text-sm text-muted">รายการเติมเงินทั้งหมดของคุณ</p>
        </div>
      </div>

      <HistoryList
        items={TOPUP_HISTORY}
        emptyText="ยังไม่มีประวัติการเติมเงิน"
      />
    </main>
  );
}
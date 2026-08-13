"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Wallet as WalletIcon, Landmark } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useWallet } from "@/context/WalletContext";

export default function TopupPage() {
  const { user, isLoading } = useAuth();
  const { balance } = useWallet();
  const router = useRouter();

  // ต้องล็อกอินก่อนถึงเติมเงินได้ ถ้ายังไม่ได้ล็อกอิน เด้งกลับไปหน้า login
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
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          เติมเงินเข้าเว็บไซต์
        </h1>
        <p className="mt-1 text-sm text-muted">
          ยอดเงินคงเหลือปัจจุบัน:{" "}
          <span className="font-semibold text-accent">
            {balance.toLocaleString()} บาท
          </span>
        </p>
      </div>

      <p className="mb-3 text-sm font-semibold text-foreground">
        เลือกช่องทางชำระเงิน
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          onClick={() => router.push("/topup/truemoney")}
          className="flex flex-col items-center gap-2 rounded-2xl border-2 border-navbar-border bg-surface p-5 text-center transition-colors hover:border-accent"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <WalletIcon size={26} />
          </div>
          <p className="font-semibold text-foreground">
            TrueMoney Wallet (อั่งเปา)
          </p>
          <span className="flex items-center gap-1.5 text-xs">
            <span className="rounded-full bg-red-500/10 px-2 py-0.5 font-bold text-red-600 dark:text-red-400">
              2.9%
            </span>
            <span className="text-muted">มีค่าธรรมเนียมจากการเติมเงิน</span>
          </span>
        </button>

        <button
          onClick={() => router.push("/topup/bank")}
          className="flex flex-col items-center gap-2 rounded-2xl border-2 border-navbar-border bg-surface p-5 text-center transition-colors hover:border-accent"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <Landmark size={26} />
          </div>
          <p className="font-semibold text-foreground">ธนาคาร (เช็คสลิป)</p>
          <span className="flex items-center gap-1.5 text-xs">
            <span className="rounded-full bg-green-500/10 px-2 py-0.5 font-bold text-green-600 dark:text-green-400">
              0%
            </span>
            <span className="text-muted">ไม่มีค่าธรรมเนียม</span>
          </span>
        </button>
      </div>
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Link2, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import TopupConfirmModal from "@/components/TopupConfirmModal";

// TODO: เชื่อมต่อ Truemoney API จริง เพื่อดึงยอดเงินจากลิงก์อั่งเปาจริงๆ
// ตอนนี้จำลองด้วยตัวเลขสุ่มไปก่อน เพื่อทดสอบหน้าตา UI
function mockDetectAmountFromLink(): number {
  return (Math.floor(Math.random() * 20) + 1) * 20; // สุ่ม 20–400 บาท
}

export default function TrueMoneyTopupPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [angpaoLink, setAngpaoLink] = useState("");
  const [detectedAmount, setDetectedAmount] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  function handleCheckLink() {
    setDetectedAmount(mockDetectAmountFromLink());
  }

  const feeAmount = detectedAmount ? Math.round(detectedAmount * 0.029) : 0;
  const netAmount = detectedAmount ? detectedAmount - feeAmount : 0;

  return (
    <main className="mx-auto w-full max-w-lg flex-1 px-4 py-10 sm:px-6">
      <Link
        href="/topup"
        className="mb-4 flex w-fit items-center gap-1 text-sm text-muted transition-colors hover:text-accent"
      >
        <ChevronLeft size={16} />
        กลับไปเลือกช่องทางชำระเงิน
      </Link>

      <h1 className="text-xl font-bold text-foreground sm:text-2xl">
        เติมเงินผ่าน TrueMoney Wallet (อั่งเปา)
      </h1>
      <p className="mt-1 text-sm text-muted">
        วางลิงก์อั่งเปา ระบบจะตรวจสอบยอดเงินให้อัตโนมัติ
      </p>

      <div className="mt-6 rounded-2xl border-2 border-accent bg-surface p-5 sm:p-6">
        <p className="text-sm font-semibold text-foreground">
          ลิงก์อั่งเปา / Share Link
        </p>
        <div className="mt-2 flex items-center gap-2 rounded-xl border-2 border-navbar-border bg-background px-3 py-2.5 focus-within:border-accent">
          <Link2 size={16} className="shrink-0 text-muted" />
          <input
            type="text"
            value={angpaoLink}
            onChange={(e) => {
              setAngpaoLink(e.target.value);
              setDetectedAmount(null); // เปลี่ยนลิงก์ใหม่ ให้ตรวจสอบใหม่อีกครั้ง
            }}
            placeholder="https://gift.truemoney.com/campaign/?v=..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
          />
        </div>
        <p className="mt-2 text-xs text-muted">
          ต้องเป็นลิงก์อั่งเปาที่ได้รับจากการแชร์ของผู้ใช้งานเท่านั้น
        </p>

        {detectedAmount === null ? (
          <button
            disabled={!angpaoLink.trim()}
            onClick={handleCheckLink}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Search size={16} />
            ตรวจสอบลิงก์
          </button>
        ) : (
          <div className="mt-4 rounded-xl border border-navbar-border bg-background p-4 text-center">
            <p className="text-xs text-muted">ระบบตรวจพบยอดเงินจากลิงก์นี้</p>
            <p className="mt-1 text-2xl font-bold text-accent">
              {detectedAmount.toLocaleString()} บาท
            </p>
            <p className="mt-1 text-xs text-muted">
              หักค่าธรรมเนียม 2.9% ({feeAmount.toLocaleString()} บาท) เหลือรับเข้ากระเป๋า{" "}
              <span className="font-semibold text-foreground">
                {netAmount.toLocaleString()} บาท
              </span>
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-3 w-full rounded-xl bg-accent py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
            >
              ยืนยันรับเงิน {netAmount.toLocaleString()} บาท
            </button>
          </div>
        )}
      </div>

      <TopupConfirmModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={netAmount}
        methodLabel="TrueMoney Wallet (อั่งเปา)"
      />
    </main>
  );
}
"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, QrCode, Upload, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import TopupConfirmModal from "@/components/TopupConfirmModal";

// TODO: เปลี่ยนเป็นข้อมูลบัญชีจริงของร้านตอนต่อระบบชำระเงินจริง
const BANK_ACCOUNT = {
  promptpayNumber: "0623425644",
  accountName: "SyndyTopup",
};

// TODO: เชื่อมต่อระบบ OCR อ่านยอดเงินจากรูปสลิปจริง (หรือ API ธนาคาร)
// ตอนนี้จำลองด้วยตัวเลขสุ่มไปก่อน เพื่อทดสอบหน้าตา UI
function mockDetectAmountFromSlip(): number {
  return (Math.floor(Math.random() * 50) + 1) * 20; // สุ่ม 20–1000 บาท
}

export default function BankTopupPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [slipPreview, setSlipPreview] = useState<string | null>(null);
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

  function handleSlipChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setDetectedAmount(null); // เปลี่ยนไฟล์ใหม่ ให้ตรวจสอบใหม่อีกครั้ง
    const reader = new FileReader();
    reader.onload = () => setSlipPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleCheckSlip() {
    setDetectedAmount(mockDetectAmountFromSlip());
  }

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
        เติมเงินผ่านธนาคาร (เช็คสลิป)
      </h1>
      <p className="mt-1 text-sm text-muted">
        โอนเงินแล้วแนบสลิป ระบบจะตรวจสอบยอดเงินให้อัตโนมัติ
      </p>

      <div className="mt-6 rounded-2xl border-2 border-accent bg-surface p-5 sm:p-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xs text-muted">PromptPay</p>
          <p className="text-lg font-bold text-foreground">
            {BANK_ACCOUNT.promptpayNumber}
          </p>

          {/* TODO: เปลี่ยนเป็น QR Code จริงตอนต่อระบบชำระเงินจริง */}
          <div className="flex h-40 w-40 items-center justify-center rounded-xl border-2 border-navbar-border bg-white">
            <QrCode size={100} className="text-black" />
          </div>

          <p className="mt-1 text-xs text-muted">ชื่อบัญชี</p>
          <p className="text-base font-semibold text-foreground">
            {BANK_ACCOUNT.accountName}
          </p>
        </div>

        {/* อัปโหลดสลิป */}
        <label className="mt-4 flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-navbar-border px-4 py-6 text-center transition-colors hover:border-accent">
          {slipPreview ? (
            // eslint-disable-next-line @next/next/no-img-element -- แสดงตัวอย่างไฟล์ที่เพิ่งเลือกจากเครื่อง
            <img
              src={slipPreview}
              alt="สลิปโอนเงิน"
              className="h-24 w-24 rounded-lg object-cover"
            />
          ) : (
            <>
              <Upload size={22} className="text-muted" />
              <p className="text-sm font-medium text-foreground">
                อัปโหลดรูปสลิปได้ที่นี่
              </p>
              <p className="text-xs text-muted">รองรับ PNG, JPEG</p>
            </>
          )}
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleSlipChange}
            className="hidden"
          />
        </label>

        <p className="mt-3 text-xs leading-relaxed text-red-500">
          จำเป็นต้องทำรายการโอนเงินผ่านแอปพลิเคชัน Mobile Banking ของธนาคารที่มี
          QR Code ในสลิปโอนเงิน มิเช่นนั้นบางระบบจะไม่สามารถตรวจสอบการโอนเงินของ
          ท่านได้ (ไม่รองรับสลิปธนาคารที่ไม่มี QR Code หรือการโอนเงินจาก
          E-Wallet)
        </p>

        {detectedAmount === null ? (
          <button
            disabled={!slipPreview}
            onClick={handleCheckSlip}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Search size={16} />
            ตรวจสอบสลิป
          </button>
        ) : (
          <div className="mt-4 rounded-xl border border-navbar-border bg-background p-4 text-center">
            <p className="text-xs text-muted">ระบบตรวจพบยอดโอนจากสลิปนี้</p>
            <p className="mt-1 text-2xl font-bold text-accent">
              {detectedAmount.toLocaleString()} บาท
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-3 w-full rounded-xl bg-accent py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
            >
              ยืนยันเติมเงิน {detectedAmount.toLocaleString()} บาท
            </button>
          </div>
        )}

        <p className="mt-2 text-center text-xs text-muted">ไม่มีค่าธรรมเนียม</p>
      </div>

      <TopupConfirmModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={detectedAmount ?? 0}
        methodLabel="ธนาคาร (เช็คสลิป)"
      />
    </main>
  );
}
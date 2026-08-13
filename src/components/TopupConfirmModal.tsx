"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QrCode, CheckCircle2, X } from "lucide-react";
import { useWallet } from "@/context/WalletContext";

interface TopupConfirmModalProps {
  open: boolean;
  onClose: () => void;
  amount: number;
  methodLabel: string;
}

export default function TopupConfirmModal({
  open,
  onClose,
  amount,
  methodLabel,
}: TopupConfirmModalProps) {
  const { addFunds } = useWallet();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
      return;
    }
    const timer = setTimeout(() => {
      setShouldRender(false);
      setIsDone(false); // รีเซ็ตสถานะไว้ เผื่อเปิด modal ใหม่รอบหน้า
    }, 200);
    document.body.style.overflow = "";
    return () => clearTimeout(timer);
  }, [open]);

  if (!shouldRender) return null;

  function handleConfirm() {
    // TODO: ตอนนี้เป็นระบบจำลอง (mock) — ยังไม่เชื่อมช่องทางชำระเงินจริง
    addFunds(amount);
    setIsDone(true);
  }

  function handleFinish() {
    onClose();
    router.push("/");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`relative z-10 w-full max-w-sm overflow-hidden rounded-2xl border-2 border-accent bg-surface shadow-2xl transition-all duration-200 ${
          open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-navbar-border px-5 py-4">
          <h2 className="text-base font-bold text-foreground">
            {isDone ? "เติมเงินสำเร็จ" : "ยืนยันการเติมเงิน"}
          </h2>
          <button
            onClick={onClose}
            aria-label="ปิด"
            className="rounded-full p-1 text-muted transition-colors hover:bg-accent-soft hover:text-accent"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-3 px-5 py-6 text-center">
          {isDone ? (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
                <CheckCircle2 size={28} />
              </div>
              <p className="text-2xl font-bold text-accent">
                +{amount.toLocaleString()} บาท
              </p>
              <p className="text-sm text-muted">
                เติมเงินเข้าบัญชีเรียบร้อยแล้ว
              </p>
              <button
                onClick={handleFinish}
                className="mt-2 w-full rounded-xl bg-accent py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
              >
                เสร็จสิ้น
              </button>
            </>
          ) : (
            <>
              <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <QrCode size={48} />
              </div>
              <p className="text-sm text-muted">
                ช่องทาง:{" "}
                <span className="font-medium text-foreground">
                  {methodLabel}
                </span>
              </p>
              <p className="text-2xl font-bold text-accent">
                {amount.toLocaleString()} บาท
              </p>
              <p className="text-xs text-muted">
                (ตอนนี้เป็นระบบจำลอง — ยังไม่เชื่อมช่องทางชำระเงินจริง)
              </p>
              <button
                onClick={handleConfirm}
                className="mt-2 w-full rounded-xl bg-accent py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
              >
                ยืนยันการเติมเงิน (จำลอง)
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
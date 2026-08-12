"use client";

import { useEffect, useState } from "react";
import { X, ShieldAlert } from "lucide-react";

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const TERMS = [
  "อ่านรายละเอียดแต่ละสินค้าให้ครบถ้วนก่อนการสั่งซื้อ",
  "กรณีข้อผิดพลาดจากทางเซิร์ฟเวอร์ ไม่ใช่ความผิดพลาดจากทางร้านเรา",
  "หากตรวจสอบแล้วไม่ใช่ความผิดพลาดจากทางร้านเรา ทางร้านไม่มีนโยบายคืนเงินใดๆ ทั้งสิ้น",
  "หากคุณสมัครเข้าใช้งานเว็บไซต์เราแล้ว ถือว่าคุณได้อ่านและยอมรับข้อกำหนดทั้งหมดนี้เรียบร้อยแล้ว",
];

export default function TermsModal({ open, onClose, onAccept }: TermsModalProps) {
  // shouldRender คุมว่ายัง render popup อยู่ไหม (เผื่อให้ animation ตอนปิดเล่นจบก่อนค่อยหายไปจริงๆ)
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
      return;
    }
    const timer = setTimeout(() => setShouldRender(false), 200);
    document.body.style.overflow = "";
    return () => clearTimeout(timer);
  }, [open]);

  // กด Esc ปิด popup ได้
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* พื้นหลังมืด กดแล้วปิด popup */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* กล่อง popup */}
      <div
        className={`relative z-10 w-full max-w-md overflow-hidden rounded-2xl border-2 border-accent bg-surface shadow-2xl transition-all duration-200 ${
          open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
      >
        {/* หัวข้อ */}
        <div className="flex items-center justify-between border-b border-navbar-border px-5 py-4">
          <div className="flex items-center gap-2">
            <ShieldAlert size={20} className="text-accent" />
            <h2 className="text-base font-bold text-foreground">
              ข้อกำหนดและเงื่อนไข
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="ปิด"
            className="rounded-full p-1 text-muted transition-colors hover:bg-accent-soft hover:text-accent"
          >
            <X size={18} />
          </button>
        </div>

        {/* รายการข้อกำหนด */}
        <div className="px-5 py-4">
          <ul className="flex flex-col gap-2.5 text-sm text-foreground">
            {TERMS.map((term, index) => (
              <li key={index} className="flex gap-2">
                <span className="mt-0.5 shrink-0 text-accent">•</span>
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ปุ่ม */}
        <div className="flex gap-3 border-t border-navbar-border px-5 py-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border-2 border-navbar-border py-2.5 text-sm font-semibold text-muted transition-colors hover:bg-accent-soft"
          >
            ยกเลิก
          </button>
          <button
            onClick={onAccept}
            className="flex-1 rounded-xl bg-accent py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
          >
            ยอมรับและสมัครสมาชิก
          </button>
        </div>
      </div>
    </div>
  );
}
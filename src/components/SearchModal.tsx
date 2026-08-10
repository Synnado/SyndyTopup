"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, X, ChevronRight, Gamepad2 } from "lucide-react";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

// ข้อมูลตัวอย่างไปก่อน — รอต่อกับ backend จริงค่อยดึงจาก API แทน
const SAMPLE_PRODUCTS = [
  { id: "1", name: "Windows 10 Home", price: 590, href: "/product/1" },
  { id: "2", name: "Windows 10 Pro", price: 790, href: "/product/2" },
  { id: "3", name: "Minecraft Legends", price: 99, href: "/product/3" },
  { id: "4", name: "Windows 11 Home", price: 790, href: "/product/4" },
  { id: "5", name: "Minecraft", price: 750, href: "/product/5" },
];

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  // shouldRender คุมว่าจะยัง render modal อยู่ไหม (เผื่อให้ animation ตอนปิดเล่นจบก่อนค่อยหายไปจริงๆ)
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      document.body.style.overflow = "hidden"; // กันหน้าเว็บเลื่อนตอน modal เปิด
      return;
    }
    // ปิด: รอให้ transition เล่นจบ (200ms) ก่อนค่อยเอาออกจาก DOM จริงๆ
    const timer = setTimeout(() => setShouldRender(false), 200);
    document.body.style.overflow = "";
    return () => clearTimeout(timer);
  }, [open]);

  // กด Esc ปิด modal ได้
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!shouldRender) return null;

  const filteredProducts = query
    ? SAMPLE_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    : SAMPLE_PRODUCTS;

  return (
    <div className="fixed inset-0 z-50 flex justify-center px-4 pt-24">
      {/* พื้นหลังมืด กดแล้วปิด modal */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* กล่อง modal */}
      <div
        className={`relative z-10 h-fit w-full max-w-xl overflow-hidden rounded-2xl border border-navbar-border bg-surface shadow-2xl transition-all duration-200 ${
          open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
      >
        {/* ช่องพิมพ์ค้นหา */}
        <div className="flex items-center gap-3 border-b border-navbar-border px-4 py-4">
          <Search size={20} className="shrink-0 text-muted" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาสินค้าที่คุณต้องการ"
            className="w-full bg-transparent text-base text-foreground placeholder:text-muted focus:outline-none"
          />
          <button
            onClick={onClose}
            aria-label="ปิดการค้นหา"
            className="shrink-0 rounded-full p-1 text-muted transition-colors hover:bg-accent-soft hover:text-accent"
          >
            <X size={20} />
          </button>
        </div>

        {/* รายการสินค้า */}
        <div className="max-h-[60vh] overflow-y-auto">
          {filteredProducts.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-muted">
              ไม่พบสินค้าที่ตรงกับ &quot;{query}&quot;
            </p>
          ) : (
            filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={product.href}
                onClick={onClose}
                className="flex items-center gap-3 border-b border-navbar-border px-4 py-3 transition-colors last:border-b-0 hover:bg-accent-soft"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Gamepad2 size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {product.name}
                  </p>
                  <p className="text-sm text-muted">
                    {product.price.toLocaleString()} บาท
                  </p>
                </div>
                <ChevronRight size={18} className="shrink-0 text-muted" />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
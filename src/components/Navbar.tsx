"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Moon,
  Sun,
  User,
  Coins,
  Menu,
  X,
  LogIn,
  UserPlus,
  LogOut,
  Settings,
  Receipt,
  ShoppingBag,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import SearchModal from "@/components/SearchModal";

// เมนูหลักของ navbar — แก้ path/ชื่อได้ตรงนี้ที่เดียว
const NAV_LINKS = [
  { label: "หน้าแรก", href: "/" },
  { label: "บริการทั้งหมด", href: "/services" },
  { label: "เติมเงิน", href: "/topup" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // TODO: ค่ายอดเงินตอนนี้เป็นค่าตายตัวไปก่อน รอบต่อไปจะต่อกับระบบ Wallet จริง
  const coinBalance = 0;

  // ปิดดรอปดาวน์โปรไฟล์เมื่อคลิกนอกกรอบ
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-40 border-b border-navbar-border bg-navbar-bg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        {/* โลโก้ + ชื่อร้าน */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-accent/40">
            <Image
              src="/mascot-logo.jpg"
              alt="SyndyTopup"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <span className="hidden text-lg font-bold text-foreground sm:block">
            SyndyTopup
          </span>
        </Link>

        {/* เมนูหลัก — โชว์เฉพาะจอ md ขึ้นไป */}
        <div className="hidden items-center gap-3 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border-2 border-accent px-3 py-1 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ช่องค้นหา — โชว์เฉพาะจอ md ขึ้นไป — กดแล้วเปิด SearchModal */}
        <div className="hidden max-w-xs flex-1 md:flex">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex w-full items-center gap-2 rounded-full border-2 border-accent bg-surface px-4 py-2 text-left"
          >
            <Search size={16} className="shrink-0 text-muted" />
            <span className="text-sm text-muted">ค้นหาสินค้า</span>
          </button>
        </div>

        {/* ฝั่งขวา: dark mode, ยอดเงิน, โปรไฟล์ */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* ปุ่มสลับ Dark/Light mode */}
          <button
            onClick={toggleTheme}
            aria-label="สลับโหมดมืด/สว่าง"
            className="rounded-full p-2 text-accent ring-2 ring-accent transition-colors hover:bg-accent hover:text-white"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* ยอดเงินคงเหลือ */}
          <div className="flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-sm font-semibold text-accent ring-2 ring-accent">
            <Coins size={16} />
            {coinBalance.toLocaleString()} บาท
          </div>

          {/* โปรไฟล์ผู้ใช้ — กดแล้วเปิดดรอปดาวน์ */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              aria-label="เมนูผู้ใช้"
              className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-accent-soft text-sm font-bold text-accent ring-2 ring-accent transition-colors hover:bg-accent hover:text-white"
            >
              {user ? (
                user.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- data URL จาก localStorage ใช้ next/image ไม่ได้ตรงๆ
                  <img
                    src={user.avatarUrl}
                    alt={user.username}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  user.username.charAt(0).toUpperCase()
                )
              ) : (
                <User size={18} />
              )}
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border-2 border-accent bg-surface shadow-xl">
                {user ? (
                  <>
                    <div className="px-4 py-3">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {user.username}
                      </p>
                      <p className="truncate text-xs text-muted">
                        {user.email}
                      </p>
                    </div>
                    <div className="border-t border-navbar-border py-1">
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent-soft hover:text-accent"
                      >
                        <User size={16} />
                        โปรไฟล์
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent-soft hover:text-accent"
                      >
                        <Settings size={16} />
                        การตั้งค่าผู้ใช้
                      </Link>
                      <Link
                        href="/history/topup"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent-soft hover:text-accent"
                      >
                        <Receipt size={16} />
                        ประวัติเติมเงิน
                      </Link>
                      <Link
                        href="/history/purchases"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent-soft hover:text-accent"
                      >
                        <ShoppingBag size={16} />
                        ประวัติการซื้อสินค้า
                      </Link>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="flex w-full items-center gap-2 border-t border-navbar-border px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-accent-soft hover:text-accent"
                    >
                      <LogOut size={16} />
                      ออกจากระบบ
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-accent-soft hover:text-accent"
                    >
                      <LogIn size={16} />
                      เข้าสู่ระบบ
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 border-t border-navbar-border px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-accent-soft hover:text-accent"
                    >
                      <UserPlus size={16} />
                      สมัครสมาชิก
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* ปุ่มเมนูมือถือ (hamburger) — โชว์เฉพาะจอเล็ก */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="เปิด/ปิดเมนู"
            className="rounded-full p-2 text-foreground/70 hover:bg-accent-soft md:hidden"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* เมนูมือถือ — โชว์เมื่อกด hamburger */}
      {isMobileMenuOpen && (
        <div className="flex flex-col gap-1 border-t border-navbar-border px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-lg border-2 border-accent px-3 py-2 text-sm font-medium text-accent hover:bg-accent hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsSearchOpen(true);
            }}
            className="mt-1 flex items-center gap-2 rounded-full border-2 border-accent bg-surface px-4 py-2 text-left"
          >
            <Search size={16} className="shrink-0 text-muted" />
            <span className="text-sm text-muted">ค้นหาสินค้า</span>
          </button>
        </div>
      )}

      <SearchModal open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
}
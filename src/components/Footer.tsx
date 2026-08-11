import Image from "next/image";
import Link from "next/link";
import { Globe, Camera, PlayCircle, MessageCircle } from "lucide-react";

// TODO: ใส่ลิงก์โซเชียลจริงของร้านทีหลัง ตอนนี้เป็น "#" ไปก่อน
// หมายเหตุ: lucide-react ตัดไอคอนโลโก้แบรนด์ (Facebook/Instagram/Youtube) ออกแล้ว
// จึงใช้ไอคอนทั่วไปแทนความหมาย (Globe = เพจ, Camera = IG, PlayCircle = Youtube, MessageCircle = Line)
const SOCIAL_LINKS = [
  { icon: Globe, href: "#", label: "Facebook" },
  { icon: MessageCircle, href: "#", label: "Email" },
];

export default function Footer() {
  const year = new Date().getFullYear() + 543; // แปลงเป็น พ.ศ.

  return (
    <footer className="w-full border-t border-navbar-border bg-navbar-bg">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
        {/* โลโก้ + ชื่อร้าน */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-accent/40">
            <Image
              src="/mascot-logo.jpg"
              alt="SyndyTopup"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <span className="text-base font-bold text-foreground">
            SyndyTopup
          </span>
        </Link>

        {/* ไอคอนโซเชียล */}
        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent ring-2 ring-accent transition-colors hover:bg-accent hover:text-white"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>

      {/* ลิขสิทธิ์ */}
      <div className="border-t border-navbar-border px-4 py-4 text-center text-xs text-muted sm:px-6">
        © {year} SyndyTopup สงวนลิขสิทธิ์
      </div>
    </footer>
  );
}
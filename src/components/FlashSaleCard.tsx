"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Zap } from "lucide-react";

export interface FlashSaleProduct {
  id: string;
  title: string;
  originalPrice: number;
  salePrice: number;
  durationMs: number; // ระยะเวลาที่เหลือตอนโหลดหน้าเว็บครั้งแรก (มิลลิวินาที)
  soldOut?: boolean;
  image?: string; // path รูปใน public/ เช่น "/products/game-1.jpg" — ไม่ใส่ก็ได้ จะใช้พื้นไล่สีแทน
  video?: string; // path วิดีโอสั้นๆ ใน public/ เช่น "/products/previews/game-1.mp4" — ใส่แล้วจะเล่นตอนเอาเมาส์ไปชี้
}

// แปลงมิลลิวินาทีที่เหลือ เป็นข้อความอ่านง่าย
function formatCountdown(ms: number): string {
  if (ms <= 0) return "หมดเวลา";

  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days >= 1) {
    return `${days} วัน ${hours} ชม.`;
  }

  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export default function FlashSaleCard({
  title,
  originalPrice,
  salePrice,
  durationMs,
  soldOut,
  image,
  video,
}: FlashSaleProduct) {
  const [deadline] = useState(() => Date.now() + durationMs);
  const [remaining, setRemaining] = useState(durationMs);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.max(0, deadline - Date.now()));
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  // เล่น/หยุดวิดีโอพรีวิวตอนเอาเมาส์เข้า-ออก
  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // เบราว์เซอร์บางตัวอาจบล็อก autoplay ถ้าไม่ได้ mute ไว้ — ในนี้ mute แล้วเลยปกติจะเล่นได้
      });
    } else {
      videoRef.current.pause();
    }
  }, [isHovered]);

  const discountPercent = Math.round(
    ((originalPrice - salePrice) / originalPrice) * 100
  );

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-xl border-2 border-accent bg-surface transition-transform duration-200 ease-out hover:z-10 hover:scale-105 hover:shadow-xl"
    >
      {/* ส่วนรูปภาพ/วิดีโอ */}
      <div className="relative aspect-video w-full overflow-hidden bg-accent-soft">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent to-accent-strong p-3 text-center">
            <span className="text-sm font-bold text-white/90 sm:text-base">
              {title}
            </span>
          </div>
        )}

        {/* วิดีโอพรีวิว — ซ้อนทับรูป โชว์เฉพาะตอน hover */}
        {video && (
          <video
            ref={videoRef}
            src={video}
            muted
            loop
            playsInline
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* ป้าย FLASH มุมซ้ายบน */}
        <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-accent px-2 py-1 text-[10px] font-bold text-white">
          <Zap size={10} className="fill-white" />
          FLASH
        </span>

        {/* ตัวจับเวลาถอยหลัง มุมขวาบน */}
        <span className="absolute right-2 top-2 rounded bg-black/70 px-2 py-1 font-mono text-[10px] font-semibold text-white">
          {formatCountdown(remaining)}
        </span>

        {/* overlay ตอนสินค้าหมด */}
        {soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="rounded border border-white/70 px-3 py-1 text-xs font-semibold text-white">
              สินค้าหมด
            </span>
          </div>
        )}
      </div>

      {/* ส่วนราคา */}
      <div className="p-3">
        <p className="truncate text-sm font-medium text-foreground">
          {title}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs text-muted line-through">
            ฿{originalPrice.toLocaleString()}
          </span>
          <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-bold text-white">
            -{discountPercent}%
          </span>
        </div>
        <p className="mt-1 text-lg font-bold text-accent">
          ฿{salePrice.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
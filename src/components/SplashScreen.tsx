"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface SplashScreenProps {
  children: React.ReactNode;
  duration?: number; // ระยะเวลาที่โชว์ splash screen (ms)
}

export default function SplashScreen({
  children,
  duration = 2500,
}: SplashScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // เริ่ม fade out ก่อนจะซ่อนจริง เพื่อให้ transition ดูนุ่มนวล
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, duration - 400);

    const hideTimer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [duration]);

  if (!isLoading) {
    // โหลดเสร็จแล้ว โชว์เนื้อหาเว็บตามปกติ
    return <>{children}</>;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-purple-50 transition-opacity duration-400 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        {/* unoptimized สำคัญมาก ไม่งั้น GIF จะไม่ขยับ */}
        <Image
          src="/mascot-loading.gif"
          alt="กำลังโหลด..."
          width={200}
          height={200}
          unoptimized
          priority
        />
        <p className="text-sm text-gray-500">กำลังโหลด...</p>
      </div>
    </div>
  );
}
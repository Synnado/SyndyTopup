"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-4 flex w-fit items-center gap-1 text-sm text-muted transition-colors hover:text-accent"
    >
      <ChevronLeft size={16} />
      กลับ
    </button>
  );
}
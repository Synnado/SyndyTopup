"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Mail, CheckCircle2 } from "lucide-react";
import AuthCard from "@/components/AuthCard";
import FormInput from "@/components/FormInput";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: เชื่อมต่อระบบส่งอีเมลรีเซ็ตรหัสผ่านจริงกับ backend ทีหลัง
    console.log("forgot-password:", { email });
    setIsSent(true);
  }

  return (
    <AuthCard
      title="ลืมรหัสผ่าน"
      subtitle="กรอกอีเมลที่ใช้สมัคร เราจะส่งลิงก์ตั้งรหัสผ่านใหม่ไปให้"
      footer={
        <Link href="/login" className="font-semibold text-accent hover:underline">
          กลับไปหน้าเข้าสู่ระบบ
        </Link>
      }
    >
      {isSent ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
            <CheckCircle2 size={24} />
          </div>
          <p className="text-sm text-foreground">
            ส่งลิงก์รีเซ็ตรหัสผ่านไปที่{" "}
            <span className="font-semibold">{email}</span> แล้ว
          </p>
          <p className="text-xs text-muted">
            ถ้าไม่เจอในกล่องจดหมาย ลองเช็คโฟลเดอร์ Spam ดูด้วยนะครับ
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormInput
            label="อีเมล"
            icon={Mail}
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
          />

          <button
            type="submit"
            className="mt-2 rounded-xl bg-accent py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
          >
            ส่งลิงก์รีเซ็ตรหัสผ่าน
          </button>
        </form>
      )}
    </AuthCard>
  );
}
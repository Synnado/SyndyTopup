"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Lock, CheckCircle2 } from "lucide-react";
import AuthCard from "@/components/AuthCard";
import FormInput from "@/components/FormInput";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [isDone, setIsDone] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setConfirmError("รหัสผ่านไม่ตรงกัน");
      return;
    }
    setConfirmError("");

    // TODO: เชื่อมต่อระบบตั้งรหัสผ่านใหม่จริงกับ backend ทีหลัง
    // (หน้านี้ปกติจะเข้าถึงผ่านลิงก์ในอีเมลที่มี token แนบมาด้วย)
    console.log("reset-password:", { password });
    setIsDone(true);
  }

  return (
    <AuthCard
      title="ตั้งรหัสผ่านใหม่"
      subtitle="กรอกรหัสผ่านใหม่ที่ต้องการใช้"
      footer={
        <Link href="/login" className="font-semibold text-accent hover:underline">
          กลับไปหน้าเข้าสู่ระบบ
        </Link>
      }
    >
      {isDone ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
            <CheckCircle2 size={24} />
          </div>
          <p className="text-sm text-foreground">
            ตั้งรหัสผ่านใหม่เรียบร้อยแล้ว
          </p>
          <p className="text-xs text-muted">
            ลองเข้าสู่ระบบด้วยรหัสผ่านใหม่ได้เลย
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormInput
            label="รหัสผ่านใหม่"
            icon={Lock}
            isPassword
            value={password}
            onChange={setPassword}
            placeholder="อย่างน้อย 8 ตัวอักษร"
          />
          <FormInput
            label="ยืนยันรหัสผ่านใหม่"
            icon={Lock}
            isPassword
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="พิมพ์รหัสผ่านอีกครั้ง"
            error={confirmError}
          />

          <button
            type="submit"
            className="mt-2 rounded-xl bg-accent py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
          >
            ตั้งรหัสผ่านใหม่
          </button>
        </form>
      )}
    </AuthCard>
  );
}
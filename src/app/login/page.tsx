"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import AuthCard from "@/components/AuthCard";
import FormInput from "@/components/FormInput";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: ตอนนี้เป็นระบบจำลอง (mock) — ยังไม่ได้เช็ครหัสผ่านจริงกับ backend
    login(email, password);
    router.push("/");
  }

  return (
    <AuthCard
      title="เข้าสู่ระบบ"
      subtitle="ยินดีต้อนรับกลับมา"
      footer={
        <>
          ยังไม่มีบัญชี?{" "}
          <Link
            href="/register"
            className="font-semibold text-accent hover:underline"
          >
            สมัครสมาชิก
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput
          label="อีเมล"
          icon={Mail}
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
        />
        <FormInput
          label="รหัสผ่าน"
          icon={Lock}
          isPassword
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
        />

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-accent hover:underline"
          >
            ลืมรหัสผ่าน?
          </Link>
        </div>

        <button
          type="submit"
          className="mt-2 rounded-xl bg-accent py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
        >
          เข้าสู่ระบบ
        </button>
      </form>
    </AuthCard>
  );
}
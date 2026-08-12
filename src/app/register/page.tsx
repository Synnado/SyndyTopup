"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User } from "lucide-react";
import AuthCard from "@/components/AuthCard";
import FormInput from "@/components/FormInput";
import TermsModal from "@/components/TermsModal";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  // ขั้นแรก: เช็คฟอร์มให้ผ่านก่อน แล้วค่อยเปิด popup ข้อกำหนดให้กดยอมรับ
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setConfirmError("รหัสผ่านไม่ตรงกัน");
      return;
    }
    setConfirmError("");
    setIsTermsOpen(true);
  }

  // ขั้นที่สอง: กด "ยอมรับและสมัครสมาชิก" ใน popup แล้วค่อยสมัครจริง
  function handleAcceptTerms() {
    // TODO: ตอนนี้เป็นระบบจำลอง (mock) — ยังไม่ได้สร้างบัญชีจริงกับ backend
    register(username, email, password);
    setIsTermsOpen(false);
    router.push("/");
  }

  return (
    <AuthCard
      title="สมัครสมาชิก"
      subtitle="สร้างบัญชีใหม่เพื่อเริ่มใช้งาน"
      footer={
        <>
          มีบัญชีอยู่แล้ว?{" "}
          <Link
            href="/login"
            className="font-semibold text-accent hover:underline"
          >
            เข้าสู่ระบบ
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput
          label="ชื่อผู้ใช้"
          icon={User}
          value={username}
          onChange={setUsername}
          placeholder="ชื่อที่ใช้แสดงในเว็บ"
        />
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
          placeholder="อย่างน้อย 8 ตัวอักษร"
        />
        <FormInput
          label="ยืนยันรหัสผ่าน"
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
          สมัครสมาชิก
        </button>
      </form>

      <TermsModal
        open={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        onAccept={handleAcceptTerms}
      />
    </AuthCard>
  );
}
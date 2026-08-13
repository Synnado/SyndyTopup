"use client";

import { useEffect, useRef, useState, type FormEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Coins,
  Pencil,
  Check,
  X,
  Calendar,
  Lock,
  CheckCircle2,
  Camera,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useWallet } from "@/context/WalletContext";
import FormInput from "@/components/FormInput";

export default function ProfilePage() {
  const { user, isLoading, updateProfile } = useAuth();
  const { balance } = useWallet();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [usernameDraft, setUsernameDraft] = useState("");

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetSent, setIsResetSent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ถ้ายังไม่ได้ล็อกอิน เด้งกลับไปหน้า login อัตโนมัติ
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  // เติมอีเมลของผู้ใช้ให้อัตโนมัติในช่องกรอก ตอนโหลดข้อมูลผู้ใช้เสร็จ
  useEffect(() => {
    if (user) setResetEmail(user.email);
  }, [user]);

  // ระหว่างรอเช็คสถานะล็อกอิน หรือกำลังจะเด้งออก ให้โชว์ข้อความโหลดไปก่อน
  if (isLoading || !user) {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-24">
        <p className="text-sm text-muted">กำลังโหลด...</p>
      </main>
    );
  }

  function startEditing() {
    setUsernameDraft(user!.username);
    setIsEditing(true);
  }

  function saveUsername() {
    if (usernameDraft.trim()) {
      updateProfile({ username: usernameDraft.trim() });
    }
    setIsEditing(false);
  }

  function handleAvatarClick() {
    fileInputRef.current?.click();
  }

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("กรุณาเลือกไฟล์รูปภาพเท่านั้น");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("ไฟล์รูปใหญ่เกินไป กรุณาเลือกไฟล์ไม่เกิน 2MB");
      return;
    }

    // อ่านไฟล์แล้วแปลงเป็น data URL เก็บลง localStorage ผ่าน updateProfile
    const reader = new FileReader();
    reader.onload = () => {
      updateProfile({ avatarUrl: reader.result as string });
    };
    reader.readAsDataURL(file);

    // เคลียร์ค่า input ไว้ เผื่อจะเลือกไฟล์เดิมซ้ำได้อีกครั้ง
    e.target.value = "";
  }

  function handleSendResetLink(e: FormEvent) {
    e.preventDefault();
    // TODO: เชื่อมต่อระบบส่งอีเมลรีเซ็ตรหัสผ่านจริงกับ backend ทีหลัง
    setIsResetSent(true);
  }

  function closeChangingPassword() {
    setIsChangingPassword(false);
    setIsResetSent(false);
    setResetEmail(user!.email);
  }

  // TODO: ยอดเงินตอนนี้ดึงจาก WalletContext (mock เก็บใน localStorage) รอต่อกับระบบ Wallet จริงทีหลัง

  const joinedDate = new Date(user.joinedAt);
  const formattedJoinedDate = joinedDate.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedJoinedTime = joinedDate.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border-2 border-accent bg-surface p-6 sm:p-8">
        {/* อวาตาร์ + ชื่อผู้ใช้ */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-accent-soft text-2xl font-bold text-accent ring-2 ring-accent">
              {user.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- data URL จาก localStorage ใช้ next/image ไม่ได้ตรงๆ
                <img
                  src={user.avatarUrl}
                  alt={user.username}
                  className="h-full w-full object-cover"
                />
              ) : (
                user.username.charAt(0).toUpperCase()
              )}
            </div>
            <button
              onClick={handleAvatarClick}
              aria-label="เปลี่ยนรูปโปรไฟล์"
              className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white ring-2 ring-surface transition-colors hover:bg-accent-strong"
            >
              <Camera size={14} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                autoFocus
                value={usernameDraft}
                onChange={(e) => setUsernameDraft(e.target.value)}
                className="rounded-lg border-2 border-accent bg-background px-3 py-1.5 text-center text-lg font-bold text-foreground focus:outline-none"
              />
              <button
                onClick={saveUsername}
                aria-label="บันทึก"
                className="rounded-full bg-accent p-1.5 text-white hover:bg-accent-strong"
              >
                <Check size={16} />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                aria-label="ยกเลิก"
                className="rounded-full bg-accent-soft p-1.5 text-accent hover:bg-accent hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-foreground">
                {user.username}
              </h1>
              <button
                onClick={startEditing}
                aria-label="แก้ไขชื่อผู้ใช้"
                className="rounded-full p-1.5 text-muted transition-colors hover:bg-accent-soft hover:text-accent"
              >
                <Pencil size={14} />
              </button>
            </div>
          )}
        </div>

        {/* ข้อมูลบัญชี */}
        <div className="mt-6 flex flex-col gap-3">
          <div className="flex items-center gap-3 rounded-xl border border-navbar-border px-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <Mail size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted">อีเมล</p>
              <p className="truncate text-sm font-medium text-foreground">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-navbar-border px-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <Coins size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted">ยอดเงินคงเหลือ</p>
              <p className="text-sm font-medium text-foreground">
                {balance.toLocaleString()} บาท
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-navbar-border px-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <Calendar size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted">สมัครเมื่อ</p>
              <p className="text-sm font-medium text-foreground">
                {formattedJoinedDate} เวลา {formattedJoinedTime}
              </p>
            </div>
          </div>
        </div>

        {/* เปลี่ยนรหัสผ่าน (ผ่านลิงก์ในอีเมล) */}
        <div className="mt-4 rounded-xl border border-navbar-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Lock size={16} />
              </div>
              <p className="text-sm font-semibold text-foreground">
                รหัสผ่าน
              </p>
            </div>
            {!isChangingPassword && (
              <button
                onClick={() => setIsChangingPassword(true)}
                className="text-xs font-semibold text-accent hover:underline"
              >
                เปลี่ยนรหัสผ่าน
              </button>
            )}
          </div>

          {isChangingPassword &&
            (isResetSent ? (
              <div className="mt-4 flex flex-col items-center gap-2 py-2 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <CheckCircle2 size={20} />
                </div>
                <p className="text-sm text-foreground">
                  ส่งลิงก์รีเซ็ตรหัสผ่านไปที่{" "}
                  <span className="font-semibold">{resetEmail}</span> แล้ว
                </p>
                <p className="text-xs text-muted">
                  ถ้าไม่เจอในกล่องจดหมาย ลองเช็คโฟลเดอร์ Spam ดูด้วยนะครับ
                </p>
                <button
                  onClick={closeChangingPassword}
                  className="mt-2 text-xs font-semibold text-accent hover:underline"
                >
                  ปิด
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSendResetLink}
                className="mt-4 flex flex-col gap-3"
              >
                <FormInput
                  label="อีเมล"
                  icon={Mail}
                  type="email"
                  value={resetEmail}
                  onChange={setResetEmail}
                  placeholder="you@example.com"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={closeChangingPassword}
                    className="flex-1 rounded-xl border-2 border-navbar-border py-2 text-sm font-semibold text-muted transition-colors hover:bg-accent-soft"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-accent py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
                  >
                    ส่งลิงก์รีเซ็ตรหัสผ่าน
                  </button>
                </div>
              </form>
            ))}
        </div>
      </div>
    </main>
  );
}
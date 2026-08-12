"use client";

import { useState } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";

interface FormInputProps {
  label: string;
  icon: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  isPassword?: boolean;
  error?: string;
}

export default function FormInput({
  label,
  icon: Icon,
  value,
  onChange,
  type = "text",
  placeholder,
  isPassword = false,
  error,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      <div
        className={`flex items-center gap-2 rounded-xl border-2 bg-background px-3 py-2.5 transition-colors focus-within:border-accent ${
          error ? "border-red-500" : "border-navbar-border"
        }`}
      >
        <Icon size={18} className="shrink-0 text-muted" />
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
            className="shrink-0 text-muted transition-colors hover:text-accent"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
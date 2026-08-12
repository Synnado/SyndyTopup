import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: AuthCardProps) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border-2 border-accent bg-surface p-6 sm:p-8">
        {/* โลโก้ + หัวข้อ */}
        <div className="mb-6 flex flex-col items-center text-center">
          <Link
            href="/"
            className="relative mb-3 h-14 w-14 overflow-hidden rounded-full ring-2 ring-accent/40"
          >
            <Image
              src="/mascot-logo.jpg"
              alt="SyndyTopup"
              fill
              unoptimized
              className="object-cover"
            />
          </Link>
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        </div>

        {children}

        {footer && (
          <div className="mt-6 text-center text-sm text-muted">{footer}</div>
        )}
      </div>
    </div>
  );
}
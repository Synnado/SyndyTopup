"use client";

import { use, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Home, ChevronRight, Package } from "lucide-react";
import { getProductById } from "@/lib/products";
import { CATEGORIES } from "@/lib/categories";
import { useAuth } from "@/context/AuthContext";
import { useWallet } from "@/context/WalletContext";
import PurchaseConfirmModal from "@/components/PurchaseConfirmModal";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const result = getProductById(id);

  if (!result) {
    notFound();
  }

  const { product, categoryId } = result;
  const category = CATEGORIES.find((c) => c.id === categoryId);
  const Icon = category?.icon;
  const isSoldOut = product.stock <= 0;

  const { user } = useAuth();
  const { balance } = useWallet();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasEnoughBalance = balance >= product.price;
  const isDisabled = isSoldOut || (!!user && !hasEnoughBalance);

  function handleBuyClick() {
    if (!user) {
      router.push("/login");
      return;
    }
    if (!hasEnoughBalance) return; // ปุ่มจะ disabled อยู่แล้ว กันไว้อีกชั้น
    setIsModalOpen(true);
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-muted">
        <Link
          href="/"
          className="flex items-center gap-1 transition-colors hover:text-accent"
        >
          <Home size={14} />
          หน้าแรก
        </Link>
        <ChevronRight size={14} />
        <Link href="/services" className="transition-colors hover:text-accent">
          บริการทั้งหมด
        </Link>
        {category && (
          <>
            <ChevronRight size={14} />
            <Link
              href={`/services/${category.id}`}
              className="transition-colors hover:text-accent"
            >
              {category.label}
            </Link>
          </>
        )}
        <ChevronRight size={14} />
        <span className="truncate font-medium text-foreground">
          {product.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {/* รูปสินค้า */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border-2 border-accent bg-accent-soft">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent to-accent-strong p-6 text-center">
              <span className="text-xl font-bold text-white/90 sm:text-2xl">
                {product.title}
              </span>
            </div>
          )}
          {isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <span className="rounded border border-white/70 px-4 py-1.5 text-sm font-semibold text-white">
                สินค้าหมด
              </span>
            </div>
          )}
        </div>

        {/* รายละเอียด */}
        <div className="flex flex-col">
          {category && Icon && (
            <span className="flex w-fit items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
              <Icon size={12} />
              {category.label}
            </span>
          )}

          <h1 className="mt-3 text-xl font-bold text-foreground sm:text-2xl">
            {product.title}
          </h1>

          <p className="mt-2 text-3xl font-bold text-accent">
            ฿{product.price.toLocaleString()}
          </p>

          <p className="mt-1 flex items-center gap-1 text-sm text-muted">
            <Package size={14} />
            เหลือทั้งหมด {product.stock.toLocaleString()} ชิ้น
          </p>

          {/* TODO: รายละเอียดสินค้าตัวอย่างไปก่อน รอใส่รายละเอียดจริงต่อสินค้าแต่ละชิ้น */}
          <div className="mt-5 rounded-xl border border-navbar-border bg-surface p-4 text-sm text-muted">
            อ่านรายละเอียดสินค้าให้ครบถ้วนก่อนการสั่งซื้อ สินค้าประเภทนี้จัดส่งอัตโนมัติทันทีหลังชำระเงินสำเร็จ
          </div>

          {user && !hasEnoughBalance && !isSoldOut && (
            <p className="mt-4 text-sm text-red-500">
              ยอดเงินไม่พอสำหรับสินค้านี้ —{" "}
              <Link href="/topup" className="font-semibold underline">
                เติมเงินเพิ่ม
              </Link>
            </p>
          )}

          <button
            onClick={handleBuyClick}
            disabled={isDisabled}
            className="mt-4 w-full rounded-xl bg-accent py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-40 sm:mt-auto"
          >
            {isSoldOut
              ? "สินค้าหมด"
              : !user
              ? "เข้าสู่ระบบเพื่อซื้อสินค้า"
              : !hasEnoughBalance
              ? "ยอดเงินไม่พอ"
              : "ซื้อสินค้านี้"}
          </button>
        </div>
      </div>

      <PurchaseConfirmModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={product.title}
        price={product.price}
      />
    </main>
  );
}
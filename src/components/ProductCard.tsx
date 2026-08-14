import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  stock: number;
  image?: string;
}

export default function ProductCard({
  id,
  title,
  price,
  stock,
  image,
}: ProductCardProps) {
  const isSoldOut = stock <= 0;

  const content = (
    <>
      {/* รูปสินค้า */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-accent-soft">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 20vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent to-accent-strong p-3 text-center">
            <span className="text-sm font-bold text-white/90">{title}</span>
          </div>
        )}

        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="rounded border border-white/70 px-3 py-1 text-xs font-semibold text-white">
              สินค้าหมด
            </span>
          </div>
        )}
      </div>

      {/* ชื่อ + ราคา */}
      <p className="mt-2 truncate text-sm font-semibold text-foreground">
        {title}
      </p>
      <p className="text-sm font-bold text-accent">
        ฿{price.toLocaleString()}
      </p>

      {/* ปุ่ม (เป็น span ไม่ใช่ button จริง เพราะทั้งการ์ดคือลิงก์เดียวกันอยู่แล้ว) */}
      <span
        className={`mt-2 block w-full rounded-lg py-2 text-center text-xs font-semibold transition-colors ${
          isSoldOut
            ? "bg-navbar-border text-muted"
            : "bg-accent text-white group-hover:bg-accent-strong"
        }`}
      >
        {isSoldOut ? "สินค้าหมด" : "ซื้อสินค้านี้"}
      </span>

      {/* จำนวนคงเหลือ */}
      <p className="mt-1.5 flex items-center gap-1 text-xs text-muted">
        <Package size={12} />
        เหลือทั้งหมด {stock.toLocaleString()} ชิ้น
      </p>
    </>
  );

  // สินค้าหมด: ไม่ให้กดเข้าไปได้ ทำเป็น div เฉยๆ
  if (isSoldOut) {
    return <div className="flex flex-col opacity-80">{content}</div>;
  }

  return (
    <Link href={`/product/${id}`} className="group flex flex-col">
      {content}
    </Link>
  );
}
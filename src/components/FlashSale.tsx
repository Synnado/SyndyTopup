import Link from "next/link";
import { Zap, ChevronRight } from "lucide-react";
import FlashSaleCard, { type FlashSaleProduct } from "@/components/FlashSaleCard";

// TODO: ข้อมูลตัวอย่างไปก่อน รอต่อกับ backend จริงค่อยดึงสินค้า Flash Sale จริงมาแทน
// durationMs: ระยะเวลาที่เหลือ (มิลลิวินาที) ตอนโหลดหน้าเว็บครั้งแรก
const PRODUCTS: FlashSaleProduct[] = [
  {
    id: "1",
    title: "เติมเกม ROV 300 บาท",
    originalPrice: 350,
    salePrice: 299,
    durationMs: 2 * 60 * 60 * 1000, // เหลือ 2 ชม.
  },
  {
    id: "2",
    title: "ไอดี Valorant Radiant",
    originalPrice: 2990,
    salePrice: 1799,
    durationMs: 5 * 60 * 60 * 1000, // เหลือ 5 ชม.
    soldOut: true,
  },
  {
    id: "3",
    title: "ไอเทม Free Fire Bundle",
    originalPrice: 890,
    salePrice: 649,
    durationMs: 45 * 60 * 1000, // เหลือ 45 นาที
  },
  {
    id: "4",
    title: "ฝากดูแลไอดี 1 เดือน",
    originalPrice: 500,
    salePrice: 399,
    durationMs: 3 * 24 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000, // เหลือ 3 วัน 16 ชม.
  },
  {
    id: "5",
    title: "เติมเกม Genshin Impact 980 เพชร",
    originalPrice: 1290,
    salePrice: 999,
    durationMs: 4 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000, // เหลือ 4 วัน 9 ชม.
  },
  {
    id: "6",
    title: "ไอดี Minecraft Java+Bedrock",
    originalPrice: 750,
    salePrice: 590,
    durationMs: 20 * 60 * 60 * 1000, // เหลือ 20 ชม.
  },
  {
    id: "7",
    title: "เติม UniPin Wallet 500 บาท",
    originalPrice: 500,
    salePrice: 470,
    durationMs: 20 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000, // เหลือ 20 วัน 2 ชม.
    soldOut: true,
  },
  {
    id: "8",
    title: "ไอดี PUBG Mobile Conqueror",
    originalPrice: 1690,
    salePrice: 1390,
    durationMs: 20 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000, // เหลือ 20 วัน 9 ชม.
  },
];

export default function FlashSale() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="flex items-center gap-1 text-xs font-semibold text-accent">
            <Zap size={12} className="fill-accent" />
            LIMITED DEALS
          </p>
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            Flash Sale
          </h2>
        </div>
        <Link
          href="/services"
          className="flex shrink-0 items-center gap-1 text-sm text-muted transition-colors hover:text-accent"
        >
          ทั้งหมด
          <ChevronRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {PRODUCTS.map((product) => (
          <FlashSaleCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
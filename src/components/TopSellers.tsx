import Image from "next/image";
import Link from "next/link";
import { Trophy, ChevronRight, Zap, User, Package, ShieldCheck } from "lucide-react";

// TODO: ข้อมูลตัวอย่างไปก่อน รอต่อกับ backend จริงค่อยดึงสินค้าขายดีจริงมาแทน (เรียงตามยอดขาย)
const CATEGORY_ICON = {
  topup: Zap,
  account: User,
  item: Package,
  care: ShieldCheck,
};

const PRODUCTS: {
  id: string;
  title: string;
  price: number;
  category: keyof typeof CATEGORY_ICON;
  categoryLabel: string;
  image?: string; // path รูปใน public/ — ไม่ใส่ก็ได้ จะใช้พื้นไล่สีแทน
}[] = [
  { id: "1", title: "เติมเกม ROV 500 บาท", price: 480, category: "topup", categoryLabel: "เติมเกม" },
  { id: "2", title: "ไอดี Valorant Immortal", price: 1590, category: "account", categoryLabel: "ไอดีเกม" },
  { id: "3", title: "เติม Genshin Impact 3280 เพชร", price: 1650, category: "topup", categoryLabel: "เติมเกม" },
  { id: "4", title: "ไอเทม Free Fire Bundle", price: 649, category: "item", categoryLabel: "ไอเทม" },
  { id: "5", title: "ฝากดูแลไอดี Wild Rift", price: 399, category: "care", categoryLabel: "ดูแลไอดี" },
  { id: "6", title: "ไอดี Minecraft Java+Bedrock", price: 590, category: "account", categoryLabel: "ไอดีเกม" },
  { id: "7", title: "เติม PUBG Mobile UC 660", price: 349, category: "topup", categoryLabel: "เติมเกม" },
  { id: "8", title: "ไอเทม Roblox Robux 800", price: 299, category: "item", categoryLabel: "ไอเทม" },
];

export default function TopSellers() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6">
      {/* หัวข้อ */}
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="flex items-center gap-1 text-xs font-semibold text-accent">
            <Trophy size={12} />
            TOP SELLERS
          </p>
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            สินค้าขายดี
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
        {PRODUCTS.map((product) => {
          const Icon = CATEGORY_ICON[product.category];
          return (
            <div
              key={product.id}
              className="overflow-hidden rounded-xl border-2 border-accent bg-surface transition-transform duration-200 ease-out hover:z-10 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-accent-soft">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent to-accent-strong p-3 text-center">
                    <span className="text-sm font-bold text-white/90 sm:text-base">
                      {product.title}
                    </span>
                  </div>
                )}

                {/* badge หมวดหมู่ มุมซ้ายบน */}
                <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                  <Icon size={10} />
                  {product.categoryLabel}
                </span>
              </div>

              <div className="p-3">
                <p className="truncate text-sm font-semibold text-foreground">
                  {product.title}
                </p>
                <p className="mt-1 text-base font-bold text-accent">
                  ฿{product.price.toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
import Link from "next/link";
import { Zap, User, Package, ShieldCheck } from "lucide-react";

// TODO: ข้อมูลตัวอย่างไปก่อน รอต่อกับ backend จริงค่อยดึงจำนวนสินค้าจริงในแต่ละหมวดมาแทน
const CATEGORIES = [
  {
    id: "topup",
    label: "เติมเกม",
    description: "เติมเงินเกมทุกค่าย ราคาคุ้ม ส่งไว",
    count: 12,
    icon: Zap,
  },
  {
    id: "accounts",
    label: "ไอดีเกม",
    description: "รับซื้อ-ขายไอดีเกม ราคาดี ปลอดภัย",
    count: 8,
    icon: User,
  },
  {
    id: "items",
    label: "ไอเทมเกม",
    description: "ไอเทมในเกมของแท้ ปลอดภัย 100%",
    count: 15,
    icon: Package,
  },
  {
    id: "care",
    label: "ดูแลไอดี",
    description: "รับฝากดูแลไอดี มืออาชีพ อุ่นใจ",
    count: 5,
    icon: ShieldCheck,
  },
];

export default function ServicesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
      {/* หัวข้อ */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          เลือกหมวดหมู่ที่คุณสนใจ
        </h1>
      </div>

      {/* Grid หมวดหมู่ */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.id}
              href={`/services/${category.id}`}
              className="group overflow-hidden rounded-2xl border-2 border-accent bg-surface transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl"
            >
              {/* แบนเนอร์ */}
              <div className="relative flex aspect-[21/9] items-center justify-center gap-3 overflow-hidden bg-gradient-to-br from-accent to-accent-strong px-6">
                <Icon size={40} className="shrink-0 text-white/90" />
                <span className="text-2xl font-extrabold text-white sm:text-3xl">
                  {category.label}
                </span>
              </div>

              {/* รายละเอียด */}
              <div className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="font-semibold text-foreground">
                    {category.label}
                  </p>
                  <p className="truncate text-xs text-muted">
                    {category.description} · มีสินค้าทั้งหมด {category.count}{" "}
                    ชิ้น
                  </p>
                </div>
                <span className="shrink-0 rounded-lg bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  สินค้าทั้งหมด
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
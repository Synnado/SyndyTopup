import { Users, ShoppingBag, PackageCheck, CheckCircle2 } from "lucide-react";

// TODO: ค่าตอนนี้เป็นตัวอย่างไปก่อน รอต่อกับ backend จริงค่อยดึงจาก API แทน
const STATS = [
  { icon: Users, label: "ผู้ใช้ทั้งหมด", value: "0", unit: "คน" },
  { icon: ShoppingBag, label: "สินค้าทั้งหมด", value: "0", unit: "ชิ้น" },
  { icon: PackageCheck, label: "สต๊อกทั้งหมด", value: "0", unit: "ชิ้น" },
  { icon: CheckCircle2, label: "ขายแล้วทั้งหมด", value: "0", unit: "ชิ้น" },
];

export default function StatsBar() {
  return (
    <div className="w-full border-b border-navbar-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center px-4 py-3 sm:px-6">
        {STATS.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2 border-navbar-border px-6 first:border-l-0 first:pl-0 last:pr-0 sm:gap-3 sm:px-10 border-l"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Icon size={16} />
              </div>
              <div className="whitespace-nowrap">
                <p className="text-sm font-bold text-foreground">
                  {stat.value}
                  <span className="ml-1 text-xs font-normal text-muted">
                    {stat.unit}
                  </span>
                </p>
                <p className="text-xs text-muted">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
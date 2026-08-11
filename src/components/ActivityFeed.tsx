import { UserPlus, ShoppingCart } from "lucide-react";

// TODO: ข้อมูลตัวอย่างไปก่อน รอต่อกับ backend จริงค่อยดึงรายการจริงมาแทน
const ACTIVITIES: {
  type: "purchase" | "join";
  text: string;
  time: string;
  isNew?: boolean;
}[] = [
  {
    type: "purchase",
    text: "User#9nbt3y เติมเกม ROV 300 บาท",
    time: "17 นาทีที่แล้ว",
    isNew: true,
  },
  {
    type: "join",
    text: "ผู้ใช้ใหม่ #9nbt3y เข้าร่วม",
    time: "27 นาทีที่แล้ว",
    isNew: true,
  },
  { type: "join", text: "ผู้ใช้ใหม่ #h94030 เข้าร่วม", time: "1 ชั่วโมงที่แล้ว" },
  { type: "join", text: "ผู้ใช้ใหม่ #b1my20 เข้าร่วม", time: "3 ชั่วโมงที่แล้ว" },
  {
    type: "purchase",
    text: "User#oz9vno ซื้อไอดีเกม Valorant",
    time: "5 ชั่วโมงที่แล้ว",
  },
];

export default function ActivityFeed() {
  return (
    <div className="flex h-full flex-col rounded-2xl border-2 border-accent bg-surface p-4 sm:p-5">
      {/* หัวข้อ */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h3 className="font-bold text-foreground">กิจกรรมล่าสุด</h3>
          <p className="text-xs text-muted">
            ติดตามความเคลื่อนไหวของร้านแบบเรียลไทม์
          </p>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          สด
        </span>
      </div>

      {/* รายการกิจกรรม */}
      <div className="flex flex-col divide-y divide-navbar-border">
        {ACTIVITIES.map((activity, index) => {
          const Icon = activity.type === "purchase" ? ShoppingCart : UserPlus;
          return (
            <div
              key={index}
              className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Icon size={14} />
              </div>
              <p className="min-w-0 flex-1 truncate text-sm text-foreground">
                {activity.text}
              </p>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="whitespace-nowrap text-xs text-muted">
                  {activity.time}
                </span>
                {activity.isNew && (
                  <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-bold text-white">
                    ใหม่
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
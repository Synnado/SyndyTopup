export interface HistoryItem {
  id: string;
  title: string;
  subtitle: string; // เช่น วันที่/เวลา
  amount: number;
  status: "success" | "pending" | "failed";
}

const STATUS_CONFIG = {
  success: {
    label: "สำเร็จ",
    className: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  pending: {
    label: "รอดำเนินการ",
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  failed: {
    label: "ล้มเหลว",
    className: "bg-red-500/10 text-red-600 dark:text-red-400",
  },
};

interface HistoryListProps {
  items: HistoryItem[];
  emptyText: string;
}

export default function HistoryList({ items, emptyText }: HistoryListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-navbar-border p-10 text-center text-sm text-muted">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-accent bg-surface">
      <div className="flex flex-col divide-y divide-navbar-border">
        {items.map((item) => {
          const status = STATUS_CONFIG[item.status];
          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {item.title}
                </p>
                <p className="text-xs text-muted">{item.subtitle}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <p className="text-sm font-semibold text-foreground">
                  ฿{item.amount.toLocaleString()}
                </p>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${status.className}`}
                >
                  {status.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
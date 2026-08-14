import { Zap, User, Package, ShieldCheck, type LucideIcon } from "lucide-react";

export interface Category {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

// TODO: ถ้าเพิ่ม/ลบหมวดหมู่ แก้ตรงนี้ที่เดียว จะอัปเดตทั้งหน้า "บริการทั้งหมด" และหน้ารายการสินค้าอัตโนมัติ
export const CATEGORIES: Category[] = [
  {
    id: "topup",
    label: "เติมเกม",
    description: "เติมเงินเกมทุกค่าย ราคาคุ้ม ส่งไว",
    icon: Zap,
  },
  {
    id: "accounts",
    label: "ไอดีเกม",
    description: "รับซื้อ-ขายไอดีเกม ราคาดี ปลอดภัย",
    icon: User,
  },
  {
    id: "items",
    label: "ไอเทมเกม",
    description: "ไอเทมในเกมของแท้ ปลอดภัย 100%",
    icon: Package,
  },
  {
    id: "care",
    label: "ดูแลไอดี",
    description: "รับฝากดูแลไอดี มืออาชีพ อุ่นใจ",
    icon: ShieldCheck,
  },
];
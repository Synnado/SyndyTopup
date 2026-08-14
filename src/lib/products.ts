export interface Product {
  id: string;
  title: string;
  price: number;
  stock: number; // จำนวนคงเหลือ — 0 = สินค้าหมด
  image?: string; // path รูปใน public/ — ไม่ใส่ก็ได้ จะใช้พื้นไล่สีแทน
}

// TODO: ข้อมูลตัวอย่างไปก่อน รอต่อกับ backend จริงค่อยดึงสินค้าจริงมาแทน
export const PRODUCTS_BY_CATEGORY: Record<string, Product[]> = {
  topup: [
    { id: "topup-1", title: "เติมเกม ROV 300 บาท", price: 300, stock: 41 },
    { id: "topup-2", title: "เติมเกม ROV 500 บาท", price: 480, stock: 25 },
    { id: "topup-3", title: "เติม Genshin Impact 980 เพชร", price: 550, stock: 3 },
    { id: "topup-4", title: "เติม PUBG Mobile UC 660", price: 349, stock: 85 },
    { id: "topup-5", title: "เติม Free Fire เพชร 520", price: 289, stock: 0 },
    { id: "topup-6", title: "เติม Valorant Point 1750", price: 599, stock: 4 },
  ],
  accounts: [
    { id: "accounts-1", title: "ไอดี Valorant Immortal 3", price: 1590, stock: 2 },
    { id: "accounts-2", title: "ไอดี Genshin Impact AR60", price: 2990, stock: 1 },
    { id: "accounts-3", title: "ไอดี Minecraft Java+Bedrock", price: 590, stock: 6 },
    { id: "accounts-4", title: "ไอดี Apex Legends Predator", price: 3590, stock: 0 },
    { id: "accounts-5", title: "ไอดี Free Fire แดชสูง", price: 890, stock: 3 },
  ],
  items: [
    { id: "items-1", title: "ไอเทม Free Fire Bundle", price: 649, stock: 12 },
    { id: "items-2", title: "ไอเทม Roblox Robux 800", price: 299, stock: 30 },
    { id: "items-3", title: "ไอเทม Minecraft Bundle", price: 259, stock: 0 },
    { id: "items-4", title: "ไอเทม Honkai Star Rail Pass", price: 259, stock: 9 },
  ],
  care: [
    { id: "care-1", title: "ฝากดูแลไอดี Wild Rift 1 เดือน", price: 399, stock: 10 },
    { id: "care-2", title: "ฝากดูแลไอดี Genshin Impact", price: 450, stock: 7 },
    { id: "care-3", title: "ฝากดูแลไอดี Valorant", price: 399, stock: 5 },
  ],
};

// ค้นหาสินค้าจากทุกหมวดหมู่ด้วย id (ใช้ในหน้ารายละเอียดสินค้า)
export function getProductById(
  id: string
): { product: Product; categoryId: string } | null {
  for (const [categoryId, products] of Object.entries(PRODUCTS_BY_CATEGORY)) {
    const product = products.find((p) => p.id === id);
    if (product) return { product, categoryId };
  }
  return null;
}
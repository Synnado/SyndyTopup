import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";
import { PRODUCTS_BY_CATEGORY } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categoryId } = await params;
  const category = CATEGORIES.find((c) => c.id === categoryId);

  // ถ้าไม่เจอหมวดหมู่ที่ตรงกัน (เช่น พิมพ์ url มั่วมา) ให้ขึ้นหน้า 404
  if (!category) {
    notFound();
  }

  const products = PRODUCTS_BY_CATEGORY[categoryId] ?? [];
  const Icon = category.icon;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
      {/* แบนเนอร์ใหญ่ */}
      <div className="relative flex h-48 items-center justify-center gap-4 overflow-hidden rounded-2xl border-2 border-accent bg-gradient-to-br from-accent to-accent-strong sm:h-64">
        <Icon size={56} className="shrink-0 text-white/90 sm:h-16 sm:w-16" />
        <span className="text-4xl font-extrabold text-white sm:text-6xl">
          {category.label}
        </span>
      </div>

      {/* หัวข้อหมวดหมู่ */}
      <div className="mb-6 mt-4">
        <p className="text-xs text-muted">ข้อมูลหมวดหมู่</p>
        <h1 className="text-lg font-bold text-foreground">
          {category.label}
        </h1>
      </div>

      {/* รายการสินค้า */}
      {products.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-navbar-border p-10 text-center text-sm text-muted">
          ยังไม่มีสินค้าในหมวดนี้
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              stock={product.stock}
              image={product.image}
            />
          ))}
        </div>
      )}
    </main>
  );
}
import HeroCarousel from "@/components/HeroCarousel";
import StatsBar from "@/components/StatsBar";
import ActivityFeed from "@/components/ActivityFeed";
import FlashSale from "@/components/FlashSale";
import NewArrivals from "@/components/NewArrivals";
import TopSellers from "@/components/TopSellers";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <StatsBar />
      <HeroCarousel />

      {/* โซนนี้แบ่ง 2 คอลัมน์: ซ้ายเผื่อเนื้อหาอื่นๆ ในอนาคต / ขวาเป็นกิจกรรมล่าสุด */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* TODO: ใส่เนื้อหาจริง เช่น สินค้าแนะนำ ทีหลัง ตอนนี้เป็นพื้นที่เผื่อไว้ */}
          <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-navbar-border p-10 text-center text-sm text-muted lg:col-span-2">
            พื้นที่สำหรับเนื้อหาอื่นๆ (เช่น สินค้าแนะนำ) — จะเพิ่มทีหลัง
          </div>

          <div className="lg:col-span-1">
            <ActivityFeed />
          </div>
        </div>
      </section>

      <FlashSale />
      <NewArrivals />
      <TopSellers />
    </main>
  );
}
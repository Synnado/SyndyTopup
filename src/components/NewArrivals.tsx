"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Flame, ChevronLeft, ChevronRight, ChevronRight as ArrowRight } from "lucide-react";

// TODO: ข้อมูลตัวอย่างไปก่อน รอต่อกับ backend จริงค่อยดึงสินค้าเข้าใหม่จริงมาแทน
const ARRIVALS: {
  id: string;
  title: string;
  subtitle: string;
  salePrice: number;
  originalPrice?: number;
  discountPercent?: number;
  image?: string; // path รูปใน public/ — ไม่ใส่ก็ได้ จะใช้พื้นไล่สีแทน
}[] = [
  {
    id: "1",
    title: "ไอดี Genshin Impact AR60",
    subtitle: "ตัวละครครบ อาวุธ 5 ดาวเพียบ",
    salePrice: 2990,
    originalPrice: 4990,
    discountPercent: 40,
  },
  {
    id: "2",
    title: "เติมเกม Honkai Star Rail 6480 Oneiric Shard",
    subtitle: "เติมแล้วรับทันที ไม่ต้องรอ",
    salePrice: 3290,
  },
  {
    id: "3",
    title: "ไอดี Valorant Immortal 3",
    subtitle: "สกินสวยครบ พร้อมย้ายเจ้าของ",
    salePrice: 1590,
    originalPrice: 2200,
    discountPercent: 28,
  },
  {
    id: "4",
    title: "ฝากดูแลไอดี League of Legends: Wild Rift",
    subtitle: "แพ็กเกจดูแลรายเดือน อุ่นใจ",
    salePrice: 399,
  },
];

// อันดับสินค้าใหม่ล่าสุด (ลิสต์ฝั่งขวา)
const LATEST: { name: string; price: number }[] = [
  { name: "ไอดี Genshin Impact AR60", price: 2990 },
  { name: "เติมเกม Honkai Star Rail 6480", price: 3290 },
  { name: "ไอดี Valorant Immortal 3", price: 1590 },
  { name: "ฝากดูแลไอดี Wild Rift", price: 399 },
  { name: "เติมเกม ROV 500 บาท", price: 480 },
  { name: "ไอดี Free Fire แดชสูง", price: 890 },
  { name: "ไอเทม Minecraft Bundle", price: 259 },
  { name: "เติม PUBG Mobile UC 660", price: 349 },
  { name: "ไอดี Apex Legends Predator", price: 3590 },
  { name: "เติม Call of Duty Mobile CP", price: 199 },
];

export default function NewArrivals() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6">
      {/* หัวข้อ */}
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="flex items-center gap-1 text-xs font-semibold text-accent">
            <Flame size={12} className="fill-accent" />
            NEWEST FIRST
          </p>
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            สินค้าเข้าใหม่
          </h2>
        </div>
        <Link
          href="/services"
          className="flex shrink-0 items-center gap-1 text-sm text-muted transition-colors hover:text-accent"
        >
          ทั้งหมด
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ฝั่งซ้าย: Carousel ใหญ่ */}
        <div className="relative lg:col-span-2">
          <div
            className="h-[360px] overflow-hidden rounded-2xl border-2 border-accent sm:h-[420px]"
            ref={emblaRef}
          >
            <div className="flex h-full">
              {ARRIVALS.map((item, index) => (
                <div key={item.id} className="relative h-full min-w-0 flex-[0_0_100%]">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 66vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-accent to-accent-strong" />
                  )}
                  {/* เงาไล่สีทับ ให้ตัวหนังสืออ่านง่าย */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* badge อันดับ มุมซ้ายบน */}
                  <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    <Flame size={12} className="fill-accent text-accent" />
                    NEW ARRIVAL #{index + 1}
                  </span>

                  {/* ข้อความ + ราคา ชิดล่าง */}
                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-white sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-white/70">
                        {item.subtitle}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {item.discountPercent && (
                        <span className="rounded bg-accent px-2 py-1 text-xs font-bold text-white">
                          -{item.discountPercent}%
                        </span>
                      )}
                      <div className="text-right">
                        <p className="text-xl font-bold text-white sm:text-2xl">
                          ฿{item.salePrice.toLocaleString()}
                        </p>
                        {item.originalPrice && (
                          <p className="text-xs text-white/60 line-through">
                            ฿{item.originalPrice.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ลูกศรก่อนหน้า/ถัดไป */}
          <button
            onClick={scrollPrev}
            aria-label="ก่อนหน้า"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-accent"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            aria-label="ถัดไป"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-accent"
          >
            <ChevronRight size={20} />
          </button>

          {/* จุดบอกตำแหน่งสไลด์ */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 sm:left-6 sm:translate-x-0">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                aria-label={`ไปสไลด์ที่ ${index + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  index === selectedIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ฝั่งขวา: List อันดับล่าสุด */}
        <div className="flex flex-col rounded-2xl border-2 border-accent bg-surface p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-bold text-foreground">สินค้าใหม่ล่าสุด</h3>
            <span className="text-xs text-muted">Latest 10</span>
          </div>
          <div className="flex flex-col divide-y divide-navbar-border overflow-y-auto">
            {LATEST.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="w-5 shrink-0 text-sm font-bold text-muted">
                    {index + 1}.
                  </span>
                  <span className="truncate text-sm text-foreground">
                    {item.name}
                  </span>
                </div>
                <span className="shrink-0 text-sm font-semibold text-accent">
                  ฿{item.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
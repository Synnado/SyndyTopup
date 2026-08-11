"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

// สไลด์ตัวอย่างไปก่อน
// - ถ้าอยากใส่ภาพโปรโมชั่น: เอาไฟล์ไปวางที่ public/banners/ แล้วใส่ path ตรง "image" เช่น "/banners/promo-1.jpg"
// - ถ้าสไลด์ไหนยังไม่มีภาพ ปล่อย image ว่างไว้ได้ (ไม่ใส่ key นี้เลย) จะใช้พื้นไล่สีม่วง/แดงแทนอัตโนมัติ
const SLIDES: {
  tag: string;
  title: string;
  subtitle: string;
  image?: string;
}[] = [
  {
    tag: "เติมเกม",
    title: "เติมเกมทุกค่าย ราคาคุ้ม ส่งไว",
    subtitle: "รองรับเกมยอดนิยมครบ เติมเสร็จรับไอเทมทันที",
    // image: "/banners/promo-topup.jpg",
  },
  {
    tag: "ขายไอเทม",
    title: "ขายไอเทมในเกม ปลอดภัย 100%",
    subtitle: "ระบบตรวจสอบก่อนโอนทุกครั้ง มั่นใจได้เลย",
    // image: "/banners/promo-items.jpg",
  },
  {
    tag: "ไอดีเกม",
    title: "รับซื้อ-ขายไอดีเกม ราคาดี",
    subtitle: "ประเมินราคาไว โอนเงินไว ไม่มีหลอกลวง",
    // image: "/banners/promo-account.jpg",
  },
  {
    tag: "ดูแลไอดี",
    title: "ฝากดูแลไอดี อุ่นใจตลอด 24 ชม.",
    subtitle: "ทีมงานมืออาชีพ ดูแลไอดีของคุณเหมือนของตัวเอง",
    // image: "/banners/promo-care.jpg",
  },
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
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
    <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      {/* กรอบสไลด์ */}
      <div
        className="overflow-hidden rounded-3xl border-2 border-accent"
        ref={emblaRef}
      >
        <div className="flex">
          {SLIDES.map((slide, index) => (
            <div key={index} className="min-w-0 flex-[0_0_100%]">
              <div className="relative h-72 overflow-hidden sm:h-[420px]">
                {/* พื้นหลัง: รูปภาพถ้ามี ไม่งั้น fallback เป็นไล่สีธีม */}
                {slide.image ? (
                  <>
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 1024px, 100vw"
                      className="object-cover"
                    />
                    {/* เกรเดียนต์ทับรูป ให้ตัวหนังสืออ่านง่ายไม่ว่าพื้นรูปจะสว่างหรือมืด */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-strong" />
                )}

                {/* ข้อความวางทับ ชิดล่างเสมอไม่ว่าจะมีรูปหรือไม่ */}
                <div className="relative z-10 flex h-full flex-col items-start justify-end gap-3 px-8 pb-8 sm:px-12 sm:pb-10">
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {slide.tag}
                  </span>
                  <h2 className="text-2xl font-bold text-white sm:text-4xl">
                    {slide.title}
                  </h2>
                  <p className="max-w-md text-sm text-white/85 sm:text-base">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ปุ่มลูกศรก่อนหน้า/ถัดไป */}
      <button
        onClick={scrollPrev}
        aria-label="สไลด์ก่อนหน้า"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-surface/90 p-2 text-accent shadow-md ring-2 ring-accent transition-colors hover:bg-accent hover:text-white sm:left-6"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={scrollNext}
        aria-label="สไลด์ถัดไป"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-surface/90 p-2 text-accent shadow-md ring-2 ring-accent transition-colors hover:bg-accent hover:text-white sm:right-6"
      >
        <ChevronRight size={20} />
      </button>

      {/* จุดบอกตำแหน่งสไลด์ */}
      <div className="mt-4 flex justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            aria-label={`ไปสไลด์ที่ ${index + 1}`}
            className={`h-2 rounded-full transition-all ${
              index === selectedIndex ? "w-6 bg-accent" : "w-2 bg-accent/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
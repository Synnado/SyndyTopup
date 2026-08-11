"use client";

import { useEffect, useRef } from "react";

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  swayAmplitude: number;
  swayOffset: number;
  opacity: number;
  glow: boolean; // เกล็ดบางส่วนเท่านั้นที่มีแสงเรืองรอบตัว (ประหยัดพลังประมวลผล)
}

const DENSITY_PER_10000PX2 = 0.9; // ความหนาแน่นของหิมะ ปรับได้ตามชอบ

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let snowflakes: Snowflake[] = [];
    let animationFrameId: number;
    let time = 0;
    let glowColor = "139, 92, 246"; // ค่าตั้งต้น (ม่วง) เผื่ออ่านค่าจริงไม่ทัน

    // อ่านสี accent ปัจจุบันจาก CSS variable (ม่วงตอน light / แดงตอน dark)
    function readGlowColor() {
      const hex = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      if (!Number.isNaN(r)) glowColor = `${r}, ${g}, ${b}`;
    }

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(dpr, dpr);
      initSnowflakes();
    }

    function initSnowflakes() {
      const area = window.innerWidth * window.innerHeight;
      const count = Math.round((area / 10000) * DENSITY_PER_10000PX2);
      snowflakes = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        // กระจาย y เริ่มต้นทั่วจอเลย จะได้ไม่ต้องรอหิมะไล่ตกจากบนสุดตอนเข้าเว็บครั้งแรก
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 2 + 1, // 1–3px
        speedY: Math.random() * 0.6 + 0.2, // ยิ่งเกล็ดใหญ่ยิ่งตกเร็วกว่านิดหน่อย
        swayAmplitude: Math.random() * 15 + 5,
        swayOffset: Math.random() * 1000,
        opacity: Math.random() * 0.5 + 0.4,
        glow: Math.random() < 0.25, // ~25% ของเกล็ดเท่านั้นที่มีแสงเรือง (ประหยัด perf)
      }));
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const flake of snowflakes) {
        // ตกลงเรื่อยๆ + แกว่งซ้ายขวาเบาๆ เหมือนลมพัด
        flake.y += flake.speedY;
        const sway =
          Math.sin((time + flake.swayOffset) * 0.02) * flake.swayAmplitude * 0.03;
        const drawX = flake.x + sway;

        if (flake.y > window.innerHeight + 5) {
          flake.y = -5;
          flake.x = Math.random() * window.innerWidth;
        }

        ctx.beginPath();
        if (flake.glow) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = `rgba(${glowColor}, 0.9)`;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.arc(drawX, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      time += 1;
    }

    function loop() {
      draw();
      animationFrameId = requestAnimationFrame(loop);
    }

    readGlowColor();
    resize();
    window.addEventListener("resize", resize);

    // คอยเช็คว่ามีการสลับ Dark/Light mode ไหม ถ้าเปลี่ยนให้อ่านสีแสงเรืองใหม่
    const observer = new MutationObserver(readGlowColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    if (prefersReducedMotion) {
      draw(); // วาดครั้งเดียวนิ่งๆ ไม่ขยับ ให้คนที่ตั้งค่าเครื่องไว้ไม่เห็นแอนิเมชัน
    } else {
      loop();
    }

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
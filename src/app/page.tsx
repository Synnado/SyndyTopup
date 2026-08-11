import HeroCarousel from "@/components/HeroCarousel";
import StatsBar from "@/components/StatsBar";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <StatsBar />
      <HeroCarousel />
    </main>
  );
}
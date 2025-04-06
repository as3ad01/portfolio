'use client';

import Hero from "@/components/Hero/Hero";
import SimpleSmoothScroll from "@/components/ui/SimpleSmoothScroll";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/Footer/Footer";
import Services from "@/components/Services/Services";
import BlocksSection from "@/components/ui/BlocksSection";
import TechStack from "@/components/TechStack/TechStack";
import Team from "@/components/Team/Team";
import Philosophy from "@/components/Philosophy/Philosophy";

export default function Home() {
  return (
    <SimpleSmoothScroll>
      <Navigation />
      <main className="bg-background text-foreground">
        <Hero />
        <Philosophy />
        <Services />
        <BlocksSection />
        <TechStack />
        <Team />
        <Footer />
      </main>
    </SimpleSmoothScroll>
  );
}

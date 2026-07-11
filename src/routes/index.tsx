import { createFileRoute } from "@tanstack/react-router";
import { FloatingNav } from "@/components/vault/FloatingNav";
import { Hero } from "@/components/vault/Hero";
import { FeaturedGrid } from "@/components/vault/FeaturedGrid";
import { CategoryRail } from "@/components/vault/CategoryRail";
import { ValueProps } from "@/components/vault/ValueProps";
import { AccessoryCarousel } from "@/components/vault/AccessoryCarousel";
import { Footer } from "@/components/vault/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Vault — Apple Authorized Reseller" },
      {
        name: "description",
        content:
          "An immersive premium shopping experience for Mac, iPhone, iPad, Apple Watch, AirPods, and accessories. Meticulously curated by The Vault.",
      },
      { property: "og:title", content: "The Vault — Apple Authorized Reseller" },
      {
        property: "og:description",
        content:
          "An immersive premium shopping experience for Mac, iPhone, iPad, Apple Watch, AirPods, and accessories. Meticulously curated by The Vault.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-dvh bg-background">
      <FloatingNav />
      <main>
        <Hero />
        <FeaturedGrid />
        <CategoryRail />
        <ValueProps />
        <AccessoryCarousel />
      </main>
      <Footer />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { FloatingNav } from "@/components/vault/FloatingNav";
import { Footer } from "@/components/vault/Footer";
import { ProductPage } from "@/components/vault/ProductPage";
import heroImg from "@/assets/product/iphone-hero.jpg.asset.json";

export const Route = createFileRoute("/iphone")({
  head: () => ({
    meta: [
      { title: "iPhone 17 — The Vault" },
      {
        name: "description",
        content:
          "iPhone 17 at The Vault. Titanium construction, A19 Bionic, and a camera system that sees what you see. Free delivery and AppleCare+ available.",
      },
      { property: "og:title", content: "iPhone 17 — The Vault" },
      { property: "og:description", content: "Titanium. A19 Bionic. A camera system that sees what you see." },
      { property: "og:type", content: "product" },
      { property: "og:image", content: heroImg.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImg.url },
    ],
  }),
  component: IPhoneRoute,
});

function IPhoneRoute() {
  return (
    <div className="min-h-dvh bg-background">
      <FloatingNav />
      <main>
        <ProductPage />
      </main>
      <Footer />
    </div>
  );
}

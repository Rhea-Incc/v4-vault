import { createFileRoute } from "@tanstack/react-router";
import { FloatingNav } from "@/components/vault/FloatingNav";
import { Footer } from "@/components/vault/Footer";
import { AccessoriesPage } from "@/components/vault/AccessoriesPage";
import { ACCESSORIES } from "@/lib/catalog";

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      { title: "Accessories — MagSafe, AirPods, Cases | The Vault" },
      {
        name: "description",
        content:
          "Power, audio, protection and coverage. Browse MagSafe chargers, AirPods Pro, cases, bands and AppleCare+ at The Vault.",
      },
      { property: "og:title", content: "Accessories — The Vault" },
      {
        property: "og:description",
        content: "MagSafe, AirPods, cases, bands and AppleCare+ curated by The Vault.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: ACCESSORIES[0].image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: ACCESSORIES[0].image },
    ],
  }),
  component: AccessoriesRoute,
});

function AccessoriesRoute() {
  return (
    <div className="min-h-dvh bg-background">
      <FloatingNav />
      <main>
        <AccessoriesPage />
      </main>
      <Footer />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { FloatingNav } from "@/components/vault/FloatingNav";
import { Footer } from "@/components/vault/Footer";
import { MacPage } from "@/components/vault/MacPage";
import { MEDIA } from "@/lib/catalog";

export const Route = createFileRoute("/mac")({
  head: () => ({
    meta: [
      { title: "Mac — MacBook, iMac, Mac mini & Studio | The Vault" },
      {
        name: "description",
        content:
          "Shop the full Mac lineup at The Vault. MacBook Pro, MacBook Air, iMac, Mac mini, Mac Studio and Studio Display, configured and ready on day one.",
      },
      { property: "og:title", content: "Mac — The Vault" },
      {
        property: "og:description",
        content: "Apple silicon across the lineup, configured and ready on day one.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: MEDIA.macosHero },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: MEDIA.macosHero },
    ],
  }),
  component: MacRoute,
});

function MacRoute() {
  return (
    <div className="min-h-dvh bg-background">
      <FloatingNav />
      <main>
        <MacPage />
      </main>
      <Footer />
    </div>
  );
}

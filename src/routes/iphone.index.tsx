import { createFileRoute } from "@tanstack/react-router";
import { FloatingNav } from "@/components/vault/FloatingNav";
import { Footer } from "@/components/vault/Footer";
import { IPhoneLineupPage } from "@/components/vault/IPhoneLineupPage";
import { MEDIA } from "@/lib/catalog";

export const Route = createFileRoute("/iphone/")({
  head: () => ({
    meta: [
      { title: "iPhone — Every Generation | The Vault" },
      {
        name: "description",
        content:
          "Shop iPhone 11 through iPhone 17 at The Vault. Certified, unlocked and compared side by side, with free delivery and AppleCare+.",
      },
      { property: "og:title", content: "iPhone — Every Generation | The Vault" },
      {
        property: "og:description",
        content: "iPhone 11 to iPhone 17, certified and compared side by side at The Vault.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: MEDIA.iosLineup },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: MEDIA.iosLineup },
    ],
  }),
  component: IPhoneIndexRoute,
});

function IPhoneIndexRoute() {
  return (
    <div className="min-h-dvh bg-background">
      <FloatingNav />
      <main>
        <IPhoneLineupPage />
      </main>
      <Footer />
    </div>
  );
}

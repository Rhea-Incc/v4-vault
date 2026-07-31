import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/vault/InfoPage";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — The Vault Inc" },
      { name: "description", content: "Save and revisit device configurations in your The Vault Inc wishlist." },
      { property: "og:title", content: "Wishlist — The Vault Inc" },
      { property: "og:description", content: "Save and revisit device configurations in your The Vault Inc wishlist." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <InfoPage slug="wishlist" />,
});

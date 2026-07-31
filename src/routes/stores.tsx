import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/vault/InfoPage";

export const Route = createFileRoute("/stores")({
  head: () => ({
    meta: [
      { title: "Store locations — The Vault Inc" },
      { name: "description", content: "Visit The Vault Inc at Junction Mall, Lavington, or order online with delivery across Kenya." },
      { property: "og:title", content: "Store locations — The Vault Inc" },
      { property: "og:description", content: "Visit The Vault Inc at Junction Mall, Lavington, or order online with delivery across Kenya." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <InfoPage slug="stores" />,
});

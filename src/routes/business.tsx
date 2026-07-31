import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/vault/InfoPage";

export const Route = createFileRoute("/business")({
  head: () => ({
    meta: [
      { title: "Business — The Vault Inc" },
      { name: "description", content: "Volume Apple purchasing, deployment and support for Kenyan businesses through The Vault Inc." },
      { property: "og:title", content: "Business — The Vault Inc" },
      { property: "og:description", content: "Volume Apple purchasing, deployment and support for Kenyan businesses through The Vault Inc." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <InfoPage slug="business" />,
});

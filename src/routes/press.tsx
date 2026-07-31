import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/vault/InfoPage";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press — The Vault Inc" },
      { name: "description", content: "Press resources, brand assets and media contacts for The Vault Inc." },
      { property: "og:title", content: "Press — The Vault Inc" },
      { property: "og:description", content: "Press resources, brand assets and media contacts for The Vault Inc." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <InfoPage slug="press" />,
});

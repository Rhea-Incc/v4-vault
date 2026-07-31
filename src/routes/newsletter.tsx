import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/vault/InfoPage";

export const Route = createFileRoute("/newsletter")({
  head: () => ({
    meta: [
      { title: "Newsletter — The Vault Inc" },
      { name: "description", content: "Subscribe to The Vault Inc newsletter for launch availability, restocks and offers." },
      { property: "og:title", content: "Newsletter — The Vault Inc" },
      { property: "og:description", content: "Subscribe to The Vault Inc newsletter for launch availability, restocks and offers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <InfoPage slug="newsletter" />,
});

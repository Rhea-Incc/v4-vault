import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/vault/InfoPage";

export const Route = createFileRoute("/financing")({
  head: () => ({
    meta: [
      { title: "Financing — The Vault Inc" },
      { name: "description", content: "Flexible instalment plans in Kenyan Shillings on Mac, iPhone and accessories from The Vault Inc." },
      { property: "og:title", content: "Financing — The Vault Inc" },
      { property: "og:description", content: "Flexible instalment plans in Kenyan Shillings on Mac, iPhone and accessories from The Vault Inc." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <InfoPage slug="financing" />,
});

import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/vault/InfoPage";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — The Vault Inc" },
      { name: "description", content: "Open roles and how to apply at The Vault Inc in Nairobi." },
      { property: "og:title", content: "Careers — The Vault Inc" },
      { property: "og:description", content: "Open roles and how to apply at The Vault Inc in Nairobi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <InfoPage slug="careers" />,
});

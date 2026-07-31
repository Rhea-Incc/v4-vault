import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/vault/InfoPage";

export const Route = createFileRoute("/applecare")({
  head: () => ({
    meta: [
      { title: "AppleCare+ — The Vault Inc" },
      { name: "description", content: "Add AppleCare+ cover to any device bought from The Vault Inc, with local claims handled in Nairobi." },
      { property: "og:title", content: "AppleCare+ — The Vault Inc" },
      { property: "og:description", content: "Add AppleCare+ cover to any device bought from The Vault Inc, with local claims handled in Nairobi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <InfoPage slug="applecare" />,
});

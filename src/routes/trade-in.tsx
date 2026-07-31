import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/vault/InfoPage";

export const Route = createFileRoute("/trade-in")({
  head: () => ({
    meta: [
      { title: "Trade In — The Vault Inc" },
      { name: "description", content: "Trade in your Apple device at The Vault Inc for instant credit towards your next Mac, iPhone, iPad or Watch in Nairobi." },
      { property: "og:title", content: "Trade In — The Vault Inc" },
      { property: "og:description", content: "Trade in your Apple device at The Vault Inc for instant credit towards your next Mac, iPhone, iPad or Watch in Nairobi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <InfoPage slug="trade-in" />,
});

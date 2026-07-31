import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/vault/InfoPage";

export const Route = createFileRoute("/newsroom")({
  head: () => ({
    meta: [
      { title: "Newsroom — The Vault Inc" },
      { name: "description", content: "Latest launches, availability updates and store news from The Vault Inc." },
      { property: "og:title", content: "Newsroom — The Vault Inc" },
      { property: "og:description", content: "Latest launches, availability updates and store news from The Vault Inc." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <InfoPage slug="newsroom" />,
});

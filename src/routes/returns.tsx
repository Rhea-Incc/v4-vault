import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/vault/InfoPage";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns — The Vault Inc" },
      { name: "description", content: "Return policy, timelines and how to start a return with The Vault Inc." },
      { property: "og:title", content: "Returns — The Vault Inc" },
      { property: "og:description", content: "Return policy, timelines and how to start a return with The Vault Inc." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <InfoPage slug="returns" />,
});

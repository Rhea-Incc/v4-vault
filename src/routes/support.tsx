import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/vault/InfoPage";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support — The Vault Inc" },
      { name: "description", content: "Get help with your Apple device: setup, diagnostics, data transfer and repairs at The Vault Inc." },
      { property: "og:title", content: "Support — The Vault Inc" },
      { property: "og:description", content: "Get help with your Apple device: setup, diagnostics, data transfer and repairs at The Vault Inc." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <InfoPage slug="support" />,
});

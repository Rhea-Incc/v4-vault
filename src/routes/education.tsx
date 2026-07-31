import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/vault/InfoPage";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Education — The Vault Inc" },
      { name: "description", content: "Education pricing and classroom deployment for schools and students from The Vault Inc." },
      { property: "og:title", content: "Education — The Vault Inc" },
      { property: "og:description", content: "Education pricing and classroom deployment for schools and students from The Vault Inc." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <InfoPage slug="education" />,
});

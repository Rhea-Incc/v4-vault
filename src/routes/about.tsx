import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/vault/InfoPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About us — The Vault Inc" },
      { name: "description", content: "The Vault Inc is an Apple Authorized Reseller in Nairobi, curating Mac, iPhone, iPad, Watch and accessories." },
      { property: "og:title", content: "About us — The Vault Inc" },
      { property: "og:description", content: "The Vault Inc is an Apple Authorized Reseller in Nairobi, curating Mac, iPhone, iPad, Watch and accessories." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <InfoPage slug="about" />,
});

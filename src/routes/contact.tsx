import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/vault/InfoPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — The Vault Inc" },
      { name: "description", content: "Contact The Vault Inc: call 0727 750 097 or +254 202-345-678, visit Junction Mall, Lavington, or email helloatlucene.co." },
      { property: "og:title", content: "Contact — The Vault Inc" },
      { property: "og:description", content: "Contact The Vault Inc: call 0727 750 097 or +254 202-345-678, visit Junction Mall, Lavington, or email helloatlucene.co." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <InfoPage slug="contact" />,
});

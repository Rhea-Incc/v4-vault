import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/vault/InfoPage";

export const Route = createFileRoute("/repair-status")({
  head: () => ({
    meta: [
      { title: "Repair status — The Vault Inc" },
      { name: "description", content: "Check the status of a repair booked with The Vault Inc service bar." },
      { property: "og:title", content: "Repair status — The Vault Inc" },
      { property: "og:description", content: "Check the status of a repair booked with The Vault Inc service bar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <InfoPage slug="repair-status" />,
});

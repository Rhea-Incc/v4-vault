import { createFileRoute, notFound } from "@tanstack/react-router";
import { FloatingNav } from "@/components/vault/FloatingNav";
import { Footer } from "@/components/vault/Footer";
import { ProductPage } from "@/components/vault/ProductPage";
import { ModelPage } from "@/components/vault/ModelPage";
import { IPHONES } from "@/lib/catalog";

export const Route = createFileRoute("/iphone/$model")({
  loader: ({ params }) => {
    const model = IPHONES.find((m) => m.slug === params.model);
    if (!model) throw notFound();
    return { model };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "iPhone not found — The Vault" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { model } = loaderData;
    const title = `${model.name} — ${model.tagline} | The Vault`;
    const description = `${model.name} at The Vault. ${model.chip}, ${model.display}, ${model.camera}. ${model.price}, free delivery and AppleCare+ available.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:image", content: model.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: model.image },
      ],
    };
  },
  component: IPhoneModelRoute,
});

function IPhoneModelRoute() {
  const { model } = Route.useLoaderData();

  return (
    <div className="min-h-dvh bg-background">
      <FloatingNav />
      <main>{model.slug === "17" ? <ProductPage /> : <ModelPage model={model} />}</main>
      <Footer />
    </div>
  );
}

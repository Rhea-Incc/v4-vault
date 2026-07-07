import innovation from "@/assets/innovation.asset.json";
import rear from "@/assets/rear-camera.asset.json";
import aiApps from "@/assets/ai-apps.asset.json";

export function ValueProps() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-32">
      <div className="mb-14 text-center">
        <p className="eyebrow mb-4">Why The Vault</p>
        <h2 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          An Apple Authorized Reseller,
          <br />
          <span className="text-muted-foreground">crafted for connoisseurs.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <TileLarge
          eyebrow="Trade In"
          title="Trade up. Effortlessly."
          body="Receive an instant estimate. Apply it toward something new."
          image={innovation.url}
        />
        <TileLarge
          eyebrow="AppleCare"
          title="Coverage, refined."
          body="Extended service and priority support, backed by Apple."
          image={rear.url}
          dark
        />
        <TileLarge
          eyebrow="Financing"
          title="Own it in months."
          body="0% APR available on eligible devices for qualified customers."
          image={aiApps.url}
        />
      </div>
    </section>
  );
}

function TileLarge({
  eyebrow,
  title,
  body,
  image,
  dark,
}: {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  dark?: boolean;
}) {
  return (
    <article
      className={`card-lift group relative overflow-hidden rounded-[1.75rem] ${
        dark ? "bg-foreground" : "bg-surface-elevated"
      }`}
      style={{ aspectRatio: "1 / 1.2" }}
    >
      <div className="relative z-10 p-8">
        <p
          className={`text-[11px] font-medium uppercase tracking-[0.16em] ${
            dark ? "text-background/60" : "text-muted-foreground"
          }`}
        >
          {eyebrow}
        </p>
        <h3
          className={`mt-3 text-2xl font-semibold tracking-tight sm:text-[28px] ${
            dark ? "text-background" : "text-foreground"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-3 max-w-[24ch] text-[15px] leading-relaxed ${
            dark ? "text-background/70" : "text-muted-foreground"
          }`}
        >
          {body}
        </p>
      </div>
      <img
        src={image}
        alt=""
        className="absolute inset-x-0 bottom-0 h-[58%] w-full object-cover"
      />
    </article>
  );
}

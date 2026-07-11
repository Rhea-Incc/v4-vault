import performance from "@/assets/performance.asset.json";
import macos from "@/assets/macos.asset.json";
import family from "@/assets/family.asset.json";
import delight from "@/assets/delight.asset.json";

type Feature = {
  eyebrow: string;
  name: string;
  tagline: string;
  price: string;
  image: string;
  tone?: "light" | "dark";
  span?: "wide" | "tall" | "square";
};

const features: Feature[] = [
  {
    eyebrow: "New",
    name: "iPhone 17 Pro",
    tagline: "Titanium. Reimagined.",
    price: "From $1,199",
    image: performance.url,
    tone: "dark",
    span: "wide",
  },
  {
    eyebrow: "Featured",
    name: "MacBook Pro M4",
    tagline: "Studio in a chip.",
    price: "From $1,999",
    image: macos.url,
    span: "square",
  },
  {
    eyebrow: "For Everyone",
    name: "iPad Air",
    tagline: "A world in your pocket.",
    price: "From $599",
    image: family.url,
    span: "square",
  },
  {
    eyebrow: "Delight",
    name: "iPhone 17",
    tagline: "Colors that spark joy.",
    price: "From $899",
    image: delight.url,
    span: "wide",
  },
];

export function FeaturedGrid() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-32">
      <div className="mb-14 flex items-end justify-between">
        <div>
          <p className="eyebrow mb-4">The Lineup</p>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Get the latest.
          </h2>
        </div>
        <button className="btn-pill hidden text-accent hover:bg-accent/8 sm:inline-flex">
          Shop all
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {features.map((f, i) => (
          <FeatureCard key={i} feature={f} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const isDark = feature.tone === "dark";
  return (
    <article
      className={`card-lift group relative overflow-hidden rounded-[2rem] ${
        isDark ? "bg-foreground" : "bg-surface-elevated"
      }`}
      style={{ aspectRatio: "1 / 1.15" }}
    >
      <div className="absolute inset-x-0 top-0 z-10 px-8 pt-10 text-center sm:pt-14">
        <p
          className={`text-[11px] font-medium uppercase tracking-[0.16em] ${
            isDark ? "text-background/60" : "text-muted-foreground"
          }`}
        >
          {feature.eyebrow}
        </p>
        <h3
          className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl ${
            isDark ? "text-background" : "text-foreground"
          }`}
        >
          {feature.name}
        </h3>
        <p
          className={`mt-2 text-base ${
            isDark ? "text-background/70" : "text-muted-foreground"
          }`}
        >
          {feature.tagline}
        </p>
        <p
          className={`mt-4 text-sm ${
            isDark ? "text-background/50" : "text-muted-foreground"
          }`}
        >
          {feature.price}
        </p>
        <div className="mt-5 flex items-center justify-center gap-2">
          <button
            className={`btn-pill h-9 px-4 text-sm ${
              isDark
                ? "bg-background text-foreground hover:bg-background/90"
                : "bg-foreground text-background hover:bg-foreground/90"
            }`}
          >
            Buy
          </button>
          <button
            className={`btn-pill h-9 px-4 text-sm ${
              isDark ? "text-background/90 hover:bg-background/10" : "text-accent hover:bg-accent/8"
            }`}
          >
            Learn more
          </button>
        </div>
      </div>
      <img
        src={feature.image}
        alt={feature.name}
        className="absolute inset-x-0 bottom-0 h-[62%] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
      />
    </article>
  );
}

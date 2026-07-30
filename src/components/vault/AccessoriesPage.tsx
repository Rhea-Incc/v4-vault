import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ACCESSORIES, type Accessory } from "@/lib/catalog";
import { SIZES } from "@/lib/media";
import { AccessoryQuickView } from "./AccessoryQuickView";
import { MediaReel } from "./MediaReel";
import { REELS } from "@/lib/catalog";
import { StockBadge } from "./AddToBag";

export function AccessoriesPage() {
  const [active, setActive] = useState<Accessory | null>(null);
  const categories = Array.from(new Set(ACCESSORIES.map((a) => a.category)));
  const [filter, setFilter] = useState<string>("All");
  const list = filter === "All" ? ACCESSORIES : ACCESSORIES.filter((a) => a.category === filter);

  return (
    <div className="pt-28 sm:pt-32">
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6">
        <p className="eyebrow mb-4">Accessories</p>
        <h1 className="hero-headline">Everything else.</h1>
        <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
          Power, audio, protection and coverage — curated to match the hardware
          you already love.
        </p>

        <div className="scrollbar-hide -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`btn-pill shrink-0 border border-hairline text-sm ${
                filter === c ? "bg-foreground text-background" : "hover:bg-surface-elevated"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16">
        <ul className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => setActive(a)}
                aria-haspopup="dialog"
                aria-label={`Quick view ${a.name}, ${a.price}`}
                className="card-lift group flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] bg-surface p-5 text-left sm:p-6"
              >
                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-surface-elevated via-surface to-surface-elevated">
                  <img
                    src={a.image}
                    alt={a.alt}
                    loading="lazy"
                    decoding="async"
                    sizes={SIZES.card}
                    width={800}
                    height={800}
                    className="aspect-square w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="pt-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {a.category}
                  </p>
                  <h2 className="mt-1 text-base font-medium">{a.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{a.price}</p>
                  <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{a.summary}</p>
                  <StockBadge slug={a.id} className="mt-3" />
                </div>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-12 overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]">
          <MediaReel
            src={REELS.four}
            label="Accessories in motion — studio reel"
            aspect="aspect-[4/5] sm:aspect-[16/9]"
          />
        </div>

        <div className="mt-12">
          <Link to="/iphone" className="btn-pill border border-hairline hover:bg-surface-elevated">
            Shop iPhone
          </Link>
        </div>
      </section>

      <AccessoryQuickView accessory={active} onClose={() => setActive(null)} />
    </div>
  );
}

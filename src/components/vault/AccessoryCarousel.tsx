import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ACCESSORIES, type Accessory } from "@/lib/catalog";
import { SIZES } from "@/lib/media";
import { AccessoryQuickView } from "./AccessoryQuickView";

export function AccessoryCarousel() {
  const [active, setActive] = useState<Accessory | null>(null);

  return (
    <section className="border-y border-hairline bg-surface">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 mb-8 sm:mb-10">
          <div className="min-w-0">
            <p className="eyebrow mb-3 sm:mb-4">Accessories</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Complete the setup.
            </h2>
          </div>
          <Link to="/accessories" className="btn-pill hidden shrink-0 text-accent hover:bg-accent/8 sm:inline-flex">
            Browse all
          </Link>
        </div>

        <ul className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6">
          {ACCESSORIES.map((a) => (
            <li key={a.id} className="shrink-0 snap-start">
              <button
                type="button"
                onClick={() => setActive(a)}
                aria-haspopup="dialog"
                aria-label={`Quick view ${a.name}, ${a.price}`}
                className="card-lift group flex h-[360px] w-[240px] flex-col overflow-hidden rounded-[1.5rem] bg-background p-5 text-left sm:h-[380px] sm:w-[260px] sm:p-6"
              >
                <div className="flex-1 overflow-hidden rounded-2xl bg-gradient-to-br from-surface-elevated via-surface to-surface-elevated">
                  <img
                    src={a.image}
                    alt={a.alt}
                    loading="lazy"
                    decoding="async"
                    sizes={SIZES.card}
                    width={800}
                    height={1000}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="pt-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {a.category}
                  </p>
                  <h3 className="mt-1 truncate text-base font-medium">{a.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{a.price}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>

        <Link to="/accessories" className="btn-pill mt-6 inline-flex text-accent hover:bg-accent/8 sm:hidden">
          Browse all accessories
        </Link>
      </div>

      <AccessoryQuickView accessory={active} onClose={() => setActive(null)} />
    </section>
  );
}

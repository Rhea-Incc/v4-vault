import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ACCESSORIES, IPHONES, type Model } from "@/lib/catalog";
import { SIZES } from "@/lib/media";

export function ModelPage({ model }: { model: Model }) {
  const [color, setColor] = useState(model.colors[0].name);
  const [storage, setStorage] = useState(model.storage[0]);
  const others = IPHONES.filter((m) => m.slug !== model.slug).slice(0, 4);

  return (
    <div className="pt-28 sm:pt-32">
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6">
        <div className="text-center">
          <p className="eyebrow mb-4">{model.year} · The Vault Certified</p>
          <h1 className="hero-headline">
            {model.name}.
            <br />
            <span className="text-muted-foreground">{model.tagline}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            {model.chip} · {model.display}
          </p>
        </div>
        <div className="relative mt-10 overflow-hidden rounded-[1.5rem] sm:mt-14 sm:rounded-[2rem]">
          <img
            src={model.image}
            alt={model.alt}
            sizes={SIZES.hero}
            width={1600}
            height={1000}
            fetchPriority="high"
            decoding="async"
            className="aspect-[4/3] w-full object-cover sm:aspect-[16/9]"
          />
        </div>
      </section>

      {/* Configure */}
      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-12">
          <div className="min-w-0">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">Configure.</h2>

            <fieldset className="mt-8">
              <legend className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Finish — {color}
              </legend>
              <div className="mt-4 flex flex-wrap gap-3">
                {model.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    aria-pressed={color === c.name}
                    aria-label={c.name}
                    className={`h-11 w-11 rounded-full border-2 transition-all ${
                      color === c.name ? "border-accent scale-105" : "border-hairline"
                    }`}
                    style={{ background: c.swatch }}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-8">
              <legend className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Storage
              </legend>
              <div className="mt-4 flex flex-wrap gap-3">
                {model.storage.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStorage(s)}
                    aria-pressed={storage === s}
                    className={`btn-pill min-h-11 border text-sm ${
                      storage === s
                        ? "border-accent text-accent"
                        : "border-hairline hover:bg-surface-elevated"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>

            <dl className="mt-10 divide-y divide-hairline border-t border-hairline text-sm">
              {[
                { label: "Chip", value: model.chip },
                { label: "Display", value: model.display },
                { label: "Camera", value: model.camera },
                { label: "Battery", value: model.battery },
                { label: "In the box", value: `${model.name} · USB-C charge cable · Documentation` },
              ].map((s) => (
                <div
                  key={s.label}
                  className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] sm:gap-4"
                >
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="min-w-0">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="glass-panel rounded-[1.5rem] p-6">
              <p className="eyebrow mb-3">Your configuration</p>
              <h3 className="text-xl font-semibold tracking-tight">{model.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {color} · {storage}
              </p>
              <p className="mt-6 text-2xl font-semibold">{model.price}</p>
              <button className="btn-pill mt-6 w-full bg-accent text-background hover:opacity-90">
                Add to Bag
              </button>
              <p className="mt-4 text-xs text-muted-foreground">
                Free delivery. AppleCare+ available at checkout.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-y border-hairline bg-surface">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">Highlights.</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {model.highlights.map((h) => (
              <li key={h.title}>
                <figure className="card-lift h-full overflow-hidden rounded-[1.5rem] bg-background">
                  <img
                    src={h.image}
                    alt={h.alt}
                    loading="lazy"
                    decoding="async"
                    sizes={SIZES.tile}
                    width={1400}
                    height={1000}
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <figcaption className="p-6">
                    <h3 className="text-lg font-medium">{h.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{h.body}</p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Accessories */}
      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-20">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <h2 className="min-w-0 text-2xl font-semibold tracking-tight sm:text-4xl">
            Pairs well with.
          </h2>
          <Link to="/accessories" className="btn-pill shrink-0 text-accent hover:bg-accent/8">
            All accessories
          </Link>
        </div>
        <ul className="mt-8 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">
          {ACCESSORIES.slice(0, 4).map((a) => (
            <li key={a.id}>
              <Link
                to="/accessories"
                className="card-lift flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-surface p-5"
              >
                <div className="overflow-hidden rounded-2xl bg-surface-elevated">
                  <img
                    src={a.image}
                    alt={a.alt}
                    loading="lazy"
                    decoding="async"
                    sizes={SIZES.card}
                    width={800}
                    height={800}
                    className="aspect-square w-full object-contain"
                  />
                </div>
                <div className="pt-4">
                  <h3 className="text-base font-medium">{a.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{a.price}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Compare */}
      <section className="border-t border-hairline bg-surface">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">Compare models.</h2>
          <ul className="mt-8 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">
            {others.map((m) => (
              <li key={m.slug}>
                <Link
                  to="/iphone/$model"
                  params={{ model: m.slug }}
                  className="card-lift flex h-full flex-col rounded-[1.5rem] bg-background p-6"
                >
                  <h3 className="text-lg font-semibold tracking-tight">{m.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.chip}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{m.camera}</p>
                  <p className="mt-auto pt-5 text-sm font-medium">{m.price}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

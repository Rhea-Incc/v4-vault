import { Link } from "@tanstack/react-router";
import { MACS, MEDIA } from "@/lib/catalog";
import { SIZES } from "@/lib/media";

export function MacPage() {
  return (
    <div className="pt-28 sm:pt-32">
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6">
        <p className="eyebrow mb-4">Mac</p>
        <h1 className="hero-headline">
          If you can dream it,
          <br />
          <span className="text-muted-foreground">Mac can do it.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
          Apple silicon across the lineup. Every Mac at The Vault ships
          configured, updated and ready on day one.
        </p>
        <div className="relative mt-10 overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]">
          <img
            src={MEDIA.macosHero}
            alt="macOS desktop shown on an Apple display"
            sizes={SIZES.hero}
            width={2000}
            height={1200}
            fetchPriority="high"
            decoding="async"
            className="aspect-[16/10] w-full object-cover sm:aspect-[21/9]"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-20">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">
          Explore the lineup.
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-3">
          {MACS.map((m) => (
            <li key={m.slug} id={m.slug} className="scroll-mt-28">
              <article className="card-lift flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-surface p-5 sm:p-6">
                <div className="overflow-hidden rounded-2xl bg-surface-elevated">
                  <img
                    src={m.image}
                    alt={m.alt}
                    loading="lazy"
                    decoding="async"
                    sizes={SIZES.tile}
                    width={1200}
                    height={800}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col pt-5">
                  <h3 className="text-xl font-semibold tracking-tight">{m.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.tagline}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                    {m.specs.map((s) => (
                      <li key={s} className="flex gap-2">
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span className="min-w-0">{s}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-5 text-sm font-medium">{m.price}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <figure className="overflow-hidden rounded-[1.5rem] bg-surface">
            <img
              src={MEDIA.macPerformance}
              alt="Apple silicon performance visualised on a Mac display"
              loading="lazy"
              decoding="async"
              sizes={SIZES.tile}
              width={1400}
              height={900}
              className="aspect-[16/10] w-full object-cover"
            />
            <figcaption className="p-6">
              <h3 className="text-lg font-medium">Performance without the fan noise.</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Apple silicon delivers desktop-class speed with all-day battery.
              </p>
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-[1.5rem] bg-surface">
            <img
              src={MEDIA.spotlight}
              alt="macOS Spotlight search open on a Mac"
              loading="lazy"
              decoding="async"
              sizes={SIZES.tile}
              width={1400}
              height={900}
              className="aspect-[16/10] w-full object-cover"
            />
            <figcaption className="p-6">
              <h3 className="text-lg font-medium">macOS, at your fingertips.</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Spotlight, Continuity and Handoff keep every device in step.
              </p>
            </figcaption>
          </figure>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link to="/accessories" className="btn-pill border border-hairline hover:bg-surface-elevated">
            Mac accessories
          </Link>
          <Link to="/iphone" className="btn-pill text-accent hover:bg-accent/8">
            Shop iPhone
          </Link>
        </div>
      </section>
    </div>
  );
}

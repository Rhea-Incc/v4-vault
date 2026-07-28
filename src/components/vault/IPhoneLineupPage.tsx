import { Link } from "@tanstack/react-router";
import { IPHONES, MEDIA } from "@/lib/catalog";
import { SIZES } from "@/lib/media";

export function IPhoneLineupPage() {
  return (
    <div className="pt-28 sm:pt-32">
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6">
        <p className="eyebrow mb-4">iPhone</p>
        <h1 className="hero-headline">
          Seven generations.
          <br />
          <span className="text-muted-foreground">One obsession.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
          From iPhone 11 to iPhone 17 — every model certified, unlocked and
          backed by The Vault.
        </p>
        <div className="relative mt-10 overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]">
          <img
            src={MEDIA.iosLineup}
            alt="Three iPhones showing Messages, the Lock Screen and the Home Screen"
            sizes={SIZES.hero}
            width={1600}
            height={1000}
            fetchPriority="high"
            decoding="async"
            className="aspect-[4/3] w-full object-cover sm:aspect-[16/9]"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-20">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">
          Choose your iPhone.
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {IPHONES.map((m) => (
            <li key={m.slug}>
              <Link
                to="/iphone/$model"
                params={{ model: m.slug }}
                className="card-lift flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-surface p-5 sm:p-6"
              >
                <div className="overflow-hidden rounded-2xl bg-surface-elevated">
                  <img
                    src={m.image}
                    alt={m.alt}
                    loading="lazy"
                    decoding="async"
                    sizes={SIZES.card}
                    width={1200}
                    height={900}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col pt-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {m.year}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight">{m.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.tagline}</p>
                  <p className="mt-auto pt-5 text-sm font-medium">{m.price}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-hairline bg-surface">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">Compare.</h2>
          <div className="scrollbar-hide mt-8 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <caption className="sr-only">iPhone generation comparison</caption>
              <thead>
                <tr className="border-b border-hairline text-muted-foreground">
                  <th scope="col" className="py-3 pr-4 font-medium">Model</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Chip</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Display</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Battery</th>
                  <th scope="col" className="py-3 font-medium">Price</th>
                </tr>
              </thead>
              <tbody>
                {IPHONES.map((m) => (
                  <tr key={m.slug} className="border-b border-hairline">
                    <th scope="row" className="py-4 pr-4 font-medium">{m.name}</th>
                    <td className="py-4 pr-4 text-muted-foreground">{m.chip}</td>
                    <td className="py-4 pr-4 text-muted-foreground">{m.display}</td>
                    <td className="py-4 pr-4 text-muted-foreground">{m.battery}</td>
                    <td className="py-4">{m.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

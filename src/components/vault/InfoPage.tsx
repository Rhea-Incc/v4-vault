import { Link } from "@tanstack/react-router";
import { FloatingNav } from "./FloatingNav";
import { Footer } from "./Footer";
import { CONTACT, PAGES, type PageSlug } from "@/lib/pages";

/**
 * Shared shell for every footer content page. Fluid across phone, tablet
 * and desktop: single column on small screens, two columns from md.
 */
export function InfoPage({ slug }: { slug: PageSlug }) {
  const page = PAGES[slug];

  return (
    <div className="min-h-dvh bg-background">
      <FloatingNav />
      <main className="mx-auto w-full max-w-[1100px] px-4 pb-24 pt-28 sm:px-6 sm:pt-36 md:pt-40">
        <p className="eyebrow mb-4">{page.eyebrow}</p>
        <h1 className="hero-headline text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          {page.title}
        </h1>
        <p className="mt-5 max-w-[52ch] text-base text-muted-foreground sm:text-lg">{page.intro}</p>

        {slug === "contact" && <ContactCard />}

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:gap-12">
          {page.sections.map((s) => (
            <section key={s.heading} className="min-w-0 rounded-3xl border border-hairline bg-surface p-6 sm:p-8">
              <h2 className="text-lg font-semibold tracking-tight sm:text-xl">{s.heading}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link to="/" className="btn-pill border border-hairline hover:bg-surface-elevated">
            Back to store
          </Link>
          {slug !== "contact" && (
            <Link to="/contact" className="btn-pill bg-accent text-background hover:opacity-90">
              Contact us
            </Link>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ContactCard() {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-3xl border border-hairline bg-surface p-6">
        <p className="eyebrow">Phone</p>
        <ul className="mt-3 space-y-1.5">
          {CONTACT.phones.map((p) => (
            <li key={p}>
              <a
                href={`tel:${p.replace(/\s/g, "")}`}
                className="text-base font-medium text-foreground transition-colors hover:text-accent"
              >
                {p}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-3xl border border-hairline bg-surface p-6">
        <p className="eyebrow">Location</p>
        <p className="mt-3 text-base font-medium">{CONTACT.location}</p>
        <p className="mt-1 text-sm text-muted-foreground">{CONTACT.hours}</p>
      </div>
      <div className="rounded-3xl border border-hairline bg-surface p-6 sm:col-span-2 lg:col-span-1">
        <p className="eyebrow">Email</p>
        <a
          href={`mailto:${CONTACT.email}`}
          className="mt-3 block break-all text-base font-medium text-foreground transition-colors hover:text-accent"
        >
          {CONTACT.email}
        </a>
      </div>
    </div>
  );
}

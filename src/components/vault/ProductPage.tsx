import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/product/iphone-hero.jpg.asset.json";
import cameraImg from "@/assets/product/rear-camera-macro.jpg.asset.json";
import lockscreenImg from "@/assets/product/lockscreen.jpg.asset.json";
import batteryImg from "@/assets/product/battery.jpg.asset.json";
import iosImg from "@/assets/product/ios-highlights.jpg.asset.json";
import securityImg from "@/assets/product/security.jpg.asset.json";
import esimImg from "@/assets/product/esim.jpg.asset.json";
import spotlightImg from "@/assets/product/spotlight.jpg.asset.json";
import macbookImg from "@/assets/product/macbook.jpg.asset.json";
import { mediaUrl, SIZES } from "@/lib/media";

const COLORS = [
  { id: "lavender", name: "Lavender", swatch: "oklch(0.82 0.08 300)" },
  { id: "graphite", name: "Graphite", swatch: "oklch(0.28 0.005 260)" },
  { id: "silver", name: "Silver", swatch: "oklch(0.92 0.003 260)" },
  { id: "midnight", name: "Midnight", swatch: "oklch(0.18 0.02 260)" },
  { id: "sky", name: "Sky Blue", swatch: "oklch(0.82 0.08 235)" },
];

const STORAGE = [
  { id: "128", size: "128GB", price: "$799" },
  { id: "256", size: "256GB", price: "$899" },
  { id: "512", size: "512GB", price: "$1,099" },
  { id: "1tb", size: "1TB", price: "$1,299" },
];

const GALLERY = [
  { src: mediaUrl(heroImg), caption: "Every angle, considered." },
  { src: mediaUrl(cameraImg), caption: "Three lenses. One system." },
  { src: mediaUrl(lockscreenImg), caption: "A canvas that responds." },
  { src: mediaUrl(batteryImg), caption: "All-day. And then some." },
  { src: mediaUrl(iosImg), caption: "iOS, reimagined." },
];

const SPECS = [
  { label: "Display", value: "6.3\" Super Retina XDR · ProMotion 120Hz" },
  { label: "Chip", value: "A19 Bionic · 6-core CPU · 5-core GPU · 16-core Neural Engine" },
  { label: "Camera", value: "48MP Fusion · 12MP Ultra Wide · 12MP Telephoto 3x" },
  { label: "Front Camera", value: "12MP TrueDepth · Center Stage" },
  { label: "Video", value: "4K Dolby Vision up to 60 fps · ProRes · Cinematic 4K" },
  { label: "Battery", value: "Up to 29 hrs video playback · MagSafe · USB-C fast charge" },
  { label: "Connectivity", value: "5G · Wi-Fi 7 · Bluetooth 5.4 · Thread · UWB" },
  { label: "Materials", value: "Aerospace-grade titanium · Ceramic Shield 2 front" },
  { label: "Water Resistance", value: "IP68 · 6m for 30 minutes" },
  { label: "In the Box", value: "iPhone · USB-C Charge Cable · Documentation" },
];

const RECOMMENDATIONS = [
  { name: "MagSafe Charger", tag: "Accessory", price: "$39", img: mediaUrl(macbookImg) },
  { name: "AirPods Pro", tag: "Audio", price: "$249", img: mediaUrl(iosImg) },
  { name: "Leather Case with MagSafe", tag: "Case", price: "$59", img: mediaUrl(lockscreenImg) },
  { name: "20W USB-C Adapter", tag: "Power", price: "$19", img: mediaUrl(batteryImg) },
];

const COMPARE = [
  { name: "iPhone 17", chip: "A19", camera: "48MP · 3x tele", battery: "29 hrs", price: "From $799" },
  { name: "iPhone 17 Pro", chip: "A19 Pro", camera: "48MP · 5x tele", battery: "33 hrs", price: "From $1,099" },
  { name: "iPhone Air", chip: "A19", camera: "48MP Fusion", battery: "27 hrs", price: "From $699" },
];

export function ProductPage() {
  const [color, setColor] = useState(COLORS[0].id);
  const [storage, setStorage] = useState(STORAGE[1].id);
  const [activeShot, setActiveShot] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const kids = Array.from(el.children) as HTMLElement[];
      const mid = el.scrollTop + el.clientHeight / 2;
      let best = 0;
      let bestD = Infinity;
      kids.forEach((k, i) => {
        const d = Math.abs(k.offsetTop + k.clientHeight / 2 - mid);
        if (d < bestD) { bestD = d; best = i; }
      });
      setActiveShot(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const selectedStorage = useMemo(() => STORAGE.find((s) => s.id === storage)!, [storage]);

  return (
    <div className="pt-28">
      {/* Massive hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="flex flex-col items-center text-center animate-rise">
            <p className="eyebrow mb-6">New · The Vault Exclusive</p>
            <h1 className="hero-headline">
              iPhone 17.
              <br />
              <span className="text-muted-foreground">Precision, refined.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground sm:text-xl">
              Titanium construction. A19 Bionic. A camera system that sees what you see.
            </p>
          </div>
          <div className="relative mt-14 animate-fade">
            <div className="absolute inset-x-0 -bottom-10 top-8 -z-10 rounded-[3rem] bg-gradient-to-b from-surface-elevated to-transparent" />
            <img
              src={mediaUrl(heroImg)}
              alt="iPhone 17"
              className="mx-auto w-full max-w-[1100px] rounded-[2rem]"
            />
          </div>
        </div>
      </section>

      {/* Sticky gallery + buy panel */}
      <section className="mx-auto mt-24 max-w-[1440px] px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Sticky gallery scroller */}
          <div className="relative">
            <div
              ref={scrollerRef}
              className="scrollbar-hide sticky top-28 h-[calc(100dvh-9rem)] snap-y snap-mandatory overflow-y-auto rounded-[2rem] bg-surface-elevated"
            >
              {GALLERY.map((g, i) => (
                <figure key={i} className="relative flex h-full min-h-full snap-start items-center justify-center p-6">
                  <img src={g.src} alt={g.caption} className="max-h-full w-full rounded-[1.5rem] object-cover" />
                  <figcaption className="absolute inset-x-0 bottom-6 text-center text-sm text-muted-foreground">
                    {g.caption}
                  </figcaption>
                </figure>
              ))}
              <div className="pointer-events-none absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-2">
                {GALLERY.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                      activeShot === i ? "bg-foreground" : "bg-foreground/25"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Buy panel */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="space-y-10 rounded-[2rem] border border-hairline bg-background p-8">
              <div>
                <p className="eyebrow mb-3">Configure</p>
                <h2 className="text-3xl font-semibold tracking-tight">Build your iPhone.</h2>
              </div>

              <div>
                <div className="mb-4 flex items-baseline justify-between">
                  <p className="text-sm font-medium">Finish</p>
                  <p className="text-sm text-muted-foreground">
                    {COLORS.find((c) => c.id === color)?.name}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {COLORS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setColor(c.id)}
                      aria-label={c.name}
                      className={`relative h-11 w-11 rounded-full border transition-all duration-300 ${
                        color === c.id
                          ? "border-foreground ring-2 ring-foreground/15 ring-offset-2 ring-offset-background"
                          : "border-hairline hover:border-foreground/40"
                      }`}
                      style={{ background: c.swatch }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-4 text-sm font-medium">Storage</p>
                <div className="space-y-2">
                  {STORAGE.map((s) => {
                    const on = storage === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setStorage(s.id)}
                        className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                          on ? "border-foreground bg-surface" : "border-hairline hover:border-foreground/40"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`grid h-5 w-5 place-items-center rounded-full border ${
                              on ? "border-foreground bg-foreground" : "border-hairline"
                            }`}
                          >
                            {on && <Check className="h-3 w-3 text-background" strokeWidth={3} />}
                          </span>
                          <span className="text-sm font-medium">{s.size}</span>
                        </span>
                        <span className="text-sm text-muted-foreground">{s.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-hairline pt-6">
                <div className="mb-5 flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="text-2xl font-semibold tracking-tight">{selectedStorage.price}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="btn-pill w-full bg-foreground text-background hover:bg-foreground/90">
                    Add to Bag
                  </button>
                  <button className="btn-pill w-full text-accent hover:bg-accent/8">
                    Reserve in-store <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                </div>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Free delivery · 14-day returns · AppleCare+ available
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Feature strip */}
      <section className="mx-auto mt-32 max-w-[1440px] px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { img: mediaUrl(securityImg), title: "Private by design.", body: "On-device intelligence keeps your data yours." },
            { img: mediaUrl(esimImg), title: "eSIM, everywhere.", body: "Switch carriers and travel plans in seconds." },
            { img: mediaUrl(spotlightImg), title: "Find it, instantly.", body: "System-wide search meets ambient intelligence." },
          ].map((f) => (
            <article key={f.title} className="card-lift overflow-hidden rounded-[2rem] bg-surface-elevated">
              <img src={f.img} alt="" className="h-64 w-full object-cover" />
              <div className="p-8">
                <h3 className="text-2xl font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-muted-foreground">{f.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Specs */}
      <section className="mx-auto mt-32 max-w-[1100px] px-6">
        <div className="mb-14 text-center">
          <p className="eyebrow mb-4">Specifications</p>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">The details.</h2>
        </div>
        <dl className="divide-y divide-hairline border-y border-hairline">
          {SPECS.map((s) => (
            <div key={s.label} className="grid gap-2 py-6 sm:grid-cols-[220px_1fr] sm:gap-8">
              <dt className="text-sm font-medium text-muted-foreground">{s.label}</dt>
              <dd className="text-base">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Compare */}
      <section className="mx-auto mt-32 max-w-[1440px] px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-4">Compare</p>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Which iPhone is right for you?</h2>
          </div>
          <button className="btn-pill hidden text-accent hover:bg-accent/8 sm:inline-flex">
            View all <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {COMPARE.map((c, i) => (
            <article
              key={c.name}
              className={`card-lift rounded-[2rem] border p-8 ${
                i === 0 ? "border-foreground bg-surface" : "border-hairline bg-background"
              }`}
            >
              <div className="mb-6 grid aspect-square place-items-center rounded-[1.25rem] bg-surface-elevated">
                <Sparkles className="h-10 w-10 text-muted-foreground" strokeWidth={1.2} />
              </div>
              <h3 className="text-xl font-semibold tracking-tight">{c.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.price}</p>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Chip</dt>
                  <dd className="text-right">{c.chip}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Camera</dt>
                  <dd className="text-right">{c.camera}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Battery</dt>
                  <dd className="text-right">{c.battery}</dd>
                </div>
              </dl>
              <button className="btn-pill mt-8 h-10 w-full bg-foreground text-background hover:bg-foreground/90">
                Learn more
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section className="mx-auto mt-32 max-w-[1440px] px-6 pb-32">
        <div className="mb-10">
          <p className="eyebrow mb-4">Complete the setup</p>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Recommended for you.</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {RECOMMENDATIONS.map((r) => (
            <article
              key={r.name}
              className="card-lift group overflow-hidden rounded-[1.5rem] bg-surface-elevated"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={r.img}
                  alt={r.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {r.tag}
                </p>
                <h3 className="mt-1 text-base font-medium">{r.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.price}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

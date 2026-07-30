import { ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { MEDIA, REELS } from "@/lib/catalog";
import { SIZES } from "@/lib/media";
import { MediaReel } from "./MediaReel";

type Cat = {
  name: string;
  tagline: string;
  image: string;
  alt: string;
  to?: "/mac" | "/iphone" | "/accessories";
};

const categories: Cat[] = [
  {
    name: "Mac",
    tagline: "Supercharged for pros.",
    to: "/mac",
    image: MEDIA.macbook,
    alt: "MacBook Pro open on a desk",
  },
  {
    name: "iPhone",
    tagline: "Designed to be loved.",
    to: "/iphone",
    image: MEDIA.iphoneHero,
    alt: "iPhone shown from the front and back",
  },
  {
    name: "iPad",
    tagline: "Lovable. Drawable. Magical.",
    image: MEDIA.iosTrio,
    alt: "Three Apple displays showing Messages, the Lock Screen and a calendar",
  },
  {
    name: "Watch",
    tagline: "A healthy leap ahead.",
    image: MEDIA.watchFace,
    alt: "Apple Watch with a black sport band showing a mirrored numeric watch face",
  },
  {
    name: "Watch Bands",
    tagline: "Change your look.",
    image: MEDIA.watchClose,
    alt: "Close-up of an Apple Watch display showing the time",
  },
  {
    name: "AirPods",
    tagline: "Sound, elevated.",
    image: MEDIA.airpodsPods,
    alt: "A pair of AirPods Pro earbuds",
  },
  {
    name: "AirPods Max",
    tagline: "Ultimate listening.",
    image: MEDIA.airpodsMax,
    alt: "AirPods Max over-ear headphones in silver",
  },
  {
    name: "Studio Audio",
    tagline: "Made for the mix.",
    image: MEDIA.headphonesOverEar,
    alt: "Black over-ear studio headphones hanging by their cable",
  },
  {
    name: "Accessories",
    tagline: "Complete the setup.",
    to: "/accessories",
    image: MEDIA.usbcEnds,
    alt: "Two USB-C connector ends with a coiled white cable",
  },
];

export function CategoryRail() {
  return (
    <section className="border-y border-hairline bg-surface">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 mb-8 sm:mb-10">
          <div className="min-w-0">
            <p className="eyebrow mb-3 sm:mb-4">Shop by Category</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Explore the family.
            </h2>
          </div>
          <p className="hidden shrink-0 text-sm text-muted-foreground sm:block">
            Scroll the library →
          </p>
        </div>

        <ul className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6">
          {categories.map((c) => (
            <li key={c.name} className="shrink-0 snap-start">
              <Link
                to={c.to ?? "/"}
                className="card-lift group flex h-[340px] w-[240px] flex-col overflow-hidden rounded-[1.75rem] bg-background text-left sm:h-[380px] sm:w-[280px]"
              >
                <div className="h-[190px] overflow-hidden bg-surface-elevated sm:h-[220px]">
                  <img
                    src={c.image}
                    alt={c.alt}
                    loading="lazy"
                    decoding="async"
                    sizes={SIZES.card}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col p-6">
                  <h3 className="truncate text-xl font-semibold tracking-tight">{c.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{c.tagline}</p>
                  <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-accent">
                    Shop
                    <ChevronRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={2}
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem]">
          <MediaReel
            src={REELS.one}
            label="The Vault in motion — flagship reel"
            aspect="aspect-[4/5] sm:aspect-[21/9]"
          />
        </div>
      </div>
    </section>
  );
}

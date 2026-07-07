import { ChevronRight } from "lucide-react";

type Cat = { name: string; tagline: string; };

const categories: Cat[] = [
  { name: "Mac", tagline: "Supercharged for pros." },
  { name: "iPhone", tagline: "Designed to be loved." },
  { name: "iPad", tagline: "Lovable. Drawable. Magical." },
  { name: "Watch", tagline: "A healthy leap ahead." },
  { name: "AirPods", tagline: "Sound, elevated." },
  { name: "TV & Home", tagline: "Entertainment, curated." },
  { name: "Accessories", tagline: "Complete the setup." },
];

export function CategoryRail() {
  return (
    <section className="border-y border-hairline bg-surface">
      <div className="mx-auto max-w-[1440px] px-6 py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-4">Shop by Category</p>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Explore the family.
            </h2>
          </div>
        </div>

        <div className="scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4">
          {categories.map((c) => (
            <button
              key={c.name}
              className="card-lift group relative flex h-[360px] w-[280px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[1.75rem] bg-background p-8 text-left"
            >
              <div>
                <p className="eyebrow mb-3">Category</p>
                <h3 className="text-2xl font-semibold tracking-tight">
                  {c.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {c.tagline}
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-accent">
                Shop
                <ChevronRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </div>
              <div
                aria-hidden
                className="absolute inset-x-8 bottom-24 top-24 -z-0 rounded-full bg-gradient-to-br from-surface-elevated via-transparent to-accent/10 opacity-70 blur-2xl"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

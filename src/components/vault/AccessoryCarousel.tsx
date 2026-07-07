const ACCESSORIES = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  name: "{{Product Name}}",
  category: "{{Category}}",
  price: "{{Price}}",
}));

export function AccessoryCarousel() {
  return (
    <section className="border-y border-hairline bg-surface">
      <div className="mx-auto max-w-[1440px] px-6 py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-4">Accessories</p>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Complete the setup.
            </h2>
          </div>
          <button className="btn-pill hidden text-accent hover:bg-accent/8 sm:inline-flex">
            Browse all
          </button>
        </div>

        <div className="scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4">
          {ACCESSORIES.map((a) => (
            <article
              key={a.id}
              className="card-lift group flex h-[380px] w-[260px] shrink-0 snap-start flex-col overflow-hidden rounded-[1.5rem] bg-background p-6"
            >
              <div className="flex-1 rounded-2xl bg-gradient-to-br from-surface-elevated via-surface to-surface-elevated" />
              <div className="pt-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {a.category}
                </p>
                <h3 className="mt-1 text-base font-medium">{a.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.price}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

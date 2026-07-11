import magsafe from "@/assets/accessories/magsafe.jpg.asset.json";
import airpods from "@/assets/accessories/airpods.jpg.asset.json";
import caseImg from "@/assets/accessories/case.jpg.asset.json";
import watchband from "@/assets/accessories/watchband.jpg.asset.json";
import cable from "@/assets/accessories/cable.jpg.asset.json";
import keyboard from "@/assets/accessories/keyboard.jpg.asset.json";
import display from "@/assets/accessories/display.jpg.asset.json";
import applecare from "@/assets/accessories/applecare.jpg.asset.json";

const ACCESSORIES = [
  { id: 0, name: "MagSafe Charger", category: "Power", price: "$39", image: magsafe.url },
  { id: 1, name: "AirPods Pro 2", category: "Audio", price: "$249", image: airpods.url },
  { id: 2, name: "FineWoven Case", category: "Cases", price: "$59", image: caseImg.url },
  { id: 3, name: "Apple Watch Band", category: "Wearables", price: "$49", image: watchband.url },
  { id: 4, name: "USB-C to Lightning", category: "Cables", price: "$19", image: cable.url },
  { id: 5, name: "Magic Keyboard", category: "Input", price: "$129", image: keyboard.url },
  { id: 6, name: "Studio Display Stand", category: "Displays", price: "$399", image: display.url },
  { id: 7, name: "AppleCare+", category: "Coverage", price: "$199", image: applecare.url },
];

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
              <div className="flex-1 overflow-hidden rounded-2xl bg-gradient-to-br from-surface-elevated via-surface to-surface-elevated">
                <img
                  src={a.image}
                  alt={a.name}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
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

import { useEffect } from "react";
import { X } from "lucide-react";
import { SIZES } from "@/lib/media";
import type { Accessory } from "@/lib/catalog";
import { AddToBag } from "./AddToBag";

export function AccessoryQuickView({
  accessory,
  onClose,
}: {
  accessory: Accessory | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!accessory) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [accessory, onClose]);

  if (!accessory) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        aria-label="Close quick view"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-background/70 backdrop-blur-md"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quickview-title"
        className="glass-panel relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-[2rem] p-5 sm:rounded-[2rem] sm:p-8"
      >
        <button
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-surface-elevated hover:text-foreground"
        >
          <X className="h-5 w-5" strokeWidth={1.6} />
        </button>

        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
          <div className="overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-surface-elevated via-surface to-surface-elevated">
            <img
              src={accessory.image}
              alt={accessory.alt}
              sizes={SIZES.modal}
              width={1000}
              height={1000}
              className="aspect-square h-full w-full object-contain"
            />
          </div>

          <div className="min-w-0">
            <p className="eyebrow mb-3">{accessory.category}</p>
            <h2
              id="quickview-title"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              {accessory.name}
            </h2>
            <p className="mt-2 text-lg font-medium">{accessory.price}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {accessory.summary}
            </p>

            <div className="mt-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                In the box
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {accessory.inTheBox.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span className="min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <dl className="mt-6 divide-y divide-hairline border-t border-hairline text-sm">
              {accessory.specs.map((s) => (
                <div key={s.label} className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] gap-3 py-3">
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="min-w-0">{s.value}</dd>
                </div>
              ))}
            </dl>

            <AddToBag
              className="mt-6"
              slug={accessory.id}
              name={accessory.name}
              fallbackKes={accessory.priceKes}
              image={accessory.image}
              showPrice
            />
          </div>
        </div>
      </div>
    </div>
  );
}

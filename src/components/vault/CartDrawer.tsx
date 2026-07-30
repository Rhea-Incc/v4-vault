import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { formatKes } from "@/lib/pricing";

/** Slide-over bag with KES totals and a route into checkout. */
export function CartDrawer() {
  const { items, open, setOpen, subtotalKes, setQty, remove, count } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <button
        aria-label="Close bag"
        onClick={() => setOpen(false)}
        className="absolute inset-0 cursor-default bg-background/70 backdrop-blur-md"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        className="glass-panel relative flex h-dvh w-full max-w-md flex-col overflow-hidden sm:m-3 sm:h-[calc(100dvh-1.5rem)] sm:rounded-[1.75rem]"
      >
        <header className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <h2 className="text-lg font-semibold tracking-tight">
            Your bag {count > 0 && <span className="text-muted-foreground">({count})</span>}
          </h2>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close bag"
            className="grid h-11 w-11 place-items-center rounded-full text-foreground/70 hover:bg-surface-elevated hover:text-foreground"
          >
            <X className="h-5 w-5" strokeWidth={1.6} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-sm text-muted-foreground">
              Your bag is empty. Everything you add shows up here.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map((i) => (
                <li key={i.key} className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-4">
                  <div className="overflow-hidden rounded-xl bg-surface-elevated">
                    {i.image ? (
                      <img
                        src={i.image}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        width={200}
                        height={200}
                        className="aspect-square w-full object-cover"
                      />
                    ) : (
                      <div className="aspect-square w-full" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{i.name}</p>
                    {i.variant && (
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {Object.values(i.variant).join(" · ")}
                      </p>
                    )}
                    <p className="mt-1 text-sm">{formatKes(i.priceKes * i.qty)}</p>
                    <div className="mt-2 flex items-center gap-1">
                      <button
                        aria-label={`Decrease quantity of ${i.name}`}
                        onClick={() => setQty(i.key, i.qty - 1)}
                        className="grid h-9 w-9 place-items-center rounded-full border border-hairline hover:bg-surface-elevated"
                      >
                        <Minus className="h-4 w-4" strokeWidth={1.6} />
                      </button>
                      <span className="w-8 text-center text-sm" aria-live="polite">
                        {i.qty}
                      </span>
                      <button
                        aria-label={`Increase quantity of ${i.name}`}
                        onClick={() => setQty(i.key, i.qty + 1)}
                        className="grid h-9 w-9 place-items-center rounded-full border border-hairline hover:bg-surface-elevated"
                      >
                        <Plus className="h-4 w-4" strokeWidth={1.6} />
                      </button>
                      <button
                        aria-label={`Remove ${i.name}`}
                        onClick={() => remove(i.key)}
                        className="ml-auto grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.6} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-hairline px-5 py-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-lg font-semibold">{formatKes(subtotalKes)}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Free delivery countrywide. Taxes included.
          </p>
          <Link
            to="/checkout"
            onClick={() => setOpen(false)}
            aria-disabled={items.length === 0}
            className={`btn-pill mt-4 w-full justify-center bg-accent text-background hover:opacity-90 ${
              items.length === 0 ? "pointer-events-none opacity-40" : ""
            }`}
          >
            Checkout
          </Link>
        </footer>
      </aside>
    </div>
  );
}

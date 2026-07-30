import { useAvailability } from "@/lib/store";
import { useCart } from "@/lib/cart";
import { formatKes } from "@/lib/pricing";

/**
 * The single purchase control used across the storefront. Availability comes
 * straight from the admin database, so unavailable listings can never be
 * added to the bag.
 */
export function AddToBag({
  slug,
  name,
  fallbackKes,
  image,
  variant,
  className = "",
  showPrice = false,
}: {
  slug: string;
  name: string;
  fallbackKes: number;
  image?: string;
  variant?: Record<string, string>;
  className?: string;
  showPrice?: boolean;
}) {
  const availability = useAvailability(slug);
  const cart = useCart();
  const priceKes = availability.priceKes ?? fallbackKes;

  return (
    <div className={className}>
      <button
        type="button"
        disabled={!availability.purchasable}
        onClick={() =>
          cart.add({
            slug,
            name,
            priceKes,
            image,
            variant,
          })
        }
        className="btn-pill w-full bg-accent text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {availability.loading
          ? "Checking stock…"
          : availability.purchasable
            ? showPrice
              ? `Add to Bag · ${formatKes(priceKes)}`
              : "Add to Bag"
            : availability.label === "Sold out"
              ? "Sold out"
              : "Unavailable"}
      </button>
      <StockBadge slug={slug} className="mt-3" />
    </div>
  );
}

/** Live stock status pulled from the admin-managed catalog. */
export function StockBadge({ slug, className = "" }: { slug: string; className?: string }) {
  const { loading, label, purchasable } = useAvailability(slug);
  if (loading) return null;
  return (
    <p className={`flex items-center gap-2 text-xs text-muted-foreground ${className}`}>
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${purchasable ? "bg-accent" : "bg-muted-foreground/50"}`}
      />
      {label}
    </p>
  );
}

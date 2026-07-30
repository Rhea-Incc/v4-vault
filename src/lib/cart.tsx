import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * The bag. Persisted to localStorage so it survives reloads, and hydrated
 * only after mount so server and client markup always agree.
 */
export type CartItem = {
  /** Stable line key: product slug + variant signature. */
  key: string;
  slug: string;
  name: string;
  priceKes: number;
  image?: string;
  variant?: Record<string, string>;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotalKes: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (item: Omit<CartItem, "key" | "qty">, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "vault-cart-v1";

function lineKey(slug: string, variant?: Record<string, string>) {
  const sig = variant
    ? Object.keys(variant)
        .sort()
        .map((k) => `${k}:${variant[k]}`)
        .join("|")
    : "";
  return sig ? `${slug}__${sig}` : slug;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage may be unavailable */
    }
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotalKes = items.reduce((n, i) => n + i.qty * i.priceKes, 0);
    return {
      items,
      count,
      subtotalKes,
      open,
      setOpen,
      add: (item, qty = 1) => {
        const key = lineKey(item.slug, item.variant);
        setItems((prev) => {
          const found = prev.find((p) => p.key === key);
          if (found) return prev.map((p) => (p.key === key ? { ...p, qty: p.qty + qty, priceKes: item.priceKes } : p));
          return [...prev, { ...item, key, qty }];
        });
        setOpen(true);
      },
      setQty: (key, qty) =>
        setItems((prev) =>
          qty <= 0 ? prev.filter((p) => p.key !== key) : prev.map((p) => (p.key === key ? { ...p, qty } : p)),
        ),
      remove: (key) => setItems((prev) => prev.filter((p) => p.key !== key)),
      clear: () => setItems([]),
    };
  }, [items, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

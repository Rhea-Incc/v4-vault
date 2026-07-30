import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatKes, fromKes } from "@/lib/pricing";

export type StoreProduct = {
  id: string;
  category: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  price_kes: number;
  compare_at_kes: number | null;
  image_url: string | null;
  in_stock: boolean;
  sort_order: number;
  is_published: boolean;
  /** Staged edits awaiting publication, managed in the admin console. */
  draft?: Record<string, unknown> | null;
};

const SELECT =
  "id, category, slug, name, tagline, description, price_kes, compare_at_kes, image_url, in_stock, sort_order, is_published, draft";

/* ------------------------------------------------------------------ */
/* Draft preview mode                                                  */
/* ------------------------------------------------------------------ */

const PREVIEW_KEY = "vault-preview-mode";
const PREVIEW_EVENT = "vault-preview-change";

export function setPreviewMode(on: boolean) {
  try {
    localStorage.setItem(PREVIEW_KEY, on ? "1" : "0");
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(PREVIEW_EVENT));
}

/** True when the viewer has opted into seeing staged (unpublished) changes. */
export function usePreviewMode(): boolean {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const read = () => {
      try {
        setOn(localStorage.getItem(PREVIEW_KEY) === "1");
      } catch {
        setOn(false);
      }
    };
    read();
    window.addEventListener(PREVIEW_EVENT, read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener(PREVIEW_EVENT, read);
      window.removeEventListener("storage", read);
    };
  }, []);
  return on;
}

/** Whether the signed-in viewer is admin or super admin. */
export function useIsStaff() {
  return useQuery({
    queryKey: ["is-staff"],
    staleTime: 5 * 60_000,
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) return false;
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid);
      const roles = (data ?? []).map((r) => r.role as string);
      return roles.includes("admin") || roles.includes("super_admin");
    },
  });
}

/** Apply a product's staged draft on top of its live values. */
export function withDraft(p: StoreProduct): StoreProduct {
  const draft = (p.draft ?? {}) as Partial<StoreProduct>;
  return Object.keys(draft).length ? ({ ...p, ...draft } as StoreProduct) : p;
}

export function hasDraft(p: StoreProduct): boolean {
  return Object.keys((p.draft ?? {}) as object).length > 0;
}

/* ------------------------------------------------------------------ */
/* Catalog                                                             */
/* ------------------------------------------------------------------ */

/** Raw rows, exactly as stored (used by the admin console). */
export function useAdminProducts(enabled = true) {
  return useQuery({
    queryKey: ["admin-products"],
    enabled,
    queryFn: async (): Promise<StoreProduct[]> => {
      const { data, error } = await supabase.from("products").select(SELECT).order("category").order("sort_order");
      if (error) throw error;
      return (data ?? []) as unknown as StoreProduct[];
    },
  });
}

/**
 * Live catalog as the storefront should see it. In preview mode (staff only)
 * staged drafts are applied and unpublished listings are included.
 */
export function useStoreProducts() {
  const preview = usePreviewMode();
  const staff = useIsStaff();
  const previewing = preview && staff.data === true;

  return useQuery({
    queryKey: ["store-products", previewing],
    staleTime: 60_000,
    queryFn: async (): Promise<StoreProduct[]> => {
      const { data, error } = await supabase.from("products").select(SELECT).order("category").order("sort_order");
      if (error) throw error;
      const rows = (data ?? []) as unknown as StoreProduct[];
      if (!previewing) return rows.filter((r) => r.is_published);
      return rows.map(withDraft);
    },
  });
}

/** Map of slug -> price in KES, for quick lookups in listing views. */
export function usePriceMap() {
  const { data } = useStoreProducts();
  const map: Record<string, number> = {};
  for (const p of data ?? []) map[p.slug] = p.price_kes;
  return map;
}

export type Availability = {
  loading: boolean;
  /** The catalog row backing this slug, if any. */
  product?: StoreProduct;
  priceKes?: number;
  /** True when the item can be added to the bag. */
  purchasable: boolean;
  /** Human label: "In stock", "Sold out", "Not available". */
  label: string;
};

/**
 * Live stock status from the admin database. iPhone variants (e.g. `17-pro`)
 * fall back to their generation listing (`17`) when they have no own row.
 */
export function useAvailability(slug: string): Availability {
  const { data, isLoading } = useStoreProducts();
  const rows = data ?? [];
  const exact = rows.find((p) => p.slug === slug);
  const base = exact ?? rows.find((p) => p.slug === slug.split("-")[0]);

  if (isLoading) return { loading: true, purchasable: false, label: "Checking stock…" };
  if (!base) return { loading: false, purchasable: false, label: "Not available" };

  const purchasable = base.in_stock && (base.is_published || false);
  return {
    loading: false,
    product: base,
    priceKes: exact?.price_kes ?? base.price_kes,
    purchasable,
    label: !base.is_published ? "Not available" : base.in_stock ? "In stock" : "Sold out",
  };
}

/**
 * Resolve a display price for a product slug, preferring the admin-managed
 * price and falling back to the bundled catalog value until it loads.
 */
export function livePrice(
  map: Record<string, number>,
  slug: string,
  fallback: string,
  opts: { from?: boolean } = {},
): string {
  const kes = map[slug];
  if (kes == null) return fallback;
  return opts.from ? fromKes(kes) : formatKes(kes);
}

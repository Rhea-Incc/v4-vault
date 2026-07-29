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
};

const SELECT =
  "id, category, slug, name, tagline, description, price_kes, compare_at_kes, image_url, in_stock, sort_order, is_published";

/** Live catalog pricing, managed by the super admin in the backoffice. */
export function useStoreProducts() {
  return useQuery({
    queryKey: ["store-products"],
    staleTime: 60_000,
    queryFn: async (): Promise<StoreProduct[]> => {
      const { data, error } = await supabase
        .from("products")
        .select(SELECT)
        .order("category")
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as StoreProduct[];
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

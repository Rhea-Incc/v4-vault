import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FloatingNav } from "@/components/vault/FloatingNav";
import { Footer } from "@/components/vault/Footer";
import { formatKes } from "@/lib/pricing";
import type { StoreProduct } from "@/lib/store";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminRoute,
});

type Draft = Partial<
  Pick<
    StoreProduct,
    "name" | "tagline" | "description" | "price_kes" | "in_stock" | "is_published" | "sort_order" | "image_url"
  >
>;

function AdminRoute() {
  const qc = useQueryClient();
  const [tab, setTab] = useState<"catalog" | "orders">("catalog");
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [notice, setNotice] = useState<string | null>(null);

  const access = useQuery({
    queryKey: ["admin-access"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) return { staff: false };
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid);
      const roles = (data ?? []).map((r) => r.role as string);
      return { staff: roles.includes("admin") || roles.includes("super_admin") };
    },
  });

  const products = useQuery({
    queryKey: ["admin-products"],
    enabled: access.data?.staff === true,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          "id, category, slug, name, tagline, description, price_kes, compare_at_kes, image_url, in_stock, sort_order, is_published",
        )
        .order("category")
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as StoreProduct[];
    },
  });

  const orders = useQuery({
    queryKey: ["admin-orders"],
    enabled: access.data?.staff === true && tab === "orders",
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(
          "id, order_number, status, total_kes, delivery_status, courier, tracking_number, estimated_delivery, created_at",
        )
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const save = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Draft }) => {
      const { error } = await supabase.from("products").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_d, vars) => {
      setDrafts((prev) => {
        const next = { ...prev };
        delete next[vars.id];
        return next;
      });
      setNotice("Saved. The storefront now shows the new details.");
      void qc.invalidateQueries({ queryKey: ["admin-products"] });
      void qc.invalidateQueries({ queryKey: ["store-products"] });
    },
    onError: (e) => setNotice(e instanceof Error ? e.message : "Could not save."),
  });

  const updateOrder = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Record<string, unknown> }) => {
      const { error } = await supabase.from("orders").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["admin-orders"] }),
  });

  const grouped = useMemo(() => {
    const map: Record<string, StoreProduct[]> = {};
    for (const p of products.data ?? []) (map[p.category] ??= []).push(p);
    return map;
  }, [products.data]);

  if (access.isLoading) {
    return <Shell>Checking your access…</Shell>;
  }

  if (!access.data?.staff) {
    return (
      <Shell>
        <h1 className="text-3xl font-semibold tracking-tight">Admin only.</h1>
        <p className="mt-3 max-w-lg text-sm text-muted-foreground">
          This console is reserved for The Vault's super admin team. If you should have access, ask
          an existing super admin to grant you the admin role.
        </p>
        <Link to="/" className="btn-pill mt-8 border border-hairline hover:bg-surface-elevated">
          Back to the store
        </Link>
      </Shell>
    );
  }

  return (
    <Shell>
      <p className="eyebrow mb-4">Super admin</p>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">Store console.</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Listings, pricing in Kenyan Shillings, descriptions and delivery tracking — everything the
        storefront reads comes from here.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {(["catalog", "orders"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className={`btn-pill border border-hairline text-sm capitalize ${
              tab === t ? "bg-foreground text-background" : "hover:bg-surface-elevated"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {notice && (
        <p role="status" className="mt-4 text-sm text-accent">
          {notice}
        </p>
      )}

      {tab === "catalog" && (
        <div className="mt-10 space-y-12">
          {Object.entries(grouped).map(([category, items]) => (
            <section key={category}>
              <h2 className="text-xl font-semibold capitalize tracking-tight">{category}</h2>
              <ul className="mt-4 space-y-3">
                {items.map((p) => {
                  const draft = drafts[p.id] ?? {};
                  const value = <K extends keyof Draft>(key: K) =>
                    (draft[key] ?? p[key as keyof StoreProduct]) as Draft[K];
                  const set = (patch: Draft) =>
                    setDrafts((prev) => ({ ...prev, [p.id]: { ...prev[p.id], ...patch } }));
                  const dirty = Object.keys(draft).length > 0;

                  return (
                    <li key={p.id} className="rounded-[1.5rem] bg-surface p-5 sm:p-6">
                      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,16rem)]">
                        <div className="min-w-0 space-y-3">
                          <input
                            aria-label={`${p.name} name`}
                            value={String(value("name") ?? "")}
                            onChange={(e) => set({ name: e.target.value })}
                            className="h-11 w-full rounded-xl border border-hairline bg-background px-3 text-sm outline-none focus:border-accent"
                          />
                          <input
                            aria-label={`${p.name} tagline`}
                            value={String(value("tagline") ?? "")}
                            onChange={(e) => set({ tagline: e.target.value })}
                            placeholder="Tagline"
                            className="h-11 w-full rounded-xl border border-hairline bg-background px-3 text-sm outline-none focus:border-accent"
                          />
                          <textarea
                            aria-label={`${p.name} description`}
                            value={String(value("description") ?? "")}
                            onChange={(e) => set({ description: e.target.value })}
                            rows={2}
                            placeholder="Description"
                            className="w-full rounded-xl border border-hairline bg-background p-3 text-sm outline-none focus:border-accent"
                          />
                          <p className="text-xs text-muted-foreground">/{p.slug}</p>
                        </div>

                        <div className="space-y-3">
                          <label className="block text-xs text-muted-foreground" htmlFor={`price-${p.id}`}>
                            Price (KES) — {formatKes(Number(value("price_kes") ?? 0))}
                          </label>
                          <input
                            id={`price-${p.id}`}
                            type="number"
                            min={0}
                            value={Number(value("price_kes") ?? 0)}
                            onChange={(e) => set({ price_kes: Number(e.target.value) })}
                            className="h-11 w-full rounded-xl border border-hairline bg-background px-3 text-sm outline-none focus:border-accent"
                          />
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={Boolean(value("in_stock"))}
                              onChange={(e) => set({ in_stock: e.target.checked })}
                            />
                            In stock
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={Boolean(value("is_published"))}
                              onChange={(e) => set({ is_published: e.target.checked })}
                            />
                            Published
                          </label>
                          <button
                            disabled={!dirty || save.isPending}
                            onClick={() => save.mutate({ id: p.id, patch: draft })}
                            className="btn-pill w-full bg-accent text-background hover:opacity-90 disabled:opacity-40"
                          >
                            {save.isPending ? "Saving…" : "Save changes"}
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}

      {tab === "orders" && (
        <div className="mt-10">
          {(orders.data ?? []).length === 0 && (
            <p className="text-sm text-muted-foreground">
              No orders yet. When checkout goes live, every order and its delivery status lands
              here.
            </p>
          )}
          <ul className="space-y-3">
            {(orders.data ?? []).map((o) => (
              <li key={o.id} className="rounded-[1.5rem] bg-surface p-5 sm:p-6">
                <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{o.order_number}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{formatKes(o.total_kes)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["preparing", "dispatched", "in_transit", "delivered"].map((s) => (
                      <button
                        key={s}
                        onClick={() => updateOrder.mutate({ id: o.id, patch: { delivery_status: s } })}
                        aria-pressed={o.delivery_status === s}
                        className={`btn-pill border border-hairline text-xs ${
                          o.delivery_status === s
                            ? "bg-foreground text-background"
                            : "hover:bg-surface-elevated"
                        }`}
                      >
                        {s.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      <FloatingNav />
      <main className="mx-auto max-w-[1200px] px-4 pb-24 pt-32 sm:px-6 sm:pt-40">{children}</main>
      <Footer />
    </div>
  );
}

import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FloatingNav } from "@/components/vault/FloatingNav";
import { Footer } from "@/components/vault/Footer";
import { useCart } from "@/lib/cart";
import { formatKes } from "@/lib/pricing";
import { useStoreProducts } from "@/lib/store";

export const Route = createFileRoute("/_authenticated/checkout")({
  component: CheckoutRoute,
});

type Payment = "mpesa" | "card";

function CheckoutRoute() {
  const navigate = useNavigate();
  const { items, subtotalKes, clear } = useCart();
  const { data: products } = useStoreProducts();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [county, setCounty] = useState("");
  const [address, setAddress] = useState("");
  const [method, setMethod] = useState<Payment>("mpesa");
  const [reference, setReference] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [placed, setPlaced] = useState<{ id: string; number: string } | null>(null);

  /** Lines the admin database says can no longer be sold. */
  const blocked = useMemo(() => {
    if (!products) return [];
    return items.filter((i) => {
      const p =
        products.find((x) => x.slug === i.slug) ??
        products.find((x) => x.slug === i.slug.split("-")[0]);
      return !p || !p.in_stock || !p.is_published;
    });
  }, [items, products]);

  const place = useMutation({
    mutationFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) throw new Error("Please sign in to place your order.");
      if (items.length === 0) throw new Error("Your bag is empty.");
      if (blocked.length > 0) throw new Error("Some items are no longer available. Remove them to continue.");

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: uid,
          total_kes: subtotalKes,
          status: "pending",
          delivery_status: "preparing",
          delivery_address: [address, county].filter(Boolean).join(", "),
          payment_method: method,
        })
        .select("id, order_number")
        .single();
      if (orderError) throw orderError;

      const { error: itemsError } = await supabase.from("order_items").insert(
        items.map((i) => ({
          order_id: order.id,
          product_name: i.name,
          unit_price_kes: i.priceKes,
          quantity: i.qty,
          variant: i.variant ?? {},
        })),
      );
      if (itemsError) throw itemsError;

      await supabase
        .from("profiles")
        .update({ full_name: fullName || null, phone: phone || null, county: county || null })
        .eq("id", uid);

      return { id: order.id as string, number: order.order_number as string };
    },
    onSuccess: (o) => {
      setError(null);
      setPlaced(o);
    },
    onError: (e) => setError(e instanceof Error ? e.message : "Could not place your order."),
  });

  const confirm = useMutation({
    mutationFn: async () => {
      if (!placed) return;
      const ref =
        reference.trim() ||
        `${method === "mpesa" ? "MPESA" : "CARD"}-${placed.number.replace("VLT-", "")}`;
      const { error: payError } = await supabase
        .from("orders")
        .update({ status: "paid", payment_reference: ref, paid_at: new Date().toISOString() })
        .eq("id", placed.id);
      if (payError) throw payError;
      return ref;
    },
    onSuccess: () => {
      clear();
      void navigate({ to: "/account" });
    },
    onError: (e) => setError(e instanceof Error ? e.message : "Payment could not be confirmed."),
  });

  return (
    <div className="min-h-dvh bg-background">
      <FloatingNav />
      <main className="mx-auto max-w-[1100px] px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
        <p className="eyebrow mb-4">Checkout</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          {placed ? "Confirm payment." : "Almost yours."}
        </h1>

        {error && (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {error}
          </p>
        )}

        {items.length === 0 && !placed ? (
          <div className="mt-8">
            <p className="text-sm text-muted-foreground">Your bag is empty.</p>
            <Link to="/" className="btn-pill mt-6 border border-hairline hover:bg-surface-elevated">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
            <div className="min-w-0 space-y-8">
              {!placed ? (
                <>
                  <section>
                    <h2 className="text-xl font-semibold tracking-tight">Delivery</h2>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <Field label="Full name" value={fullName} onChange={setFullName} />
                      <Field label="Phone (M-Pesa)" value={phone} onChange={setPhone} placeholder="07XX XXX XXX" />
                      <Field label="County" value={county} onChange={setCounty} placeholder="Nairobi" />
                      <Field label="Delivery address" value={address} onChange={setAddress} />
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold tracking-tight">Payment</h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(
                        [
                          { id: "mpesa" as const, label: "M-Pesa" },
                          { id: "card" as const, label: "Card" },
                        ]
                      ).map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setMethod(m.id)}
                          aria-pressed={method === m.id}
                          className={`btn-pill border border-hairline text-sm ${
                            method === m.id ? "bg-foreground text-background" : "hover:bg-surface-elevated"
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </section>

                  {blocked.length > 0 && (
                    <p role="alert" className="text-sm text-destructive">
                      No longer available: {blocked.map((b) => b.name).join(", ")}. Remove them from your bag to
                      continue.
                    </p>
                  )}
                </>
              ) : (
                <section>
                  <p className="text-sm text-muted-foreground">
                    Order <span className="font-medium text-foreground">{placed.number}</span> is reserved and
                    awaiting payment of {formatKes(subtotalKes)} via{" "}
                    {method === "mpesa" ? "M-Pesa" : "card"}.
                  </p>
                  <div className="mt-6 max-w-sm">
                    <Field
                      label={method === "mpesa" ? "M-Pesa transaction code" : "Card authorisation code"}
                      value={reference}
                      onChange={setReference}
                      placeholder="Optional — we generate one if blank"
                    />
                  </div>
                  <button
                    onClick={() => confirm.mutate()}
                    disabled={confirm.isPending}
                    className="btn-pill mt-6 bg-accent text-background hover:opacity-90 disabled:opacity-40"
                  >
                    {confirm.isPending ? "Confirming…" : "I've paid — confirm"}
                  </button>
                </section>
              )}
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="glass-panel rounded-[1.5rem] p-6">
                <p className="eyebrow mb-4">Order summary</p>
                <ul className="space-y-3 text-sm">
                  {items.map((i) => (
                    <li key={i.key} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                      <span className="min-w-0">
                        <span className="block truncate">{i.name}</span>
                        <span className="text-xs text-muted-foreground">Qty {i.qty}</span>
                      </span>
                      <span>{formatKes(i.priceKes * i.qty)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="text-xl font-semibold">{formatKes(subtotalKes)}</span>
                </div>
                {!placed && (
                  <button
                    onClick={() => place.mutate()}
                    disabled={place.isPending || blocked.length > 0 || items.length === 0}
                    className="btn-pill mt-6 w-full bg-accent text-background hover:opacity-90 disabled:opacity-40"
                  >
                    {place.isPending ? "Placing order…" : "Place order"}
                  </button>
                )}
                <p className="mt-4 text-xs text-muted-foreground">
                  Free delivery countrywide. Prices in Kenyan Shillings.
                </p>
              </div>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 h-11 w-full rounded-xl border border-hairline bg-background px-3 text-sm outline-none focus:border-accent"
      />
    </label>
  );
}

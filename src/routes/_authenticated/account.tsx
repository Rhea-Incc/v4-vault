import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FloatingNav } from "@/components/vault/FloatingNav";
import { Footer } from "@/components/vault/Footer";
import { formatKes } from "@/lib/pricing";

export const Route = createFileRoute("/_authenticated/account")({
  component: AccountRoute,
});

function AccountRoute() {
  const navigate = useNavigate();

  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) return null;
      const [{ data: prof }, { data: roles }] = await Promise.all([
        supabase.from("profiles").select("full_name, phone, county").eq("id", uid).maybeSingle(),
        supabase.from("user_roles").select("role").eq("user_id", uid),
      ]);
      return {
        email: userData.user?.email ?? "",
        full_name: prof?.full_name ?? "",
        roles: (roles ?? []).map((r) => r.role as string),
      };
    },
  });

  const orders = useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id, order_number, status, total_kes, delivery_status, courier, tracking_number, estimated_delivery, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const isStaff = (profile.data?.roles ?? []).some((r) => r === "admin" || r === "super_admin");

  return (
    <div className="min-h-dvh bg-background">
      <FloatingNav />
      <main className="mx-auto max-w-[1100px] px-4 pb-24 pt-32 sm:px-6 sm:pt-40">
        <p className="eyebrow mb-4">Account</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          {profile.data?.full_name || "Your Vault"}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">{profile.data?.email}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {isStaff && (
            <Link to="/admin" className="btn-pill bg-accent text-background hover:opacity-90">
              Open admin console
            </Link>
          )}
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/" });
            }}
            className="btn-pill border border-hairline hover:bg-surface-elevated"
          >
            Sign out
          </button>
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Orders & delivery.</h2>
          {orders.isLoading && <p className="mt-4 text-sm text-muted-foreground">Loading…</p>}
          {!orders.isLoading && (orders.data ?? []).length === 0 && (
            <p className="mt-4 text-sm text-muted-foreground">
              No orders yet. Everything you buy will be tracked here, from preparation to doorstep.
            </p>
          )}
          <ul className="mt-6 space-y-3">
            {(orders.data ?? []).map((o) => (
              <li key={o.id} className="rounded-[1.5rem] bg-surface p-5 sm:p-6">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{o.order_number}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {o.status} · delivery {o.delivery_status}
                      {o.courier ? ` · ${o.courier}` : ""}
                      {o.tracking_number ? ` · ${o.tracking_number}` : ""}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-medium">{formatKes(o.total_kes)}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}

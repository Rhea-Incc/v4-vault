import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";

/**
 * Paystack webhook. Marks an order paid once Paystack confirms the charge.
 * Signature: HMAC SHA-512 of the raw body with the secret key.
 */
export const Route = createFileRoute("/api/public/payments/paystack")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.PAYSTACK_SECRET_KEY;
        if (!secret) return new Response("Paystack not configured", { status: 503 });

        const body = await request.text();
        const signature = request.headers.get("x-paystack-signature") ?? "";
        const expected = createHmac("sha512", secret).update(body).digest("hex");
        const a = Buffer.from(signature);
        const b = Buffer.from(expected);
        if (a.length !== b.length || !timingSafeEqual(a, b)) {
          return new Response("Invalid signature", { status: 401 });
        }

        const event = JSON.parse(body) as {
          event?: string;
          data?: { reference?: string; status?: string; metadata?: { order_id?: string } };
        };
        if (event.event !== "charge.success" || event.data?.status !== "success") {
          return new Response("ignored");
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const orderId = event.data.metadata?.order_id;
        const reference = event.data.reference ?? null;
        const query = supabaseAdmin
          .from("orders")
          .update({ status: "paid", payment_reference: reference, paid_at: new Date().toISOString() });
        const { error } = orderId
          ? await query.eq("id", orderId)
          : await query.eq("order_number", reference ?? "");
        if (error) return new Response(error.message, { status: 500 });

        return new Response("ok");
      },
    },
  },
});

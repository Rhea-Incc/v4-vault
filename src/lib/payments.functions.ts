import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { normalizeMsisdn, toKoboMinorUnits } from "@/lib/payments";

/**
 * Payment rail foundations. Both handlers verify the caller owns the order,
 * then hand off to the provider. Credentials are read at call time so the
 * app boots fine before they're configured.
 */

type InitInput = { orderId: string; callbackUrl?: string; phone?: string };

const validateInit = (data: InitInput) => {
  if (!data?.orderId) throw new Error("orderId is required");
  return data;
};

/** Look up the caller's own pending order through RLS. */
async function loadOwnPendingOrder(
  supabase: { from: (t: string) => any },
  orderId: string,
) {
  const { data, error } = await supabase
    .from("orders")
    .select("id, order_number, total_kes, status")
    .eq("id", orderId)
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("Order not found.");
  if (data.status !== "pending") throw new Error("This order is no longer awaiting payment.");
  return data as { id: string; order_number: string; total_kes: number };
}

/** Paystack: create a hosted checkout session for the order. */
export const initPaystackCheckout = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(validateInit)
  .handler(async ({ data, context }) => {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) {
      return { configured: false as const, reason: "Paystack is not connected yet." };
    }

    const order = await loadOwnPendingOrder(context.supabase, data.orderId);
    const email = (context.claims?.email as string | undefined) ?? "customer@thevault.co.ke";

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        amount: toKoboMinorUnits(order.total_kes),
        currency: "KES",
        reference: order.order_number,
        callback_url: data.callbackUrl,
        metadata: { order_id: order.id },
      }),
    });

    const body = await res.text();
    if (!res.ok) throw new Error(`Paystack request failed [${res.status}]: ${body}`);
    const json = JSON.parse(body) as { data?: { authorization_url?: string; reference?: string } };
    return {
      configured: true as const,
      authorizationUrl: json.data?.authorization_url ?? null,
      reference: json.data?.reference ?? order.order_number,
    };
  });

/** M-Pesa direct: Daraja STK push against the business short code. */
export const initMpesaStkPush = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(validateInit)
  .handler(async ({ data, context }) => {
    const key = process.env.MPESA_CONSUMER_KEY;
    const secretKey = process.env.MPESA_CONSUMER_SECRET;
    const shortCode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const callbackUrl = process.env.MPESA_CALLBACK_URL ?? data.callbackUrl;
    const env = process.env.MPESA_ENV === "production" ? "api" : "sandbox";

    if (!key || !secretKey || !shortCode || !passkey || !callbackUrl) {
      return { configured: false as const, reason: "M-Pesa direct is not connected yet." };
    }

    const msisdn = normalizeMsisdn(data.phone ?? "");
    if (!msisdn) throw new Error("Enter a valid Safaricom number, e.g. 0712 345 678.");

    const order = await loadOwnPendingOrder(context.supabase, data.orderId);

    const tokenRes = await fetch(
      `https://${env}.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials`,
      { headers: { Authorization: `Basic ${btoa(`${key}:${secretKey}`)}` } },
    );
    const tokenBody = await tokenRes.text();
    if (!tokenRes.ok) throw new Error(`Daraja auth failed [${tokenRes.status}]: ${tokenBody}`);
    const { access_token: token } = JSON.parse(tokenBody) as { access_token: string };

    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const timestamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}${pad(
      now.getUTCHours(),
    )}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}`;

    const res = await fetch(`https://${env}.safaricom.co.ke/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        BusinessShortCode: shortCode,
        Password: btoa(`${shortCode}${passkey}${timestamp}`),
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.max(1, Math.round(order.total_kes)),
        PartyA: msisdn,
        PartyB: shortCode,
        PhoneNumber: msisdn,
        CallBackURL: callbackUrl,
        AccountReference: order.order_number,
        TransactionDesc: `The Vault Inc ${order.order_number}`,
      }),
    });

    const body = await res.text();
    if (!res.ok) throw new Error(`Daraja STK push failed [${res.status}]: ${body}`);
    const json = JSON.parse(body) as { CheckoutRequestID?: string; CustomerMessage?: string };
    return {
      configured: true as const,
      checkoutRequestId: json.CheckoutRequestID ?? null,
      message: json.CustomerMessage ?? "Check your phone to approve the payment.",
    };
  });

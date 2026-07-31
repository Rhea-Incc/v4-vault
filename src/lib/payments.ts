/**
 * Payment method foundation.
 *
 * The storefront supports two live rails plus a manual fallback:
 *  - `paystack`  — cards, bank and mobile money via Paystack (KES)
 *  - `mpesa`     — Safaricom Daraja STK push, straight to the till
 *  - `manual`    — customer pays out of band and enters a reference
 *
 * Everything here is presentation/config only. Credentials live in server
 * secrets and are read inside server-function handlers.
 */

export type PaymentMethodId = "mpesa" | "paystack" | "manual";

export type PaymentMethod = {
  id: PaymentMethodId;
  label: string;
  blurb: string;
  /** Copy shown once the order is reserved and awaiting payment. */
  instruction: string;
  referenceLabel: string;
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "mpesa",
    label: "M-Pesa",
    blurb: "STK push to your Safaricom line. Approve on your phone.",
    instruction:
      "We'll send an STK push to your M-Pesa number. Approve it, then confirm below with the transaction code.",
    referenceLabel: "M-Pesa transaction code",
  },
  {
    id: "paystack",
    label: "Card · Paystack",
    blurb: "Visa, Mastercard, bank transfer and mobile money in KES.",
    instruction:
      "You'll be redirected to Paystack's secure checkout. Once it completes, confirm your order below.",
    referenceLabel: "Paystack reference",
  },
  {
    id: "manual",
    label: "Pay on delivery",
    blurb: "Settle in store or on hand-over at your delivery address.",
    instruction: "Pay our courier on delivery. We'll mark the order paid once the rider confirms.",
    referenceLabel: "Receipt number",
  },
];

export function paymentMethod(id: string): PaymentMethod {
  return PAYMENT_METHODS.find((m) => m.id === id) ?? PAYMENT_METHODS[0];
}

/** Paystack works in the smallest currency unit. */
export function toKoboMinorUnits(kes: number): number {
  return Math.max(0, Math.round(kes)) * 100;
}

/** Daraja expects 2547XXXXXXXX. Accepts 07…, 7…, +254… and 254… inputs. */
export function normalizeMsisdn(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (/^254\d{9}$/.test(digits)) return digits;
  if (/^0\d{9}$/.test(digits)) return `254${digits.slice(1)}`;
  if (/^\d{9}$/.test(digits)) return `254${digits}`;
  return null;
}

/**
 * Kenyan Shilling pricing helpers.
 *
 * Formatting is done manually (not via `toLocaleString`) so server-rendered
 * markup and hydrated markup always agree, regardless of the runtime locale.
 */

export function formatKes(amount: number): string {
  const rounded = Math.max(0, Math.round(amount));
  const grouped = String(rounded).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `KSh ${grouped}`;
}

export function fromKes(amount: number): string {
  return `From ${formatKes(amount)}`;
}

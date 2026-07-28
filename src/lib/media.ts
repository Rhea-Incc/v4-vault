/**
 * Global media resolution.
 *
 * Media lives on the Lovable CDN and is referenced through `.asset.json`
 * pointers whose `url` is root-relative (`/__l5e/assets-v1/...`). That path is
 * only served by Lovable hosting, so when the app is deployed elsewhere
 * (Vercel, Render, Railway, Netlify, a container, ...) the pointer must be
 * resolved against an absolute CDN origin.
 *
 * Set `VITE_MEDIA_BASE_URL` in the deployment environment to override the
 * default origin. Absolute URLs are always passed through untouched.
 */

type AssetPointer = { url: string; original_filename?: string };

const DEFAULT_MEDIA_ORIGIN = "https://v4-vault.lovable.app";

const CONFIGURED_ORIGIN = (
  import.meta.env.VITE_MEDIA_BASE_URL as string | undefined
)?.replace(/\/$/, "");

/** True when the current runtime is served by Lovable hosting/preview. */
function isLovableHost(): boolean {
  if (typeof window === "undefined") return false;
  return /(^|\.)lovable\.(app|dev)$/.test(window.location.hostname) ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
}

export function mediaUrl(input: AssetPointer | string): string {
  const raw = typeof input === "string" ? input : input.url;
  if (/^(https?:)?\/\//.test(raw) || raw.startsWith("data:")) return raw;

  if (CONFIGURED_ORIGIN) return `${CONFIGURED_ORIGIN}${raw}`;
  // On Lovable (and local dev) the relative path is served directly.
  if (isLovableHost()) return raw;
  // SSR / unknown external host: always emit an absolute, universally
  // reachable URL so any deployment target can serve the media.
  return `${DEFAULT_MEDIA_ORIGIN}${raw}`;
}

/** Responsive `sizes` presets shared across the media components. */
export const SIZES = {
  card: "(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 280px",
  tile: "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 620px",
  hero: "(max-width: 1024px) 100vw, 1100px",
  modal: "(max-width: 768px) 90vw, 560px",
} as const;

import { Link } from "@tanstack/react-router";
import { mediaUrl } from "@/lib/media";
import mark from "@/assets/vault-mark.asset.json";

/**
 * The Vault lockup: the mark plus a drawn "VAULT" wordmark whose "A"
 * deliberately drops its crossbar. Small viewports and mobile screens show
 * the mark alone.
 */
export function Logo({
  className = "",
  wordmarkClassName = "hidden h-3.5 w-auto sm:block sm:h-4",
  markClassName = "h-6 w-6 rounded-[0.45rem] sm:h-7 sm:w-7",
}: {
  className?: string;
  wordmarkClassName?: string;
  markClassName?: string;
}) {
  return (
    <Link to="/" className={`flex shrink-0 items-center gap-2.5 ${className}`} aria-label="VAULT — home">
      <img
        src={mediaUrl(mark)}
        alt=""
        aria-hidden
        width={64}
        height={64}
        className={`object-contain ${markClassName}`}
      />
      <Wordmark className={wordmarkClassName} />
    </Link>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 136 34"
      role="img"
      aria-label="VAULT"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* VAULT — drawn so the A carries no crossbar */}
      <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" strokeLinejoin="miter">
        {/* V */}
        <path d="M4 6 L13.5 28 L23 6" />
        {/* A without its horizontal bar */}
        <path d="M32 28 L41.5 6 L51 28" />
        {/* U */}
        <path d="M60 6 L60 21 A9 9 0 0 0 78 21 L78 6" />
        {/* L */}
        <path d="M88 6 L88 28 L104 28" />
        {/* T */}
        <path d="M112 6 L134 6 M123 6 L123 28" />
      </g>
    </svg>
  );
}

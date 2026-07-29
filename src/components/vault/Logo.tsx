import { Link } from "@tanstack/react-router";
import { mediaUrl } from "@/lib/media";
import mark from "@/assets/vault-mark.asset.json";

/**
 * The Vault lockup: the mark plus a drawn wordmark where the "A" of VAULT
 * deliberately drops its crossbar. The wordmark is hidden on the smallest
 * viewports so the nav never crowds.
 */
export function Logo({
  className = "",
  wordmarkClassName = "hidden h-3.5 w-auto min-[400px]:block sm:h-4",
  markClassName = "h-6 w-6 rounded-[0.45rem] sm:h-7 sm:w-7",
}: {
  className?: string;
  wordmarkClassName?: string;
  markClassName?: string;
}) {
  return (
    <Link to="/" className={`flex shrink-0 items-center gap-2.5 ${className}`} aria-label="The Vault — home">
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
      viewBox="0 0 260 34"
      role="img"
      aria-label="The Vault"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="25"
        fill="currentColor"
        fontFamily="var(--font-sans, ui-sans-serif, system-ui)"
        fontSize="21"
        fontWeight="400"
        letterSpacing="0.5"
      >
        The
      </text>
      {/* VAULT — drawn so the A carries no crossbar */}
      <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" strokeLinejoin="miter">
        {/* V */}
        <path d="M52 6 L61.5 28 L71 6" />
        {/* A without its horizontal bar */}
        <path d="M80 28 L89.5 6 L99 28" />
        {/* U */}
        <path d="M108 6 L108 21 A9 9 0 0 0 126 21 L126 6" />
        {/* L */}
        <path d="M136 6 L136 28 L152 28" />
        {/* T */}
        <path d="M160 6 L182 6 M171 6 L171 28" />
      </g>
    </svg>
  );
}

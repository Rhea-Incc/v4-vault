import { useEffect, useRef, useState } from "react";

/**
 * A muted, autoplaying cinematic reel. Playback only starts once the reel is
 * on screen, and users who prefer reduced motion get a paused poster frame
 * with visible controls instead.
 */
export function MediaReel({
  src,
  label,
  className = "",
  aspect = "aspect-[4/5]",
}: {
  src: string;
  label: string;
  className?: string;
  aspect?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => undefined);
        else el.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      src={src}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
      controls={reduced}
      className={`${aspect} w-full rounded-[1.5rem] bg-surface-elevated object-cover ${className}`}
    />
  );
}

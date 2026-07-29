import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import wordmark from "@/assets/vault-wordmark.asset.json";
import mark from "@/assets/vault-mark.asset.json";
import { mediaUrl } from "@/lib/media";
import { IPHONES, MACS } from "@/lib/catalog";

const wordmarkUrl = mediaUrl(wordmark);

const TABS = [
  { label: "Mac", to: "/mac" as const },
  { label: "iPhone", to: "/iphone" as const },
  { label: "Accessories", to: "/accessories" as const },
];

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "pt-2 sm:pt-3" : "pt-4 sm:pt-6"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-3 sm:px-6">
        <nav
          className={`glass-panel grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-full transition-all duration-500 ${
            scrolled ? "h-12 px-3 sm:h-14 sm:px-5" : "h-14 px-4 sm:h-16 sm:px-7"
          }`}
        >
          <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="The Vault home">
            <img
              src={mediaUrl(mark)}
              alt=""
              aria-hidden
              width={64}
              height={64}
              className="h-6 w-6 rounded-[0.45rem] object-contain sm:h-7 sm:w-7"
            />
            <img
              src={wordmarkUrl}
              alt="The Vault"
              width={220}
              height={32}
              className="h-3 w-auto opacity-90 sm:h-3.5"
            />
          </Link>

          <ul className="hidden min-w-0 items-center justify-center gap-1 lg:flex">
            {TABS.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="inline-block rounded-full px-4 py-2 text-sm text-foreground/80 transition-colors duration-300 hover:bg-surface-elevated hover:text-foreground"
                  activeProps={{ className: "bg-surface-elevated text-foreground" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <span className="lg:hidden" aria-hidden />

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            <button
              aria-label="Search"
              className="grid h-11 w-11 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-surface-elevated hover:text-foreground"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </button>
            <button
              aria-label="Account"
              className="hidden h-11 w-11 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-surface-elevated hover:text-foreground sm:grid"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </button>
            <button
              aria-label="Bag"
              className="grid h-11 w-11 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-surface-elevated hover:text-foreground"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </button>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full text-foreground/80 transition-colors hover:bg-surface-elevated hover:text-foreground lg:hidden"
            >
              {open ? (
                <X className="h-5 w-5" strokeWidth={1.6} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.6} />
              )}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className="lg:hidden">
          <button
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 -z-10 cursor-default bg-background/60 backdrop-blur-sm"
          />
          <div className="mx-auto mt-3 max-h-[75dvh] max-w-[1440px] overflow-y-auto px-3 sm:px-6">
            <div className="glass-panel rounded-[1.75rem] p-5">
              <nav aria-label="Categories" className="space-y-6">
                <div>
                  <p className="eyebrow mb-3">Shop</p>
                  <ul className="space-y-1">
                    {TABS.map((t) => (
                      <li key={t.to}>
                        <Link
                          to={t.to}
                          onClick={() => setOpen(false)}
                          className="block rounded-2xl px-3 py-3 text-lg font-medium transition-colors hover:bg-surface-elevated"
                        >
                          {t.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow mb-3">iPhone lineup</p>
                  <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                    {IPHONES.map((m) => (
                      <li key={m.slug}>
                        <Link
                          to="/iphone/$model"
                          params={{ model: m.slug }}
                          onClick={() => setOpen(false)}
                          className="block rounded-2xl px-3 py-3 text-sm text-foreground/85 transition-colors hover:bg-surface-elevated"
                        >
                          {m.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow mb-3">Mac lineup</p>
                  <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                    {MACS.map((m) => (
                      <li key={m.slug}>
                        <Link
                          to="/mac"
                          hash={m.slug}
                          onClick={() => setOpen(false)}
                          className="block rounded-2xl px-3 py-3 text-sm text-foreground/85 transition-colors hover:bg-surface-elevated"
                        >
                          {m.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, User } from "lucide-react";
import wordmark from "@/assets/vault-wordmark.asset.json";

const NAV = [
  "Mac",
  "iPhone",
  "iPad",
  "Watch",
  "AirPods",
  "TV & Home",
  "Accessories",
  "Support",
];

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "pt-3" : "pt-6"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        <nav
          className={`glass-panel flex items-center justify-between rounded-full transition-all duration-500 ${
            scrolled ? "h-14 px-5" : "h-16 px-7"
          }`}
        >
          <Link to="/" className="flex items-center gap-2">
            <img
              src={wordmark.url}
              alt="The Vault"
              className="h-3.5 w-auto opacity-90"
            />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <li key={item}>
                {item === "iPhone" ? (
                  <Link
                    to="/iphone"
                    className="inline-block rounded-full px-4 py-2 text-sm text-foreground/80 transition-colors duration-300 hover:text-foreground"
                    activeProps={{ className: "text-foreground" }}
                  >
                    {item}
                  </Link>
                ) : (
                  <button className="rounded-full px-4 py-2 text-sm text-foreground/80 transition-colors duration-300 hover:text-foreground">
                    {item}
                  </button>
                )}
              </li>
            ))}
          </ul>


          <div className="flex items-center gap-1">
            <button
              aria-label="Search"
              className="grid h-10 w-10 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-surface-elevated hover:text-foreground"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </button>
            <button
              aria-label="Account"
              className="hidden h-10 w-10 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-surface-elevated hover:text-foreground sm:grid"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </button>
            <button
              aria-label="Bag"
              className="grid h-10 w-10 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-surface-elevated hover:text-foreground"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

import wordmark from "@/assets/vault-wordmark.asset.json";
import { mediaUrl, SIZES } from "@/lib/media";

const COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "Shop",
    links: ["Mac", "iPhone", "iPad", "Watch", "AirPods", "Accessories"],
  },
  {
    title: "Services",
    links: [
      "Trade In",
      "AppleCare",
      "Financing",
      "Business",
      "Education",
      "Support",
    ],
  },
  {
    title: "The Vault",
    links: [
      "Store Locations",
      "About",
      "Careers",
      "Press",
      "Newsroom",
      "Contact",
    ],
  },
  {
    title: "Account",
    links: [
      "Sign In",
      "Orders",
      "Wishlist",
      "Returns",
      "Repair Status",
      "Newsletter",
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-surface">
      <div className="mx-auto max-w-[1440px] px-6 py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <img src={mediaUrl(wordmark)} alt="The Vault" className="h-3 w-auto opacity-80" />
            <p className="mt-5 max-w-[26ch] text-sm text-muted-foreground">
              An Apple Authorized Reseller. Meticulously curated.
            </p>
          </div>
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {c.title}
              </p>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-8 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} The Vault. All rights reserved.</p>
          <p>
            The Vault is an Apple Authorized Reseller. Apple, the Apple logo,
            and product names are trademarks of Apple Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}

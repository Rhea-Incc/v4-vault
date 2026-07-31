import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { CONTACT } from "@/lib/pages";

type FooterLink = { label: string; to: string; hash?: string };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Mac", to: "/mac" },
      { label: "iPhone", to: "/iphone" },
      { label: "Accessories", to: "/accessories" },
      { label: "AirPods", to: "/accessories" },
      { label: "Watch bands", to: "/accessories" },
      { label: "Wishlist", to: "/wishlist" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Trade In", to: "/trade-in" },
      { label: "AppleCare", to: "/applecare" },
      { label: "Financing", to: "/financing" },
      { label: "Business", to: "/business" },
      { label: "Education", to: "/education" },
      { label: "Support", to: "/support" },
    ],
  },
  {
    title: "The Vault Inc",
    links: [
      { label: "Store Locations", to: "/stores" },
      { label: "About", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Press", to: "/press" },
      { label: "Newsroom", to: "/newsroom" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign In", to: "/auth" },
      { label: "Orders", to: "/account" },
      { label: "Wishlist", to: "/wishlist" },
      { label: "Returns", to: "/returns" },
      { label: "Repair Status", to: "/repair-status" },
      { label: "Newsletter", to: "/newsletter" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-surface">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Logo
              markClassName="h-8 w-8 rounded-[0.5rem]"
              wordmarkClassName="h-4 w-auto opacity-85"
            />
            <p className="mt-5 max-w-[26ch] text-sm text-muted-foreground">
              An Apple Authorized Reseller. Meticulously curated.
            </p>
            <ul className="mt-5 space-y-1.5 text-sm text-muted-foreground">
              <li>{CONTACT.location}</li>
              <li>
                <a href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`} className="hover:text-foreground">
                  {CONTACT.phones[0]}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-foreground">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
          {COLUMNS.map((c) => (
            <div key={c.title} className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {c.title}
              </p>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={`${c.title}-${l.label}`}>
                    <Link
                      to={l.to}
                      className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-8 text-xs text-muted-foreground sm:mt-16">
          <p>© {new Date().getFullYear()} The Vault Inc. All rights reserved.</p>
          <p className="max-w-[60ch]">
            The Vault Inc is an Apple Authorized Reseller. Apple, the Apple logo,
            and product names are trademarks of Apple Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}

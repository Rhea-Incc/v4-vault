import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero-iphone.asset.json";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="flex flex-col items-center text-center animate-rise">
          <p className="eyebrow mb-6">New · Available Now</p>
          <h1 className="hero-headline text-foreground">
            {"{{Product Name}}."}
            <br />
            <span className="text-muted-foreground">
              Precision, refined.
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground sm:text-xl">
            {"{{Description}}"} — a supporting sentence that lets the product
            breathe.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button className="btn-pill bg-foreground text-background hover:bg-foreground/90">
              Buy
            </button>
            <button className="btn-pill text-accent hover:bg-accent/8">
              Learn more <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            From {"{{Price}}"} · or {"{{Price}}"}/mo. for 24 mo.
          </p>
        </div>

        <div className="relative mt-16 animate-fade">
          <div className="absolute inset-x-0 -bottom-10 top-10 -z-10 rounded-[3rem] bg-gradient-to-b from-surface-elevated to-transparent" />
          <img
            src={hero.url}
            alt="Product hero"
            className="mx-auto w-full max-w-[1100px] rounded-[2rem]"
          />
        </div>
      </div>
    </section>
  );
}

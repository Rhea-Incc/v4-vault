import { mediaUrl } from "@/lib/media";
import { fromKes, formatKes } from "@/lib/pricing";

import iphoneHero from "@/assets/product/iphone-hero.jpg.asset.json";
import cameraMacro from "@/assets/product/rear-camera-macro.jpg.asset.json";
import lockscreen from "@/assets/product/lockscreen.jpg.asset.json";
import battery from "@/assets/product/battery.jpg.asset.json";
import iosHighlights from "@/assets/product/ios-highlights.jpg.asset.json";
import security from "@/assets/product/security.jpg.asset.json";
import esim from "@/assets/product/esim.jpg.asset.json";
import spotlight from "@/assets/product/spotlight.jpg.asset.json";
import macbook from "@/assets/product/macbook.jpg.asset.json";
import heroIphone from "@/assets/hero-iphone.asset.json";
import familyImg from "@/assets/family.asset.json";
import innovationImg from "@/assets/innovation.asset.json";
import performanceImg from "@/assets/performance.asset.json";
import macosImg from "@/assets/macos.asset.json";
import aiAppsImg from "@/assets/ai-apps.asset.json";
import delightImg from "@/assets/delight.asset.json";

import liveTranslation from "@/assets/media/live-translation.jpg.asset.json";
import privacyImg from "@/assets/media/privacy.jpg.asset.json";
import visualIntelligence from "@/assets/media/visual-intelligence.jpg.asset.json";
import magsafeLineup from "@/assets/media/magsafe-lineup.jpg.asset.json";
import iosTrio from "@/assets/media/ios-trio.jpg.asset.json";
import gaming from "@/assets/media/gaming.jpg.asset.json";
import magsafeCharge from "@/assets/media/magsafe-charge.jpg.asset.json";
import iosLineup from "@/assets/media/ios-lineup.png.asset.json";
import cameras from "@/assets/media/cameras.png.asset.json";
import macosHero from "@/assets/media/macos-hero.jpg.asset.json";
import macPerformance from "@/assets/media/mac-performance.png.asset.json";

import headphonesOverEar from "@/assets/category/headphone-03.png.asset.json";
import airpodsMax from "@/assets/category/headphones-02.jpg.asset.json";
import watchFace from "@/assets/category/watch-004.jpg.asset.json";
import watchClose from "@/assets/category/watch-003.jpg.asset.json";
import airpodsPods from "@/assets/category/003.jpg.asset.json";
import usbcEnds from "@/assets/category/charger-003.jpg.asset.json";

import reel1 from "@/assets/video/vault-1.mp4.asset.json";
import reel2 from "@/assets/video/vault-2.mp4.asset.json";
import reel3 from "@/assets/video/vault-3.mp4.asset.json";
import reel4 from "@/assets/video/vault-4.mp4.asset.json";

import magsafe from "@/assets/accessories/magsafe.jpg.asset.json";
import airpods from "@/assets/accessories/airpods.jpg.asset.json";
import caseImg from "@/assets/accessories/case.jpg.asset.json";
import watchband from "@/assets/accessories/watchband.jpg.asset.json";
import cable from "@/assets/accessories/cable.jpg.asset.json";
import keyboard from "@/assets/accessories/keyboard.jpg.asset.json";
import display from "@/assets/accessories/display.jpg.asset.json";
import applecare from "@/assets/accessories/applecare.jpg.asset.json";

export const MEDIA = {
  iphoneHero: mediaUrl(iphoneHero),
  cameraMacro: mediaUrl(cameraMacro),
  lockscreen: mediaUrl(lockscreen),
  battery: mediaUrl(battery),
  iosHighlights: mediaUrl(iosHighlights),
  security: mediaUrl(security),
  esim: mediaUrl(esim),
  spotlight: mediaUrl(spotlight),
  macbook: mediaUrl(macbook),
  heroIphone: mediaUrl(heroIphone),
  family: mediaUrl(familyImg),
  innovation: mediaUrl(innovationImg),
  performance: mediaUrl(performanceImg),
  macos: mediaUrl(macosImg),
  aiApps: mediaUrl(aiAppsImg),
  delight: mediaUrl(delightImg),
  liveTranslation: mediaUrl(liveTranslation),
  privacy: mediaUrl(privacyImg),
  visualIntelligence: mediaUrl(visualIntelligence),
  magsafeLineup: mediaUrl(magsafeLineup),
  iosTrio: mediaUrl(iosTrio),
  gaming: mediaUrl(gaming),
  magsafeCharge: mediaUrl(magsafeCharge),
  iosLineup: mediaUrl(iosLineup),
  cameras: mediaUrl(cameras),
  macosHero: mediaUrl(macosHero),
  macPerformance: mediaUrl(macPerformance),
  headphonesOverEar: mediaUrl(headphonesOverEar),
  airpodsMax: mediaUrl(airpodsMax),
  watchFace: mediaUrl(watchFace),
  watchClose: mediaUrl(watchClose),
  airpodsPods: mediaUrl(airpodsPods),
  usbcEnds: mediaUrl(usbcEnds),
};

/** Short cinematic reels, deployed from the same global CDN as the imagery. */
export const REELS = {
  one: mediaUrl(reel1),
  two: mediaUrl(reel2),
  three: mediaUrl(reel3),
  four: mediaUrl(reel4),
};

export type Accessory = {
  id: string;
  name: string;
  category: string;
  price: string;
  priceKes: number;
  image: string;
  alt: string;
  summary: string;
  inTheBox: string[];
  specs: { label: string; value: string }[];
};

export const ACCESSORIES: Accessory[] = [
  {
    id: "magsafe-charger",
    name: "MagSafe Charger",
    category: "Power",
    price: formatKes(4900), priceKes: 4900,
    image: mediaUrl(magsafe),
    alt: "MagSafe Charger puck with woven USB-C cable on a white studio background",
    summary: "Perfectly aligned magnets snap to your iPhone for faster wireless charging up to 25W.",
    inTheBox: ["MagSafe Charger (1m woven cable)", "Quick start guide", "Vault care card"],
    specs: [
      { label: "Output", value: "Up to 25W with 30W adapter" },
      { label: "Cable", value: "1m woven USB-C" },
      { label: "Compatible", value: "iPhone 12 and later, AirPods with MagSafe case" },
    ],
  },
  {
    id: "airpods-pro-2",
    name: "AirPods Pro 2",
    category: "Audio",
    price: formatKes(32900), priceKes: 32900,
    image: mediaUrl(airpods),
    alt: "AirPods Pro 2 earbuds resting beside their charging case",
    summary: "Up to 2x more Active Noise Cancellation, Adaptive Audio and Conversation Awareness.",
    inTheBox: ["AirPods Pro", "MagSafe Charging Case (USB-C)", "Silicone tips (XS, S, M, L)", "USB-C charge cable"],
    specs: [
      { label: "Chip", value: "H2" },
      { label: "Battery", value: "Up to 6 hrs listening, 30 hrs with case" },
      { label: "Water resistance", value: "IP54 dust, sweat and water resistant" },
    ],
  },
  {
    id: "finewoven-case",
    name: "FineWoven Case",
    category: "Cases",
    price: formatKes(7900), priceKes: 7900,
    image: mediaUrl(caseImg),
    alt: "FineWoven iPhone case in a soft neutral finish, shown from the back",
    summary: "A durable microtwill with a soft, suede-like feel and a built-in magnet array.",
    inTheBox: ["FineWoven Case with MagSafe", "Fabric care leaflet"],
    specs: [
      { label: "Material", value: "78% post-consumer recycled content microtwill" },
      { label: "Magnets", value: "Full MagSafe array" },
      { label: "Protection", value: "Raised edges for display and camera" },
    ],
  },
  {
    id: "watch-band",
    name: "Apple Watch Band",
    category: "Wearables",
    price: formatKes(6900), priceKes: 6900,
    image: mediaUrl(watchband),
    alt: "Apple Watch sport band coiled on a white surface",
    summary: "A smooth, breathable fluoroelastomer band with a pin-and-tuck closure.",
    inTheBox: ["Band (S/M and M/L lengths)", "Sizing guide"],
    specs: [
      { label: "Fits", value: "40/41/42mm and 44/45/46mm cases" },
      { label: "Material", value: "Fluoroelastomer" },
      { label: "Closure", value: "Pin-and-tuck" },
    ],
  },
  {
    id: "usbc-cable",
    name: "USB-C to Lightning",
    category: "Cables",
    price: formatKes(2500), priceKes: 2500,
    image: mediaUrl(cable),
    alt: "Coiled white USB-C to Lightning charging cable",
    summary: "Fast-charge compatible cable for syncing and powering your devices.",
    inTheBox: ["1m USB-C to Lightning cable"],
    specs: [
      { label: "Length", value: "1 metre" },
      { label: "Charging", value: "Up to 50% in 30 minutes with 20W adapter" },
      { label: "Data", value: "USB 2.0 sync" },
    ],
  },
  {
    id: "magic-keyboard",
    name: "Magic Keyboard",
    category: "Input",
    price: formatKes(16900), priceKes: 16900,
    image: mediaUrl(keyboard),
    alt: "Magic Keyboard with Touch ID photographed from above",
    summary: "A refined scissor mechanism with 1mm travel, Touch ID and a rechargeable battery.",
    inTheBox: ["Magic Keyboard", "USB-C to Lightning cable", "Documentation"],
    specs: [
      { label: "Battery", value: "About a month per charge" },
      { label: "Security", value: "Touch ID for unlock and Apple Pay" },
      { label: "Connectivity", value: "Bluetooth, auto-pairs over Lightning" },
    ],
  },
  {
    id: "display-stand",
    name: "Studio Display Stand",
    category: "Displays",
    price: formatKes(51900), priceKes: 51900,
    image: mediaUrl(display),
    alt: "Aluminium Studio Display stand shown at a three-quarter angle",
    summary: "Tilt-and-height-adjustable aluminium stand machined to match your display.",
    inTheBox: ["Studio Display stand", "Hex driver", "Install guide"],
    specs: [
      { label: "Adjustment", value: "105mm height, -5° to 25° tilt" },
      { label: "Material", value: "Machined aluminium" },
      { label: "Compatible", value: "Studio Display, Pro Display XDR" },
    ],
  },
  {
    id: "applecare",
    name: "AppleCare+",
    category: "Coverage",
    price: formatKes(25900), priceKes: 25900,
    image: mediaUrl(applecare),
    alt: "AppleCare+ coverage card presented on a clean white background",
    summary: "Unlimited accidental damage repairs, 24/7 priority support and battery service.",
    inTheBox: ["Coverage certificate", "Vault priority support card"],
    specs: [
      { label: "Term", value: "2 years from purchase" },
      { label: "Repairs", value: "Unlimited incidents, service fee applies" },
      { label: "Support", value: "24/7 priority chat with Apple experts" },
    ],
  },
];

export type Model = {
  slug: string;
  name: string;
  year: string;
  /** Generation slug this model belongs to, e.g. "17". */
  generation?: string;
  /** "Standard" | "mini" | "Plus" | "Air" | "Pro" | "Pro Max". */
  variant?: string;
  tagline: string;
  price: string;
  priceKes?: number;
  image: string;
  alt: string;
  chip: string;
  display: string;
  camera: string;
  battery: string;
  colors: { name: string; swatch: string }[];
  storage: string[];
  highlights: { title: string; body: string; image: string; alt: string }[];
};

const swatch = (name: string, value: string) => ({ name, swatch: value });

const BASE_IPHONES: Model[] = [
  {
    slug: "17",
    name: "iPhone 17",
    year: "2025",
    tagline: "Precision, refined.",
    price: "From $799",
    image: MEDIA.iphoneHero,
    alt: "iPhone 17 in titanium shown from the front and back",
    chip: "A19 Bionic",
    display: '6.3" Super Retina XDR, ProMotion 120Hz',
    camera: "48MP Fusion · 12MP Ultra Wide · 12MP 3x Telephoto",
    battery: "Up to 29 hrs video playback",
    colors: [swatch("Lavender", "oklch(0.82 0.08 300)"), swatch("Graphite", "oklch(0.28 0.005 260)"), swatch("Silver", "oklch(0.92 0.003 260)"), swatch("Sky Blue", "oklch(0.82 0.08 235)")],
    storage: ["128GB", "256GB", "512GB", "1TB"],
    highlights: [
      { title: "A camera system that sees what you see", body: "48MP Fusion capture with a 3x telephoto and next-generation image pipeline.", image: MEDIA.cameras, alt: "Close-up of the iPhone camera system capturing a macro flower shot" },
      { title: "Console-class gaming", body: "Hardware ray tracing and sustained performance for the biggest titles.", image: MEDIA.gaming, alt: "iPhone held in landscape running a high-detail 3D game" },
      { title: "Live Translation", body: "Speak naturally on a call and let iPhone translate in real time.", image: MEDIA.liveTranslation, alt: "iPhone call screen showing live translated conversation captions" },
    ],
  },
  {
    slug: "16",
    name: "iPhone 16",
    year: "2024",
    tagline: "Hello, Apple Intelligence.",
    price: "From $699",
    image: MEDIA.heroIphone,
    alt: "iPhone 16 shown at an angle against a soft gradient",
    chip: "A18",
    display: '6.1" Super Retina XDR',
    camera: "48MP Fusion · 12MP Ultra Wide with macro",
    battery: "Up to 27 hrs video playback",
    colors: [swatch("Ultramarine", "oklch(0.62 0.16 265)"), swatch("Teal", "oklch(0.75 0.09 195)"), swatch("Pink", "oklch(0.85 0.06 15)"), swatch("Black", "oklch(0.2 0.005 260)")],
    storage: ["128GB", "256GB", "512GB"],
    highlights: [
      { title: "Camera Control", body: "A dedicated capture button with a tactile press and slide.", image: MEDIA.cameraMacro, alt: "Macro photograph captured on iPhone showing fine detail" },
      { title: "Visual Intelligence", body: "Point, learn, and act on whatever is in front of you.", image: MEDIA.visualIntelligence, alt: "iPhone screen using Visual Intelligence to identify an object" },
      { title: "Built for iOS", body: "A home screen that bends to how you actually use your phone.", image: MEDIA.iosLineup, alt: "Three iPhones showing Messages, the Lock Screen and the Home Screen" },
    ],
  },
  {
    slug: "15",
    name: "iPhone 15",
    year: "2023",
    tagline: "Titanium arrives.",
    price: "From $599",
    image: MEDIA.lockscreen,
    alt: "iPhone 15 Lock Screen displayed in a hand",
    chip: "A16 Bionic",
    display: '6.1" Super Retina XDR with Dynamic Island',
    camera: "48MP Main · 12MP Ultra Wide",
    battery: "Up to 20 hrs video playback",
    colors: [swatch("Blue", "oklch(0.78 0.06 245)"), swatch("Green", "oklch(0.82 0.05 150)"), swatch("Yellow", "oklch(0.9 0.08 95)"), swatch("Black", "oklch(0.2 0.005 260)")],
    storage: ["128GB", "256GB", "512GB"],
    highlights: [
      { title: "USB-C, finally", body: "One cable for iPhone, iPad and Mac.", image: MEDIA.esim, alt: "iPhone settings screen showing connectivity options" },
      { title: "Dynamic Island", body: "Alerts and live activities that flow around the camera.", image: MEDIA.iosTrio, alt: "Three iPhones showing Messages, Lock Screen and calendar events" },
      { title: "MagSafe ecosystem", body: "Snap on wallets, cases and chargers.", image: MEDIA.magsafeLineup, alt: "Three iPhones with a MagSafe wallet, charger and clear case" },
    ],
  },
  {
    slug: "14",
    name: "iPhone 14",
    year: "2022",
    tagline: "Big and bigger.",
    price: "From $529",
    image: MEDIA.family,
    alt: "iPhone 14 family shown side by side",
    chip: "A15 Bionic",
    display: '6.1" Super Retina XDR',
    camera: "12MP Main · 12MP Ultra Wide · Photonic Engine",
    battery: "Up to 20 hrs video playback",
    colors: [swatch("Midnight", "oklch(0.22 0.01 260)"), swatch("Starlight", "oklch(0.94 0.01 90)"), swatch("Purple", "oklch(0.78 0.07 300)"), swatch("Blue", "oklch(0.75 0.07 245)")],
    storage: ["128GB", "256GB", "512GB"],
    highlights: [
      { title: "Crash Detection", body: "iPhone can call for help when you can't.", image: MEDIA.security, alt: "iPhone displaying a safety and security screen" },
      { title: "Photonic Engine", body: "Better low-light photos across every camera.", image: MEDIA.cameraMacro, alt: "Low light macro photograph shot on iPhone" },
      { title: "All-day battery", body: "The longest battery life in an iPhone at the time.", image: MEDIA.battery, alt: "iPhone battery settings screen showing charge level" },
    ],
  },
  {
    slug: "13",
    name: "iPhone 13",
    year: "2021",
    tagline: "Your new superpower.",
    price: "From $449",
    image: MEDIA.delight,
    alt: "iPhone 13 shown against a colourful backdrop",
    chip: "A15 Bionic",
    display: '6.1" Super Retina XDR',
    camera: "12MP Wide with sensor-shift OIS · 12MP Ultra Wide",
    battery: "Up to 19 hrs video playback",
    colors: [swatch("Pink", "oklch(0.88 0.05 15)"), swatch("Midnight", "oklch(0.22 0.01 260)"), swatch("Blue", "oklch(0.6 0.08 250)"), swatch("Starlight", "oklch(0.94 0.01 90)")],
    storage: ["128GB", "256GB", "512GB"],
    highlights: [
      { title: "Cinematic mode", body: "Rack focus automatically while you film.", image: MEDIA.innovation, alt: "Cinematic video being recorded on iPhone" },
      { title: "MagSafe charging", body: "Snap on and charge up to 15W.", image: MEDIA.magsafeCharge, alt: "iPhone charging wirelessly showing 75% charged" },
      { title: "Privacy first", body: "On-device processing keeps your data yours.", image: MEDIA.privacy, alt: "Hand holding an iPhone showing a colourful Lock Screen" },
    ],
  },
  {
    slug: "12",
    name: "iPhone 12",
    year: "2020",
    tagline: "Blast past fast.",
    price: "From $379",
    image: MEDIA.magsafeCharge,
    alt: "iPhone 12 charging with MagSafe",
    chip: "A14 Bionic",
    display: '6.1" Super Retina XDR OLED',
    camera: "12MP Wide · 12MP Ultra Wide · Night mode",
    battery: "Up to 17 hrs video playback",
    colors: [swatch("Blue", "oklch(0.5 0.1 255)"), swatch("Green", "oklch(0.85 0.06 150)"), swatch("Red", "oklch(0.6 0.18 25)"), swatch("Black", "oklch(0.2 0.005 260)")],
    storage: ["64GB", "128GB", "256GB"],
    highlights: [
      { title: "Ceramic Shield", body: "Four times better drop performance.", image: MEDIA.security, alt: "iPhone display shown edge-on" },
      { title: "5G speed", body: "Download, stream and game at pace.", image: MEDIA.esim, alt: "iPhone connectivity settings screen" },
      { title: "MagSafe begins", body: "The magnet array that started an ecosystem.", image: MEDIA.magsafeLineup, alt: "MagSafe accessories attached to iPhones" },
    ],
  },
  {
    slug: "11",
    name: "iPhone 11",
    year: "2019",
    tagline: "Just the right amount of everything.",
    price: "From $299",
    image: MEDIA.aiApps,
    alt: "iPhone 11 shown with colourful app icons",
    chip: "A13 Bionic",
    display: '6.1" Liquid Retina HD',
    camera: "12MP Wide · 12MP Ultra Wide",
    battery: "Up to 17 hrs video playback",
    colors: [swatch("Purple", "oklch(0.85 0.05 300)"), swatch("Yellow", "oklch(0.92 0.09 95)"), swatch("Green", "oklch(0.9 0.04 150)"), swatch("Black", "oklch(0.2 0.005 260)")],
    storage: ["64GB", "128GB", "256GB"],
    highlights: [
      { title: "Night mode", body: "Low-light shots without the flash.", image: MEDIA.cameraMacro, alt: "Night mode photograph captured on iPhone" },
      { title: "Dual cameras", body: "Wide and Ultra Wide, seamlessly paired.", image: MEDIA.cameras, alt: "Dual camera system on the back of an iPhone" },
      { title: "All-day battery", body: "An hour longer than the generation before.", image: MEDIA.battery, alt: "iPhone battery screen" },
    ],
  },
];

/** Base (non-Pro) price of each generation, in Kenyan Shillings. */
const GENERATION_KES: Record<string, number> = {
  "17": 103900,
  "16": 90900,
  "15": 77900,
  "14": 68900,
  "13": 58900,
  "12": 49900,
  "11": 38900,
};

type VariantSpec = { suffix: string; multiplier: number; blurb: string; display?: string };

const VARIANTS: Record<string, VariantSpec[]> = {
  "17": [
    { suffix: "Air", multiplier: 1.2, blurb: "Impossibly thin.", display: '6.5" Super Retina XDR, ProMotion 120Hz' },
    { suffix: "Pro", multiplier: 1.32, blurb: "All out Pro.", display: '6.3" Super Retina XDR, ProMotion 120Hz' },
    { suffix: "Pro Max", multiplier: 1.55, blurb: "The biggest Pro yet.", display: '6.9" Super Retina XDR, ProMotion 120Hz' },
  ],
  "16": [
    { suffix: "Plus", multiplier: 1.14, blurb: "More screen, more day.", display: '6.7" Super Retina XDR' },
    { suffix: "Pro", multiplier: 1.32, blurb: "Titanium. So strong. So light.", display: '6.3" Super Retina XDR, ProMotion 120Hz' },
    { suffix: "Pro Max", multiplier: 1.55, blurb: "The ultimate iPhone.", display: '6.9" Super Retina XDR, ProMotion 120Hz' },
  ],
  "15": [
    { suffix: "Plus", multiplier: 1.14, blurb: "Big screen energy.", display: '6.7" Super Retina XDR' },
    { suffix: "Pro", multiplier: 1.32, blurb: "Titanium arrives.", display: '6.1" Super Retina XDR, ProMotion 120Hz' },
    { suffix: "Pro Max", multiplier: 1.5, blurb: "5x telephoto reach.", display: '6.7" Super Retina XDR, ProMotion 120Hz' },
  ],
  "14": [
    { suffix: "Plus", multiplier: 1.14, blurb: "Two-day battery.", display: '6.7" Super Retina XDR' },
    { suffix: "Pro", multiplier: 1.32, blurb: "Dynamic Island debuts.", display: '6.1" Super Retina XDR, ProMotion 120Hz' },
    { suffix: "Pro Max", multiplier: 1.5, blurb: "Pro, maxed.", display: '6.7" Super Retina XDR, ProMotion 120Hz' },
  ],
  "13": [
    { suffix: "mini", multiplier: 0.88, blurb: "Small, in a big way.", display: '5.4" Super Retina XDR' },
    { suffix: "Pro", multiplier: 1.3, blurb: "Oh. So. Pro.", display: '6.1" Super Retina XDR, ProMotion 120Hz' },
    { suffix: "Pro Max", multiplier: 1.48, blurb: "The longest battery.", display: '6.7" Super Retina XDR, ProMotion 120Hz' },
  ],
  "12": [
    { suffix: "mini", multiplier: 0.88, blurb: "Tiny, mighty.", display: '5.4" Super Retina XDR' },
    { suffix: "Pro", multiplier: 1.3, blurb: "It's a leap year.", display: '6.1" Super Retina XDR' },
    { suffix: "Pro Max", multiplier: 1.48, blurb: "Bigger sensor, brighter nights.", display: '6.7" Super Retina XDR' },
  ],
  "11": [
    { suffix: "Pro", multiplier: 1.35, blurb: "Pro cameras. Pro display.", display: '5.8" Super Retina XDR' },
    { suffix: "Pro Max", multiplier: 1.55, blurb: "The most powerful iPhone of 2019.", display: '6.5" Super Retina XDR' },
  ],
};

const round100 = (n: number) => Math.round(n / 100) * 100;

function buildGeneration(base: Model): Model[] {
  const baseKes = GENERATION_KES[base.slug] ?? 0;
  const root: Model = {
    ...base,
    generation: base.slug,
    variant: "Standard",
    priceKes: baseKes,
    price: fromKes(baseKes),
  };

  const derived = (VARIANTS[base.slug] ?? []).map<Model>((v) => {
    const kes = round100(baseKes * v.multiplier);
    const slug = `${base.slug}-${v.suffix.toLowerCase().replace(/\s+/g, "-")}`;
    return {
      ...base,
      slug,
      generation: base.slug,
      variant: v.suffix,
      name: `${base.name} ${v.suffix}`,
      tagline: v.blurb,
      display: v.display ?? base.display,
      priceKes: kes,
      price: fromKes(kes),
      storage: v.suffix.includes("Pro") ? [...base.storage.slice(1), "1TB"] : base.storage,
      alt: `${base.name} ${v.suffix} shown from the front and back`,
    };
  });

  return [root, ...derived];
}

/** Every iPhone we sell — each generation plus its mini / Plus / Air / Pro models. */
export const IPHONES: Model[] = BASE_IPHONES.flatMap(buildGeneration);

/** The seven flagship generations, for lineup and comparison views. */
export const IPHONE_GENERATIONS = BASE_IPHONES.map((b) => ({
  generation: b.slug,
  year: b.year,
  models: IPHONES.filter((m) => m.generation === b.slug),
}));



export type Mac = {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  priceKes: number;
  image: string;
  alt: string;
  specs: string[];
};

export const MACS: Mac[] = [
  { slug: "macbook-pro", name: "MacBook Pro", tagline: "Mind-blowing. Head-turning.", price: fromKes(207900), priceKes: 207900, image: MEDIA.macbook, alt: "MacBook Pro open on a desk", specs: ["M4 Pro or M4 Max", '14" or 16" Liquid Retina XDR', "Up to 24 hrs battery"] },
  { slug: "macbook-air", name: "MacBook Air", tagline: "Lean. Mean. M4 machine.", price: fromKes(129900), priceKes: 129900, image: MEDIA.macPerformance, alt: "MacBook Air shown at an angle", specs: ["M4 chip", '13" or 15" Liquid Retina', "Up to 18 hrs battery"] },
  { slug: "imac", name: "iMac", tagline: "Colourfully considered.", price: fromKes(168900), priceKes: 168900, image: MEDIA.macosHero, alt: "iMac displaying a colourful macOS desktop", specs: ["M4 chip", '24" 4.5K Retina', "Seven finishes"] },
  { slug: "mac-mini", name: "Mac mini", tagline: "Small, but mighty.", price: fromKes(77900), priceKes: 77900, image: MEDIA.spotlight, alt: "macOS Spotlight search shown on a Mac display", specs: ["M4 or M4 Pro", "Thunderbolt 5", "Five inches square"] },
  { slug: "mac-studio", name: "Mac Studio", tagline: "Empower station.", price: fromKes(259900), priceKes: 259900, image: MEDIA.macos, alt: "macOS desktop environment on a studio display", specs: ["M4 Max or M3 Ultra", "Up to 512GB memory", "Extensive I/O"] },
  { slug: "studio-display", name: "Studio Display", tagline: "A sight to be held.", price: fromKes(207900), priceKes: 207900, image: MEDIA.performance, alt: "Studio Display showing a high-detail image", specs: ['27" 5K Retina', "12MP Center Stage camera", "Six-speaker sound"] },
];

export type NavCategory = { label: string; to: string };

export const NAV_CATEGORIES: NavCategory[] = [
  { label: "Mac", to: "/mac" },
  { label: "iPhone", to: "/iphone" },
  { label: "Accessories", to: "/accessories" },
];

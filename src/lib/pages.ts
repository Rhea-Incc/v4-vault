/**
 * Static content pages reachable from the footer. One source of truth so
 * every route file stays a thin wrapper around <InfoPage />.
 */

export const CONTACT = {
  phones: ["0727 750 097", "+254 202-345-678"],
  location: "Junction Mall, Lavington",
  email: "helloatlucene.co",
  hours: "Mon–Sat, 9:00–19:00 · Sun, 11:00–17:00",
};

export type InfoSection = { heading: string; body: string };

export type InfoPageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  description: string;
  sections: InfoSection[];
};

export const PAGES = {
  "trade-in": {
    eyebrow: "Services",
    title: "Trade In.",
    intro:
      "Bring in your current device and put its value straight towards your next one. Instant in-store valuation, same-day credit.",
    description:
      "Trade in your Apple device at The Vault Inc for instant credit towards your next Mac, iPhone, iPad or Watch in Nairobi.",
    sections: [
      { heading: "How it works", body: "Book a valuation, bring the device to Junction Mall, and we assess condition, battery health and originality on the spot. Approved devices are credited to your bag immediately." },
      { heading: "What we accept", body: "iPhone 11 and newer, Apple Silicon Macs, iPad Air and Pro, and Apple Watch Series 6 and up. Devices must be signed out of iCloud and free of finance holds." },
      { heading: "Recycling", body: "Anything that no longer holds trade value is recycled responsibly at no cost to you." },
    ],
  },
  applecare: {
    eyebrow: "Services",
    title: "AppleCare+.",
    intro: "Extended cover for accidental damage, battery service and priority support — added at checkout or within 60 days of purchase.",
    description: "Add AppleCare+ cover to any device bought from The Vault Inc, with local claims handled in Nairobi.",
    sections: [
      { heading: "Cover", body: "Unlimited accidental damage incidents with a service fee, battery replacement below 80% capacity, and 24/7 priority technical support." },
      { heading: "Claims", body: "Start a claim in store or by phone. Most screen and battery services are completed same day for stocked models." },
      { heading: "Eligibility", body: "Available on new devices at the point of sale, or within 60 days with a remote diagnostic check." },
    ],
  },
  financing: {
    eyebrow: "Services",
    title: "Financing.",
    intro: "Spread the cost across 3, 6 or 12 months with our partner lenders — approvals in minutes, in KES.",
    description: "Flexible instalment plans in Kenyan Shillings on Mac, iPhone and accessories from The Vault Inc.",
    sections: [
      { heading: "Plans", body: "Pick 3, 6 or 12 monthly instalments at checkout. Deposits start from 20% of the device price." },
      { heading: "What you need", body: "A national ID, an M-Pesa registered line and proof of income or six months of statements." },
      { heading: "Repayments", body: "Instalments are collected by standing M-Pesa order on a date you choose. Settle early at any time, penalty free." },
    ],
  },
  business: {
    eyebrow: "For teams",
    title: "Business.",
    intro: "Fleet deployment, volume pricing and device management for teams of five to five hundred.",
    description: "Volume Apple purchasing, deployment and support for Kenyan businesses through The Vault Inc.",
    sections: [
      { heading: "Volume pricing", body: "Tiered pricing from five units, with consolidated invoicing and 30-day terms for registered companies." },
      { heading: "Deployment", body: "Devices arrive enrolled, named and imaged to your standard, ready to hand to staff on day one." },
      { heading: "Support", body: "A named account manager, priority repair turnaround and loaner devices while yours are in service." },
    ],
  },
  education: {
    eyebrow: "For schools",
    title: "Education.",
    intro: "Classroom pricing for students, teachers and institutions, with lab deployment and teacher training.",
    description: "Education pricing and classroom deployment for schools and students from The Vault Inc.",
    sections: [
      { heading: "Who qualifies", body: "Enrolled students, teaching staff and registered institutions. Bring a valid student or staff ID." },
      { heading: "Labs", body: "We plan, supply and configure Mac and iPad labs, including charging, networking and shared iPad setup." },
      { heading: "Training", body: "Free onboarding sessions for teaching staff at your campus or in store." },
    ],
  },
  support: {
    eyebrow: "Help",
    title: "Support.",
    intro: "Setup help, diagnostics, data transfer and repairs — walk in, or start with us over the phone.",
    description: "Get help with your Apple device: setup, diagnostics, data transfer and repairs at The Vault Inc.",
    sections: [
      { heading: "In store", body: "Walk-in diagnostics daily. Bring your device and, where possible, its original charger." },
      { heading: "Remote", body: "Call or email and we'll triage most software issues without you leaving the house." },
      { heading: "Repairs", body: "Genuine parts, calibrated tooling and a 90-day warranty on every service we carry out." },
    ],
  },
  stores: {
    eyebrow: "The Vault Inc",
    title: "Store locations.",
    intro: "One flagship, meticulously kept. Junction Mall, Lavington — with delivery countrywide.",
    description: "Visit The Vault Inc at Junction Mall, Lavington, or order online with delivery across Kenya.",
    sections: [
      { heading: "Flagship", body: "Junction Mall, Lavington, Nairobi. Full lineup on display, trade-in desk and a service bar." },
      { heading: "Delivery", body: "Same-day within Nairobi, next-day to major towns, and 2–3 days countrywide." },
      { heading: "Collection", body: "Order online and collect in store, usually within two hours of confirmation." },
    ],
  },
  about: {
    eyebrow: "The Vault Inc",
    title: "About us.",
    intro: "An Apple Authorized Reseller built around one idea: the buying should feel as considered as the product.",
    description: "The Vault Inc is an Apple Authorized Reseller in Nairobi, curating Mac, iPhone, iPad, Watch and accessories.",
    sections: [
      { heading: "What we do", body: "We stock the current Apple lineup and the generations still worth owning, each unit checked, charged and set up before it leaves us." },
      { heading: "How we sell", body: "No pressure, no upsell scripts. We ask what you need it for, then recommend the smallest device that does it well." },
      { heading: "After the sale", body: "Setup, data transfer, cover and service — all handled by the same team that sold you the device." },
    ],
  },
  careers: {
    eyebrow: "The Vault Inc",
    title: "Careers.",
    intro: "We hire for taste, patience and curiosity. Everything else we can teach.",
    description: "Open roles and how to apply at The Vault Inc in Nairobi.",
    sections: [
      { heading: "Open roles", body: "Retail specialists, service technicians and a business account manager. Send a short note and your CV." },
      { heading: "How we hire", body: "A conversation, a half-day on the floor with the team, then a decision within a week." },
      { heading: "Applying", body: `Email ${CONTACT.email} with the role in the subject line.` },
    ],
  },
  press: {
    eyebrow: "The Vault Inc",
    title: "Press.",
    intro: "Assets, statements and interview requests for journalists and creators.",
    description: "Press resources, brand assets and media contacts for The Vault Inc.",
    sections: [
      { heading: "Brand assets", body: "Logo, wordmark and store photography are available on request in print and web resolutions." },
      { heading: "Interviews", body: "Founders and retail leads are available for comment on the Kenyan Apple market and device longevity." },
      { heading: "Contact", body: `Email ${CONTACT.email} and we'll respond within one business day.` },
    ],
  },
  newsroom: {
    eyebrow: "The Vault Inc",
    title: "Newsroom.",
    intro: "Launches, availability and store news, in order of arrival.",
    description: "Latest launches, availability updates and store news from The Vault Inc.",
    sections: [
      { heading: "Latest launch", body: "The iPhone 17 lineup is in stock across all finishes, with trade-in valuations running at the service bar." },
      { heading: "Availability", body: "Apple Silicon Mac configurations are being restocked weekly. Ask us to reserve a spec." },
      { heading: "Store", body: "Extended weekend hours are in effect at Junction Mall through the launch period." },
    ],
  },
  returns: {
    eyebrow: "Orders",
    title: "Returns.",
    intro: "Fourteen days to change your mind on unopened items, seven on opened ones.",
    description: "Return policy, timelines and how to start a return with The Vault Inc.",
    sections: [
      { heading: "Windows", body: "Unopened items can be returned within 14 days. Opened, undamaged items within 7 days, less any activation." },
      { heading: "Condition", body: "Original packaging, accessories and documentation must be present, and the device signed out of iCloud." },
      { heading: "Refunds", body: "Refunds are issued to the original payment method within five business days of inspection." },
    ],
  },
  "repair-status": {
    eyebrow: "Orders",
    title: "Repair status.",
    intro: "Track a device that's with our service bar.",
    description: "Check the status of a repair booked with The Vault Inc service bar.",
    sections: [
      { heading: "Check a repair", body: "Have your repair ticket number ready and call the store, or reply to your booking email." },
      { heading: "Turnaround", body: "Screen and battery services on stocked models are usually same day. Logic board work takes 3–5 days." },
      { heading: "Collection", body: "We'll message you the moment your device is ready, and hold it securely for 30 days." },
    ],
  },
  newsletter: {
    eyebrow: "Stay close",
    title: "Newsletter.",
    intro: "Launch availability, restocks and quiet in-store offers. Roughly monthly, never noisy.",
    description: "Subscribe to The Vault Inc newsletter for launch availability, restocks and offers.",
    sections: [
      { heading: "What you get", body: "First word on launch stock, trade-in bonus windows and accessory bundles." },
      { heading: "How often", body: "Around once a month, and once more when something genuinely new lands." },
      { heading: "Subscribe", body: `Email ${CONTACT.email} with 'subscribe' and we'll add you. One click to leave, any time.` },
    ],
  },
  wishlist: {
    eyebrow: "Account",
    title: "Wishlist.",
    intro: "Save configurations you're weighing up and pick them back up on any device.",
    description: "Save and revisit device configurations in your The Vault Inc wishlist.",
    sections: [
      { heading: "Saving", body: "Sign in, then save any configuration from a product page to return to it later." },
      { heading: "Price watch", body: "We'll flag a saved item if its price moves or stock runs low." },
      { heading: "In store", body: "Show your saved list at the counter and we'll pull the exact configuration." },
    ],
  },
  contact: {
    eyebrow: "Say hello",
    title: "Contact.",
    intro: "Questions on stock, trade-in values, business orders or a device already with us — reach us directly.",
    description:
      "Contact The Vault Inc: call 0727 750 097 or +254 202-345-678, visit Junction Mall, Lavington, or email helloatlucene.co.",
    sections: [
      { heading: "Response times", body: "Calls are answered during opening hours and email within one business day." },
      { heading: "Business enquiries", body: "For volume orders and deployment, mention your company name and unit count so we can quote quickly." },
      { heading: "Existing orders", body: "Have your order number to hand — it starts with VLT — and we'll pull it up immediately." },
    ],
  },
} satisfies Record<string, InfoPageContent>;

export type PageSlug = keyof typeof PAGES;

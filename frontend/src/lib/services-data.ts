import {
  Share2,
  Film,
  Palette,
  Globe,
  Layers3,
  PenTool,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ServiceContent = {
  slug: string;
  icon: LucideIcon;
  title: string;
  shortTitle: string;
  // Listing page
  shortDesc: string;
  color: string;
  // Detail page
  hero: {
    eyebrow: string;
    heading: string;
    paragraph: string;
  };
  /** Right-side hero cards (4 items) */
  valueChips: { title: string; desc: string }[];
  /** Left-side checklist (5 items) — distinct per service */
  checklist: string[];
  /** Why Choose Us section heading + 3 cards */
  why: {
    heading: string;
    paragraph: string;
    cards: { title: string; desc: string }[];
  };
  /** Bottom CTA */
  cta: {
    headline: string;
    sub: string;
  };
};

export const services: ServiceContent[] = [
  {
    slug: "social-media",
    icon: Share2,
    title: "Social Media Management",
    shortTitle: "Social Media",
    shortDesc: "Consistent content systems that grow audiences and engagement.",
    color: "from-sky-500 to-blue-700",
    hero: {
      eyebrow: "Social Media Management",
      heading: "Content that earns attention every single week.",
      paragraph:
        "We run full social systems for brands — content calendars, reels, carousels, and community — built around a clear voice and a steady posting rhythm.",
    },
    valueChips: [
      { title: "Always-On Calendar", desc: "Monthly content plans, never empty grids." },
      { title: "Reels That Convert", desc: "Short-form built around hooks, not vibes." },
      { title: "Community Care", desc: "DMs, comments, replies handled with the brand voice." },
      { title: "Clear Reporting", desc: "Monthly metrics tied to growth, not vanity." },
    ],
    checklist: [
      "Brand voice + tone of voice guide",
      "Monthly content calendar (reels, carousels, stories)",
      "Hooks, captions and hashtags written by humans",
      "Engagement + community management",
      "Monthly performance report with next-month plan",
    ],
    why: {
      heading: "Consistency is the unfair advantage.",
      paragraph:
        "We don't post for the sake of posting. Every reel, carousel and story is mapped to a goal — awareness, trust, or sales.",
      cards: [
        {
          title: "Audience-First",
          desc: "Content built for your buyer, not the algorithm of the week.",
        },
        {
          title: "Reel-Led Growth",
          desc: "Short-form is the engine. We design content systems around it.",
        },
        {
          title: "Brand-Safe Voice",
          desc: "Captions and replies that always sound like you.",
        },
      ],
    },
    cta: {
      headline: "Want a content calendar you'll actually post?",
      sub: "Let's build a month of social you'll be proud to publish.",
    },
  },
  {
    slug: "short-form",
    icon: Film,
    title: "Short Form Video Editing",
    shortTitle: "Short Form Video",
    shortDesc: "Reels, Shorts and TikToks built to hold attention.",
    color: "from-cyan-500 to-blue-500",
    hero: {
      eyebrow: "Short Form Video Editing",
      heading: "Short-form content designed to stop scrolling.",
      paragraph:
        "Hook-first edits with tight pacing, on-brand captions and clean motion — built for reels, TikTok and YouTube Shorts that actually finish.",
    },
    valueChips: [
      { title: "Hook in 3s", desc: "Every edit starts with a reason to stay." },
      { title: "Retention Pacing", desc: "Cuts timed to keep eyes on the screen." },
      { title: "Captions That Read", desc: "Auto-captions polished, never raw." },
      { title: "Platform-Ready", desc: "Optimised for Reels, Shorts and TikTok." },
    ],
    checklist: [
      "Script and hook structure review",
      "Frame-perfect cuts with retention-driven pacing",
      "Branded captions, fonts and motion graphics",
      "Sound design, music and on-trend transitions",
      "Multi-platform exports (9:16, 1:1, 16:9)",
    ],
    why: {
      heading: "Built for the first three seconds.",
      paragraph:
        "Short-form lives or dies on the hook. Our edits earn the swipe-down with structure, not luck.",
      cards: [
        {
          title: "Viral Structure",
          desc: "Hook → tension → payoff. The format that actually retains.",
        },
        {
          title: "Brand-Consistent",
          desc: "Captions, colours and motion that match your identity.",
        },
        {
          title: "Fast Turnaround",
          desc: "Edits delivered in days, not weeks. Built for content velocity.",
        },
      ],
    },
    cta: {
      headline: "Ready to ship reels that finish?",
      sub: "Send us a raw clip — we'll show you what hook-first editing looks like.",
    },
  },
  {
    slug: "brand-identity",
    icon: Palette,
    title: "Branding & Identity",
    shortTitle: "Branding & Identity",
    shortDesc: "Logo systems and brand kits that make businesses memorable.",
    color: "from-blue-600 to-cyan-400",
    hero: {
      eyebrow: "Branding & Identity",
      heading: "Brand systems that make businesses memorable.",
      paragraph:
        "Logos, type, colour and tone — designed as one connected system so your brand reads the same on a pitch deck, a billboard, or a phone screen.",
    },
    valueChips: [
      { title: "Identity Systems", desc: "Logo, marks, palette and type as one kit." },
      { title: "Brand Guidelines", desc: "A clear playbook everyone can use." },
      { title: "Positioning", desc: "Tone, story and one-liner — sharp and honest." },
      { title: "Launch-Ready Kit", desc: "Files, templates and exports done right." },
    ],
    checklist: [
      "Discovery workshop + competitor audit",
      "Logo system (primary, secondary, monogram)",
      "Type, colour and grid foundations",
      "Brand guidelines document (PDF + web)",
      "Stationery, social and pitch templates",
    ],
    why: {
      heading: "A brand is a system, not a logo.",
      paragraph:
        "We design identities the way a product team would — consistent, documented, and ready to scale across every surface you'll ever touch.",
      cards: [
        {
          title: "Beyond the Logo",
          desc: "Type, voice, colour, motion — the full identity stack.",
        },
        {
          title: "Strategy-Led",
          desc: "Positioning first. Visuals follow the story.",
        },
        {
          title: "Documented",
          desc: "Guidelines your team can actually follow on day 200.",
        },
      ],
    },
    cta: {
      headline: "Ready to look like the brand you want to be?",
      sub: "Let's build your identity system from positioning to pixels.",
    },
  },
  {
    slug: "web-design",
    icon: Globe,
    title: "Web Design & Development",
    shortTitle: "Web Design & Dev",
    shortDesc: "Responsive websites engineered to convert, not just look pretty.",
    color: "from-blue-700 to-indigo-700",
    hero: {
      eyebrow: "Web Design & Development",
      heading: "Websites that load fast and convert faster.",
      paragraph:
        "Responsive marketing sites, landing pages and product sites — designed in Figma, built in React, and shipped with performance and SEO baked in.",
    },
    valueChips: [
      { title: "Conversion-First", desc: "Every page mapped to one action." },
      { title: "Performance", desc: "90+ Lighthouse, on real devices." },
      { title: "Responsive", desc: "Phone, tablet, laptop — pixel-honest." },
      { title: "CMS Ready", desc: "Edit content without touching code." },
    ],
    checklist: [
      "Sitemap, wireframes and content structure",
      "High-fidelity UI design in Figma",
      "Responsive front-end build (React / Next.js)",
      "On-page SEO, schema and performance pass",
      "Deployment, analytics and post-launch support",
    ],
    why: {
      heading: "Built for outcomes, not awards.",
      paragraph:
        "We design and build websites that move a number — bookings, signups, demos. The look matters; the action matters more.",
      cards: [
        {
          title: "Landing Pages",
          desc: "Single-purpose pages that turn ad clicks into pipeline.",
        },
        {
          title: "Engineered",
          desc: "Clean React code, fast deploys, no template lock-in.",
        },
        {
          title: "Measured",
          desc: "Analytics, events and A/B tests wired in from day one.",
        },
      ],
    },
    cta: {
      headline: "Want a site that pulls its weight?",
      sub: "Let's design and ship a website your business deserves.",
    },
  },
  {
    slug: "ui-ux",
    icon: Layers3,
    title: "UI/UX Design",
    shortTitle: "UI / UX Design",
    shortDesc: "Interfaces built for clarity and conversion.",
    color: "from-blue-500 to-sky-400",
    hero: {
      eyebrow: "UI / UX Design",
      heading: "Interfaces built for clarity and conversion.",
      paragraph:
        "Product UX, dashboards and app interfaces — researched, wireframed and designed so users move forward without thinking.",
    },
    valueChips: [
      { title: "User Research", desc: "Interviews, flows, real friction points." },
      { title: "Wireframes", desc: "Structure before pixels. Always." },
      { title: "Design Systems", desc: "Components, tokens and a Figma library." },
      { title: "Prototyping", desc: "Click-through prototypes before a line of code." },
    ],
    checklist: [
      "Discovery + user journey mapping",
      "Low-fidelity wireframes and user flows",
      "High-fidelity UI screens in Figma",
      "Interactive prototype for usability testing",
      "Design system + handoff for developers",
    ],
    why: {
      heading: "Clarity is the design.",
      paragraph:
        "We don't decorate screens. We strip them down until the next click is obvious — and then we make it beautiful.",
      cards: [
        {
          title: "Usability First",
          desc: "Designs tested on real users, not just stakeholders.",
        },
        {
          title: "Systems Thinking",
          desc: "Reusable components, consistent patterns across the product.",
        },
        {
          title: "Dev-Ready",
          desc: "Tokens, specs and Figma files engineers actually like.",
        },
      ],
    },
    cta: {
      headline: "Ready for a product that feels obvious?",
      sub: "Let's design an interface your users won't need a tour for.",
    },
  },
  {
    slug: "content-strategy",
    icon: PenTool,
    title: "Content Strategy",
    shortTitle: "Content Strategy",
    shortDesc: "Content plans that turn an audience into a pipeline.",
    color: "from-indigo-600 to-blue-500",
    hero: {
      eyebrow: "Content Strategy",
      heading: "A content plan that doesn't run out of ideas.",
      paragraph:
        "Quarterly content strategy, pillars, formats and campaigns — mapped to your business goals and the channels your audience actually uses.",
    },
    valueChips: [
      { title: "Content Pillars", desc: "3–5 themes you'll own consistently." },
      { title: "Channel Plan", desc: "Right format, right platform, right time." },
      { title: "Editorial Calendar", desc: "Posts, campaigns and launches mapped." },
      { title: "Voice & Messaging", desc: "How you sound across every touchpoint." },
    ],
    checklist: [
      "Audience research + buyer-level messaging",
      "Content pillars and quarterly themes",
      "Editorial calendar across channels",
      "Campaign direction and launch playbooks",
      "Tone of voice and messaging framework",
    ],
    why: {
      heading: "Strategy first, content second.",
      paragraph:
        "Most brands don't have a content problem — they have a clarity problem. We fix the brief before we touch a caption.",
      cards: [
        {
          title: "Audience Mapping",
          desc: "Who you're for, where they are, what they actually care about.",
        },
        {
          title: "Campaign Direction",
          desc: "Launches and seasons planned end-to-end, not improvised.",
        },
        {
          title: "Messaging That Sticks",
          desc: "One-liners and value props your team will actually use.",
        },
      ],
    },
    cta: {
      headline: "Tired of guessing what to post?",
      sub: "Let's build a content strategy your team can run for the next 90 days.",
    },
  },
];

export function getServiceBySlug(slug: string | undefined): ServiceContent | undefined {
  if (!slug) return undefined;
  const lower = slug.toLowerCase();
  return services.find((s) => s.slug.toLowerCase() === lower);
}

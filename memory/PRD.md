# Marca Rise — Product Requirements Doc

## Original Problem
User provided their Marca Rise website source (Vite + React + TypeScript, Tailwind, wouter routing, light agency aesthetic with blue/indigo accents) and asked for **10 scoped enhancements** without changing the design system, typography, colour palette or layout structure. Iteration 2 follow-up: remove mascots, fix scroll restoration, remove floating widget, add WhatsApp/Instagram/LinkedIn inside contact section, mobile responsiveness pass, add premium splash + page transition.

## Tech Stack
- **Frontend**: Vite + React 19 + TypeScript, Tailwind CSS, wouter routing, framer-motion, lucide-react, react-icons
- **Backend**: FastAPI (Python), MongoDB (Motor), Resend SDK for email delivery
- **Deploy**: Supervisor — `yarn start` → `vite --host 0.0.0.0 --port 3000`; uvicorn on 8001

## Personas
- **Founders / startup teams** evaluating Marca Rise for branding, websites, video content, or social media
- **Sam (Co-Founder & CEO)** receives all contact-form submissions via email
- **Visitor on mobile/desktop** with WhatsApp/Instagram/LinkedIn touchpoints inside the contact page

## Core Requirements (static)
1. Preserve existing aesthetic — no redesign, only requested changes
2. Reuse existing component patterns, no inconsistent styling
3. Responsive across mobile/tablet/desktop
4. Production-ready accessibility, semantic markup, data-testid attributes

## What's Been Implemented

### Iteration 1 (Jan 2026)
- Migrated user's Vite project to `/app/frontend`
- 6 services with per-slug unique content (`src/lib/services-data.ts`)
- Floating Book-a-Call widget linking to Calendly (later removed in iter-2)
- Mascot system (later removed in iter-2)
- Founders premium cards (Home + About)
- Removed FloatingWhatsApp
- FAQ content rewrite
- Navbar: removed BLOG / added CONTACT
- Contact form with Resend integration → `sam.marcarise@gmail.com`
- LinkedIn icon via `FaLinkedin`
- 404 page enhancement

### Iteration 2 (Jan 2026)
1. **Removed all mascot images / Mascot component / mascot assets**, cleaned up imports across 7+ files
2. **Scroll restoration** — `ScrollToTop.tsx` mounted in App.tsx; runs `window.scrollTo(0,0)` on every wouter location change. Tested: scrollY=0 after every nav.
3. **Removed BookACallWidget** completely (component, asset, import in App.tsx)
4. **Contact socials** — Added WhatsApp + Instagram + LinkedIn inside the "Connect With Us" card on the contact section. Open in new tabs. Premium hover that matches existing brand pattern (blue-50 bg → blue-600 on hover).
5. **Mobile responsiveness pass**:
   - Global CSS overrides under `@media (max-width: 640px)` for `.text-5xl/6xl/7xl` to keep headings fluid
   - `html, body { overflow-x: hidden }` to kill horizontal scroll
   - Hero, Services, ServiceDetails, Contact, Founders cards now use `sm:`/`md:` responsive sizing for padding, font, rounded corners, gap and grid columns
   - Tested at 390x800: zero overflow on Home, Services, /services/social-media and Contact
6. **Premium loading**:
   - `SplashScreen.tsx` — first-visit only (session-scoped via `sessionStorage`), 2.2s of logo pulse + brand glow + animated underline, fades out smoothly
   - `PageTransition.tsx` — soft white blur overlay with pulsing logo for ~900ms on every route change

### Backend
- `POST /api/contact` (unchanged from iter-1) — Pydantic validation, Resend HTML email, MongoDB persistence
- Logger initialised at top of `server.py`

## Testing
- **Iteration 1**: backend pytest 7/7, frontend playwright all green
- **Iteration 2**: frontend 10/10 — `iteration_2.json` summary shows 100% pass rate, zero issues, zero console errors
- Manual smoke: Resend delivery returns id, email lands at sam.marcarise@gmail.com via sandbox sender

## Prioritised Backlog

### P1
- Replace Resend sandbox sender (`onboarding@resend.dev`) with a verified custom domain (`hello@marcarise.in`) for production deliverability
- Add real founder photos to replace gradient initial avatars
- Sitemap.xml + robots.txt for SEO
- Purge `TEST_` prefixed entries from `contact_submissions` collection if desired

### P2
- Re-introduce Blog in navigation if a CMS is added
- Analytics + form-submission event tracking (GA4 / Plausible)
- Light loading skeleton on service detail pages

### Future / Backlog
- A/B-test contact form copy variants
- Multi-language support if expanding beyond English markets

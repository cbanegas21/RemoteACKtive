# Remote ACKtive — CLAUDE.md
> Project context, architecture, and task tracker for AI-assisted development.

---

## Stack
- **Framework**: Next.js 16.1.6 (App Router), React 19.1.0, TypeScript
- **Styling**: Tailwind CSS 3.4.0 (`tailwind.config.js`)
- **Package Manager**: pnpm@10.30.2
- **Deployment**: Standalone output (`next.config.ts`), hosted at **remoteacktive.com**
- **Email**: Resend API (`RESEND_API_KEY` env var) via `/api/contact`
- **3D Globe**: Three.js 0.180.0 + @react-three/fiber + three-globe
- **Analytics**: Google Analytics `G-BEYLVNF0X5` with Consent Mode v2
- **Calendly**: `https://calendly.com/admin-remoteacktive/30min`

---

## Business Info (Hardcoded throughout)
- Email: admin@remoteacktive.com
- Phone: +1 (415) 251-1945
- LinkedIn: https://www.linkedin.com/company/108573561/
- Google Verification: `lTHT9Cq0sXbeki75IwJfOWCxDfDsP1-Cq87NAvoaOgk`
- Key claims: 70% cost savings, 3–10 days to hire, 18+ countries, 500+ placements, 4.9/5 rating, 94% retention

---

## Pages

| Route | File | Notes |
|-------|------|-------|
| `/` | `app/page.tsx` | Single-page site, "use client", all sections stacked |
| `/book-a-call` | `app/book-a-call/page.tsx` + `layout.tsx` | Calendly + 3 form tabs |
| `/api/contact` | `app/api/contact/route.ts` | POST → Resend API, formType routing |
| `/blog` | ❌ MISSING | Referenced in sitemap + nav, 404s |
| `/blog/[slug]` | ❌ MISSING | 3 slugs in sitemap, no implementation |

---

## Page Section Order (homepage)

```
Header → HeroWithGlobe → WhyChooseUs → ThreeTierServices → CostComparison
→ GuaranteeSection → DepartmentGrid → WhatMakesUsDifferent → AboutBlock
→ HowItWorks → Testimonials → FAQ → ContactCTA → Footer
```

---

## Component Map

### Layout / Shell
| Component | Purpose |
|-----------|---------|
| `Header.tsx` | Fixed nav, scroll-aware blur, mobile hamburger, "Book a Call" CTA |
| `Footer.tsx` | Links, LinkedIn social, email/phone, dynamic copyright year |
| `Section.tsx` | Section wrapper — backgrounds: light/white/dark/gradient |
| `Card.tsx` | Reusable card — variants: light/dark |
| `CookieConsent.tsx` | GA Consent Mode v2 banner, localStorage, 1.2s delay |

### Hero
| Component | Purpose |
|-----------|---------|
| `HeroWithGlobe.tsx` | Stats bar, headline, CTA, hosts Globe + LogoSlider |
| `GitHubHeroGlobe.tsx` | Three.js 3D globe, 15 worker bubbles, 10 arc paths, auto-rotate |
| `CompanyLogosSlider.tsx` | 12 company logos infinite scroll (Meta, Google, MSFT, etc.) |

### Services & Pricing
| Component | Purpose |
|-----------|---------|
| `ThreeTierServices.tsx` | 3 packages: Recruitment-Only, Full Experience (featured), Training |
| `CostComparison.tsx` | 6-role cost table: US vs Remote ACKtive, 70-73% savings |
| `GuaranteeSection.tsx` | 100% satisfaction guarantee badge |

### Departments
| Component | Purpose |
|-----------|---------|
| `DepartmentGrid.tsx` | 9 depts, 79 total roles, searchable, expandable cards |

### About
| Component | Purpose |
|-----------|---------|
| `WhyChooseUs.tsx` | 4 benefit cards (Cost, Handpicked, Speedy, Global) |
| `WhatMakesUsDifferent.tsx` | 3 differentiators (Veterans, 6-step vetting, Partnership) |
| `AboutBlock.tsx` | Story (founders: Andre, Carlos, Kevin), mission, vision, 5 core values |
| `HowItWorks.tsx` | 4-step process, CTA → /book-a-call |

### Social Proof
| Component | Purpose |
|-----------|---------|
| `Testimonials.tsx` | 6 hardcoded testimonials, carousel (3 desktop / 1 mobile), trust bar |

### Contact & Forms
| Component | Purpose |
|-----------|---------|
| `ContactCTA.tsx` | 3 contact cards + form tabs (Recruitment/Full/Training) |
| `FormContext.tsx` | Context: formType (general/hire-only/hire-manage/training) |
| `HireOnlyForm.tsx` | Recruitment-Only form → POST /api/contact formType=hire-only |
| `HireManageForm.tsx` | Full Experience form → POST /api/contact formType=hire-manage |
| `GeneralContactForm.tsx` | Training/General form → POST /api/contact |
| `FAQ.tsx` | 14 FAQs, URL hash deep-link, expand/collapse all, keyboard nav |

### Unused Components (exist but not rendered on homepage)
- `StatsSection.tsx` — Animated counters
- `ServicesSplit.tsx`
- `GlobalPerspective.tsx`
- `Handpicked.tsx`
- `Speedy.tsx`
- `WhyCostEffective.tsx`

---

## Color System

| Token | Hex | Usage |
|-------|-----|-------|
| `primary-teal` / `primary-cyan` | `#57C5CF` | Accents, focus rings, icons |
| `primary-green` | `#378B57` | Secondary green |
| `primary-orange` / `primary-gold` | `#F5A623` | Dept grid, badges |
| `primary-navy` | `#0F1926` | Body bg |
| CTA button | `#4FFFB0` | Mint green CTA (20+ components) |
| Card bg | `#1E2430` / `#2A3142` | Form inputs, cards |
| Footer bg | `#060F1E` | Footer only |
| Gradient | `#248B93 → #1A5538` | gradient-primary |

> **Note**: `primary-orange` IS defined in `tailwind.config.js` as `#F5A623` (same as gold). Previous audit note was wrong.

---

## Images

| File | Status | Used In |
|------|--------|---------|
| `/public/images/logo.png` | ✅ exists | Header |
| `/public/images/logowhite.png` | ✅ exists | Footer |
| `/public/images/og-image.jpg` | ✅ exists | layout.tsx OG meta (1200×630, commit 49853b2) |
| `/public/images/ourstory.png` | ❓ unknown | AboutBlock |
| `/public/images/companies/*.png` | ❓ assumed | CompanyLogosSlider (12 files) |

---

## Known Bugs & Issues

### Critical
- [x] **OG image missing**: ✅ Fixed — `/public/images/og-image.jpg` added (commit 49853b2), wired into layout.tsx openGraph + twitter
- [ ] **Blog 404**: `/blog` and `/blog/[slug]` referenced in sitemap + nav but not implemented

### High Priority
- [x] **Privacy Policy & Terms links**: ✅ Fixed — Footer and CookieConsent now link to real `/privacy-policy` and `/terms` pages (commit a7b1220)
- [ ] **Blog nav link** in Header points to non-existent route

### Medium Priority
- [ ] **ourstory.png** — existence unconfirmed
- [ ] **Company logos** — 12 `.png` files existence unconfirmed (`/public/images/companies/`)
- [ ] **No rate limiting** on `/api/contact` — vulnerable to spam

### Low Priority / Polish
- [ ] No loading skeleton/fallback for Three.js globe init
- [x] Cookie consent Privacy Policy link is `#` (placeholder) ✅ Fixed in commit a7b1220
- [ ] Form error messages hardcoded in each form component (not DRY)
- [ ] Slight focus ring color inconsistency: HireOnlyForm uses `#57C5CF`, HireManageForm uses `#4DD0E1`

---

## Upcoming Tasks / Feature Backlog

> Add tasks here as they come up during development sessions.

- [x] Create OG image (1200×630) and add to `/public/images/og-image.jpg` ✅ commit 49853b2
- [ ] Implement blog (`/blog` listing + `/blog/[slug]` pages with 3 articles)
- [x] Add Privacy Policy and Terms of Service pages ✅ commit a7b1220
- [ ] Add rate limiting to `/api/contact` (e.g., `upstash/ratelimit`)
- [ ] Add Three.js globe error boundary / loading state
- [ ] Audit and confirm all image files exist in `/public/images/`
- [ ] Consider adding `StatsSection` to homepage

---

## API Reference

### POST `/api/contact`
**Body**:
```json
{
  "name": "string (required)",
  "email": "string (required, validated)",
  "formType": "general | hire-only | hire-manage | training",
  "company": "string",
  "roles": "string",
  "description": "string",
  "timeline": "string",
  "budget": "string",
  "teamSize": "string",
  "referral": "string"
}
```
**Responses**: `200 OK`, `400 Bad Request` (validation), `500 Internal Server Error`

---

## Environment Variables
```
RESEND_API_KEY=         # Resend email delivery
```
(No other env vars currently required; SMTP vars from old config are no longer used)

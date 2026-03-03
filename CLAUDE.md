# Remote ACKtive — CLAUDE.md
> Single source of truth for AI-assisted development.
> **Always read this file first before making any changes.**
> Last updated: 2026-03-03 (PageSpeed performance pass)

---

## Stack

| Item | Detail |
|------|--------|
| Framework | Next.js 16.1.6 (App Router), React 19.1.0, TypeScript |
| Styling | Tailwind CSS 3.4.0 — config in `tailwind.config.js` |
| Package Manager | pnpm@10.30.2 |
| Deployment | Standalone output (`next.config.ts`) → **remoteacktive.com** |
| Email | Resend API — env var `RESEND_API_KEY` — route `/api/contact` |
| 3D Globe | Three.js 0.180.0 (raw, not @react-three/fiber) + dot-texture overlay |
| Analytics | Google Analytics `G-BEYLVNF0X5` with Consent Mode v2 |
| Calendly | `https://calendly.com/admin-remoteacktive/30min` |
| OG Image API | `/api/og` — dynamic route (exists, serves OG images) |

---

## Business Info (hardcoded throughout the site)

| Field | Value |
|-------|-------|
| Email | admin@remoteacktive.com |
| Phone | +1 (415) 251-1945 |
| LinkedIn | https://www.linkedin.com/company/108573561/ |
| Facebook | https://www.facebook.com/profile.php?id=61575144124346 |
| Google Verification | `lTHT9Cq0sXbeki75IwJfOWCxDfDsP1-Cq87NAvoaOgk` |
| GA4 Measurement ID | `G-BEYLVNF0X5` |
| Key claims | 70% cost savings · 3–10 days to hire · 18+ countries · 500+ placements · 4.9/5 rating · 94% retention |

---

## All Live Routes

| Route | File(s) | Type | Notes |
|-------|---------|------|-------|
| `/` | `app/page.tsx` | Static | Single-page site, `"use client"`, all sections stacked |
| `/book-a-call` | `app/book-a-call/page.tsx` + `layout.tsx` | Static | Calendly embed + 3 form tabs |
| `/blog` | `app/blog/page.tsx` | Static | Listing page — featured post + article grid + CTA banner |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` + `app/lib/blog.ts` | SSG | 7 articles pre-rendered — see slug list below |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | Static | Full privacy policy page |
| `/terms` | `app/terms/page.tsx` | Static | Full terms of service page |
| `/api/contact` | `app/api/contact/route.ts` | Dynamic (POST) | Resend email + rate limiting |
| `/api/og` | `app/api/og/route.ts` | Dynamic | OG image generation |

### Blog Slugs (all 7 SSG-prerendered)

| Slug | Last Mod |
|------|----------|
| `save-on-hiring-costs-new-llc` | 2026-02-10 |
| `advantages-of-hiring-remote-contractors` | 2026-02-15 |
| `era-of-remote-contracting` | 2026-02-20 |
| `how-to-manage-a-remote-team` | 2026-02-25 |
| `latam-outsourcing-country-comparison` | 2026-03-01 |
| `honduras-english-proficiency-outsourcing` | 2026-03-01 |
| `reinvest-payroll-savings-from-remote-hiring` | 2026-03-03 |

---

## Homepage Section Order

```
Header
  └─ HeroWithGlobe
       └─ GlobeWithFallback → GitHubHeroGlobe (Three.js)
       └─ CompanyLogosSlider
WhyChooseUs
ThreeTierServices
CostComparison
GuaranteeSection
DepartmentGrid
WhatMakesUsDifferent
AboutBlock
HowItWorks
Testimonials
FAQ
ContactCTA
Footer
```

---

## Component Map

### Layout / Shell
| Component | Purpose |
|-----------|---------|
| `Header.tsx` | Fixed nav, scroll-aware blur, mobile hamburger, "Book a Call" CTA; nav links to `/blog` (live) |
| `Footer.tsx` | Links, LinkedIn social, email/phone, dynamic copyright year; Privacy Policy + Terms link to real pages |
| `Section.tsx` | Section wrapper — background variants: `light` / `white` / `dark` / `gradient` |
| `Card.tsx` | Reusable card — variants: `light` / `dark` |
| `CookieConsent.tsx` | GA Consent Mode v2 banner; stores choice in `localStorage('cookie-consent')`; 1.2s appearance delay; links to `/privacy-policy` |

### Hero
| Component | Purpose |
|-----------|---------|
| `HeroWithGlobe.tsx` | Server component; headline, CTA buttons, stats strip, logo slider; hosts globe via `<GlobeWithFallback />` |
| `GlobeWithFallback.tsx` | `'use client'`; React Error Boundary (`GlobeErrorBoundary` class) wrapping `GitHubHeroGlobe`; on WebGL crash shows a teal radial glow fallback instead of breaking |
| `GitHubHeroGlobe.tsx` | `'use client'`; Three.js 3D globe: purple sphere + dot texture + 10 arc tubes + 15 cyan spires + 15 floating worker cards (pinned by lat/lng, up to 3 visible at once, fade in/out, rotate with globe); `isReady` state shows pulsing teal placeholder until first WebGL frame fires |
| `CompanyLogosSlider.tsx` | 12 company logos (Meta, Google, MSFT, etc.) in an infinite CSS scroll strip |

### Services & Pricing
| Component | Purpose |
|-----------|---------|
| `ThreeTierServices.tsx` | 3 packages: Recruitment-Only · Full Experience (featured/highlighted) · Training |
| `CostComparison.tsx` | 6-role cost table — US salary vs Remote ACKtive, showing 70–73% savings |
| `GuaranteeSection.tsx` | 100% satisfaction guarantee badge |

### Departments
| Component | Purpose |
|-----------|---------|
| `DepartmentGrid.tsx` | 9 department cards, 79 total roles, searchable input, expandable cards with role lists |

### About
| Component | Purpose |
|-----------|---------|
| `WhyChooseUs.tsx` | 4 benefit cards: Cost Efficiency, Handpicked Talent, Speedy Hiring, Global Reach |
| `WhatMakesUsDifferent.tsx` | 3 differentiators: Veteran founders, 6-step vetting process, True partnership model |
| `AboutBlock.tsx` | Company story (founders: Andre, Carlos, Kevin), mission, vision, 5 core values; uses `/images/ourstory.png` |
| `HowItWorks.tsx` | 4-step process visual; CTA button → `/book-a-call` |

### Social Proof
| Component | Purpose |
|-----------|---------|
| `Testimonials.tsx` | 6 hardcoded testimonials; carousel (3 per slide on desktop, 1 on mobile); trust bar with rating |

### Contact & Forms
| Component | Purpose |
|-----------|---------|
| `ContactCTA.tsx` | 3 contact cards + tabbed form interface (driven by FormContext) |
| `FormContext.tsx` | React Context — `formType`: `general` / `hire-only` / `hire-manage` / `training` |
| `HireOnlyForm.tsx` | Recruitment-Only form → POST `/api/contact` with `formType=hire-only` |
| `HireManageForm.tsx` | Full Experience form → POST `/api/contact` with `formType=hire-manage` |
| `GeneralContactForm.tsx` | Training / general inquiry form → POST `/api/contact` |
| `FAQ.tsx` | 14 FAQs, URL hash deep-link per question, expand/collapse all toggle, keyboard nav (Enter/Space) |

### Blog
| Component / File | Purpose |
|-----------------|---------|
| `app/blog/page.tsx` | Listing page: featured article hero + grid of remaining articles + CTA banner |
| `app/blog/[slug]/page.tsx` | Article layout: breadcrumb, sections, bullet lists, FAQ accordion, related posts, JSON-LD structured data |
| `app/lib/blog.ts` | Data layer: all 7 posts as typed objects; exports `getBlogPost(slug)`, `getAllSlugs()`, `blogPosts[]` |

### Legal Pages
| File | Purpose |
|------|---------|
| `app/privacy-policy/page.tsx` | Full Privacy Policy |
| `app/terms/page.tsx` | Full Terms of Service |

### Unused Components (exist in repo, not rendered on homepage)
| Component | Notes |
|-----------|-------|
| `StatsSection.tsx` | Animated number counters — could be added to homepage |
| `ServicesSplit.tsx` | Alternative services layout |
| `GlobalPerspective.tsx` | World map / global reach visual |
| `Handpicked.tsx` | Standalone handpicked talent section |
| `Speedy.tsx` | Standalone speed/time-to-hire section |
| `WhyCostEffective.tsx` | Cost efficiency explainer |

---

## Color System

| Token | Hex | Usage |
|-------|-----|-------|
| `primary-teal` / `primary-cyan` | `#57C5CF` | Accents, focus rings, icon fills |
| `primary-green` | `#378B57` | Secondary green |
| `primary-orange` / `primary-gold` | `#F5A623` | Dept grid badges, highlights |
| `primary-navy` | `#0F1926` | Body / section background |
| CTA button | `#4FFFB0` | Mint green — used in 20+ components |
| Card bg | `#1E2430` / `#2A3142` | Form inputs, dark cards |
| Footer bg | `#060F1E` | Footer only |
| Gradient | `#248B93 → #1A5538` | `gradient-primary` utility |

> `primary-orange` IS defined in `tailwind.config.js` as `#F5A623` (same as gold). No missing token.

---

## Images & Public Assets

| File | Status | Used In |
|------|--------|---------|
| `/public/images/logo.png` | ✅ confirmed | Header |
| `/public/images/logowhite.png` | ✅ confirmed | Footer |
| `/public/images/og-image.jpg` | ✅ confirmed (1200×630) | `layout.tsx` OG + Twitter meta |
| `/public/images/favicon.png` | ✅ confirmed | `layout.tsx` icon |
| `/public/images/ourstory.png` | ✅ confirmed | `AboutBlock.tsx` |
| `/public/images/companies/*.png` | ✅ confirmed (14 files) | `CompanyLogosSlider.tsx` — 12 logos + `americanexpress.png` + `walmart.webp` (extras, not rendered) |
| `/public/images/hero-glow.svg` | ⚠️ NEEDS UPLOAD | `HeroWithGlobe.tsx` — decorative background glow; code updated to local path; **user must save from** `github.githubassets.com/images/modules/site/home/hero-glow.svg` |
| `/public/textures/globe-dots.png` | ✅ confirmed (361 KiB — compress!) | `GitHubHeroGlobe.tsx` dot texture overlay |
| `/public/robots.txt` | ✅ exists | Allows all crawlers, points to sitemap |
| `/public/sitemap.xml` | ✅ exists | All 9 routes listed; up to date |

---

## SEO & Google Search Console

### Current SEO Setup
- Metadata in `app/layout.tsx`: title, description, keywords, OG tags, Twitter card, robots, Google verification
- `metadataBase`: `https://remoteacktive.com`
- Structured data (JSON-LD): Organization schema + Service schema in `layout.tsx`
- Blog article pages have their own JSON-LD (Article + FAQPage schemas)
- `public/robots.txt`: `Allow: /` — points to sitemap
- `public/sitemap.xml`: all 9 live routes with `lastmod`, `changefreq`, `priority`
- Google Search Console verified via meta tag: `lTHT9Cq0sXbeki75IwJfOWCxDfDsP1-Cq87NAvoaOgk`

### Per-Route Metadata Audit (2026-03-03) — All ✅
| Route | Mechanism | Status |
|-------|-----------|--------|
| `/` | `layout.tsx` `metadata` export | ✅ title, description, OG, Twitter, canonical, robots |
| `/book-a-call` | `layout.tsx` `metadata` export | ✅ title, description, OG, Twitter, canonical |
| `/blog` | `page.tsx` `metadata` export | ✅ title, description, OG |
| `/blog/[slug]` | `generateMetadata()` per-post | ✅ title, description, OG (article), Twitter, canonical; + Article + FAQPage JSON-LD |
| `/privacy-policy` | `page.tsx` `metadata` export | ✅ title, description, canonical, robots index/follow |
| `/terms` | `page.tsx` `metadata` export | ✅ title, description, canonical, robots index/follow |

### Alt Text Audit (2026-03-03) — All ✅
| Component | Images | Alt Text Status |
|-----------|--------|----------------|
| `Header.tsx` | `logo.png` | ✅ `"Remote ACKtive Logo"` |
| `Footer.tsx` | `logowhite.png` | ✅ `"Remote ACKtive Logo"` |
| `CompanyLogosSlider.tsx` | 12 logos | ✅ `"${company} logo"` (dynamic) |
| `AboutBlock.tsx` | `ourstory.png` | ✅ `alt=""` — decorative, parent `aria-hidden="true"` |
| `Testimonials.tsx` | None | ✅ CSS-only avatars, no `<img>` tags |

### When to Resubmit Sitemap to Google Search Console
**Resubmit ONLY when:**
- New URL routes are added (new pages, new blog slugs)
- Existing URLs are removed or redirected (canonical changes)
- You change the sitemap file itself

**Do NOT need to resubmit for:**
- Bug fixes, UI changes, component refactors
- Backend logic changes (rate limiting, API changes)
- Dependency updates
- CSS/style-only changes
- Adding error boundaries or loading states
- Any change that doesn't affect the URL structure

> The most recent batch of changes (rate limiting, globe error boundary, loading state) did **NOT** require GSC resubmission — no URLs changed.

### Future: When You Add New Blog Posts
1. Add the post to `app/lib/blog.ts`
2. Add its URL to `public/sitemap.xml` with today's date
3. Run `pnpm build` to verify SSG pre-render
4. Deploy
5. In Google Search Console → Sitemaps → resubmit `https://remoteacktive.com/sitemap.xml`

---

## API Reference

### POST `/api/contact`

**Rate Limiting**: 5 submissions per IP per hour (in-memory sliding window, resets on server restart). Returns `429` when exceeded.

**Request Body**:
```json
{
  "name": "string (required)",
  "email": "string (required, validated by regex)",
  "formType": "general | hire-only | hire-manage | training",
  "company": "string (optional)",
  "roles": "string (optional)",
  "description": "string (optional)",
  "timeline": "string (optional)",
  "budget": "string (optional)",
  "teamSize": "string (optional)",
  "referral": "string (optional)"
}
```

**Responses**:
| Status | Meaning |
|--------|---------|
| `200` | Message sent via Resend successfully |
| `400` | Missing required field or invalid email format |
| `429` | Rate limit exceeded (5 req/IP/hr) |
| `500` | Resend API error |

**Email behavior**: Sends to `admin@remoteacktive.com`, reply-to set to sender's email, subject includes form type and sender name, HTML + plain text versions sent.

---

## Environment Variables

```
RESEND_API_KEY=re_...    # Resend email delivery API key (required)
```

> No other env vars needed. Old SMTP vars (SMTP_HOST, SMTP_PORT, etc.) are no longer used — Resend replaced Nodemailer entirely.

---

## Commit History (key milestones)

| Commit | What changed |
|--------|-------------|
| `49853b2` | Added OG image (`/public/images/og-image.jpg`, 1200×630); wired into `layout.tsx` openGraph + twitter |
| `a7b1220` | Added `/privacy-policy` and `/terms` pages; fixed all `#` placeholder links in Footer and CookieConsent |
| `59961c5` | *(pre-session baseline — blog, book-a-call, all routes working)* |
| `b07f99c` | Rate limiting on `/api/contact` (5 req/IP/hr in-memory); `GlobeWithFallback.tsx` error boundary; `GitHubHeroGlobe.tsx` loading state; `HeroWithGlobe.tsx` updated to use wrapper; CLAUDE.md updated |
| `bfb4be0` | SEO/image audit: all per-route metadata verified ✅; all alt texts verified ✅; all public assets confirmed present ✅; CLAUDE.md updated |
| *(next)* | PageSpeed performance pass: fixed `sizes` props on all `<Image>` components; hero-glow.svg moved to local path with `fetchPriority="high"`; testimonial dots touch targets fixed (44px); low-contrast text improved; removed unused `fonts.googleapis.com` preconnect; deleted `public/github-globe-main/` dead weight |

---

## Known Open Issues

| Priority | Issue | Status |
|----------|-------|--------|
| High | `/public/images/hero-glow.svg` not yet uploaded — hero glow won't show until file is added | ⚠️ Pending user upload |
| Medium | All company logos + why-us images need to be resized/optimized — see Image Optimization Spec below | ⚠️ Pending user upload |
| Medium | `globe-dots.png` is 361 KiB — compress with tinypng.com (keep PNG format) | ⚠️ Pending user action |
| Low | Form error messages are hardcoded per-form (not DRY) | 🔲 Backlog |
| Low | Focus ring color inconsistency: `HireOnlyForm` uses `#57C5CF`, `HireManageForm` uses `#4DD0E1` | 🔲 Backlog |

---

## Image Optimization Spec (PageSpeed — 2026-03-03)

> Sizes props are already fixed in code. User needs to replace source files with correctly-sized versions.

| File | Display Size | **Upload Target** | Format |
|------|-------------|------------------|--------|
| `/public/images/logo.png` | 75×75px | **200×200px max** | PNG (transparent bg) |
| `/public/images/why-us/cost-effective.jpg` | 150×150px (circle crop) | **450×450px max** | JPEG or WebP |
| `/public/images/why-us/handpicked.jpg` | 150×150px (circle crop) | **450×450px max** | JPEG or WebP |
| `/public/images/why-us/speedy.jpg` | 150×150px (circle crop) | **450×450px max** | JPEG or WebP |
| `/public/images/why-us/global.jpg` | 150×150px (circle crop) | **450×450px max** | JPEG or WebP |
| `/public/images/companies/oracle.png` | ~114×64px | **240×135px max** | PNG (transparent bg) |
| `/public/images/companies/shopify.png` | ~128×40px | **280×88px max** | PNG (transparent bg) |
| `/public/images/companies/ibm.png` | ~128×48px | **280×105px max** | PNG (transparent bg) |
| `/public/images/companies/salesforce.png` | ~91×64px | **200×140px max** | PNG (transparent bg) |
| `/public/images/companies/*.png` (all others) | ~64–128px tall | **300×150px max** | PNG (transparent bg) |
| `/public/images/hero-glow.svg` | Full-width bg | **Upload as-is from GitHub** | SVG |
| `/public/textures/globe-dots.png` | WebGL texture | **Compress only** (tinypng.com) | PNG |

---

## Feature Backlog

| Task | Status |
|------|--------|
| Create OG image (1200×630) | ✅ Done — commit `49853b2` |
| Implement blog (listing + 7 article pages) | ✅ Done — was already implemented |
| Add Privacy Policy page | ✅ Done — commit `a7b1220` |
| Add Terms of Service page | ✅ Done — commit `a7b1220` |
| Fix Footer + CookieConsent privacy links | ✅ Done — commit `a7b1220` |
| Rate limiting on `/api/contact` | ✅ Done — commit `b07f99c` |
| Three.js globe error boundary | ✅ Done — commit `b07f99c` |
| Three.js globe loading state | ✅ Done — commit `b07f99c` |
| Audit all image files in `/public/images/` | ✅ Done — all confirmed present |
| Confirm `/public/textures/globe-dots.png` exists | ✅ Done — confirmed present |
| Add `StatsSection` to homepage | 🔲 Optional |
| DRY up form error messages | 🔲 Low priority |
| Normalize focus ring colors across forms | 🔲 Low priority |

# Remote ACKtive — CLAUDE.md
> Single source of truth for AI-assisted development.
> **Always read this file first before making any changes.**
> Last updated: 2026-03-04 (visual overhaul session — gradient alternation, `.btn-grad` buttons, full redesigns of WhyChooseUs + WhatMakesUsDifferent, looping HowItWorks animation, CompanyLogosSlider extracted to own section)

---

## ⚠️ Contrast & Color Rules — READ BEFORE TOUCHING ANY TEXT COLOR

> These rules exist because the hero section was broken by teal text on a teal background. **Never repeat these mistakes.**

### The Hero Background
`bg-gradient-hero` = `linear-gradient(to right, #0f3443, #34e89e)` — dark navy LEFT → bright **mint green** RIGHT.
This is a **teal/green gradient**. Any teal, cyan, or mint text placed on it will be invisible.

### Forbidden color combinations
| Text color | Background | Why it's broken |
|-----------|-----------|----------------|
| `text-[#57C5CF]` (teal) | `bg-gradient-hero` | Teal text on teal/green background = zero contrast |
| `text-[#4FFFB0]` (mint) | `bg-gradient-hero` | Mint text on mint gradient = invisible at right edge |
| `btn-gradient` button | `bg-gradient-hero` | Mint→teal gradient button on teal background = no separation |
| `color: '#248B93'` (teal) | white card background | "Blue" role text on white = low contrast, looks broken |

### Rules for text on `bg-gradient-hero` (hero section)
- **Headings**: `text-white` ✅
- **Subheadings / supporting text**: `text-white` or `text-white/75` ✅ — NEVER teal/cyan
- **Stat values**: `text-[#4FFFB0]` ✅ — large enough that mint-on-gradient is readable
- **Badge text**: `text-[#57C5CF]` ✅ — small pill on dark left side of gradient, acceptable
- **Body copy**: `text-white/75` ✅

### Rules for the Header "Book a Call" button
- Use **`.btn-grad`** class — dark purple→teal animated gradient with white text; high contrast against ANY background
- Do NOT use `btn-gradient` (mint/teal) in the header — it blends into the hero gradient

### Rules for globe worker cards (white card background)
- Name: `text-[#0F1926]` (near-black) ✅
- Role: `color: '#374151'` (dark gray) ✅ — NEVER teal/cyan
- Country: `color: 'rgba(15,25,38,0.55)'` (muted dark) ✅

### CSS filter rule for the Three.js globe
- **Never apply CSS `filter` (especially `sepia`, `saturate`, `hue-rotate`) to the globe wrapper**
- Adding a CSS filter on top of the Three.js render doubles/triples saturation and creates a harsh visible ring
- Globe wrapper must only have: `style={{ boxShadow: 'none' }}`

### Three.js BackSide atmosphere sphere — DO NOT USE
- A `SphereGeometry(2.8)` with `THREE.BackSide` + Fresnel rim shader was trialled and **rejected**
- It renders as a **hard glowing ring** at the planet silhouette, NOT a soft "sun behind" halo
- The Fresnel formula `pow(rim, 2.5) * 2.2` concentrated brightness into a visible cyan band
- **Correct approach**: CSS `radial-gradient` div in `HeroWithGlobe.tsx` (see Sun Glow section below)

### Sun glow (CSS radial-gradient in HeroWithGlobe.tsx)
- A `position: absolute` div centered on the globe using a multi-stop `radial-gradient`
- Positioned with same `right-[-35%] top-[50vh] -translate-y-1/2` as globe but ~1.5× larger
- **Color rule**: never use mint/teal tones — they're invisible on the `#34e89e` mint right side of the hero gradient
- **Correct colors**: warm white core → pale yellow → cool white → transparent
  ```
  rgba(255,255,255,0.92)  0%    ← bright white (visible on mint)
  rgba(255,255,210,0.70)  8%    ← warm pale yellow
  rgba(220,255,245,0.44)  20%   ← cool white
  rgba(160,240,255,0.22)  35%   ← soft sky
  rgba(100,215,255,0.08)  52%   ← whisper
  transparent             68%
  ```

### General contrast checklist (run mentally before writing ANY text color)
1. What is the background color / gradient of this section?
2. Is my text color in the same color family as the background? If yes → use white or near-black instead.
3. Does this button visually separate from the section background? If not → use a contrasting solid color.

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
| Address | 1621 Central Ave, Cheyenne, WY 82001 |
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
CompanyLogosSlider (standalone section — FIXED gradient)
WhyChooseUs
ThreeTierServices
CostComparison
GuaranteeSection
DepartmentGrid
WhatMakesUsDifferent
AboutBlock
HowItWorks
StatsBlock
FAQ
ContactCTA
Footer
```

### Gradient Map (top → bottom)

| # | Section | Gradient |
|---|---------|----------|
| 1 | HeroWithGlobe | `#155799 → #159957` (hero, unchanged) |
| 2 | CompanyLogosSlider | **FIXED** `#2C5364 → #203A43 → #0F2027` |
| 3 | WhyChooseUs | `#78ffd6 → #007991` |
| 4 | ThreeTierServices | **FIXED** `#2C5364 → #203A43 → #0F2027` · boxes: `#30cfd0 → #330867` |
| 5 | CostComparison | `#135058 → #F1F2B5` |
| 6 | GuaranteeSection | **FIXED** `#2C5364 → #203A43 → #0F2027` · cards: `#30cfd0 → #330867` |
| 7 | DepartmentGrid | `#237A57 → #093028` |
| 8 | WhatMakesUsDifferent | **FIXED** `#2C5364 → #203A43 → #0F2027` |
| 9 | AboutBlock | `#78ffd6 → #007991` |
| 10 | HowItWorks | **FIXED** `#2C5364 → #203A43 → #0F2027` |
| 11 | StatsBlock | `#243B55 → #141E30` |
| 12 | FAQ | `#135058 → #F1F2B5` |
| 13 | ContactCTA | `#373B44 → #73C8A9` |

> **FIXED gradient** = `linear-gradient(to right, #2C5364, #203A43, #0F2027)` — a dark ocean-to-charcoal 3-stop gradient used on 5 sections to create visual rhythm via alternation with colored gradients.

---

## Component Map

### Layout / Shell
| Component | Purpose |
|-----------|---------|
| `Header.tsx` | Fixed nav, scroll-aware blur, mobile hamburger; "Book a Call" uses `.btn-grad` class (both desktop + mobile); logo name uses heading font (`var(--font-heading)`); nav links are `font-bold`; nav links to `/blog` (live) |
| `Footer.tsx` | Links, LinkedIn + Facebook social icons, email/phone, physical address (1621 Central Ave, Cheyenne, WY 82001), dynamic copyright year; Privacy Policy + Terms link to real pages |
| `Section.tsx` | Section wrapper — background variants: `light` / `white` / `dark` / `gradient` (used in some components; newer components use direct `<section>` tags instead) |
| `Card.tsx` | Reusable card — variants: `light` / `dark` (used in some components; newer components use direct `<div>` tags instead) |
| `CookieConsent.tsx` | GA Consent Mode v2 banner; stores choice in `localStorage('cookie-consent')`; 1.2s appearance delay; links to `/privacy-policy` |

### Hero
| Component | Purpose |
|-----------|---------|
| `HeroWithGlobe.tsx` | Server component; headline, CTA buttons, stats strip; hosts globe via `<GlobeWithFallback />`; CompanyLogosSlider removed (now standalone section in `page.tsx`); reduced top padding (`pt-28 md:pt-32 xl:pt-36`) |
| `GlobeWithFallback.tsx` | `'use client'`; React Error Boundary (`GlobeErrorBoundary` class) wrapping `GitHubHeroGlobe`; on WebGL crash shows a teal radial glow fallback instead of breaking |
| `GitHubHeroGlobe.tsx` | `'use client'`; Three.js 3D globe: purple sphere + dot texture + 10 arc tubes + 15 cyan spires + 15 floating worker cards (pinned by lat/lng, up to 3 visible at once, fade in/out, rotate with globe); `isReady` state shows pulsing teal placeholder until first WebGL frame fires; `cardScale = Math.min(1, Math.max(0.45, window.innerWidth / 1440))` — cards scale aggressively with viewport (1440px→1.0, 1024px→0.71, 768px→0.53, floor 0.45) |
| `HeroWithGlobe.tsx` | Sun glow CSS div: `right-[-35%] top-[50vh]`, `w-[min(117vw,2223px)] min-w-[1650px]`, warm-white radial-gradient; Globe div: `right-[-15%] top-[50vh]`, `w-[min(78vw,1900px)] min-w-[1100px]` — large `min-w` means globe slides LEFT instead of shrinking on narrow viewports |
| `CompanyLogosSlider.tsx` | 12 company logos (Meta, Google, MSFT, etc.) in an infinite CSS scroll strip; now rendered in its own `<section>` in `page.tsx` with FIXED gradient (was previously inside HeroWithGlobe) |

### Services & Pricing
| Component | Purpose |
|-----------|---------|
| `ThreeTierServices.tsx` | 3 packages: Recruitment-Only · Full Experience (featured/highlighted) · Training; FIXED gradient section; tier boxes use box gradient (`#30cfd0 → #330867`) |
| `CostComparison.tsx` | Interactive cost calculator — 6 roles, headcount slider (1–20), live savings calculation showing 70–73% vs US equivalent; gradient `#135058 → #F1F2B5` |
| `GuaranteeSection.tsx` | 3 guarantee cards (Replacement Guarantee, No Setup Fees, Ongoing Support) + badge strip with lifetime guarantee CTA; FIXED gradient section; cards use box gradient (`#30cfd0 → #330867`) |

### Departments
| Component | Purpose |
|-----------|---------|
| `DepartmentGrid.tsx` | 9 department cards, 79+ total roles, searchable input, expandable role lists; teal/mint alternating `palette` array (indexed by `departments.indexOf(dept) % 2` for stable colors even when search filters results); top accent bar per card; role count pill; `grid-rows-[0fr]/[1fr]` accordion animation; gradient `#237A57 → #093028` |

### About
| Component | Purpose |
|-----------|---------|
| `WhyChooseUs.tsx` | 4 horizontal alternating LEFT-RIGHT rows (Cost-Effective, Handpicked, Lightning-Fast, Global Reach); each row has image panel + stat + proof chips; teal/mint palette by index; gradient `#78ffd6 → #007991`; uses `next/image` with `fill` for `/images/why-us/*.png` |
| `WhatMakesUsDifferent.tsx` | "What Others Do vs What We Do" — 6 comparison rows (red X vs green check); IntersectionObserver stagger animation (150ms intervals); FIXED gradient; uses lucide `X` + `Check` icons |
| `AboutBlock.tsx` | Human/story-driven: founder narrative (Andre, Carlos, Kevin spent years building distributed teams before founding Remote ACKtive), initials avatar strip, image panel with hover scale, Mission card (teal accent bar), Vision card (mint accent bar), 5 Core Values with alternating teal/mint dots; uses `/images/ourstory.png` |
| `HowItWorks.tsx` | 4-step process with IntersectionObserver stagger animation (280ms delay between cards); **looping**: resets and replays every 20s after last step reveals; gradient connector line on desktop; CTA button → `/book-a-call`; FIXED gradient section |

### Social Proof
| Component | Purpose |
|-----------|---------|
| `Testimonials.tsx` | 6 hardcoded testimonials; carousel (3 per slide on desktop, 1 on mobile); trust bar with rating; **currently NOT rendered in `page.tsx`** |

### Contact & Forms
| Component | Purpose |
|-----------|---------|
| `ContactCTA.tsx` | 3 contact cards + tabbed form interface (driven by FormContext); tab buttons use `.btn-grad` with active/inactive conditional styling (active: `scale-105 shadow-xl ring-2 ring-white/20`, inactive: `opacity-50 hover:opacity-80`); form container has `pb-12` for bottom breathing room |
| `FormContext.tsx` | React Context — `formType`: `general` / `hire-only` / `hire-manage` / `training` |
| `HireOnlyForm.tsx` | Recruitment-Only form → POST `/api/contact` with `formType=hire-only` |
| `HireManageForm.tsx` | Full Experience form → POST `/api/contact` with `formType=hire-manage` |
| `GeneralContactForm.tsx` | Training / general inquiry form → POST `/api/contact` |
| `FAQ.tsx` | 14 FAQs reframed as first-person client objections (e.g. "My team is in a different time zone — will collaboration still work?"); URL hash deep-link per slug; expand/collapse all toggle with `font-bold` buttons; `font-semibold` subheader; "answered." span is `text-[#0A3040]`; keyboard nav (ArrowUp/Down/Home/End); `renderItem` helper for DRY left/right column rendering; all colors use hardcoded hex `#57C5CF` (no CSS variables) |

### Blog
| Component / File | Purpose |
|-----------------|---------|
| `app/blog/page.tsx` | Listing page: featured article hero + grid of remaining articles + CTA banner |
| `app/blog/[slug]/page.tsx` | Article layout: breadcrumb, sections, bullet lists, FAQ accordion, related posts, JSON-LD structured data |
| `app/lib/blog.ts` | Data layer: all 7 posts as typed objects; exports `getBlogPost(slug)`, `getAllSlugs()`, `blogPosts[]` |

### Legal Pages
| File | Purpose |
|------|---------|
| `app/privacy-policy/page.tsx` | Full Privacy Policy; dark design; plain-English language; contact section includes physical address (1621 Central Ave, Cheyenne, WY 82001) |
| `app/terms/page.tsx` | Full Terms of Service; dark design; plain-English language; services section lists only 2 active services (Recruitment-Only + Full Remote ACKtive Experience — ACKtive Training Program removed); governing law: Wyoming / Laramie County; arbitration: Cheyenne, Wyoming; contact section includes physical address |

### Unused Components (exist in repo, not rendered on homepage)
| Component | Notes |
|-----------|-------|
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
| `primary-orange` / `primary-gold` | `#F5A623` | Tailwind config only — no longer used in DepartmentGrid/FAQ (replaced with hardcoded hex) |
| `primary-navy` | `#0F1926` | Body / section background |
| CTA button | `#4FFFB0` | Mint green — used in 20+ components |
| Card bg | `#1E2430` / `#2A3142` | Form inputs, dark cards |
| Footer bg | `#060F1E` | Footer only |
| Gradient | `#248B93 → #1A5538` | `gradient-primary` utility |
| FIXED gradient | `#2C5364 → #203A43 → #0F2027` | 5 sections (CompanyLogosSlider, ThreeTierServices, GuaranteeSection, WhatMakesUsDifferent, HowItWorks) |
| Box gradient | `#30cfd0 → #330867` (to top) | ThreeTierServices tier boxes, GuaranteeSection guarantee cards |
| `.btn-grad` | `#360033 → #0b8793 → #360033` | Dark purple→teal animated button; used on Header "Book a Call" (desktop + mobile), ContactCTA tab buttons |
| `.btn-gradient` | `#4FFFB0 → #57C5CF → #4FFFB0` | Mint→teal sliding CTA button; used on various section CTAs |

> **Teal/mint alternating pattern**: Newer components (DepartmentGrid, AboutBlock, WhyChooseUs, FAQ) use hardcoded `#57C5CF` (teal) and `#4FFFB0` (mint) alternating by index — no CSS variable dependency.

> `primary-orange` IS defined in `tailwind.config.js` as `#F5A623` (same as gold). It was formerly referenced in DepartmentGrid and FAQ but all instances have been replaced with hardcoded hex in the redesign session.

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
| `/public/images/why-us/cost-effective.png` | ✅ confirmed | `WhyChooseUs.tsx` — circle-cropped 150×150px |
| `/public/images/why-us/handpicked.png` | ✅ confirmed | `WhyChooseUs.tsx` — circle-cropped 150×150px |
| `/public/images/why-us/speedy.png` | ✅ confirmed | `WhyChooseUs.tsx` — circle-cropped 150×150px |
| `/public/images/why-us/global.png` | ✅ confirmed | `WhyChooseUs.tsx` — circle-cropped 150×150px |
| `/public/images/hero-glow.svg` | ✅ confirmed | `HeroWithGlobe.tsx` — decorative background glow; local path; `fetchPriority="high"` |
| `/public/textures/globe-dots.png` | ✅ confirmed (109 KiB — compressed from 361 KiB) | `GitHubHeroGlobe.tsx` dot texture overlay |
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

> The redesign session (2026-03-03) did **NOT** require GSC resubmission — no URLs changed.

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
| `0104372` | PageSpeed performance pass: fixed `sizes` props on all `<Image>` components; hero-glow.svg moved to local path with `fetchPriority="high"`; testimonial dots touch targets fixed (44px); low-contrast text improved; removed unused `fonts.googleapis.com` preconnect; deleted `public/github-globe-main/` dead weight |
| `636fa07` | why-us images changed from `.jpg` → `.png` (user uploaded PNG versions); `WhyChooseUs.tsx` paths updated; hero-glow.svg + globe-dots.png confirmed uploaded; CLAUDE.md updated |
| *(pending)* | Full visual redesign pass: `Footer` (Wyoming address + Facebook), `WhyChooseUs` (dark redesign, alternating teal/mint metric cards), `CostComparison` (interactive headcount calculator), `HowItWorks` (IntersectionObserver stagger), `GuaranteeSection` (3 guarantee cards), `DepartmentGrid` (palette fix, accent bars, role pills), `AboutBlock` (founder story, initials strip), `FAQ` (14 objection-framed questions, orange→teal); `app/terms/page.tsx` (removed ACKtive Training Program, California→Wyoming governing law, address); `app/privacy-policy/page.tsx` (address added) |
| *(pending)* | Globe polish: CSS sun glow div restored to `HeroWithGlobe.tsx` with warm-white/yellow colors (original mint colors were invisible on mint gradient); Three.js BackSide atmosphere sphere trialled and removed (rendered as harsh ring not soft halo); `cardScale` formula changed from `containerWidth/1100` to `window.innerWidth/1440` with 0.45 floor (cards now scale aggressively on narrow viewports); globe `min-w` raised from `900px` → `1100px` so globe slides left rather than shrinking on narrow viewports; sun glow `min-w` raised to `1650px` proportionally |
| *(pending)* | Visual overhaul session (2026-03-04): **Header** — `.btn-grad` on CTA buttons, heading font on logo, `font-bold` nav links; **HeroWithGlobe** — reduced top padding, removed CompanyLogosSlider; **page.tsx** — CompanyLogosSlider extracted to standalone FIXED gradient section, StatsBlock positioned between HowItWorks and FAQ; **WhyChooseUs** — full redesign to horizontal alternating LEFT-RIGHT rows with image panels; **ThreeTierServices** — FIXED gradient + box gradient on tier boxes; **CostComparison** — gradient swap to `#135058 → #F1F2B5`; **GuaranteeSection** — FIXED gradient + box gradient on cards; **DepartmentGrid** — gradient swap to `#237A57 → #093028`; **WhatMakesUsDifferent** — full redesign to "What Others Do vs What We Do" comparison table with IntersectionObserver stagger; **AboutBlock** — "Built to solve it." span changed to `text-[#4FFFB0]`; **HowItWorks** — FIXED gradient + looping animation (20s pause between cycles); **StatsBlock** — gradient changed to `#243B55 → #141E30`; **FAQ** — `font-bold` buttons, `font-semibold` subheader, "answered." span to `text-[#0A3040]`; **ContactCTA** — `.btn-grad` on tab buttons with conditional active/inactive styling, `pb-12` on form container; **globals.css** — added `.btn-grad` utility class |

---

## Known Open Issues

| Priority | Issue | Status |
|----------|-------|--------|
| ~~Low~~ | ~~3 misplaced files in `public/images/why-us/`~~ | ✅ Deleted |
| ~~Low~~ | ~~Company logos oversized~~ | ✅ Resized — `scripts/resize-logos.mjs` run; all 13 PNGs now within spec (salesforce: 123 KiB → 11 KiB, shopify: 83 KiB → 11 KiB, ibm: 33 KiB → 7.5 KiB, oracle: 19 KiB → 4.8 KiB, etc.) |
| ~~Low~~ | ~~Form error messages hardcoded per-form~~ | ✅ DRY — `components/FormMessages.tsx` created; `FormSuccess`/`FormError` used across all 3 forms |
| ~~Low~~ | ~~Focus ring inconsistency: `HireManageForm` used `#4DD0E1`~~ | ✅ Fixed — all forms now use `focus:ring-[#57C5CF]` |

---

## Image Optimization Spec (PageSpeed — 2026-03-03)

> Sizes props are already fixed in code. User needs to replace source files with correctly-sized versions.

| File | Display Size | **Upload Target** | Format |
|------|-------------|------------------|--------|
| `/public/images/logo.png` | 75×75px | **200×200px max** | PNG (transparent bg) |
| `/public/images/why-us/cost-effective.png` | 150×150px (circle crop) | **450×450px max** | PNG ✅ uploaded |
| `/public/images/why-us/handpicked.png` | 150×150px (circle crop) | **450×450px max** | PNG ✅ uploaded |
| `/public/images/why-us/speedy.png` | 150×150px (circle crop) | **450×450px max** | PNG ✅ uploaded |
| `/public/images/why-us/global.png` | 150×150px (circle crop) | **450×450px max** | PNG ✅ uploaded |
| `/public/images/companies/oracle.png` | ~114×64px | **240×135px max** ✅ resized (4.8 KiB) | PNG (transparent bg) |
| `/public/images/companies/shopify.png` | ~128×40px | **280×88px max** ✅ resized (10.9 KiB) | PNG (transparent bg) |
| `/public/images/companies/ibm.png` | ~128×48px | **280×105px max** ✅ resized (7.5 KiB) | PNG (transparent bg) |
| `/public/images/companies/salesforce.png` | ~91×64px | **200×140px max** ✅ resized (10.9 KiB) | PNG (transparent bg) |
| `/public/images/companies/*.png` (all others) | ~64–128px tall | **300×150px max** ✅ all resized | PNG (transparent bg) |
| `/public/images/hero-glow.svg` | Full-width bg | ✅ uploaded | SVG |
| `/public/textures/globe-dots.png` | WebGL texture | ✅ compressed (109 KiB, was 361 KiB) | PNG |

---

## Design Patterns (established in redesign session — 2026-03-03)

These patterns are now standard across all homepage components. Follow them for any new sections.

### Section shell
```tsx
<section id="section-id" className="py-20 bg-[#0F1926]">   {/* dark */}
  <div className="container mx-auto px-6 max-w-6xl">
    ...
  </div>
</section>

<section id="section-id" className="py-20 bg-[#F7FAFB]">   {/* light */}
  ...
</section>
```
> Do NOT use `<Section background="...">` wrapper for new components.

### Badge pill (section label)
```tsx
<div className="inline-flex items-center gap-2 bg-[#57C5CF]/10 border border-[#57C5CF]/20 rounded-full px-4 py-1.5 mb-5">
  <span className="text-sm font-bold text-[#57C5CF] tracking-wide uppercase">Label Text</span>
</div>
```

### Card with top accent bar
```tsx
<div className="rounded-2xl bg-[#1E2430] border border-[#57C5CF]/20 overflow-hidden">
  <div className="h-0.5" style={{ background: "linear-gradient(90deg, #57C5CF 0%, transparent 75%)" }} />
  <div className="p-7">...</div>
</div>
```

### Teal/mint alternating palette (for grids)
```tsx
const palette = [
  { accentHex: "#57C5CF", iconBg: "bg-[#57C5CF]/15", iconColor: "text-[#57C5CF]", border: "border-[#57C5CF]/20 hover:border-[#57C5CF]/50" },
  { accentHex: "#4FFFB0", iconBg: "bg-[#4FFFB0]/15", iconColor: "text-[#4FFFB0]", border: "border-[#4FFFB0]/20 hover:border-[#4FFFB0]/50" },
];
// Use stable index (not filtered index) to keep colors consistent:
const originalIdx = items.indexOf(item);
const c = palette[originalIdx % 2];
```

### CSS grid accordion (expand/collapse)
```tsx
<div className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
  <div className="min-h-0 overflow-hidden">
    {/* content */}
  </div>
</div>
```

### FIXED gradient section (dark ocean-charcoal)
```tsx
<section className="py-20" style={{ background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)' }}>
  <div className="container mx-auto px-6 max-w-6xl">...</div>
</section>
```

### Box gradient (inner cards on FIXED sections)
```tsx
<div style={{ background: 'linear-gradient(to top, #30cfd0 0%, #330867 100%)' }} className="rounded-2xl p-7">
  ...
</div>
```

### `.btn-grad` button (dark purple→teal animated)
```tsx
<Link href="/book-a-call" className="btn-grad rounded-full px-8 py-3.5 font-bold">
  Book a Call
</Link>
```
> Defined in `globals.css`. Background slides on hover via `background-size: 200% auto` + `background-position: right center`. White text, box-shadow glow, uppercase.

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
| Redesign WhyChooseUs (dark, teal/mint alternating) | ✅ Done — 2026-03-03 redesign session |
| Redesign CostComparison (interactive headcount calculator) | ✅ Done — 2026-03-03 redesign session |
| Redesign HowItWorks (IntersectionObserver stagger animation) | ✅ Done — 2026-03-03 redesign session |
| Redesign GuaranteeSection (3 guarantee cards + badge strip) | ✅ Done — 2026-03-03 redesign session |
| Redesign DepartmentGrid (palette fix, accent bars, role count pills) | ✅ Done — 2026-03-03 redesign session |
| Redesign AboutBlock (founder story, initials strip, mission/vision) | ✅ Done — 2026-03-03 redesign session |
| Redesign FAQ (14 objection-framed questions, fix orange→teal) | ✅ Done — 2026-03-03 redesign session |
| Footer: add Wyoming address + Facebook social link | ✅ Done — 2026-03-03 redesign session |
| Terms: fix governing law California→Wyoming, remove ACKtive Training Program, add address | ✅ Done — 2026-03-03 redesign session |
| Privacy Policy: add physical address | ✅ Done — 2026-03-03 redesign session |
| Add `StatsBlock` to homepage | ✅ Done — rendered in `app/page.tsx` between HowItWorks and FAQ |
| DRY up form error messages | ✅ Done — `FormMessages.tsx` created; `FormSuccess`/`FormError` imported in all 3 form components |
| Normalize focus ring colors across forms | ✅ Done — `HireManageForm` fixed from `#4DD0E1` → `#57C5CF`; all forms now consistent |
| Resize oversized company logos | ✅ Done — `sharp` installed as devDep; `scripts/resize-logos.mjs` written and executed; all 13 PNGs resized |
| Globe sun glow — restore CSS radial-gradient with visible colors | ✅ Done — 2026-03-04; warm-white/yellow stops replace original invisible mint stops |
| Globe worker cards — scale with viewport width | ✅ Done — 2026-03-04; `cardScale = window.innerWidth / 1440` with 0.45 floor |
| Globe responsive — slide not shrink on narrow viewports | ✅ Done — 2026-03-04; `min-w-[1100px]` holds size, globe shifts left naturally |
| Visual overhaul — gradient alternation system | ✅ Done — 2026-03-04; FIXED gradient on 5 sections, colored gradients on rest; alternation creates visual rhythm |
| Visual overhaul — Header `.btn-grad` + heading font | ✅ Done — 2026-03-04 |
| Visual overhaul — WhyChooseUs horizontal alternating rows | ✅ Done — 2026-03-04; full redesign from card grid to LEFT-RIGHT rows with image panels |
| Visual overhaul — WhatMakesUsDifferent comparison table | ✅ Done — 2026-03-04; full redesign to "What Others Do vs What We Do" with stagger animation |
| Visual overhaul — HowItWorks looping animation | ✅ Done — 2026-03-04; `runSequence` loops with 20s pause, timer cleanup on unmount |
| Visual overhaul — CompanyLogosSlider standalone section | ✅ Done — 2026-03-04; extracted from HeroWithGlobe into own `<section>` in `page.tsx` |
| Visual overhaul — ContactCTA `.btn-grad` tabs | ✅ Done — 2026-03-04; active/inactive conditional styling |
| Visual overhaul — FAQ font-weight + color fixes | ✅ Done — 2026-03-04; bold buttons, semibold subheader, `#0A3040` answered span |
| Visual overhaul — StatsBlock gradient | ✅ Done — 2026-03-04; changed to `#243B55 → #141E30` |
| Visual overhaul — AboutBlock mint accent | ✅ Done — 2026-03-04; "Built to solve it." → `text-[#4FFFB0]` |

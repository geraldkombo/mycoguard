# MycoGuard Kenya — Trae SOLO Build Brief

This is the single source of truth for building MycoGuard Kenya in **Trae SOLO** (Builder or Coder).
Trae indexes the whole workspace automatically, so just tell it to read this file fully before starting — no special read command needed.

---

## 1. Product mission

Build **MycoGuard Kenya**: an **offline-first, mobile-first, search-discoverable** Progressive Web App for aflatoxin risk screening and prevention across the grain → feed → milk chain in Kenya.

This must read as a **serious public-interest implementation tool**, not a hackathon demo. It will be reviewed by `PELUM Kenya` (lead organizer of NAS 2026), Kenya's `Ministry of Agriculture and Livestock Development`, county governments, `KALRO`-linked researchers, agroecology/One Health partners (`Biovision`, `KOAN`, `ISFAA`, `APHRC`, `We Effect`), and funders.

**Core positioning (use this exact framing in copy):**
> MycoGuard Kenya gives counties, farmer groups, cooperatives, and frontline value-chain actors an offline way to stop aflatoxin risk before it moves from grain to feed and milk, making One Health agroecology usable at the point where decisions are actually made.

**Never say:** AI detector, toxin testing device, lab replacement, guarantees safety, eliminates aflatoxin.
**Always say instead:** risk screening, prevention guidance, offline decision support, field-ready, explainable risk.

Innovator: `Gerald Kombo`, Independent Innovator. No invented phone numbers/emails/addresses — use a config file with placeholders.

---

## 2. Tech stack (mandatory)

- Vite + React + TypeScript
- Tailwind CSS
- `localforage` for offline storage (IndexedDB)
- `jsPDF` for exports
- `react-helmet-async` for per-page metadata
- `vite-plugin-pwa`
- `react-router-dom` using **BrowserRouter** (not HashRouter — public pages need clean URLs for SEO and sharing)

Keep dependencies lean.

---

## 3. Routes

**Public discovery layer** (rich real text, not decorative filler):
- `/` landing
- `/about-aflatoxin`
- `/one-health`
- `/how-it-works`
- `/for-cooperatives`
- `/for-extension-teams`
- `/faq`
- `/privacy`

**App layer** (the functional tool):
- `/app`
- `/app/new-assessment`
- `/app/results`
- `/app/weather`
- `/app/drying-directory`
- `/app/history`
- `/app/group-mode`
- `/app/settings`

---

## 4. Design direction

Calm, institutional, premium-but-not-flashy, field-ready outdoors on mobile. High contrast, large tap targets, minimal clutter, clear hierarchy.

Palette: deep green, warm earth/ochre, clean neutrals, red/amber/green risk accents.

Must-have: one-handed mobile use, sticky primary actions, visible offline status, "what to do next" always clear, no dead ends, accessible forms (semantic headings, labels, focus states, contrast-safe color, alt text, `aria-live` for risk updates).

**Priority rule when tradeoffs come up:** credibility over flashy visuals; usability over cleverness; offline resilience over technical purity.

---

## 5. Homepage

Sections in order: Hero → Problem/urgency → How it works → "10 Places" pathway → Why offline-first matters → One Health/agroecology alignment → Who it serves → Key features → Evidence/credibility → FAQ → CTA band → Footer.

Hero headline: `Stop aflatoxin risk before it moves from grain to feed and milk.`
Subtext: `MycoGuard Kenya is an offline-first early warning and action toolkit for farmers, cooperatives, extension teams, and frontline agrifood actors.`
Primary CTA: `Open the app`. Secondary CTA: `See how it works`.

---

## 6. SEO requirements

Implement on every public page: unique `<title>` + meta description, canonical tag, semantic HTML with real text, Open Graph + Twitter card tags, descriptive URL, internal links to related pages, image alt text.

Site-wide files: `public/robots.txt`, `public/sitemap.xml` (every public route), `public/manifest.webmanifest`, `public/_headers`, `public/_redirects` (`/* /index.html 200`), `src/seo/structuredData.ts`, `src/config/site.ts` with a single configurable `SITE_URL` constant (placeholder `https://mycoguardkenya.pages.dev` until a real domain/URL exists).

Structured data: `Organization` + `WebSite` + `SoftwareApplication` on homepage; `FAQPage` on `/faq`; `BreadcrumbList` where useful.

**Keyword clusters to write toward naturally (no stuffing):**
Primary: aflatoxin prevention Kenya, offline aflatoxin app, One Health agroecology Kenya, grain feed milk aflatoxin, aflatoxin risk screening, aflatoxin management Kenya.
Secondary: post-harvest aflatoxin prevention, grain drying safety Kenya, feed safety dairy Kenya, county extension agroecology tool, cooperative grain safety tool, offline farmer advisory app Kenya.

**Per-page title / meta / H1:**

| Route | Title | H1 |
|---|---|---|
| `/` | MycoGuard Kenya \| Offline Aflatoxin Prevention and One Health Agroecology Tool | Stop aflatoxin risk before it moves from grain to feed and milk |
| `/about-aflatoxin` | Aflatoxin in Kenya \| Why Prevention Must Start Before Grain Reaches Feed and Milk | Why aflatoxin prevention matters in Kenya |
| `/one-health` | One Health and Agroecology \| How MycoGuard Kenya Protects Grain, Feed, Milk, and People | One Health in the grain-feed-milk chain |
| `/how-it-works` | How MycoGuard Kenya Works \| Offline Aflatoxin Risk Screening and Prevention | How MycoGuard works |
| `/for-cooperatives` | MycoGuard for Cooperatives \| Offline Grain Safety and Aflatoxin Prevention Support | How cooperatives can use MycoGuard |
| `/for-extension-teams` | MycoGuard for Extension Teams \| Offline Advisory Support for Aflatoxin Prevention | How extension teams can use MycoGuard |
| `/faq` | MycoGuard Kenya FAQ \| Offline Aflatoxin Prevention Tool | Frequently asked questions |

Internal linking: homepage → about/one-health/how-it-works/app; about → one-health/how-it-works/faq; one-health → for-cooperatives/for-extension-teams/app; for-cooperatives → app/faq; for-extension-teams → app/faq; faq → app/homepage/how-it-works.

**FAQ content to cover:** What is MycoGuard Kenya? Does it test/diagnose aflatoxin? Does it work offline? Who can use it? Can cooperatives use it? Can county extension teams use it? Does it need SMS/cloud/backend? Can it help with drying/storage decisions? Can it export reports? Why a One Health approach?

---

## 7. Content data (drop these into `content/` as-is)

Load app content from these JSON files (provided alongside this brief — copy them into `content/`):
- `checklists.json` — 4 modules of yes/no risk questions (English + Swahili), each with weight, driver_tag, place_tag
- `practice_cards.json` — 16 prevention practice cards mapped to the "10 Places" pathway, each with steps, materials, safety notes, evidence note
- `risk_rules.json` — risk band thresholds (Low/Medium/High) and trigger_tag → recommended action_id rules
- `weather_risk_rules.json` — observed-condition banners, seasonal (MAM/OND/dry) guidance, `.ics` calendar templates
- `drying_sites.json` — verified commercial drying sites (NCPB, GDC Menengai) with pricing, contact, source URL, verified date
- `ui_strings_en_sw.json` — English/Swahili UI string pairs

Do not invent new evidence claims beyond what's in these files — the safety/disclaimer language must stay exactly as written in them.

---

## 8. Functional app features

**"10 Places" pathway:** Field → Harvest → Drying → Shelling/Milling → Home store → Transport → Trader/Market → Aggregation → Feed store → Milk context.

**Assessment:** modular checklist flow, English/Swahili toggle, yes/no scoring against `risk_rules.json` bands, explainable result summary, top recommended actions pulled from `practice_cards.json`.

**Weather mode (3-layer, fully offline):**
1. Observed-condition alerts — tap current weather (raining, cloudy, hot, humid) → instant risk banner + actions.
2. Seasonal guidance — MAM / OND / dry season text.
3. `.ics` calendar export — generates a downloadable calendar file for native phone reminders (drying checks, storage checks). No SMS, no push notification service, no internet required.

**Verified Drying Directory:** read-only list from `drying_sites.json` — name, pricing, verified date, source URL, status.

**Group Facilitator Mode:** session name, sequential assessments for a farmer group/field school, tabular summary, group PDF export.

**Exports:** single-assessment PDF, group-summary PDF (`jsPDF`), CSV summary, full JSON backup — all generated client-side, no backend.

**Persistent disclaimer (use this exact text everywhere — footer, results screen, PDFs):**
> "MycoGuard provides risk screening, not lab testing. Always discard moldy grain from food/feed chains. Do not burn. Follow county public health guidance."

---

## 9. Offline behavior

After first load, everything must work offline: landing page revisit, app shell, assessments, history, weather mode, drying directory, all exports. Cache the `content/*.json` files and app shell via the service worker.

---

## 10. Deployment

Target: a public URL Gerald can share with judges before the symposium.

1. Push the finished repo to GitHub.
2. Preferred: connect the repo to **Cloudflare Pages** (build command `npm run build`, output directory `dist`, production branch `main`) — gives clean URLs, good SEO, easy custom domain later. Cloudflare needs `public/_redirects` (`/* /index.html 200`) and `public/_headers` to be present, which are already in the spec above.
3. If Trae's built-in one-click deploy (Vercel) is faster to get a live demo link working before a deadline, use that for the first working link, then still push to GitHub and connect Cloudflare Pages afterward as the primary public URL — both can coexist; just keep the canonical `SITE_URL` in `src/config/site.ts` pointed at whichever URL is the "real" one.

---

## 11. Deliverables checklist (repo must contain all of this before calling it done)

- [ ] Production-ready app, builds with no errors (`npm run build`)
- [ ] All public routes render real content, not placeholders
- [ ] All SEO files present (`robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `_headers`, `_redirects`, structured data)
- [ ] Offline reload works after first visit (test in airplane mode)
- [ ] All exports (PDF, CSV, JSON, `.ics`) work
- [ ] `README.md`, `docs/SEO_NOTES.md`, `docs/DEPLOY_NOTES.md`
- [ ] Mobile layout tested at a narrow viewport
- [ ] Disclaimer text appears on results screen, PDFs, and footer, verbatim

---

## Final constraint

If there is a tradeoff between flashy visuals and credibility, choose credibility.
If there is a tradeoff between cleverness and usability, choose usability.
If there is a tradeoff between technical purity and real-world offline resilience, choose offline resilience.

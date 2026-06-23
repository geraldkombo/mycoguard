# MycoGuard Kenya

MycoGuard Kenya is an **offline-first, mobile-first** Progressive Web App for **aflatoxin risk screening and prevention guidance** across the grain → feed → milk chain in Kenya.

Positioning (verbatim):
> MycoGuard Kenya gives counties, farmer groups, cooperatives, and frontline value-chain actors an offline way to stop aflatoxin risk before it moves from grain to feed and milk, making One Health agroecology usable at the point where decisions are actually made.

Persistent disclaimer (verbatim):
> "MycoGuard provides risk screening, not lab testing. Always discard moldy grain from food/feed chains. Do not burn. Follow county public health guidance."

## What it includes

- Public discovery pages (SEO-ready): `/`, `/about-aflatoxin`, `/one-health`, `/how-it-works`, `/for-cooperatives`, `/for-extension-teams`, `/faq`, `/privacy`
- Offline app workspace: `/app/*`
  - New assessment checklist flow with English/Kiswahili toggle
  - Results: risk band + triggered drivers + top practices
  - Weather mode: observed-condition banners + seasonal guidance + offline `.ics` reminder export
  - Verified drying directory (read-only list)
  - Offline history (stored in IndexedDB via `localforage`)
  - Group facilitator mode with group PDF export
  - Client-side exports: PDF, CSV summary, JSON backup, `.ics` calendar

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS v4
- `react-router-dom` (BrowserRouter)
- `react-helmet-async` for metadata
- `vite-plugin-pwa` for offline caching / app shell
- `localforage` for local-first storage
- `jsPDF` for PDF exports

## Project structure

```
src/
├── App.tsx                    # Thin router
├── main.tsx                   # Entry point
├── index.css                  # Global styles + animations
├── components/
│   ├── layout/SiteShell.tsx   # Header, nav, footer
│   └── ui/                    # Toast, Skeleton
├── features/
│   ├── public/                # HomePage, PublicPage, NotFoundPage
│   └── app/                   # Workspace, panels, hook, utils
├── app/                       # data, storage, exports, engine
├── config/site.ts             # Constants, disclaimer
├── content/publicContent.ts   # Page definitions
└── seo/                       # Helmet + structured data
```

## Run locally

1. Install dependencies:
   - `npm ci`
2. Start dev server:
   - `npm run dev`
3. Build production output:
   - `npm run build`

The production build outputs to `dist/`.

## Offline behavior

After the first successful load, the app is designed to work in airplane mode:

- App shell and routes load
- Assessments can be completed and saved
- History can be opened
- Exports (PDF/CSV/JSON/`.ics`) are generated entirely on-device

## Content sources

Core content is loaded from JSON under `content/`:

- `checklists.json`
- `practice_cards.json`
- `risk_rules.json`
- `weather_risk_rules.json`
- `drying_sites.json`
- `ui_strings_en_sw.json`

## Notes

- No backend is required and no SMS is used.
- The tool provides **risk screening and prevention guidance**, not toxin detection or certification.

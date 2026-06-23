# SEO notes (MycoGuard Kenya)

MycoGuard Kenya is a single-page application (Vite + React Router) with a public discovery layer designed to be search-discoverable and shareable.

## What is indexed

The primary SEO targets are the public routes:

- `/`
- `/about-aflatoxin`
- `/one-health`
- `/how-it-works`
- `/for-cooperatives`
- `/for-extension-teams`
- `/faq`
- `/privacy`

The functional app routes under `/app/*` are still fully usable and linkable, but the SEO focus is the public discovery layer.

## Metadata implementation

- Per-page `<title>` and meta description are managed via `react-helmet-async` in `src/seo/Seo.tsx`.
- Canonical URLs are derived from `src/config/site.ts` (`SITE_URL` + per-route path).
- Open Graph + Twitter card tags are included through the same component so that shares render correctly.

## Structured data

Structured data helpers live in `src/seo/structuredData.ts`:

- Homepage: `Organization` + `WebSite` + `SoftwareApplication`
- FAQ page: `FAQPage`
- Breadcrumbs: `BreadcrumbList` where appropriate

## Site-wide SEO files

These files are present under `public/` and included in the build output:

- `public/robots.txt`
- `public/sitemap.xml`
- `public/manifest.webmanifest`
- `public/_redirects` (SPA fallback)
- `public/_headers`

## Notes on claims

Copy must avoid overclaiming. The app should not be described as a detector, test, lab replacement, or guarantee of safety. Use “risk screening” and “prevention guidance” language consistently.


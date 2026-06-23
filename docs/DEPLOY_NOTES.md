# Deployment notes (MycoGuard Kenya)

MycoGuard Kenya is built for static hosting with clean URLs (BrowserRouter) and an offline-first service worker.

## Recommended: Cloudflare Pages

1. Push the repository to GitHub.
2. Create a Cloudflare Pages project pointing at the repo.
3. Configure:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Production branch: `main`

### SPA routing (important)

`public/_redirects` contains:

```
/* /index.html 200
```

This ensures all routes (including `/app/*`) load correctly on refresh and direct links.

## Alternate: Vercel

Vercel can be used to quickly generate a shareable demo URL, but keep `SITE_URL` (in `src/config/site.ts`) pointed at whichever URL is considered the canonical public link.

## Offline verification

After deploying (or locally using `npm run preview`):

1. Open the site once while online.
2. Turn on airplane mode.
3. Confirm these still work:
   - App shell loads (refresh `/` and `/app`)
   - All `/app/*` routes render
   - Assessment flow completes and saves to history
   - Results render and exports work (PDF / CSV / JSON / `.ics`)

## Disclaimer requirement

The persistent disclaimer text must appear verbatim:

- Footer (all pages)
- Results screens
- PDFs and exports


# Prompts to paste into Trae SOLO

Use these in order, in SOLO Builder (or SOLO Coder) chat. Wait for each pass to finish before sending the next one.

## Prompt 1 — initial build

```
Read docs/TRAE_SOLO_MASTER_BRIEF.md fully, then build the complete product exactly as specified in it. Start by setting up the project structure, routing (BrowserRouter), PWA config, and SEO files (robots.txt, sitemap.xml, manifest.webmanifest, _headers, _redirects, structured data), then build the public landing pages with real content, then build the app flows (assessment, weather mode, drying directory, group mode, exports). Load app content from the JSON files in content/. Use the exact disclaimer text from the brief wherever it's required.
```

## Prompt 2 — gap audit

```
Now review the entire codebase against docs/TRAE_SOLO_MASTER_BRIEF.md. Identify and fix: thin or filler landing page content, missing per-page metadata or canonical tags, missing structured data, missing sitemap entries, missing internal links, mobile layout issues, and any UI text that overclaims (e.g. implies toxin detection or guaranteed safety). Fix all of these before stopping.
```

## Prompt 3 — credibility/trust polish

```
Run a polish pass focused on trust and credibility for an audience of PELUM Kenya, the Ministry of Agriculture and Livestock Development, county extension teams, KALRO-linked researchers, cooperatives, and donors. Improve visual hierarchy, typography, spacing, and CTA clarity without adding clutter. The product should feel calm, institutional, and field-ready — not like a generic startup demo.
```

## Prompt 4 — build + offline check

```
Run npm run build and fix any errors until it succeeds. Then verify offline behavior: after a first load, the app shell, all app routes, the content JSON, and all exports (PDF, CSV, JSON, .ics) must keep working with no network connection. Fix anything that breaks offline.
```

## Prompt 5 — final pass before sharing

```
Do one last full-repo quality pass assuming this will be reviewed by PELUM Kenya, Ministry actors, KALRO-linked researchers, Biovision-type partners, county extension teams, cooperatives, and donors. Tighten anything that still feels weak in trust, clarity, SEO, or mobile usability. Then confirm the repo contains README.md, docs/SEO_NOTES.md, and docs/DEPLOY_NOTES.md.
```

## After this, outside Trae

1. Push to GitHub (Trae can do this for you if you ask it to, or do it from its built-in source control panel).
2. Connect the repo to Cloudflare Pages (build command `npm run build`, output directory `dist`).
3. Update `src/config/site.ts` with the real deployed URL once you have it, then redeploy so canonical tags and the sitemap match.

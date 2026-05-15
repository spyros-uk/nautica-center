# Nautica Center

Modern front-end for **[Nautica Center](https://www.nautica-center.gr/)** — the Volos-area dealership for boats, trailers, outboards, and marine gear (historically branded on the live site as “Skafos Treiler” alongside Nautica Center). This repository is a **work-in-progress redesign**: new information architecture, UI, and static product data, intended to replace or complement the legacy WordPress/WooCommerce-style experience on the original domain.

## What’s in scope (vs. the live site)

The production site emphasizes **boat and outboard offers**, **brand categories** (Quicksilver, ZAR, MV Marine, Marinello, Eolo, etc.), **trailers (Dromeys)**, **services** (haul-out, outboard service), and **contact** for the store (Αστέρια Αγριάς) and factory (ΒΙ.ΠΕ. Βόλου). This app currently focuses on a **marketing-style catalog** with filtering (length, HP, offers, availability) rather than e-commerce checkout.

## Tech stack

- **Next.js** 16 (App Router), **React** 19, **TypeScript**
- **Tailwind CSS** 4, **shadcn/ui** (Radix primitives), **lucide-react**
- **Static export** (`output: 'export'`) — deploy the generated `out/` folder anywhere (e.g. **Cloudflare Pages**)
- Fonts: **Inter** with Latin + Greek subsets (`app/layout.tsx`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Static production build (writes **`out/`**):

```bash
npm run build
npm start   # serves ./out locally (requires build first)
```

### Cloudflare Pages

1. Connect the Git repository in the Cloudflare dashboard.
2. **Build command:** `npm run build`
3. **Build output directory:** `out`
4. **Node version:** use **20** or **22** (matches `@types/node`); set via an environment variable `NODE_VERSION=22` in Pages project settings or an `.nvmrc` file if you add one.

This site has no server APIs or ISR: everything is pre-rendered at build time, including `/boats/[brandId]` and `/boats/[brandId]/[modelId]` via `generateStaticParams`.

### Demo password protection

Auth is **HTTP Basic** (the browser’s own sign-in dialog — not a page inside the site). It runs on **Cloudflare Pages** via `functions/_middleware.ts`.

**`npm run dev` does not enable auth** (static export cannot use Next.js proxy/middleware).

#### Test auth locally

```bash
npm run dev:protected
```

Open [http://localhost:8788](http://localhost:8788). Credentials are read from **`.dev.vars`** (not `.env.local`):

- **Username:** `demo`
- **Password:** value in `.dev.vars` → `DEMO_PASSWORD`

#### Cloudflare Pages (production / preview)

1. **Settings → Variables** → add `DEMO_USER` and `DEMO_PASSWORD` (encrypt password).
2. **Redeploy** (variables apply on new deployments).
3. Open the `*.pages.dev` URL — the browser should prompt for username/password.

If you open the site and there is **no** prompt, the variables are missing on that environment or the deploy predates setting them.

`package.json` still uses the placeholder name `my-project`; the app metadata and UI copy target **Nautica Center**.

## Project structure

| Path | Role |
|------|------|
| `app/page.tsx` | Home: hero, categories, featured boats, services, brands, testimonials, contact |
| `app/boats/page.tsx` | Boat listing with filters and pagination (client) |
| `app/boats/[brandId]/page.tsx` | Brand detail |
| `app/boats/[brandId]/[modelId]/page.tsx` | Model detail |
| `app/outboards/page.tsx` | Outboard listing (brands with JSON `category: "outboards"`) |
| `data/boats.json` | Categories, brands, models, specs, images |
| `lib/boats.ts` | Types and helpers for reading catalog data |
| `components/` | Page sections (`header`, `hero`, `footer`, …) and `components/ui/` (shadcn) |
| `public/images/` | Brand and boat imagery referenced from JSON |

## Data model

`data/boats.json` defines **categories** (e.g. inflatable, fiberglass, jetski, outboards) and **brands**, each with **models** (`id`, `name`, `image`, `specs`, `features`, `description`). Some models include optional flags used by the boats listing (e.g. `isOffer`, `isAvailable`, `isUsed`) — see `app/boats/page.tsx`. `lib/boats.ts` documents core TypeScript interfaces and Greek labels for spec keys.

## Navigation notes (WIP)

The header includes a link to **`/parts` (Ανταλλακτικά)**. That route is **not implemented** under `app/` yet; adding `app/parts/page.tsx` (or a redirect to a CMS/external catalog) is an obvious next step.

`next.config.mjs` sets `output: 'export'`, `typescript.ignoreBuildErrors: true`, and `images.unoptimized: true` (required for static export). Tighten TypeScript and image settings before treating the site as production-ready.

## Contributing / next features

Useful directions aligned with the real business and the old site:

- **Parts / accessories** section and SEO-friendly URLs
- **Ready-to-deliver offers** and blog/news parity with the legacy “Ετοιμοπαράδοτα / Προσφορές” content
- **Contact forms** wired to email or CRM (currently mostly static contact blocks)
- **CMS or headless** source for boats/prices instead of hand-edited JSON
- **i18n** (Greek primary; optional English where `nameEn` exists on categories)

When you’re ready to continue the redesign or add features, describe the priority (e.g. “build `/parts`”, “hook contact to Resend”, “migrate offers from the old site”) and we can implement it in this codebase.

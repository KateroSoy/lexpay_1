# Demo Storefront + Mock CMS on Vercel

Date: 2026-08-22

## Goal

Ship one Vite SPA that runs locally and deploys to Vercel, containing both the
existing LEXPAY storefront and a demo CMS. UI-only: no backend, no PHP.

## Context

- `demo/1/` — React 18 + Vite 6 + Tailwind 4 storefront. Complete, mock-driven.
- `demo/1/cms_online_store_php/` — Laravel 11 + Filament 3. Not deployed; Vercel
  has no native PHP runtime. Left as-is.

## Decisions

1. CMS is rebuilt as React pages inside the same SPA. Filament is not deployed.
2. Storefront data stays seeded from `src/data/mockData.ts`.
3. `src/lib/api.ts` reads from the CMS store instead of importing mockData
   directly, so CMS edits show up in the storefront. Single chokepoint — every
   storefront page already goes through `lexpayApi`.
4. Scope: 5 core screens — Dashboard, Products, Services, Digital Items, Orders.
5. Demo login gate at `/admin/login`.

## Architecture

One SPA, two route trees:

    /          -> <Layout>       existing storefront, untouched
    /admin/*   -> <AdminLayout>  CMS demo, outside the storefront chrome

### Data layer

`src/lib/cmsStore.ts` — zustand + `persist` to localStorage, seeded from
`mockData.ts` on first load. Collections: products, services, digital, orders.
Generic CRUD (`createRecord` / `updateRecord` / `removeRecord`) keyed by a
`CollectionMap` type, plus `resetDemo()`. Corrupt storage falls back to seed.

### Screens

A generic resource engine mirrors how Filament works — a descriptor per resource
drives one shared table and one shared form:

    src/pages/admin/
      AdminLayout.tsx      sidebar, topbar, theme toggle, logout
      AdminLogin.tsx       demo gate
      Dashboard.tsx        stat tiles, 7-day revenue chart, recent orders
      ResourceList.tsx     search, sort, filter, pagination, row actions
      ResourceForm.tsx     create/edit, inline validation
      resources/           4 descriptors (fields, columns, labels, badges)

### Visual

Dense desktop admin shell reusing existing tokens (`lex-purple`, `bg-card`,
`border-main`) and `useThemeStore` for light/dark. Same palette as the
storefront, clearly different density so the two never read as one screen.

### Error handling

localStorage parse failure resets to seed. Unknown `/admin/*` route renders a
404 panel. Forms validate required fields, numeric types, and slug uniqueness.

## Deploy

Vercel project root = `demo/1`. Existing `vercel.json` SPA rewrite is correct.
Add `.vercelignore` for `cms_online_store_php/`, archives and scratch scripts;
exclude the PHP folder from `tsconfig.json`. `npm run build` must pass.

`.puppeteerrc.cjs` skips the Chromium download — puppeteer is a dependency only
the root-level scratch scripts use, and pulling Chromium on every Vercel install
is slow and failure-prone.

An earlier unused CMS attempt (`Products.tsx`, `Orders.tsx`,
`components/AdminLayout.tsx`) moved to `_archive/admin-lama/`, excluded from
both `tsconfig.json` and `.vercelignore`.

## Out of scope

Laravel/Filament deployment. The PHP app is currently broken locally (empty
`APP_KEY`, zero-byte SQLite) and is not repaired here.

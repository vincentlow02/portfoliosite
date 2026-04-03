# Vincent Portfolio Starter

Minimal portfolio starter built with Next.js, TypeScript, Tailwind CSS, and the App Router. The project is intentionally neutral so you can layer your own UI system on top later.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Recommended Structure

```text
app/
  about/
  contact/
  projects/
    [slug]/
  globals.css
  layout.tsx
  not-found.tsx
  page.tsx
components/
  layout/
  projects/
  ui/
content/
  projects.ts
lib/
  metadata.ts
  site-config.ts
types/
  project.ts
```

## Notes

- Add or update projects in `content/projects.ts`
- Shared SEO defaults live in `lib/site-config.ts` and `lib/metadata.ts`
- Route-level metadata is defined close to each page
- UI components are placeholders only and can be redesigned later without changing the data model

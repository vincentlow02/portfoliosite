# Vincent Portfolio

A personal portfolio website.

This site showcases selected work in product design, UI/UX design, interaction design, and branding. It includes project case studies, visual design explorations, process documentation, and final outcomes.

## Projects

- IntoDay
- Weave AI
- GoEvent
- Lemon Yuzu Fruit Tea

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Vercel

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

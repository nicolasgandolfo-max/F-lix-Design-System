# @felix/design-system-site

Public documentation portal for the Felix Pago Design System — the editorial,
brand-facing companion to the technical Storybook. Built with **Vite + React 19
+ Tailwind v4**, consuming the real **`@felix/ui`** components and the live
**`theme.css`** tokens. Bilingual (ES / EN).

It mirrors the structure of the reference site (felix-design.vercel.app):
Overview, Principles, Colors, Typography, Illustrations, Iconography,
Components, Design Tokens, Editorial guidelines, Markdown, and MCP.

## Develop

From the repo root (workspaces are installed there):

```bash
npm install                                   # once, at the root
npm run dev -w @felix/design-system-site      # → http://localhost:5173
```

## Build

```bash
npm run build -w @felix/design-system-site    # tsc --noEmit && vite build → dist/
npm run preview -w @felix/design-system-site  # preview the production build
```

## How it consumes the design system

- **Components** come from `@felix/ui` (workspace dependency) — `Button`,
  `Badge`, `Alert`, `Input`, `Switch`, `Checkbox`, `Progress`, `Card`, `Text`.
  The Components section renders the **real** library, not mockups.
- **Tokens** come from `@felix/ui/theme.css` (aliased to source in
  `vite.config.ts` for hot-reload). All colors/spacing/radius reference the
  generated CSS variables.
- **Fonts** (Plain, Saans) live in `public/fonts/` and are registered as
  unified families in `src/styles.css` so `font-weight` selects the right cut.
- **Icons** are Phosphor (`@phosphor-icons/react`), per `DESIGN.md`.

## Structure

```
src/
  main.tsx        entry — wraps <App/> in <LangProvider/>
  App.tsx         shell, scroll-spy (IntersectionObserver), mobile menu
  Sidebar.tsx     dark slate sidebar, nav, language toggle, logo
  sections.tsx    one component per portal section
  data.ts         nav config, color swatches, token tables, inventory
  i18n.tsx        ES/EN context + useTr() translator
  styles.css      Tailwind + theme import + portal chrome CSS
```

## Deploy to Vercel

A root-level `vercel.json` configures the monorepo build. In the Vercel project
settings, point the Root Directory at the **repo root** (so workspaces install)
— the `vercel.json` handles the rest:

```json
{
  "buildCommand": "npm run build -w @felix/design-system-site",
  "outputDirectory": "apps/design-system/dist",
  "installCommand": "npm install"
}
```

The output is a static site, so it can equally be containerized (nginx) like the
Storybook workspace if the team prefers self-hosting.

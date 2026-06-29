---
version: alpha
name: Felix Pago Design System
description: >
  Visual identity and component system for Felix Pago — a fintech remittance
  platform for the Latin American community in the US. Warm, electric, and
  radically transparent. Felix is a compañero financiero, not a bank.

# SOURCE OF TRUTH for shipped code: packages/ui/src/theme.css (generated from
# packages/ui/src/tokens/tokens.ts). The keys below are friendly ABSTRACT names
# for designers and AI tools; they are NOT the CSS variable names. When emitting
# code, always translate to the real CSS variables via the "Token Reference"
# table further down. Never output a variable like `--success` or `--primary-hover`
# directly — those do not exist. Use `--status-success`, `--interactive-primary-hover`, etc.
sourceOfTruth: packages/ui/src/theme.css

colors:
  # Brand
  primary: "#2bf2f1"
  foreground: "#082422"
  # Surfaces
  background: "#fefcf9"
  surface: "#ffffff"
  muted: "#efebe7"
  # Borders
  border: "#cfcabf"
  border-strong: "#ddd9cf"
  # Text
  fg-subtle: "#8a8780"
  fg-muted: "#636158"
  fg-disabled: "#adaa9e"
  # Status
  success: "#60d06f"
  success-bg: "#eefbf0"
  success-text: "#1b7a29"
  warning: "#ffd200"
  warning-bg: "#fffce0"
  warning-text: "#665500"
  error: "#f26629"
  error-bg: "#fff5ef"
  error-text: "#a03808"
  info: "#3b2e8c"
  info-bg: "#f2eeff"
  info-text: "#1c1249"
  # Accent
  accent: "#dcff00"
  # Interactive states
  primary-hover: "#1abfbe"
  primary-active: "#2bf2f1"
  slate-hover: "#152b2a"
  slate-active: "#234343"
  ghost-hover: "#efebe7"
  danger-hover: "#cc4d14"

typography:
  display-2xl:
    fontFamily: Plain
    fontSize: 72px
    fontWeight: 900
    lineHeight: 1.0
    letterSpacing: -0.03em
  display-xl:
    fontFamily: Plain
    fontSize: 60px
    fontWeight: 800
    lineHeight: 1.0
    letterSpacing: -0.025em
  display-lg:
    fontFamily: Plain
    fontSize: 48px
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: -0.02em
  display-md:
    fontFamily: Plain
    fontSize: 36px
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: -0.02em
  display-sm:
    fontFamily: Plain
    fontSize: 30px
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: -0.015em
  heading-xl:
    fontFamily: Saans
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.01em
  heading-lg:
    fontFamily: Saans
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: -0.01em
  heading-md:
    fontFamily: Saans
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: -0.01em
  heading-sm:
    fontFamily: Saans
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Saans
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: Saans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Saans
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  label-lg:
    fontFamily: Saans
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.005em
  label-md:
    fontFamily: Saans
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.2
  label-sm:
    fontFamily: Saans
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
  caption:
    fontFamily: Saans
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.0025em

rounded:
  xs: 2px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  2xl: 24px
  3xl: 32px
  full: 9999px

spacing:
  base: 4px
  s1: 4px
  s2: 8px
  s3: 12px
  s4: 16px
  s5: 20px
  s6: 24px
  s7: 28px
  s8: 32px
  s10: 40px
  s12: 48px
  s16: 64px
  s20: 80px
  s24: 96px

shadows:
  # Warm, slate-tinted shadows — rgba(8, 36, 34, ...). Never pure black.
  xs: "0 1px 2px rgba(8, 36, 34, 0.03)"
  sm: "0 1px 3px rgba(8, 36, 34, 0.06), 0 1px 2px rgba(8, 36, 34, 0.04)"
  md: "0 4px 6px rgba(8, 36, 34, 0.06), 0 2px 4px rgba(8, 36, 34, 0.04)"
  lg: "0 10px 15px rgba(8, 36, 34, 0.06), 0 4px 6px rgba(8, 36, 34, 0.03)"
  xl: "0 20px 25px rgba(8, 36, 34, 0.06), 0 8px 10px rgba(8, 36, 34, 0.03)"
  2xl: "0 25px 50px rgba(8, 36, 34, 0.12)"
  inner: "inset 0 2px 4px rgba(8, 36, 34, 0.04)"
  turquoise: "0 4px 14px rgba(43, 242, 241, 0.25)"
  # Focus ring — turquoise selection glow. See "Focus & Interaction States".
  selection: "0 0 0 6px rgba(43, 242, 241, 0.1)"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.foreground}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    height: 48px
    padding: 20px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
  button-secondary:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.foreground}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    height: 48px
    padding: 20px
  button-slate:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    height: 48px
    padding: 20px
  button-slate-hover:
    backgroundColor: "{colors.slate-hover}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    height: 48px
    padding: 20px
  button-ghost-hover:
    backgroundColor: "{colors.ghost-hover}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    height: 48px
    padding: 20px
  button-danger:
    backgroundColor: "{colors.error}"
    textColor: "#ffffff"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    height: 48px
    padding: 20px
  button-danger-hover:
    backgroundColor: "{colors.danger-hover}"
  # Button sizes apply to every variant above. Default is md.
  button-size-sm:
    height: 36px
    padding: 16px
    typography: "{typography.label-md}"
  button-size-md:
    height: 48px
    padding: 20px
    typography: "{typography.label-lg}"
  button-size-lg:
    height: 56px
    padding: 24px
    typography: "{typography.label-lg}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    height: 48px
    padding: 14px
  input-error:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    borderColor: "{colors.error}"
    borderWidth: 1px
  badge-success:
    backgroundColor: "{colors.success-bg}"
    textColor: "{colors.success-text}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 4px
  badge-warning:
    backgroundColor: "{colors.warning-bg}"
    textColor: "{colors.warning-text}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 4px
  badge-error:
    backgroundColor: "{colors.error-bg}"
    textColor: "{colors.error-text}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 4px
  badge-info:
    backgroundColor: "{colors.info-bg}"
    textColor: "{colors.info-text}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 4px
  badge-brand:
    # --light-sky / --turquoise-800
    backgroundColor: "#d4fffe"
    textColor: "#065958"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 4px
  card:
    # Border strategy: 1px border, no shadow.
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    borderColor: "{colors.border}"
    borderWidth: 1px
    rounded: "{rounded.xl}"
    padding: 20px
  card-elevated:
    # Shadow strategy: shadow, no border. Never both (see "Elevation & Depth").
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    shadow: "{shadows.md}"
    rounded: "{rounded.xl}"
    padding: 20px
---

# Felix Pago Design System

## Overview

Felix Pago is a remittance platform for the Latin American community in the US — a *compañero financiero* that treats money transfers as acts of care between families, not cold financial transactions.

The visual identity is **warm, electric, and radically transparent**. Turquoise (`#2bf2f1`) carries the brand energy — bright, alive, distinctive. Slate (`#082422`) provides weight and authority. Warm off-white (`#fefcf9`) sets a canvas that feels human, not clinical.

**Personality:** Calm, direct, warm, transparent. Never corporate. Never surprising with fees. Jargon-free in both Spanish and English — informal *tú* always, *usted* never.

**Primary language:** Spanish (Mexican Spanish by default). All product copy surfaces in Spanish first. English for international/B2B contexts only.

**Two font families define the voice:**
- **Plain** (Extrabold 800, Black 900) — for display amounts, hero numbers, and moments of celebration. Tight tracking, strong presence.
- **Saans** (Regular 400 through SemiBold 600) — for every UI label, body copy, button, and form field. Clean, warm, legible at any size.

The palette is deliberately small. A handful of semantic colors cover all product states. The accent scales (lime, amber, blueberry) are reserved for marketing surfaces and data visualization — they never appear in transactional UI. `lime` is exposed as the `accent` token; `amber` and `blueberry` exist as full scales in `theme.css` (`--amber-*`, `--blueberry-*`) but have no semantic alias.

## Token Reference — abstract name → real CSS variable

> **For AI tools and code generation:** the friendly names in the frontmatter (e.g. `success`, `primary-hover`, `s4`) are documentation aliases. When you emit CSS, Tailwind classes, or component code, you **must** use the real variables below — they come straight from [`packages/ui/src/theme.css`](packages/ui/src/theme.css), the generated source of truth. The short names like `--success` or `--warning` **do not exist** and will produce broken styles.
>
> Tailwind v4 exposes most color tokens with a `--color-` prefix (e.g. `--color-primary`, `bg-primary`); the raw `--primary` is also defined. Use the Tailwind utility (`bg-primary`, `text-status-success`) in JSX and the raw variable in hand-written CSS.

**Colors**

| Doc alias | Real CSS variable | Value (light) |
|---|---|---|
| `primary` | `--primary` | `#2bf2f1` |
| `foreground` | `--foreground` | `#082422` |
| `background` | `--background` | `#fefcf9` |
| `surface` | `--popover` (or `--neutral-50`) | `#ffffff` |
| `muted` | `--muted` | `#efebe7` |
| `border` | `--border` | `#cfcabf` |
| `border-strong` | `--neutral-300` | `#ddd9cf` |
| `fg-subtle` | `--neutral-600` | `#8a8780` |
| `fg-muted` | `--neutral-700` | `#636158` |
| `fg-disabled` | `--neutral-500` | `#adaa9e` |
| `accent` | `--accent` | `#dcff00` |
| `success` / `-bg` / `-text` | `--status-success` / `--status-success-bg` / `--status-success-text` | `#60d06f` / `#eefbf0` / `#1b7a29` |
| `warning` / `-bg` / `-text` | `--status-warning` / `--status-warning-bg` / `--status-warning-text` | `#ffd200` / `#fffce0` / `#665500` |
| `error` / `-bg` / `-text` | `--status-error` / `--status-error-bg` / `--status-error-text` | `#f26629` / `#fff5ef` / `#a03808` |
| `info` / `-bg` / `-text` | `--status-info` / `--status-info-bg` / `--status-info-text` | `#3b2e8c` / `#f2eeff` / `#1c1249` |
| `primary-hover` / `-active` | `--interactive-primary-hover` / `--interactive-primary-active` | `#1abfbe` / `#2bf2f1` |
| `slate-hover` / `-active` | `--interactive-slate-hover` / `--interactive-slate-active` | `#152b2a` / `#234343` |
| `ghost-hover` | `--interactive-ghost-hover` | `#efebe7` |
| `danger-hover` | `--interactive-danger-hover` | `#cc4d14` |

Each interactive group (`primary`, `secondary`, `ghost`, `danger`, `slate`) also ships `-disabled` variants — see `theme.css`.

**Other semantic tokens present in `theme.css` but not aliased above** (use the real names directly): `--destructive` (`#f26629`, the form/destructive role; same hue as `error`), `--secondary` (`#adaa9e` — note this is **not** the muted fill the doc's "Secondary button" uses), `--link` (`#10a8a7`), `--input` (`#877867`), `--ring` (`#877867`), `--chart-1`…`--chart-5`.

**Radius** — doc alias = real name (Tailwind v4 `--radius-*`, values in `rem`):

| Doc | Real variable | Value |
|---|---|---|
| `xs` | `--radius-xs` | `2px` |
| `sm` | `--radius-sm` | `4px` |
| `md` | `--radius-md` | `8px` |
| `lg` | `--radius-lg` | `12px` |
| `xl` | `--radius-xl` | `16px` |
| `2xl` | `--radius-2xl` | `24px` |
| `3xl` | `--radius-3xl` | `32px` |
| `full` | `--radius-full` | `9999px` |

Pill buttons use the dedicated `--radius-button` token (`calc(var(--radius-xl) + 999px)`), which resolves to a full pill.

**Spacing** — doc alias `sN` → real `--spacing-N` (e.g. `s4` → `--spacing-4` = `1rem` / `16px`). The base unit is `4px`; every step is a multiple.

**Shadows** — doc alias = real name: `--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`, `--shadow-2xl`, `--shadow-inner`, `--shadow-turquoise`, `--shadow-selection`. Values are in the `shadows:` frontmatter block above.

**Typography** — the doc's named scale (`display-2xl`, `heading-lg`, `body-md`, …) is a semantic abstraction. In code, sizes map to the `--text-*` scale (`--text-72`, `--text-60`, `--text-36`, `--text-30`, `--text-xl`, `--text-lg`, `--text-base`, `--text-sm`, `--text-xs`, `--text-xxs`), weights to `--font-weight-*`, line-heights to `--leading-*`, and tracking to `--tracking-*`. See the Typography section for the family mapping.

## Colors

Felix's palette is rooted in two hero colors and a warm neutral foundation. Every other color earns its place.

- **Primary (`#2bf2f1`):** Felix's electric turquoise. The signature brand color — used for primary CTAs, focus rings, progress indicators, and the brand mark. Never used for text.
- **Foreground (`#082422`):** Deep evergreen slate. All body text, headings, and dark-variant surfaces. Provides maximum contrast on warm-white backgrounds.
- **Background (`#fefcf9`):** Warm off-white canvas. Slightly warm-tinted — never pure white. Sets the human, non-clinical tone of the product.
- **Surface (`#ffffff`):** Card and popover surfaces that need to lift above the canvas background.
- **Muted (`#efebe7`):** Subdued fills for hover states, skeleton placeholders, chips, and secondary backgrounds.
- **Success (`#60d06f`):** Completed transfers, saved recipients, positive confirmation states. Always paired with its bg (`#eefbf0`) and text (`#1b7a29`) tokens.
- **Warning (`#ffd200`):** Fixable issues, pending states, non-blocking alerts. Felix uses yellow for warnings — never orange.
- **Error (`#f26629`):** Blocking failures, destructive actions, cancelled transfers. Orange/500 — the only "red" in the system.
- **Accent (`#dcff00`):** Lime. High-energy accent for marketing moments, promotional banners, and the occasional product highlight. Never in transactional flows.

## Typography

Two typefaces, two registers: **Plain** for impact, **Saans** for clarity.

**Plain** (display) carries the personality of the brand in hero contexts — the big amount the user is sending, the success headline, the splash screen. Always Extrabold (800) or Black (900). Always tight tracking (`-0.02em` to `-0.03em`). Never used for body text or UI labels.

**Saans** (UI) is the workhorse. Regular (400) for body copy, Medium (500) for secondary labels and navigation, SemiBold (600) for primary labels and buttons. It reads warmly at every size from caption (11px) to heading (32px).

**Inter** is the web fallback for prototypes and contexts where custom fonts aren't loaded.

**Font-family mapping (for code):** the families `Plain` and `Saans` are the brand names; in code they resolve through CSS variables, and the `@font-face` files are weight-suffixed:
- `Plain` (display) → `--font-heading`. Shipped face: `Plain-500` (`PlainLTStd-Black.otf`).
- `Saans` (UI) → `--font-sans`. Shipped faces: `Saans-300` (Light), `Saans-400` (Regular), `Saans-500` (SemiBold). Note Saans does **not** ship a true Medium (500) file — `Saans-500` maps to SemiBold, so treat "Medium" and "SemiBold" as the same shipped weight.
- Recommended stacks: `--font-heading: "Plain-500", "Inter", system-ui, sans-serif;` and `--font-sans: "Saans-400", "Inter", system-ui, sans-serif;`
- Fonts load via `@import "@felix/ui/fonts.css"` (see [`packages/ui/src/fonts.css`](packages/ui/src/fonts.css)).

- **display-2xl / display-xl:** Plain Black/Extrabold. Send amounts, success screens, marketing hero.
- **display-lg / display-md / display-sm:** Plain Extrabold. Section heroes, large section titles.
- **heading-xl → heading-sm:** Saans Bold/SemiBold. Screen titles, card headings, nav headers.
- **body-lg / body-md / body-sm:** Saans Regular. All product copy.
- **label-lg / label-md:** Saans SemiBold/Medium. Button labels, form labels, primary list text.
- **label-sm / caption:** Saans Medium. Status badges, timestamps, metadata, helper text.

## Layout

Felix uses a **4px base grid** across all surfaces. All spacing values are multiples of 4px.

**Mobile:** Design at 390px (iPhone 14). Minimum supported: 375px (iPhone SE). Safe area padding: 24px bottom for iOS home indicator, 16px horizontal gutters.

**Desktop:** 1440px design width, 1200px max content width, 32px horizontal gutters.

**Screen structure (mobile):**
- Nav header: 48px fixed
- Content area: flex-1, 16–24px horizontal padding
- Sticky bottom CTA: 80px (16px padding + 56px button + 8px safe area)

> All sizes in this document are CSS `px` (the system's `rem`-based tokens assume a 16px root). Earlier drafts used `pt` interchangeably — for web output, always treat values as `px`.

**Card internal spacing:** 16px dense, 20px standard, 24px hero cards.

**List rows:** 14px top/bottom padding, 16px horizontal padding. First row has no top border; subsequent rows use 1px `--color-border` top border.

## Elevation & Depth

Felix uses **tonal separation** rather than dramatic shadows. The system has two strategies — use one per surface, never both:

1. **1px border** (`--border: #cfcabf`) — for cards and inputs at rest. Low-key separation on warm-white canvas.
2. **Soft shadow** — for elements that float above content (popovers, dialogs, sheets).

Shadow palette uses `rgba(8, 36, 34, ...)` — a slate-tinted black. Never pure `rgba(0,0,0,...)`. This keeps shadows warm and brand-consistent.

- `shadow-sm`: Subtle lift — chips, active tabs.
- `shadow-md`: Standard card elevation when using shadow strategy.
- `shadow-lg`: Dropdowns, popovers, anchored panels.
- `shadow-xl`: Dialogs, full modals.
- `shadow-2xl`: Bottom sheets, overlay panels.
- `shadow-turquoise`: `0 4px 14px rgba(43, 242, 241, 0.25)` — primary button glow. Only on `button-primary` at default state.

## Shapes

Felix's shape language is **radically rounded at the interaction layer, gently rounded at the container layer**.

All interactive elements — buttons, badges, chips, avatar images, toggle thumbs — use `rounded-full` (9999px). This pill shape is non-negotiable; it carries the warmth and friendliness of the brand.

Containers soften their corners without going pill:
- Inputs, small cards, inline elements: `rounded-md` (8px)
- Standard cards: `rounded-xl` (16px)
- Hero cards, sheets, modals: `rounded-2xl` (24px)
- Full overlays, large panels: `rounded-3xl` (32px)

No sharp corners anywhere in product UI. `rounded-none` is only for internal CSS utilities.

## Components

### Buttons

Six variants cover every action emphasis level. **Only one primary button per screen.**

- **Primary** — turquoise fill, dark text, shadow-turquoise glow. The single most important action.
- **Slate** — dark slate fill, warm-white text. Confirm/submit on screens that already have turquoise present (avoids two turquoise elements in proximity).
- **Secondary** — muted fill, dark text. Alternative actions, secondary CTAs.
- **Ghost** — transparent, no border. Lowest-emphasis actions: "Ahora no", "Omitir".
- **Line** — transparent with 1px border. Edits, secondary navigation.
- **Danger** — orange fill, white text. Destructive-only: Eliminar, Cancelar suscripción.

Three sizes (tokenized as `button-size-sm/md/lg` in the frontmatter): `sm` (36px height, 16px padding), `md` (48px, 20px — default), `lg` (56px, 24px). Full-width `lg` is the sticky bottom CTA pattern used across all confirmation steps.

### Input Fields

Height 48px. `rounded-md` (8px). Static label above, helper/error below. Placeholder-only fields are forbidden.

States: rest (1px border), focus (see "Focus & Interaction States" below), error (1px error border), disabled (muted background, 0.6 opacity).

Amount inputs use a bespoke large-numeral display (Plain Extrabold, 48–60px) with a currency code badge — not the standard Input component.

### Badges

Small pill labels for status communication. Always `rounded-full`. The system defines these tones:

- `success` (green-tinted): "Recibido", "Completado"
- `warning` (yellow-tinted): "En camino", "Pendiente"
- `error` (orange-tinted): "Cancelado", "Rechazado"
- `info` (blueberry-tinted): informational, neutral notices — maps to `--status-info*`
- `brand` (turquoise-tinted): "Nuevo", "Beta" — uses `--light-sky` bg (`#d4fffe`) and `--turquoise-800` text (`#065958`)

### Cards

`rounded-xl` (16px) for standard, `rounded-2xl` (24px) for hero cards. One elevation strategy: border OR shadow, never both. Internal padding: 20px standard.

## Focus & Interaction States

Felix's focus indicator is a **turquoise selection glow**, implemented as a box-shadow token, not a solid outline:

- **Focus ring:** `--shadow-selection` = `0 0 0 6px rgba(43, 242, 241, 0.1)` (a 6px turquoise halo at 10% alpha). This is the canonical focus treatment for inputs, buttons, and interactive elements. Pair it with a `--primary` (`#2bf2f1`) border on text inputs.
- **`--ring` token:** note that the raw `--ring` variable is `#877867` (mocha) in light mode and `#cfcabf` in dark — it is the *outline color* primitive, distinct from the turquoise glow. Don't assume `--ring` is turquoise.
- **Interactive state tokens:** hover/active/disabled are driven by the `--interactive-*` family (e.g. `--interactive-primary-hover`, `--interactive-ghost-active`, `--interactive-danger-disabled`), not by ad-hoc opacity. Use them.
- **Dark mode** flips hover/active relationships (e.g. primary hover goes *lighter* — `#8dfdfa` — instead of darker). See "Dark Mode".

Never remove focus indicators.

## Dark Mode

The system ships a complete dark theme under the `.dark` class in [`theme.css`](packages/ui/src/theme.css). Semantic tokens are mode-aware — if you build with `--background`, `--foreground`, `--card`, `--border`, `--muted`, and the `--interactive-*` / `--status-*` families, dark mode works automatically. Key inversions to be aware of:

- `--background` → `#082422` (slate), `--foreground` → `#fefcf9` (linen).
- `--card` → `#234343`, `--popover` → `#152b2a`, `--muted` → `#152b2a`.
- `--border` / `--input` → `#35605f` (evergreen); `--ring` → `#cfcabf`.
- `--accent` shifts from lime `#dcff00` to `#b2d000` (lime-500) for contrast.
- `--primary` stays turquoise `#2bf2f1`; primary hover goes **lighter** (`#8dfdfa`), not darker.
- Status colors (`--status-*`) are intentionally held constant across modes.

**Do not hardcode hex values** if you want dark mode to work — always reach for the semantic token.

## Do's and Don'ts

- Do use one Primary button per screen — demote all others to secondary, slate, ghost, or line.
- Do use semantic tokens (`--primary`, `--muted`, `--border`) — never raw hex values in component code.
- Do use Plain for display amounts and hero headings only — Saans for all UI text.
- Do show currency codes on every money value (`$60.00 USD`, `$1,200.00 MXN`).
- Do show fees as a visible line item, even when zero.
- Do use `font-variant-numeric: tabular-nums` on all currency amounts.
- Do use Phosphor Icons (duotone primary, fill for active states) — not Lucide in new product UI.
- Do keep focus rings: the `--shadow-selection` turquoise glow (`0 0 0 6px rgba(43, 242, 241, 0.1)`). Never remove them.
- Do use colored shadows (`rgba(8, 36, 34, ...)`) — never pure black shadows.
- Don't use gradients in product UI. Flat fills only.
- Don't use emoji in shipped product UI.
- Don't use both border and shadow on the same card or input.
- Don't use orange (`--error`) for warnings — use yellow (`--warning`). They are semantically distinct.
- Don't use sharp corners on any interactive element.
- Don't use *usted* or corporate language. Felix speaks in informal *tú*.

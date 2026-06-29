# Prototyping with AI using Felix UI

A practical guide to feeding **`DESIGN.md`** and **Storybook** into AI tools
(**Claude Code**, **Cursor**, **v0**) so the prototypes they generate respect
the Felix components and aesthetic — instead of inventing generic UI.

> TL;DR: give the AI three things every time — (1) the **aesthetic contract**
> (`DESIGN.md`), (2) the **list of components that actually exist**
> (`@felix/ui` / Storybook), and (3) a set of **hard rules** (the "golden rules"
> below). Then verify the output against the checklist at the end.

---

## 1. How the pieces fit together

You already have four assets. Each plays a distinct role when prompting an AI:

| Asset | Path | Role for the AI |
|---|---|---|
| **`DESIGN.md`** | repo root | The **aesthetic + voice contract** — colors, typography, spacing, radius, shadows, do's & don'ts, Spanish-first copy. Tells the AI *how it should look and feel*. |
| **Token source** | [`packages/ui/src/theme.css`](packages/ui/src/theme.css) | The **real CSS variables** the generated code must use. `DESIGN.md` → "Token Reference" maps friendly names to these. |
| **Component library** | [`@felix/ui`](packages/ui/src/index.ts) | The **components that exist** and their props/variants. The AI must only use these. |
| **Storybook** | [`storybook/`](storybook) (`npm run storybook`) | The **interactive catalog** — every component, every variant, every prop, plus DesignTokens stories. The ground truth for *what's available and how it's used*. |

**The mental model:** `DESIGN.md` is the style guide, Storybook is the parts
catalog, `@felix/ui` is the warehouse. A good prototype = Felix parts, assembled
per the style guide. The AI's job is **composition, not invention**.

---

## 2. The golden rules (paste these into every tool)

These are the guardrails that keep AI output on-brand. They're written so you can
copy them verbatim into a system prompt, a Cursor rule, or `CLAUDE.md`.

```
FELIX UI — RULES FOR GENERATING UI

1. COMPONENTS: Only use components exported from "@felix/ui". Never invent a
   component, and never hand-roll one (button, input, modal…) if @felix/ui
   already has it. If a needed component does not exist, say so and propose the
   closest existing one — do not silently substitute a raw HTML/Tailwind version.

2. IMPORTS: Import every component from the package root:
   import { Button, Card, Input } from "@felix/ui"
   Never deep-import from "packages/ui/src/..." or "@felix/ui/dist/...".

3. TOKENS: Never hardcode hex colors, px spacing, or arbitrary radii. Use
   semantic Tailwind utilities backed by the theme (bg-primary, text-foreground,
   text-status-success, rounded-xl, p-4, shadow-md). See DESIGN.md "Token
   Reference" for the name mapping. The short names (--success, --primary-hover)
   DO NOT exist — use --status-success, --interactive-primary-hover, etc.

4. AESTHETIC: Follow DESIGN.md. Highlights:
   - One Primary button per screen; demote the rest to slate/secondary/ghost/line.
   - Pill (rounded-full) for interactive elements; rounded-xl/2xl for containers.
   - Border OR shadow on a card, never both.
   - Plain font for display amounts/heroes only; Saans for all UI text.
   - No gradients, no emoji, no sharp corners in product UI.
   - Focus = the turquoise --shadow-selection glow; never remove it.
   - Icons: Phosphor (@phosphor-icons/react), not Lucide, in product UI.

5. COPY: Product copy is Spanish-first (informal "tú", never "usted"). Show
   currency codes on every amount ($60.00 USD) and fees as a line item.

6. DARK MODE: Build with semantic tokens so the .dark theme works automatically.
   Do not hardcode light-mode colors.

7. WHEN UNSURE: Prefer an existing Storybook story as the reference for props and
   composition. If a prop/variant isn't in the library, don't guess — ask.
```

---

## 3. Component inventory (what "exists" means)

The AI should treat this as the allowlist. Current `@felix/ui` exports:

**Atoms:** `Avatar`, `Badge`, `Button`, `Checkbox`, `CoinLoader`, `Dots`,
`IconButton`, `Input`, `Label`, `Logo`, `Progress`, `RadioGroup`, `Separator`,
`Skeleton`, `Slider`, `Spinner`, `Switch`, `Text`, `Textarea`

**Molecules:** `Accordion`, `Alert`, `Breadcrumb`, `Calendar`, `Card`,
`ChoiceCard`, `Collapse`, `DatePicker`, `Dialog`, `Drawer`, `DropdownMenu`,
`HoverCard`, `NavigationMenu`, `Pagination`, `Popover`, `Select`, `Sheet`,
`SidebarFooter`, `Stepper`, `Table`, `Tabs`, `Toast`, `Tooltip`

**Organisms:** `Sidebar`

> Keep this in sync with [`packages/ui/src/index.ts`](packages/ui/src/index.ts).
> When in doubt, the export list there and the Storybook sidebar are the truth.

---

## 4. Run / publish Storybook (so you and the AI can browse it)

```bash
npm install
npm run storybook        # → http://localhost:6006
```

Storybook is the fastest way to confirm a component's exact props and variants
before (or after) prompting. It also includes **DesignTokens** stories
(Colors, Typography, Spacing, BorderRadius, Shadows, Animations) that visualize
everything in `DESIGN.md`.

To give a web tool (like v0) a stable reference, build and host it:

```bash
npm run build:storybook  # static site in storybook/storybook-static/
```

Deploy that folder anywhere static (the repo already has a Docker/nginx setup in
[`storybook/`](storybook)). A public Storybook URL is the single best artifact to
hand any AI — point it there and the props/variants are unambiguous.

---

## 5. Tool-by-tool setup

### A) Claude Code

Claude Code can read your repo directly, so it's the highest-fidelity option.

1. **Make the rules always-on.** Create a `CLAUDE.md` at the repo root (or add to
   the existing one) so it loads automatically every session:

   ```markdown
   # Felix UI — prototyping context

   When generating or modifying UI in this repo:
   - Read DESIGN.md for the aesthetic + token contract.
   - Only use components exported from @felix/ui (see packages/ui/src/index.ts).
   - Reference the matching story in storybook/stories/<Component>.stories.tsx
     for props and composition.
   - Follow the "golden rules" in AI_PROTOTYPING.md §2.
   ```

2. **Point at the catalog.** In a prompt, just say:
   *"Read `DESIGN.md` and `packages/ui/src/index.ts`, then build a remittance
   confirmation screen using only `@felix/ui` components."*
   Claude Code will open the story files (`storybook/stories/*.stories.tsx`) to
   learn exact props.

3. **shadcn MCP (optional).** [`.cursor/mcp.json`](.cursor/mcp.json) configures a
   shadcn MCP server; Claude Code can use the same registry for shadcn examples,
   which are a good structural reference since `@felix/ui` is built on shadcn.

> Best practice: prototype in a throwaway app that already imports `@felix/ui`,
> so Claude Code can run it and screenshot the result (see the `verify` / `run`
> skills). A prototype you can actually render beats one you only read.

### B) Cursor

The repo already ships Cursor rules in [`.cursor/rules/`](.cursor/rules):
`project-overview` (always-on), `design-tokens`, `component-architecture`,
`storybook`, `testing`. Build on them:

1. **Attach the contract in chat.** Type `@DESIGN.md` and
   `@packages/ui/src/index.ts` in the Cursor chat to pin them as context.

2. **Add a prototyping rule.** Create `.cursor/rules/ai-prototyping.mdc`:

   ```markdown
   ---
   description: Rules for generating Felix prototypes from the design system
   alwaysApply: true
   ---
   - Only use components exported from @felix/ui.
   - Follow DESIGN.md tokens and do's/don'ts; no raw hex or px.
   - Mirror the matching storybook/stories/*.stories.tsx for props.
   - See AI_PROTOTYPING.md §2 for the full golden rules.
   ```

3. **Index Storybook as a Doc.** In Cursor settings → *Docs*, add your hosted
   Storybook URL. Then reference it with `@Docs` so Cursor can look up component
   APIs directly.

4. **shadcn MCP** is already wired in [`.cursor/mcp.json`](.cursor/mcp.json) — use
   it for component examples.

### C) v0 (Vercel)

v0 runs in the browser and **cannot install the private `@felix/ui` package**
(it's published to a restricted registry). So the workflow is *theme-match, then
port*:

1. **Give v0 the tokens.** Paste the `:root` block from
   [`packages/ui/src/theme.css`](packages/ui/src/theme.css) into v0's project
   instructions. v0 generates shadcn/ui components, and `@felix/ui` is built on
   shadcn — so feeding it the Felix CSS variables makes its output look Felix.

2. **Give v0 the rules + voice.** Paste `DESIGN.md` §"Overview", §"Token
   Reference", and the "Do's and Don'ts", plus the golden rules from §2 above.

3. **Constrain the parts.** Tell v0: *"Use only these shadcn components: button,
   card, input, badge, dialog, tabs, … (map to the Felix inventory in §3). Pill
   buttons, rounded-xl cards, no gradients, Spanish copy."*

4. **Port back.** Once the layout is right, bring the JSX into the repo and
   **swap the imports**: replace v0's local `@/components/ui/*` with `@felix/ui`,
   and replace any raw colors with semantic tokens. Claude Code or Cursor can do
   this swap mechanically.

> Use v0 for **fast layout exploration**, not final code. The real components
> live in `@felix/ui`; v0's value is the composition, which you then re-skin onto
> the actual library.

---

## 6. A reusable starter prompt

Paste this into any of the three tools (adjust the screen description):

```
You are building a PROTOTYPE for Felix Pago, a Spanish-first remittance app.

Context to follow strictly:
- Aesthetic + tokens: DESIGN.md (esp. "Token Reference" + "Do's and Don'ts").
- Allowed components: only those exported from @felix/ui (see the inventory).
- Reference props/variants from the matching Storybook story.
- Obey the golden rules (AI_PROTOTYPING.md §2): @felix/ui imports only, semantic
  tokens (no raw hex/px), one primary button per screen, pill interactive
  elements, border-OR-shadow cards, Phosphor icons, Spanish "tú" copy, currency
  codes on amounts, focus glow intact, dark-mode-safe.

Task:
Build <DESCRIBE THE SCREEN, e.g. "a 'Confirmar envío' screen showing the amount
in Plain display type, recipient card, fee line item, and a sticky full-width
primary CTA">.

Output a single React component. Before coding, list which @felix/ui components
you'll use. If something you need doesn't exist in the library, stop and tell me.
```

---

## 7. Verification checklist (before you accept AI output)

- [ ] Every UI element is a `@felix/ui` component (no hand-rolled buttons/inputs/modals).
- [ ] All imports come from `@felix/ui`, not deep paths.
- [ ] No raw hex / px / arbitrary radii — only semantic token utilities.
- [ ] Exactly one Primary button; others demoted.
- [ ] Interactive elements are pills; cards are `rounded-xl`/`2xl`; no card has both border and shadow.
- [ ] Display amounts use Plain; everything else Saans.
- [ ] No gradients, no emoji, no sharp corners; Phosphor (not Lucide) icons.
- [ ] Copy is Spanish, informal *tú*; amounts show currency codes; fees are visible.
- [ ] Renders correctly in both light and `.dark` mode.
- [ ] Focus states (turquoise glow) are present and unremoved.

If a box fails, the fastest fix is: *"Re-check against DESIGN.md §<section> and
the `<Component>` story, then correct."*

---

## See also

- [`DESIGN.md`](DESIGN.md) — the aesthetic + token contract
- [`README.md`](README.md) — installing and configuring `@felix/ui`
- [`ARCHITECTURE.md`](ARCHITECTURE.md) — how the library is structured
- [`.cursor/rules/`](.cursor/rules) — existing Cursor rules this guide extends

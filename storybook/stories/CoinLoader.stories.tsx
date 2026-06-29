import type { Meta, StoryObj } from "@storybook/react";
import { CoinLoader, Dots, Spinner } from "@felix/ui";

/**
 * **CoinLoader** — Felix brand coin, used for longer-running or more prominent
 * loading states (onboarding, payments confirmation, full-page loads).
 *
 * Ships as an animated GIF (`coin-felix.gif`) so consumers must copy the asset
 * to their app's `public/assets/` folder:
 *
 * ```bash
 * cp node_modules/@felix/ui/assets/coin-felix.gif public/assets/coin-felix.gif
 * ```
 *
 * Override the `src` prop to point at any other location.
 */
const meta = {
  title: "Components/Atoms/CoinLoader",
  component: CoinLoader,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      description:
        "Pixel scale: `sm` = 40 px, `md` = 60 px, `lg` = 80 px. Controlled by Felix spacing tokens.",
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      table: {
        defaultValue: { summary: "md" },
        type: { summary: '"sm" | "md" | "lg"' },
      },
    },
    label: {
      description:
        "Accessible label rendered as a visually-hidden `<span>` inside the `role=\"status\"` live region.",
      control: "text",
      table: {
        defaultValue: { summary: "Loading" },
        type: { summary: "string" },
      },
    },
    src: {
      description:
        "Override URL for the coin GIF. Defaults to `/assets/coin-felix.gif`.",
      control: "text",
      table: {
        defaultValue: { summary: "/assets/coin-felix.gif" },
        type: { summary: "string" },
      },
    },
    className: {
      description: "Merged with internal styles via `cn()`.",
      control: "text",
    },
  },
} satisfies Meta<typeof CoinLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

/**
 * Default medium (60 px) coin loader.
 */
export const Default: Story = {
  args: { size: "md" },
};

// ─── All sizes ────────────────────────────────────────────────────────────────

/**
 * The three supported sizes side-by-side.
 */
export const AllSizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-10">
      <div className="flex flex-col items-center gap-2">
        <CoinLoader size="sm" />
        <span className="text-xs text-muted-foreground">sm · 40 px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CoinLoader size="md" />
        <span className="text-xs text-muted-foreground">md · 60 px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CoinLoader size="lg" />
        <span className="text-xs text-muted-foreground">lg · 80 px</span>
      </div>
    </div>
  ),
};

// ─── Custom label ─────────────────────────────────────────────────────────────

/**
 * Supply a contextual `label` so assistive tech can announce *what* is loading.
 */
export const CustomLabel: Story = {
  args: { size: "lg", label: "Processing payment" },
};

// ─── Figma showcase ───────────────────────────────────────────────────────────

/**
 * Reproduces the 3 × 3 loader matrix from Figma — `CoinLoader`, `Spinner` and
 * `Dots` across `sm`, `md` and `lg`. Use this as a visual contract check
 * against the source of truth.
 */
export const FigmaShowcase: Story = {
  parameters: { controls: { disable: true }, layout: "centered" },
  render: () => (
    <div className="inline-grid grid-cols-[auto_repeat(3,minmax(6rem,1fr))] items-center gap-x-10 gap-y-6">
      <span />
      <span className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
        sm
      </span>
      <span className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
        md
      </span>
      <span className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
        lg
      </span>

      <span className="text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Coin
      </span>
      <div className="flex justify-center">
        <CoinLoader size="sm" />
      </div>
      <div className="flex justify-center">
        <CoinLoader size="md" />
      </div>
      <div className="flex justify-center">
        <CoinLoader size="lg" />
      </div>

      <span className="text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Spinner
      </span>
      <div className="flex justify-center">
        <Spinner size="sm" />
      </div>
      <div className="flex justify-center">
        <Spinner size="md" />
      </div>
      <div className="flex justify-center">
        <Spinner size="lg" />
      </div>

      <span className="text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Dots
      </span>
      <div className="flex justify-center">
        <Dots size="sm" />
      </div>
      <div className="flex justify-center">
        <Dots size="md" />
      </div>
      <div className="flex justify-center">
        <Dots size="lg" />
      </div>
    </div>
  ),
};

// ─── Custom src ───────────────────────────────────────────────────────────────

/**
 * Point `src` at any other asset — useful for white-label deployments or
 * when the gif is hosted on a CDN.
 */
export const CustomSrc: Story = {
  args: {
    size: "lg",
    src: "/assets/coin-felix.gif",
    label: "Loading from custom CDN",
  },
};

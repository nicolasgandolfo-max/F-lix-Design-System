import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";

import {
  Collapse,
  CollapseContent,
  CollapseTrigger,
} from "@felix/ui";

/**
 * **Collapse** — A standalone single-panel disclosure built on
 * `@radix-ui/react-collapsible`. Use it for a one-off "show more" toggle,
 * a single FAQ row, or any binary expand/collapse pattern that does not
 * need a group.
 *
 * Compound API: `Collapse` (root, owns the bordered outer container and
 * `open` state), `CollapseTrigger` (the clickable header — auto-renders a
 * chevron indicator that flips on open), and `CollapseContent` (the
 * card-tinted, animated body).
 *
 * For grouped disclosures (FAQs with single/multi behavior, accordion
 * keyboard navigation), reach for `Accordion` instead.
 */
const meta = {
  title: "Components/Molecules/Collapse",
  component: Collapse,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {},
  argTypes: {
    defaultOpen: {
      description: "Open state on first render (uncontrolled).",
      control: "boolean",
    },
    open: {
      description: "Controlled open state. Pair with `onOpenChange`.",
      control: "boolean",
    },
    disabled: {
      description: "Disables the trigger entirely.",
      control: "boolean",
    },
    className: {
      description: "Merged with internal styles via `cn()`.",
      control: "text",
    },
  },
} satisfies Meta<typeof Collapse>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

/**
 * Default closed Collapse with the auto-rendered caret indicator.
 */
export const Default: Story = {
  render: (args) => (
    <div className="w-[300px]">
      <Collapse {...args}>
        <CollapseTrigger>Is it accessible?</CollapseTrigger>
        <CollapseContent>
          Yes. It adheres to the WAI-ARIA Disclosure pattern, fully keyboard
          accessible.
        </CollapseContent>
      </Collapse>
    </div>
  ),
};

// ─── Open by default ──────────────────────────────────────────────────────────

/**
 * `defaultOpen` opens the panel uncontrolled on first render.
 */
export const OpenByDefault: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <div className="w-[300px]">
      <Collapse {...args}>
        <CollapseTrigger>Is it accessible?</CollapseTrigger>
        <CollapseContent>
          Yes. It adheres to the WAI-ARIA Disclosure pattern, fully keyboard
          accessible.
        </CollapseContent>
      </Collapse>
    </div>
  ),
};

// ─── Controlled ───────────────────────────────────────────────────────────────

/**
 * Controlled mode — pass `open` + `onOpenChange` and own the state.
 */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex w-[300px] flex-col gap-3">
        <p className="text-xs text-muted-foreground">
          Externally: <span className="font-mono">{String(open)}</span>
        </p>
        <Collapse open={open} onOpenChange={setOpen}>
          <CollapseTrigger>Toggle from anywhere</CollapseTrigger>
          <CollapseContent>
            The parent owns this state — toggling either source updates both.
          </CollapseContent>
        </Collapse>
      </div>
    );
  },
};

// ─── FAQ list ─────────────────────────────────────────────────────────────────

/**
 * Stack multiple `Collapse`s for a lightweight FAQ list when you do not
 * need accordion-style single-open coordination.
 */
export const FaqList: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex w-[300px] flex-col gap-3">
      <Collapse>
        <CollapseTrigger>Is it accessible?</CollapseTrigger>
        <CollapseContent>Yes. WAI-ARIA Disclosure pattern.</CollapseContent>
      </Collapse>
      <Collapse>
        <CollapseTrigger>Is it animated?</CollapseTrigger>
        <CollapseContent>
          Yes. Subtle slide-down driven by the
          <span className="font-mono"> --radix-collapsible-content-height </span>
          variable.
        </CollapseContent>
      </Collapse>
      <Collapse>
        <CollapseTrigger>Can I customize the chevron?</CollapseTrigger>
        <CollapseContent>
          Yes. Pass any node to <span className="font-mono">indicator</span>
          {" "}or <span className="font-mono">indicator={"{null}"}</span> to
          omit it entirely.
        </CollapseContent>
      </Collapse>
    </div>
  ),
};

// ─── Custom indicator ─────────────────────────────────────────────────────────

/**
 * Swap the chevron for a Plus / Minus pair driven by `data-state`.
 */
export const CustomIndicator: Story = {
  render: () => (
    <div className="w-[300px]">
      <Collapse>
        <CollapseTrigger
          indicator={
            <span
              aria-hidden="true"
              className="inline-flex shrink-0 items-center justify-center size-4 text-muted-foreground"
            >
              <PlusIcon
                weight="bold"
                className="size-3.5 group-data-[state=open]:hidden"
              />
              <MinusIcon
                weight="bold"
                className="size-3.5 hidden group-data-[state=open]:inline"
              />
            </span>
          }
          className="group"
        >
          Plus / Minus toggle
        </CollapseTrigger>
        <CollapseContent>
          The trigger gets a `group` class so the indicator can flip via
          Tailwind&rsquo;s group-data variant.
        </CollapseContent>
      </Collapse>
    </div>
  ),
};

// ─── No indicator ─────────────────────────────────────────────────────────────

/**
 * Pass `indicator={null}` to drop the chevron entirely.
 */
export const NoIndicator: Story = {
  render: () => (
    <div className="w-[300px]">
      <Collapse>
        <CollapseTrigger indicator={null}>No chevron</CollapseTrigger>
        <CollapseContent>
          Useful when the surrounding context already conveys interactivity.
        </CollapseContent>
      </Collapse>
    </div>
  ),
};

// ─── Figma showcase ───────────────────────────────────────────────────────────

/**
 * Pixel-aligned reproduction of the Figma "Collapse · Showcase" frame
 * (node `973:2827`) — closed and open variants stacked at `w-[300px]`.
 */
export const FigmaShowcase: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col gap-6 w-[300px]">
      <Collapse>
        <CollapseTrigger>Is it accessible?</CollapseTrigger>
        <CollapseContent>
          <div className="h-[60px]" aria-hidden="true" />
        </CollapseContent>
      </Collapse>
      <Collapse defaultOpen>
        <CollapseTrigger>Is it accessible?</CollapseTrigger>
        <CollapseContent>
          <div className="h-[60px]" aria-hidden="true" />
        </CollapseContent>
      </Collapse>
    </div>
  ),
};

// ─── Dark mode ────────────────────────────────────────────────────────────────

/**
 * Dark mode — toggle the theme in the Storybook toolbar.
 */
export const DarkMode: Story = {
  parameters: { backgrounds: { default: "dark" } },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="rounded-xl bg-background p-8">
      <div className="w-[300px] flex flex-col gap-3">
        <Collapse>
          <CollapseTrigger>Is it accessible?</CollapseTrigger>
          <CollapseContent>
            Yes. WAI-ARIA Disclosure pattern, fully keyboard-driven.
          </CollapseContent>
        </Collapse>
        <Collapse defaultOpen>
          <CollapseTrigger>Is it themable?</CollapseTrigger>
          <CollapseContent>
            Yes. All colors come from Felix tokens, so dark mode is automatic.
          </CollapseContent>
        </Collapse>
      </div>
    </div>
  ),
};

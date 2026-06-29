import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@felix/ui";

/**
 * **Accordion** — A vertically stacked set of collapsible sections, built on
 * `@radix-ui/react-accordion`. Use it for FAQs, settings groups, or any
 * disclosure pattern.
 *
 * Compound API: `Accordion` (root, controls behavior), `AccordionItem`
 * (one collapsible section, holds its `value`), `AccordionTrigger`
 * (the clickable header — auto-renders a chevron indicator), and
 * `AccordionContent` (the body).
 *
 * Behavior modes:
 *
 * - `type="single" collapsible` — at most one open, click to toggle.
 * - `type="multiple"` — any number open simultaneously.
 *
 * Fully keyboard-accessible: Tab to focus, Enter/Space to toggle,
 * ArrowUp/ArrowDown to move between triggers.
 */
const meta = {
  title: "Components/Molecules/Accordion",
  component: Accordion,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { type: "single", collapsible: true },
  argTypes: {
    type: {
      description:
        "`single` allows one open at a time; `multiple` allows any number.",
      control: { type: "inline-radio" },
      options: ["single", "multiple"],
      table: { type: { summary: '"single" | "multiple"' } },
    },
    collapsible: {
      description:
        "Only applies when `type='single'`. Allows the open item to be closed by clicking it again.",
      control: "boolean",
    },
    className: {
      description: "Merged with internal styles via `cn()`.",
      control: "text",
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

/**
 * Default single-collapsible accordion.
 */
export const Default: Story = {
  render: (args) => (
    <div className="w-[600px]">
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern, making it fully
            accessible via keyboard navigation and screen readers.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that match the rest of the Felix
            design system.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. By default it animates when expanding and collapsing, but you
            can disable that if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// ─── Closed / Open showcase (Figma) ───────────────────────────────────────────

/**
 * Both states, side by side — mirrors the Figma "Closed · Open" showcase.
 */
export const ClosedAndOpen: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex w-[600px] flex-col gap-10">
      <div className="flex flex-col gap-2">
        <span className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
          Closed
        </span>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
          Open
        </span>
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern, making it fully
              accessible via keyboard navigation and screen readers.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

// ─── Multiple ─────────────────────────────────────────────────────────────────

/**
 * `type="multiple"` — any number of items can be open simultaneously.
 *
 * Typed against `typeof Accordion` directly so the discriminated `type`
 * union is preserved (the meta narrows to `"single"`).
 */
export const Multiple: StoryObj<typeof Accordion> = {
  render: () => (
    <div className="w-[600px]">
      <Accordion type="multiple" defaultValue={["item-1", "item-3"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section one</AccordionTrigger>
          <AccordionContent>First section is open by default.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section two</AccordionTrigger>
          <AccordionContent>This one starts closed.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Section three</AccordionTrigger>
          <AccordionContent>
            Third section is also open by default.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// ─── Disabled item ────────────────────────────────────────────────────────────

/**
 * Per-item `disabled` — the trigger is non-interactive and visually muted.
 */
export const DisabledItem: Story = {
  render: (args) => (
    <div className="w-[600px]">
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Available section</AccordionTrigger>
          <AccordionContent>You can open me.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" disabled>
          <AccordionTrigger>Locked section</AccordionTrigger>
          <AccordionContent>You will not see this.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// ─── Custom indicator ─────────────────────────────────────────────────────────

/**
 * Replace the chevron with any node via `indicator`, or omit it with
 * `indicator={null}`.
 */
export const CustomIndicator: Story = {
  render: (args) => (
    <div className="flex w-[600px] flex-col gap-6">
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger
            indicator={
              <span className="text-xs text-muted-foreground">[ + ]</span>
            }
          >
            Custom text indicator
          </AccordionTrigger>
          <AccordionContent>The indicator is a plain string.</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger indicator={null}>No indicator</AccordionTrigger>
          <AccordionContent>The chevron is gone entirely.</AccordionContent>
        </AccordionItem>
      </Accordion>
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
    <div className="w-[600px] rounded-xl bg-background p-8">
      <Accordion type="single" collapsible defaultValue="item-2">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It uses the Felix design tokens for colors and typography.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>Yes. Subtle slide-down on open.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

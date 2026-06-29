import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@felix/ui";

/**
 * A floating-label multi-line text field with interactive states and a
 * helper / error message area below — built to match the Felix DS spec.
 *
 * The label animates from an inline position at the top of the field to a
 * floating label on the top border when the field is focused or has a value.
 * No JavaScript required — the effect is driven entirely by CSS peer selectors.
 *
 * Based on the [Felix DS Figma spec](https://www.figma.com/design/xRPYO5ufQ0exGL2YoskunQ/DS-Felix-Pago-2026?node-id=562-3672).
 */
const meta = {
  title: "Components/Atoms/Textarea",
  component: Textarea,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    label: {
      description:
        "Floating label text — visible at all times; moves to the top border on focus or when the field has a value.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    description: {
      description:
        "Helper text shown below the textarea. Replaced by `error` when an error message is set.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    error: {
      description:
        "Error message. When present, triggers error border/label styling and replaces the description text.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    rows: {
      description:
        "Number of visible text lines. Controls the initial height of the field. The field remains vertically resizable.",
      control: { type: "number" },
      table: { type: { summary: "number" } },
    },
    disabled: {
      description: "Disables the field.",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    className: {
      description:
        "Additional classes merged onto the native `<textarea>` element via `cn()`.",
      control: "text",
    },
    wrapperClassName: {
      description: "Additional classes merged onto the outer wrapper `<div>`.",
      control: "text",
    },
  },
  args: {
    label: "Your message",
    description: "Field Description",
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default — empty field with a floating label and helper text.
 * Click the field to see the label animate to the top border.
 */
export const Default: Story = {
  args: {
    label: "Your message",
    description: "Field Description",
  },
  decorators: [
    (Story) => (
      <div className="w-[280px]">
        <Story />
      </div>
    ),
  ],
};

/**
 * All four interactive states stacked vertically.
 */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-8 w-[280px]">
      {/* Default */}
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">Default</p>
        <Textarea label="Your message" description="Field Description" />
      </div>

      {/* Focused — user must click; shown here as pre-filled to demonstrate float */}
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">
          Focused (click the field)
        </p>
        <Textarea label="Your message" description="Field Description" />
      </div>

      {/* Filled */}
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">Filled</p>
        <Textarea
          label="Your message"
          description="Field Description"
          defaultValue="Type your message here..."
        />
      </div>

      {/* Error */}
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">Error</p>
        <Textarea
          label="Your message"
          defaultValue="Some invalid content"
          error="This field is required"
        />
      </div>

      {/* Disabled */}
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">Disabled</p>
        <Textarea
          label="Your message"
          description="Field Description"
          disabled
        />
      </div>
    </div>
  ),
};

/**
 * Controlling the initial visible height via the native `rows` prop.
 * The field remains resizable vertically regardless of the `rows` value.
 */
export const WithRows: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6 w-[280px]">
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">rows=3 (compact)</p>
        <Textarea label="Short note" rows={3} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">rows=6 (default-ish)</p>
        <Textarea
          label="Your message"
          description="Field Description"
          rows={6}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">rows=10 (tall)</p>
        <Textarea label="Long description" rows={10} />
      </div>
    </div>
  ),
};

/**
 * Dark mode rendering — wrap in a dark surface to preview contrast.
 */
export const DarkMode: Story = {
  parameters: { controls: { disable: true } },
  decorators: [
    (Story) => (
      <div className="dark rounded-xl bg-background p-8 flex flex-col gap-6 w-[280px]">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <Textarea label="Your message" description="Field Description" />
      <Textarea
        label="Your message"
        defaultValue="Type your message here..."
        description="Field Description"
      />
      <Textarea
        label="Your message"
        defaultValue="Invalid content"
        error="This field is required"
      />
      <Textarea label="Your message" description="Field Description" disabled />
    </>
  ),
};

/**
 * Side-by-side comparison matching the Figma showcase canvas.
 */
export const FigmaShowcase: Story = {
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { disable: true },
    mobileFrame: false,
  },
  render: () => (
    <div className="flex flex-col gap-6 w-[280px]">
      {/* Default */}
      <Textarea label="Your message" description="Field Description" />

      {/* Focused / filled */}
      <Textarea
        label="Your message"
        description="Field Description"
        defaultValue="Type your message here..."
      />

      {/* Error */}
      <Textarea
        label="Your message"
        defaultValue="Some invalid content"
        error="This field is required"
      />

      {/* Disabled — filled */}
      <Textarea
        label="Your message"
        description="Field Description"
        defaultValue="Your message is lorem ipsum"
        disabled
      />

      {/* Disabled — empty */}
      <Textarea label="Your message" disabled />
    </div>
  ),
};

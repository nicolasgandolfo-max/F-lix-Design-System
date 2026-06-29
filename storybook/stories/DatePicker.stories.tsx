import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "@felix/ui";

/**
 * A molecule that pairs a styled trigger button with a floating Calendar panel.
 * The calendar is powered by **react-day-picker v9** and styled exclusively with
 * Felix design tokens.
 *
 * Figma reference: [Date Picker](https://www.figma.com/design/xRPYO5ufQ0exGL2YoskunQ/DS-Felix-Pago-2026?node-id=578-4531)
 */
const meta = {
  title: "Components/Molecules/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    value: {
      description: "Controlled selected date.",
      control: false,
    },
    onChange: {
      description: "Called when the user picks or clears a date.",
      table: { type: { summary: "(date: Date | undefined) => void" } },
    },
    placeholder: {
      description: "Text shown in the trigger when no date is selected.",
      control: "text",
      table: { type: { summary: "string" }, defaultValue: { summary: '"Pick a date"' } },
    },
    size: {
      description: "Trigger height — MD (40 px) or SM (32 px).",
      control: { type: "radio" },
      options: ["md", "sm"],
      table: { type: { summary: '"md" | "sm"' }, defaultValue: { summary: '"md"' } },
    },
    error: {
      description: "Error message. Adds a destructive border and text.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    disabled: {
      description: "Disables the trigger and prevents the calendar from opening.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    className: {
      description: "Extra class applied to the trigger button.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    wrapperClassName: {
      description: "Extra class applied to the outer wrapper div.",
      control: "text",
      table: { type: { summary: "string" } },
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Sizes ───────────────────────────────────────────────────────────────────

/**
 * MD (40 px) and SM (32 px) triggers — both fully controlled.
 */
export const Sizes: Story = {
  render: () => {
    const [dateMd, setDateMd] = React.useState<Date | undefined>(undefined);
    const [dateSm, setDateSm] = React.useState<Date | undefined>(undefined);
    return (
      <div className="flex flex-col gap-4 w-[240px]">
        <div>
          <p className="text-xs text-secondary mb-1 font-semibold">MD</p>
          <DatePicker size="md" value={dateMd} onChange={setDateMd} placeholder="Pick a date" />
        </div>
        <div>
          <p className="text-xs text-secondary mb-1 font-semibold">SM</p>
          <DatePicker size="sm" value={dateSm} onChange={setDateSm} placeholder="Pick a date" />
        </div>
      </div>
    );
  },
};

// ─── Selected ────────────────────────────────────────────────────────────────

/**
 * Pre-selected date — the user can still pick a different one.
 */
export const Selected: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 3, 15));
    return (
      <div className="w-[240px]">
        <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />
      </div>
    );
  },
};

// ─── Error ───────────────────────────────────────────────────────────────────

/**
 * Destructive border and text when a validation error is set. The user can
 * still open the calendar and pick a date.
 */
export const Error: Story = {
  render: () => {
    const [dateA, setDateA] = React.useState<Date | undefined>(new Date(2026, 3, 15));
    const [dateB, setDateB] = React.useState<Date | undefined>(undefined);
    return (
      <div className="flex flex-col gap-6 w-[240px]">
        <div>
          <p className="text-xs text-secondary mb-1 font-semibold">Error + date</p>
          <DatePicker value={dateA} onChange={setDateA} error="This field is required" />
        </div>
        <div>
          <p className="text-xs text-secondary mb-1 font-semibold">Error — no date</p>
          <DatePicker value={dateB} onChange={setDateB} error="This field is required" />
        </div>
      </div>
    );
  },
};

// ─── Disabled ────────────────────────────────────────────────────────────────

/**
 * Muted background + 50 % opacity. The calendar cannot be opened.
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[240px]">
      <DatePicker disabled placeholder="Pick a date" />
      <DatePicker disabled value={new Date(2026, 3, 15)} />
    </div>
  ),
};

// ─── Dark mode ───────────────────────────────────────────────────────────────

/**
 * All states rendered on the dark background.
 */
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: () => {
    const [dateA, setDateA] = React.useState<Date | undefined>(undefined);
    const [dateB, setDateB] = React.useState<Date | undefined>(new Date(2026, 3, 15));
    const [dateC, setDateC] = React.useState<Date | undefined>(undefined);
    return (
      <div className="dark flex flex-col gap-4 w-[240px]">
        <DatePicker value={dateA} onChange={setDateA} placeholder="Pick a date" />
        <DatePicker value={dateB} onChange={setDateB} />
        <DatePicker value={dateC} onChange={setDateC} error="This field is required" />
        <DatePicker disabled placeholder="Pick a date" />
      </div>
    );
  },
};

// ─── Figma Showcase ──────────────────────────────────────────────────────────

/**
 * Recreation of the Figma spec frame — all states (Empty / Selected / Error /
 * Disabled) in both MD and SM sizes.
 */
export const FigmaShowcase: Story = {
  parameters: {
    layout: "padded",
    mobileFrame: false,
  },
  render: () => {
    const [emptyMd, setEmptyMd] = React.useState<Date | undefined>(undefined);
    const [emptySm, setEmptySm] = React.useState<Date | undefined>(undefined);
    const [selectedMd, setSelectedMd] = React.useState<Date | undefined>(new Date(2026, 3, 15));
    const [selectedSm, setSelectedSm] = React.useState<Date | undefined>(new Date(2026, 3, 15));
    const [errorMd, setErrorMd] = React.useState<Date | undefined>(new Date(2026, 3, 15));
    const [errorSm, setErrorSm] = React.useState<Date | undefined>(new Date(2026, 3, 15));

    const states = [
      {
        label: "Empty",
        md: <DatePicker value={emptyMd} onChange={setEmptyMd} placeholder="Pick a date" size="md" />,
        sm: <DatePicker value={emptySm} onChange={setEmptySm} placeholder="Pick a date" size="sm" />,
      },
      {
        label: "Selected",
        md: <DatePicker value={selectedMd} onChange={setSelectedMd} size="md" />,
        sm: <DatePicker value={selectedSm} onChange={setSelectedSm} size="sm" />,
      },
      {
        label: "Error",
        md: <DatePicker value={errorMd} onChange={setErrorMd} error="This field is required" size="md" />,
        sm: <DatePicker value={errorSm} onChange={setErrorSm} error="This field is required" size="sm" />,
      },
      {
        label: "Disabled",
        md: <DatePicker disabled placeholder="Pick a date" size="md" />,
        sm: <DatePicker disabled placeholder="Pick a date" size="sm" />,
      },
    ];

    return (
      <div className="bg-background p-8 rounded-2xl shadow-lg w-fit">
        <h2 className="font-semibold text-[18px] text-foreground mb-1">Date Picker</h2>
        <p className="text-[12px] text-primary mb-6">
          Empty · Selected · Error · Disabled
        </p>

        <div className="grid grid-cols-[auto_240px_240px] gap-x-6 gap-y-4 items-start">
          <div />
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">MD</p>
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">SM</p>

          {states.map(({ label, md, sm }) => (
            <React.Fragment key={label}>
              <p className="text-[12px] text-foreground pt-2 min-w-[80px]">{label}</p>
              <div>{md}</div>
              <div>{sm}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  },
};

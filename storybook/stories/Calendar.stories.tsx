import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { es } from "date-fns/locale";
import { Calendar } from "@felix/ui";

/**
 * Standalone calendar panel wrapping **react-day-picker v9**, styled with Felix
 * design tokens. Typically consumed via `DatePicker`, but can be used directly
 * when a persistently-visible calendar grid is needed.
 *
 * Figma reference: [Date Picker](https://www.figma.com/design/xRPYO5ufQ0exGL2YoskunQ/DS-Felix-Pago-2026?node-id=578-4531)
 */
const meta = {
  title: "Components/Molecules/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Selected ────────────────────────────────────────────────────────────────

/**
 * Calendar with a pre-selected date highlighted in primary colour.
 */
export const Selected: Story = {
  render: () => (
    <Calendar mode="single" selected={new Date(2026, 3, 15)} />
  ),
};

// ─── Spanish ─────────────────────────────────────────────────────────────────

/**
 * Calendar localised to **Spanish** (`es` from date-fns). The month name,
 * day-of-week abbreviations and screen-reader labels all use Spanish strings.
 *
 * Pass the `locale` prop from `date-fns/locale` to localise any calendar.
 */
export const Spanish: Story = {
  render: () => (
    <Calendar
      mode="single"
      locale={es}
      defaultMonth={new Date(2026, 3, 1)}
    />
  ),
};

// ─── Controlled ──────────────────────────────────────────────────────────────

/**
 * Fully-controlled example — the selected date is stored in local state and
 * displayed below the calendar.
 */
export const Controlled: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    return (
      <div className="flex flex-col gap-3">
        <Calendar mode="single" selected={date} onSelect={setDate} />
        <p className="text-xs text-secondary">
          {date
            ? `Selected: ${date.toLocaleDateString("en-US", { dateStyle: "long" })}`
            : "No date selected"}
        </p>
      </div>
    );
  },
};

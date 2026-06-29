"use client";

import * as React from "react";
import { DayPicker, useDayPicker } from "react-day-picker";
import type { CalendarMonth } from "react-day-picker";
import {
  CaretCircleLeftIcon,
  CaretCircleRightIcon,
} from "@phosphor-icons/react";
import { format, type Locale } from "date-fns";

import { cn } from "../../lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// ─── Internal: custom month caption with inline prev/next nav ─────────────────

function CalendarCaption({ calendarMonth }: { calendarMonth: CalendarMonth }) {
  const { previousMonth, nextMonth, goToMonth, dayPickerProps } =
    useDayPicker();
  const locale = dayPickerProps.locale;

  const btnClass = cn(
    "shrink-0 flex items-center justify-center text-foreground",
    "hover:text-primary transition-colors cursor-pointer",
    "disabled:opacity-30 disabled:cursor-not-allowed"
  );

  return (
    <div className="flex items-center h-5 mb-1">
      <button
        type="button"
        aria-label="Go to previous month"
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        className={btnClass}
      >
        <CaretCircleLeftIcon size={20} aria-hidden />
      </button>
      <span
        className="flex-1 text-center font-semibold text-[14px] leading-[1.5] text-foreground capitalize"
        role="status"
        aria-live="polite"
      >
        {format(calendarMonth.date, "LLLL yyyy", {
          locale: locale as Locale | undefined,
        })}
      </span>
      <button
        type="button"
        aria-label="Go to next month"
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        className={btnClass}
      >
        <CaretCircleRightIcon size={20} aria-hidden />
      </button>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Standalone calendar panel built on react-day-picker, styled with Felix
 * design tokens. Renders a 240 px-wide month grid with prev/next navigation.
 *
 * Used internally by `DatePicker`. Can also be consumed directly when a
 * persistently-visible calendar is required.
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      hideNavigation
      data-slot="calendar"
      className={cn(
        "w-[240px] bg-background border border-border rounded-md p-3",
        "flex flex-col gap-1 select-none",
        className
      )}
      classNames={{
        // ── Layout wrappers ───────────────────────────────────────────────
        months: "flex flex-col",
        month: "flex flex-col gap-1",

        // ── Month header: rendered by the CalendarCaption override below ──
        month_caption: "",

        // ── Day-of-week header row ────────────────────────────────────────
        weekdays: "flex w-full pt-1",
        weekday: cn(
          "w-[32px] h-[17px] flex items-center justify-center",
          "font-semibold text-[12px] leading-[1.2] tracking-[0.25px]",
          "text-muted-foreground text-center capitalize"
        ),

        // ── Day grid ──────────────────────────────────────────────────────
        weeks: "flex flex-col mt-1",
        week: "flex items-center justify-between",

        // `day` is the <td> wrapper; keep it bare — styling lives on day_button
        day: "size-7 p-0",

        // day_button: base styles; modifiers are applied via the DayButton
        // component override below (gives access to the modifiers object).
        day_button: cn(
          "size-7 rounded-full flex items-center justify-center",
          "font-sans text-xs leading-tight tracking-[0.25px]",
          "text-foreground transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          "disabled:pointer-events-none"
        ),

        // Modifier overrides applied to the <td> (day) element.
        outside: "opacity-60",
        hidden: "invisible",

        // `today` and `selected` are handled in the DayButton override below.
        ...classNames,
      }}
      components={{
        // ── Custom month caption with inline prev/next buttons ─────────────
        MonthCaption: ({ calendarMonth }) => (
          <CalendarCaption calendarMonth={calendarMonth} />
        ),

        // ── Apply today / selected / outside colours on the button itself ──
        DayButton: ({
          day: _day,
          modifiers,
          className: btnClassName,
          ...btnProps
        }) => (
          <button
            {...btnProps}
            type="button"
            className={cn(
              // btnClassName (day_button classNames) comes first so our
              // conditional classes below always win via tailwind-merge.
              btnClassName,
              // Permanent transparent border prevents layout shift when hover border appears
              "border-[1.5px] border-transparent",
              // text colour
              !modifiers.outside && "text-foreground",
              modifiers.outside && "text-secondary",
              // today: grayish fill, no border
              modifiers.today && !modifiers.selected && "bg-muted",
              // selected: turquoise fill, semibold
              modifiers.selected && "bg-primary text-foreground font-semibold",
              // interactive cursor + hover (suppressed for disabled)
              !modifiers.disabled && "cursor-pointer",
              !modifiers.selected &&
                !modifiers.today &&
                !modifiers.disabled &&
                "hover:bg-muted hover:border-border",
              // disabled
              modifiers.disabled &&
                "opacity-30 cursor-not-allowed pointer-events-none"
            )}
          />
        ),

        ...components,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };

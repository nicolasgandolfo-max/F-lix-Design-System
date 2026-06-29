import React from "react";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Dots,
  Skeleton,
  Spinner,
  Text,
} from "@felix/ui";
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";
import type {
  AnimationRow,
  AnimationShape,
  AnimationTrigger,
  SlideEdge,
} from "./tokens/animations";

// ─── ReplayButton ─────────────────────────────────────────────────────────────

interface ReplayButtonProps {
  onClick: () => void;
  ariaLabel: string;
}

function ReplayButton({ onClick, ariaLabel }: ReplayButtonProps) {
  const [rotation, setRotation] = React.useState(0);

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      aria-label={ariaLabel}
      onClick={() => {
        setRotation((r) => r - 360);
        onClick();
      }}
      className="absolute top-2 right-2 z-10 shadow-xs"
    >
      <ArrowCounterClockwiseIcon
        weight="bold"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: "transform 320ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
      Replay
    </Button>
  );
}

// ─── AnimationPreview ─────────────────────────────────────────────────────────

interface AnimationPreviewProps {
  className: string;
  trigger: AnimationTrigger;
  shape?: AnimationShape;
  slideFrom?: SlideEdge;
}

export function AnimationPreview({
  className,
  trigger,
  shape = "tile",
  slideFrom,
}: AnimationPreviewProps) {
  const [tick, setTick] = React.useState(0);

  const demoKey = trigger === "loop" ? "static" : tick;

  return (
    <div className="relative flex min-h-[110px] w-full items-center justify-center overflow-hidden rounded-md border border-dashed border-primary/35 bg-primary/5 p-4">
      <DemoElement
        key={demoKey}
        shape={shape}
        className={className}
        slideFrom={slideFrom}
      />
      {trigger === "mount" && (
        <ReplayButton
          onClick={() => setTick((t) => t + 1)}
          ariaLabel={`Replay ${className}`}
        />
      )}
    </div>
  );
}

// ─── Shape demos ──────────────────────────────────────────────────────────────

interface ShapeDemoProps {
  /** Tailwind animation utility, e.g. `animate-fade-in`. */
  className: string;
}

function TileDemo({ className }: ShapeDemoProps) {
  return (
    <div
      className={`${className} size-14 rounded-xl bg-primary shadow-md [animation-fill-mode:forwards]`}
    />
  );
}

function DotsDemo() {
  return <Dots size="md" />;
}

function SpinnerDemo() {
  return <Spinner size="md" />;
}

function PulseDemo() {
  return <Skeleton type="block" className="size-14" />;
}

function TooltipDemo({ className }: ShapeDemoProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${className} relative [animation-fill-mode:forwards]`}>
        <div className="rounded-md bg-foreground px-2.5 py-1.5 shadow-md">
          <div className="flex flex-col gap-1">
            <div className="h-1 w-12 rounded-full bg-background/70" />
            <div className="h-1 w-8 rounded-full bg-background/40" />
          </div>
        </div>
        <div className="absolute -bottom-0.5 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-foreground" />
      </div>
      <div className="size-3 rounded-full bg-primary" />
    </div>
  );
}

function OverlayDemo({ className }: ShapeDemoProps) {
  return (
    <div
      className={`${className} absolute inset-3 rounded-md bg-foreground/40 [animation-fill-mode:forwards]`}
    />
  );
}

function PanelDemo({ className }: ShapeDemoProps) {
  return (
    <div
      className={`${className} flex w-44 flex-col overflow-hidden rounded-lg border border-border bg-background shadow-md [animation-fill-mode:forwards]`}
    >
      <div className="h-2 bg-primary" />
      <div className="flex flex-col gap-1.5 p-3">
        <div className="h-1.5 w-2/3 rounded-full bg-foreground/20" />
        <div className="h-1.5 w-full rounded-full bg-foreground/10" />
        <div className="h-1.5 w-3/5 rounded-full bg-foreground/10" />
      </div>
    </div>
  );
}

function PopoverDemo({ className }: ShapeDemoProps) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className={`${className} origin-bottom rounded-md border border-border bg-background px-3 py-2 shadow-md [animation-fill-mode:forwards]`}
      >
        <div className="flex flex-col gap-1">
          <div className="h-1.5 w-16 rounded-full bg-foreground/20" />
          <div className="h-1.5 w-12 rounded-full bg-foreground/10" />
        </div>
      </div>
      <div className="size-3 rounded-full bg-primary" />
    </div>
  );
}

function CollapseDemo({ className }: ShapeDemoProps) {
  return (
    <div
      className={`${className} w-[220px] overflow-hidden rounded-md border border-border bg-background [animation-fill-mode:forwards]`}
      style={
        {
          "--collapse-content-height": "72px",
        } as React.CSSProperties
      }
    >
      <Text variant="body-sm" className="px-3.5 py-3 text-foreground">
        Collapsible content
        <br />
        across two lines.
      </Text>
    </div>
  );
}

const SLIDE_ALIGN_BY_EDGE: Record<SlideEdge, string> = {
  right: "items-start justify-end",
  left: "items-start justify-start",
  top: "items-start justify-start",
  bottom: "items-end justify-start",
};

const SLIDE_PANEL_BORDER_BY_EDGE: Record<SlideEdge, string> = {
  right: "border-l",
  left: "border-r",
  top: "border-b",
  bottom: "border-t",
};

interface SlideDemoProps extends ShapeDemoProps {
  slideFrom?: SlideEdge;
}

function SlideDemo({ className, slideFrom }: SlideDemoProps) {
  const isHorizontal = slideFrom === "right" || slideFrom === "left";
  const trackSize = isHorizontal ? "h-16 w-full" : "h-[100px] w-24";
  const panelSize = isHorizontal ? "h-full w-1/2" : "h-1/2 w-full";
  const panelBorder = SLIDE_PANEL_BORDER_BY_EDGE[slideFrom ?? "top"];
  const align = SLIDE_ALIGN_BY_EDGE[slideFrom ?? "top"];

  return (
    <div
      className={`relative flex max-w-[260px] overflow-hidden rounded-md border border-foreground/10 bg-foreground/5 ${trackSize} ${align}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-foreground/15" />
      <div
        className={`${className} ${panelSize} ${panelBorder} relative flex flex-col overflow-hidden border-border bg-background shadow-md [animation-fill-mode:forwards]`}
      >
        <div className="h-1.5 shrink-0 bg-primary" />
        <div className="flex flex-col gap-1 p-1.5">
          <div className="h-1 w-2/3 rounded-full bg-foreground/20" />
          <div className="h-1 w-full rounded-full bg-foreground/10" />
          <div className="h-1 w-1/2 rounded-full bg-foreground/10" />
        </div>
      </div>
    </div>
  );
}

// ─── DemoElement ──────────────────────────────────────────────────────────────

interface DemoElementProps {
  shape: AnimationShape;
  className: string;
  slideFrom?: SlideEdge;
}

function DemoElement({ shape, className, slideFrom }: DemoElementProps) {
  return (
    <>
      {shape === "tile" && <TileDemo className={className} />}
      {shape === "tooltip" && <TooltipDemo className={className} />}
      {shape === "panel" && <PanelDemo className={className} />}
      {shape === "popover" && <PopoverDemo className={className} />}
      {shape === "overlay" && <OverlayDemo className={className} />}
      {shape === "slide" && (
        <SlideDemo className={className} slideFrom={slideFrom} />
      )}
      {shape === "collapse" && <CollapseDemo className={className} />}
      {shape === "dots" && <DotsDemo />}
      {shape === "spinner" && <SpinnerDemo />}
      {shape === "pulse" && <PulseDemo />}
    </>
  );
}

// ─── AnimationCard ────────────────────────────────────────────────────────────

const META_LABEL_CLASSES =
  "uppercase tracking-wider font-semibold text-foreground/70";

const MONO_CHIP_STYLE: React.CSSProperties = { fontFamily: "monospace" };

/** One "LABEL\n value" cell of the metadata grid. */
function MetaField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Text variant="caption" as="span" className={META_LABEL_CLASSES}>
        {label}
      </Text>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function UsedByList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return (
      <Text variant="body-sm" className="text-foreground/40">
        —
      </Text>
    );
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((c) => (
        <Badge key={c} variant="ghost">
          {c}
        </Badge>
      ))}
    </div>
  );
}

interface AnimationCardProps {
  row: AnimationRow;
}

function AnimationCard({ row }: AnimationCardProps) {
  return (
    <Card className="gap-2.5">
      <CardHeader className="flex-row flex-wrap items-center gap-2">
        <Badge variant="ghost" shape="chip" style={MONO_CHIP_STYLE}>
          {row.token}
        </Badge>
        {row.iteration === "infinite" && (
          <Badge variant="secondary" shape="chip">
            infinite
          </Badge>
        )}
      </CardHeader>

      <div className="flex flex-wrap gap-x-5 gap-y-3">
        <MetaField label="Tailwind">
          <Badge variant="ghost" shape="chip" style={MONO_CHIP_STYLE}>
            {row.tailwind}
          </Badge>
        </MetaField>
        <MetaField label="Duration">
          <Text variant="body-sm" className="font-mono">
            {row.duration}
          </Text>
        </MetaField>
        <MetaField label="Easing">
          <Text variant="body-sm" className="font-mono">
            {row.easing}
          </Text>
        </MetaField>
        <MetaField label="Used by">
          <UsedByList items={row.usedBy} />
        </MetaField>
      </div>

      <AnimationPreview
        className={row.tailwind}
        trigger={row.trigger}
        shape={row.shape}
        slideFrom={row.slideFrom}
      />

      {row.notes && (
        <Text variant="body-sm" className="text-foreground/60">
          {row.notes}
        </Text>
      )}
    </Card>
  );
}

interface AnimationCardGridProps {
  rows: AnimationRow[];
  /** Defaults to 2; pass 1 for narrow layouts (e.g. mobile docs). */
  columns?: 1 | 2;
  title?: string;
  description?: string;
}

export function AnimationCardGrid({
  rows,
  columns = 2,
  title,
  description,
}: AnimationCardGridProps) {
  const gridCols = columns === 1 ? "grid-cols-1" : "grid-cols-2";

  return (
    <section className="mb-10">
      {title && (
        <Text variant="heading-4" as="h2" className="mb-1">
          {title}
        </Text>
      )}
      {description && (
        <Text variant="body-sm" className="mb-4 max-w-2xl text-foreground/60">
          {description}
        </Text>
      )}
      <div className={`grid gap-4 ${gridCols}`}>
        {rows.map((row) => (
          <AnimationCard key={`${row.token}-${row.tailwind}`} row={row} />
        ))}
      </div>
    </section>
  );
}

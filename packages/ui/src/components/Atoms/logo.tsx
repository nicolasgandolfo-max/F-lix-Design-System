import * as React from "react";

import { cn } from "../../lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

/** Which Felix brand mark to render. */
export type LogoType = "logotype" | "symbol" | "symbol-circular";

// ─── Brand-fixed colors ───────────────────────────────────────────────────────

/**
 * Felix brand teal — used as the background fill of the circular symbol.
 *
 * This is intentionally a literal, NOT a theme token: the brand color is
 * fixed across light and dark themes per the Figma source of truth
 * (`Felix Brand` frame, node `103:56`). The "F" sitting on top of the
 * circle still uses `currentColor` so the foreground tracks the theme.
 */
const FELIX_BRAND_TEAL = "#2BF2F1";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface LogoProps extends Omit<
  React.SVGAttributes<SVGSVGElement>,
  "type"
> {
  /**
   * Which brand mark to render.
   * - `logotype` — full "Félix" wordmark (~218 × 78)
   * - `symbol` — F mark on transparent (~78 × 78)
   * - `symbol-circular` — F mark on the brand teal circle (~78 × 78)
   * @default "logotype"
   */
  type?: LogoType;
  /**
   * Accessible label exposed to assistive tech via `<title>` and
   * `aria-labelledby`. Omit (or pass an empty string) to mark the SVG
   * decorative — the component then renders `aria-hidden="true"` and
   * `role="presentation"`.
   */
  title?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * `Logo` — the Felix brand mark, inlined as React SVG so it inherits color
 * from `currentColor` (set the wrapper's text color via `className`) and
 * doesn't require any consumer-side asset copying.
 *
 * Source of truth: Figma `Felix Brand` frame (node `103:56`). Raw SVG
 * exports also ship under `@felix/ui/assets/brand/` for non-React contexts
 * (emails, raw HTML, etc.).
 */
function Logo({
  type = "logotype",
  title,
  className,
  ref,
  ...props
}: LogoProps & { ref?: React.Ref<SVGSVGElement> }) {
  const reactId = React.useId();
  const titleId = title ? `${reactId}-title` : undefined;
  const isLabeled = Boolean(title);

  const viewBox = type === "logotype" ? "0 0 218 78" : "0 0 78 78";

  return (
    <svg
      ref={ref}
      data-slot="logo"
      data-type={type}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      role={isLabeled ? "img" : "presentation"}
      aria-hidden={isLabeled ? undefined : true}
      aria-labelledby={titleId}
      className={cn(
        // Default to the foreground token; consumers override via className.
        // Width tracks the natural aspect ratio because we keep the SVG
        // intrinsic via `viewBox` and let height/className do the sizing.
        "inline-block shrink-0 align-middle text-foreground",
        className
      )}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      {type === "logotype" ? <LogotypePaths /> : null}
      {type === "symbol" ? <SymbolPaths /> : null}
      {type === "symbol-circular" ? <SymbolCircularPaths /> : null}
    </svg>
  );
}

Logo.displayName = "Logo";

// ─── Variant path data ────────────────────────────────────────────────────────
//
// All foreground paths use `fill="currentColor"` so the mark inherits its
// color from the wrapper's text color (default `text-foreground`). Path
// data is the raw export from Figma — see `packages/ui/assets/brand/` for
// the source SVGs.

function LogotypePaths() {
  return (
    <g>
      <path
        fill="currentColor"
        d="M101.276 57.9387C97.8253 69.4633 88.3903 77.9978 71.9509 77.9978C53.5844 77.9978 42.9286 66.1531 42.9286 47.8013C42.9286 30.5166 55.106 18.3518 72.5591 18.3518C90.0122 18.3518 101.884 29.5562 101.884 49.9355C101.884 50.8959 101.884 51.6428 101.782 53.0301H64.0331C64.3362 59.4326 67.2792 62.8473 72.4567 62.8473C77.3268 62.8473 79.3564 59.9662 80.067 57.9387H101.276ZM75.3604 16.002L78.2598 0H100.365L97.3806 16.002H75.3604ZM80.7777 41.401C80.1695 35.532 77.5295 32.5441 72.7619 32.5441C67.5865 32.5441 64.8463 35.9588 64.1378 41.401H80.7799H80.7777Z"
      />
      <path
        fill="currentColor"
        d="M105.802 76.2926V0H127.517V76.2926H105.802Z"
      />
      <path
        fill="currentColor"
        d="M132.662 0H154.377V16.002H132.662V0ZM132.662 76.2926V20.2726H154.377V76.2905H132.662V76.2926Z"
      />
      <path
        fill="currentColor"
        d="M173.757 47.8035L155.593 20.2747H180.048C181.976 24.223 184.208 27.6377 186.645 32.4396C188.675 28.2779 190.602 25.0766 193.139 20.2747H216.376C211.506 28.4913 203.996 39.6936 199.126 47.6968C204.504 56.7671 212.52 67.4358 218 76.2926H194.153C190.094 68.823 187.962 65.8352 186.44 62.8473C183.903 67.8626 181.67 71.7042 178.932 76.2926H155.491L173.757 47.8035Z"
      />
      <path
        fill="currentColor"
        d="M23.2584 50.8806H38.719L42.1525 31.8276H32.3141C15.9598 31.8276 1.7985 42.0543 1.21644 59.3673L0 76.2926H21.4861L23.2584 50.8806Z"
      />
      <path
        fill="currentColor"
        d="M24.8956 16.762H55.1671L58.2147 0H3.76704C3.76704 0 2.74026 5.05235 2.48738 8.14038C1.4279 21.0195 10.3027 30.2836 23.0884 30.6604L23.9822 30.6756L24.8978 16.762H24.8956Z"
      />
    </g>
  );
}

function SymbolPaths() {
  return (
    <g>
      <path
        fill="currentColor"
        d="M33.5925 33.7539L34.0941 33.7718L35.2255 19.3908H67.8167L70 0L12.159 0.00891428C12.159 0.00891428 10.9833 5.28171 10.6916 8.85188C9.4784 23.7432 18.9455 33.3194 33.5925 33.7539Z"
      />
      <path
        fill="currentColor"
        d="M8.54363 66.3758L8 78H31.0644L32.9229 54.7137L50.9023 54.8006L53.205 34.5339H44.16C25.427 34.5339 9.20659 46.3587 8.54142 66.378L8.54363 66.3758Z"
      />
    </g>
  );
}

function SymbolCircularPaths() {
  return (
    <g>
      <path
        fill={FELIX_BRAND_TEAL}
        d="M0 39C0 17.4609 17.4609 0 39 0C60.5391 0 78 17.4609 78 39C78 60.5391 60.5391 78 39 78C17.4609 78 0 60.5391 0 39Z"
      />
      <path
        fill="currentColor"
        d="M38.0315 37.6558L38.3136 37.6662L38.9506 29.6452H57.2806L58.5078 18.8305L25.9753 18.8357C25.9753 18.8357 25.3136 21.7763 25.1511 23.7679C24.4686 32.0736 29.7934 37.414 38.0315 37.6558Z"
      />
      <path
        fill="currentColor"
        d="M23.9421 55.8506L23.6366 62.3337H36.6093L37.6545 49.3467L47.7672 49.3948L49.062 38.0913H43.9751C33.4386 38.0913 24.3152 44.6875 23.9408 55.8506H23.9421Z"
      />
    </g>
  );
}

export { Logo };

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";
import type { LoaderSize } from "./spinner";

// ─── Variants ─────────────────────────────────────────────────────────────────

const coinLoaderVariants = cva(
  "inline-block shrink-0 align-middle object-contain",
  {
    variants: {
      size: {
        sm: "size-10",
        md: "size-15",
        lg: "size-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ─── Default asset path ───────────────────────────────────────────────────────

/**
 * Default URL for the Felix brand coin animation (animated GIF).
 *
 * The asset ships with `@felix/ui` under `packages/ui/assets/coin-felix.gif`.
 * Consumers should copy the file into their app's `public/assets/` folder so
 * that the default absolute URL resolves at runtime:
 *
 * ```bash
 * cp node_modules/@felix/ui/assets/coin-felix.gif public/assets/coin-felix.gif
 * ```
 *
 * Alternatively, pass a custom `src` to point at any location.
 */
export const COIN_LOADER_DEFAULT_SRC = "/assets/coin-felix.gif";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface CoinLoaderProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof coinLoaderVariants> {
  /**
   * Pixel scale of the coin.
   * - `sm` — 40 px (`size-10`)
   * - `md` — 60 px (`size-15`) — default
   * - `lg` — 80 px (`size-20`)
   * @default "md"
   */
  size?: LoaderSize;
  /**
   * Accessible label read by screen readers. Rendered as a visually-hidden
   * `<span>` inside a `role="status"` live region.
   * @default "Loading"
   */
  label?: string;
  /**
   * Override URL for the coin GIF. Defaults to `/assets/coin-felix.gif`
   * (see {@link COIN_LOADER_DEFAULT_SRC} for asset-shipping instructions).
   */
  src?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

function CoinLoader({
  className,
  size,
  label = "Loading",
  src = COIN_LOADER_DEFAULT_SRC,
  ref,
  ...props
}: CoinLoaderProps & { ref?: React.Ref<HTMLSpanElement> }) {
  return (
    <span
      ref={ref}
      role="status"
      aria-live="polite"
      data-slot="coin-loader"
      data-size={size ?? "md"}
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <img
        src={src}
        alt=""
        aria-hidden="true"
        data-slot="coin-loader-image"
        loading="eager"
        decoding="async"
        draggable={false}
        className={cn(coinLoaderVariants({ size }))}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}

CoinLoader.displayName = "CoinLoader";

export { CoinLoader, coinLoaderVariants };

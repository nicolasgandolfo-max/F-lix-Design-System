import type React from "react";
import type { ColorToken } from "../types";

export function ColorCard({ token, hex, description }: ColorToken) {
  return (
    <div className="flex items-center gap-3.5 border border-border rounded-xl p-4 bg-background font-sans">
      <div
        className="size-12 rounded-full shrink-0 border border-foreground/10 bg-(--swatch-color)"
        style={{ "--swatch-color": hex } as React.CSSProperties}
      />
      <div>
        <div className="font-mono text-sm font-semibold text-foreground mb-0.5">
          {token}
        </div>
        <div className="text-xs text-slate-400 mb-1">{hex}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </div>
  );
}

export function ColorGrid({ tokens }: { tokens: ColorToken[] }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {tokens.map((t) => (
        <ColorCard key={t.token} {...t} />
      ))}
    </div>
  );
}

import React from "react";
import type { TokenRow, Column } from "./types";

// ─── Table styles ─────────────────────────────────────────────────────────────

const pill = (bg = "var(--stone)", color = "var(--slate)") =>
  ({
    display: "inline-flex",
    alignItems: "center",
    padding: "2px 10px",
    borderRadius: 6,
    background: bg,
    color,
    fontFamily: "monospace",
    fontSize: 13,
    whiteSpace: "nowrap" as const,
  }) as React.CSSProperties;

const th: React.CSSProperties = {
  textAlign: "left",
  padding: "10px 16px",
  fontWeight: 600,
  fontSize: 14,
  color: "var(--slate)",
  borderBottom: "1px solid var(--concrete)",
};

const td: React.CSSProperties = {
  padding: "14px 16px",
  fontSize: 14,
  color: "var(--slate)",
  borderBottom: "1px solid var(--stone)",
  verticalAlign: "middle",
};

// ─── TokenTable ───────────────────────────────────────────────────────────────

interface TokenTableProps {
  title?: string;
  rows: TokenRow[];
  columns?: Column[];
  previewLabel?: string;
}

const DEFAULT_COLUMNS: Column[] = [
  "token",
  "value",
  "preview",
  "usage",
  "tailwind",
];

export function TokenTable({
  title,
  rows,
  columns = DEFAULT_COLUMNS,
  previewLabel = "Preview",
}: TokenTableProps) {
  const show = (col: Column) => columns.includes(col);

  return (
    <div style={{ marginBottom: 48 }}>
      {title && (
        <h2
          style={{
            fontFamily: "sans-serif",
            fontSize: 18,
            fontWeight: 700,
            color: "var(--slate)",
            marginBottom: 12,
          }}
        >
          {title}
        </h2>
      )}
      <div
        style={{
          border: "1px solid var(--concrete)",
          borderRadius: 12,
          overflow: "hidden",
          background: "var(--linen)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "var(--stone)" }}>
            <tr>
              {show("token") && <th style={th}>Token</th>}
              {show("value") && <th style={th}>Value</th>}
              {show("preview") && <th style={th}>{previewLabel}</th>}
              {show("usage") && <th style={th}>Usage</th>}
              {show("tailwind") && <th style={th}>Tailwind</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.token}
                style={{
                  background: i % 2 === 0 ? "var(--linen)" : "var(--stone)",
                }}
              >
                {show("token") && (
                  <td style={td}>
                    <span style={pill()}>{row.token}</span>
                  </td>
                )}
                {show("value") && (
                  <td
                    style={{
                      ...td,
                      color: "var(--turquoise-700)",
                      fontFamily: "monospace",
                    }}
                  >
                    {row.value}
                  </td>
                )}
                {show("preview") && <td style={td}>{row.preview ?? null}</td>}
                {show("usage") && (
                  <td style={{ ...td, color: "var(--evergreen)" }}>
                    {row.usage}
                  </td>
                )}
                {show("tailwind") && (
                  <td style={td}>
                    {row.tailwind && <span style={pill()}>{row.tailwind}</span>}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Preview helpers ──────────────────────────────────────────────────────────

export function RadiusPreview({ className }: { className: string }) {
  return (
    <div
      className={className}
      style={{
        width: 40,
        height: 40,
        border: "2px solid var(--turquoise)",
        background: "color-mix(in srgb, var(--turquoise) 8%, transparent)",
      }}
    />
  );
}

export function ShadowPreview({ shadow }: { shadow: string }) {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 6,
        background: "var(--linen)",
        boxShadow: shadow,
        border: "1px solid var(--stone)",
      }}
    />
  );
}

export function ColorPreview({ color }: { color: string }) {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 8,
        background: color,
        border: "1px solid var(--concrete)",
      }}
    />
  );
}

export function TextPreview({
  size,
  text = "Aa",
}: {
  size: string;
  text?: string;
}) {
  return (
    <span
      style={{
        fontSize: size,
        fontFamily: "sans-serif",
        color: "var(--slate)",
      }}
    >
      {text}
    </span>
  );
}

export function SpacingPreview({ value }: { value: string }) {
  const isZero = value === "0px";
  return (
    <div style={{ display: "flex", alignItems: "center", height: 24, gap: 8 }}>
      <div
        style={{
          height: 16,
          width: isZero ? 2 : value,
          maxWidth: 160,
          background: "color-mix(in srgb, var(--turquoise) 30%, transparent)",
          border: "1px solid var(--turquoise)",
          borderRadius: 3,
          flexShrink: 0,
        }}
      />
    </div>
  );
}

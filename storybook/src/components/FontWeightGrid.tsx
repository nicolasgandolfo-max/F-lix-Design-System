import React from "react";
import type { FontWeightItem } from "../types";

export function FontWeightGrid({ items }: { items: FontWeightItem[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
        fontFamily: "sans-serif",
      }}
    >
      {items.map(({ token, value, weight, tailwind, usage }) => (
        <div
          key={token}
          style={{
            border: "1px solid #CFCABF",
            borderRadius: 12,
            padding: "16px 20px",
            background: "#FEFCF9",
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "#4f6f6e",
              fontFamily: "monospace",
              marginBottom: 2,
            }}
          >
            {token}
          </div>
          <div style={{ fontSize: 12, color: "#877867", marginBottom: 10 }}>
            {value}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: weight,
              color: "#082422",
              marginBottom: 6,
            }}
          >
            Felix Pago
          </div>
          <div style={{ fontSize: 12, color: "#698988", marginBottom: 10 }}>
            {usage}
          </div>
          <span
            style={{
              display: "inline-flex",
              padding: "2px 10px",
              borderRadius: 6,
              background: "#EFEBE7",
              fontFamily: "monospace",
              fontSize: 12,
              color: "#082422",
            }}
          >
            {tailwind}
          </span>
        </div>
      ))}
    </div>
  );
}

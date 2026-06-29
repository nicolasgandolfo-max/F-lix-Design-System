import React from "react";
import type { SemanticGroup } from "../types";

function Swatch({
  color,
  hex,
  scaleRef,
}: {
  color: string;
  hex: string;
  scaleRef?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: color,
          border: "1px solid rgba(8,36,34,0.12)",
          flexShrink: 0,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {scaleRef && (
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              color: "#082422",
              fontWeight: 500,
            }}
          >
            {scaleRef}
          </span>
        )}
        <span
          style={{ fontFamily: "monospace", fontSize: 11, color: "#877867" }}
        >
          {hex}
        </span>
      </div>
    </div>
  );
}

const th: React.CSSProperties = {
  textAlign: "left",
  padding: "10px 16px",
  fontWeight: 600,
  fontSize: 13,
  color: "#082422",
  borderBottom: "1px solid #CFCABF",
  background: "#F5F1ED",
};

const td: React.CSSProperties = {
  padding: "12px 16px",
  fontSize: 13,
  color: "#082422",
  borderBottom: "1px solid #EFEBE7",
  verticalAlign: "middle",
};

const tokenPill: React.CSSProperties = {
  display: "inline-flex",
  padding: "2px 10px",
  borderRadius: 6,
  background: "#EFEBE7",
  fontFamily: "monospace",
  fontSize: 12,
  color: "#082422",
  whiteSpace: "nowrap",
};

export function SemanticTokenTable({ groups }: { groups: SemanticGroup[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {groups.map((group) => (
        <div key={group.label}>
          <h3
            style={{
              fontFamily: "sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#082422",
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {group.label}
          </h3>
          <div
            style={{
              border: "1px solid #CFCABF",
              borderRadius: 12,
              overflow: "hidden",
              background: "#FEFCF9",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={th}>Token</th>
                  <th style={th}>Light</th>
                  <th style={th}>Dark</th>
                  <th style={th}>Usage</th>
                </tr>
              </thead>
              <tbody>
                {group.tokens.map((t, i) => (
                  <tr
                    key={t.token}
                    style={{ background: i % 2 === 0 ? "#FEFCF9" : "#FAF8F5" }}
                  >
                    <td style={td}>
                      <span style={tokenPill}>{t.token}</span>
                    </td>
                    <td style={td}>
                      <Swatch
                        color={t.light}
                        hex={t.light}
                        scaleRef={t.lightRef}
                      />
                    </td>
                    <td style={td}>
                      {t.dark ? (
                        <Swatch
                          color={t.dark}
                          hex={t.dark}
                          scaleRef={t.darkRef}
                        />
                      ) : (
                        <span style={{ color: "#CFCABF", fontSize: 12 }}>
                          —
                        </span>
                      )}
                    </td>
                    <td style={{ ...td, color: "#4f6f6e" }}>{t.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

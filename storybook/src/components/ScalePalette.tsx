interface ScaleStep {
  step: number;
  hex: string;
  alias?: string;
}

interface ScalePaletteProps {
  name: string;
  subtitle: string;
  steps: ScaleStep[];
}

function ScalePalette({ name, subtitle, steps }: ScalePaletteProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 24,
        padding: "16px 0",
        borderBottom: "1px solid #EFEBE7",
      }}
    >
      {/* Scale label */}
      <div style={{ width: 120, flexShrink: 0, paddingTop: 6 }}>
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: "#082422",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 12,
            color: "#877867",
            marginTop: 2,
          }}
        >
          {subtitle}
        </div>
      </div>

      {/* Swatches */}
      <div style={{ display: "flex", gap: 4, flex: 1 }}>
        {steps.map(({ step, hex, alias }) => (
          <div
            key={step}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
            }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "1",
                maxWidth: 64,
                borderRadius: 8,
                background: hex,
                border: "1px solid rgba(8,36,34,0.08)",
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "#877867",
                marginTop: 6,
                textAlign: "center",
              }}
            >
              {step}
            </span>
            {alias && (
              <span
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 10,
                  color: "#35605f",
                  fontWeight: 500,
                  marginTop: 2,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {alias}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface ScalePaletteListProps {
  palettes: ScalePaletteProps[];
}

export function ScalePaletteList({ palettes }: ScalePaletteListProps) {
  return (
    <div
      style={{
        border: "1px solid #CFCABF",
        borderRadius: 12,
        overflow: "hidden",
        background: "#FEFCF9",
        padding: "0 16px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: "12px 0",
          borderBottom: "2px solid #CFCABF",
        }}
      >
        <div
          style={{
            width: 120,
            flexShrink: 0,
            fontFamily: "sans-serif",
            fontSize: 11,
            fontWeight: 700,
            color: "#877867",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Scale
        </div>
        <div
          style={{
            display: "flex",
            gap: 4,
            flex: 1,
          }}
        >
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((step) => (
            <div
              key={step}
              style={{
                flex: 1,
                textAlign: "center",
                fontFamily: "monospace",
                fontSize: 11,
                fontWeight: 700,
                color: "#877867",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {step}
            </div>
          ))}
        </div>
      </div>

      {palettes.map((palette) => (
        <ScalePalette key={palette.name} {...palette} />
      ))}
    </div>
  );
}

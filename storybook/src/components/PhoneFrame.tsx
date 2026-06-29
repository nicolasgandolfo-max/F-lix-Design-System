import React, { useState, useEffect } from "react";

const PHONE_W = 390;
const PHONE_H = 844;

interface PhoneFrameProps {
  children: React.ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const available = window.innerHeight - 80;
      setScale(Math.min(1, available / PHONE_H));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      style={{
        width: Math.round(PHONE_W * scale),
        height: Math.round(PHONE_H * scale),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          flexShrink: 0,
        }}
      >
        <div className="relative w-[390px] h-[844px] rounded-[48px] overflow-hidden shadow-2xl border-8 border-[#1a1a1a] bg-w flex flex-col">
          {/* Status bar */}
          <div className="flex-none h-[44px] bg-(--slate) flex items-center justify-between px-6">
            <span className="text-[11px] font-semibold text-(--linen) tracking-wide">
              9:41
            </span>
            <div className="flex items-center gap-1.5">
              {/* Signal bars */}
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                className="text-(--linen)"
              >
                <rect
                  x="0"
                  y="4"
                  width="3"
                  height="8"
                  rx="0.5"
                  fill="currentColor"
                  opacity="0.4"
                />
                <rect
                  x="4.5"
                  y="2.5"
                  width="3"
                  height="9.5"
                  rx="0.5"
                  fill="currentColor"
                  opacity="0.6"
                />
                <rect
                  x="9"
                  y="1"
                  width="3"
                  height="11"
                  rx="0.5"
                  fill="currentColor"
                  opacity="0.8"
                />
                <rect
                  x="13.5"
                  y="0"
                  width="2.5"
                  height="12"
                  rx="0.5"
                  fill="currentColor"
                />
              </svg>
              {/* Wi-Fi */}
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                className="text-(--linen)"
              >
                <path
                  d="M8 2.5C10.2 2.5 12.2 3.4 13.6 4.9L15 3.4C13.2 1.6 10.7 0.5 8 0.5C5.3 0.5 2.8 1.6 1 3.4L2.4 4.9C3.8 3.4 5.8 2.5 8 2.5Z"
                  fill="currentColor"
                />
                <path
                  d="M8 5.5C9.4 5.5 10.6 6.1 11.5 7L12.9 5.5C11.6 4.2 9.9 3.5 8 3.5C6.1 3.5 4.4 4.2 3.1 5.5L4.5 7C5.4 6.1 6.6 5.5 8 5.5Z"
                  fill="currentColor"
                  opacity="0.75"
                />
                <circle cx="8" cy="10" r="1.5" fill="currentColor" />
              </svg>
              {/* Battery */}
              <div className="flex items-center gap-0.5">
                <div className="w-[22px] h-[11px] rounded-[3px] border border-(--linen)/60 p-px flex">
                  <div className="w-2/3 h-full rounded-sm bg-(--linen)" />
                </div>
              </div>
            </div>
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-y-auto bg-background">{children}</div>

          {/* Home indicator */}
          <div className="flex-none h-8 bg-background flex items-center justify-center">
            <div className="w-32 h-1 rounded-full bg-foreground/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

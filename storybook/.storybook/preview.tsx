import React from "react";
import type { Preview } from "@storybook/react";
import "../src/styles.css";
import { PhoneFrame } from "../src/components/PhoneFrame";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: "color-contrast",
            selector: '[data-a11y-ignore="color-contrast"]',
            enabled: false,
          },
        ],
      },
      options: {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21aa"],
        },
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "rgb(255, 255, 250)" },
        { name: "dark", value: "rgb(25, 25, 26)" },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
    frame: {
      description: "Preview viewport",
      defaultValue: "desktop",
      toolbar: {
        title: "View",
        icon: "mobile",
        items: [
          { value: "mobile", title: "Mobile", icon: "mobile" },
          { value: "desktop", title: "Desktop", icon: "browser" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals["theme"] as string;
      document.documentElement.classList.toggle("dark", theme === "dark");
      return <Story />;
    },
    (Story, context) => {
      const frame = context.globals["frame"] as string;
      const isDesignToken = context.title?.startsWith("Design Tokens/");
      const mobileFrame = context.parameters["mobileFrame"] !== false;
      const phonePadding = context.parameters["phonePadding"] !== false;

      if (
        frame !== "mobile" ||
        isDesignToken ||
        !mobileFrame ||
        context.viewMode === "docs"
      ) {
        return <Story />;
      }

      return (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--stone)",
          }}
        >
          <PhoneFrame>
            {phonePadding ? (
              <div style={{ padding: "1.5rem" }}>
                <Story />
              </div>
            ) : (
              <Story />
            )}
          </PhoneFrame>
        </div>
      );
    },
  ],
};

export default preview;

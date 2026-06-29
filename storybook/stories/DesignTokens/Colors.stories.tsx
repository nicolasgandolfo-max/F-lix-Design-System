import type { Meta, StoryObj } from "@storybook/react";
import { ScalePaletteList } from "../../src/components/ScalePalette";
import { SemanticTokenTable } from "../../src/components/SemanticTokenTable";
import {
  COLOR_PALETTES,
  SEMANTIC_GROUPS,
  INTERACTIVE_GROUPS,
  STATUS_GROUPS,
} from "../../src/tokens/colors";

const meta = {
  title: "Design Tokens/Colors",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { disable: true },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const ColorPrimitives: Story = {
  name: "Color Primitives",
  render: () => <ScalePaletteList palettes={COLOR_PALETTES} />,
};

export const SemanticTokens: Story = {
  name: "Semantic Tokens",
  render: () => <SemanticTokenTable groups={SEMANTIC_GROUPS} />,
};

export const InteractiveStates: Story = {
  name: "Interactive States",
  render: () => <SemanticTokenTable groups={INTERACTIVE_GROUPS} />,
};

export const Status: Story = {
  name: "Status",
  render: () => <SemanticTokenTable groups={STATUS_GROUPS} />,
};

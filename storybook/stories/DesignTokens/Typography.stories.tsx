import type { Meta, StoryObj } from "@storybook/react";
import { TokenTable } from "../../src/TokenTable";
import { FontWeightGrid } from "../../src/components/FontWeightGrid";
import {
  TEXT_SIZE_ROWS,
  LINE_HEIGHT_ROWS,
  LETTER_SPACING_ROWS,
  FONT_WEIGHT_ITEMS,
} from "../../src/tokens/typography";

const meta = {
  title: "Design Tokens/Typography",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { disable: true },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const TextSizes: Story = {
  name: "Text Sizes",
  render: () => <TokenTable rows={TEXT_SIZE_ROWS} />,
};

export const LineHeight: Story = {
  name: "Line Height",
  render: () => (
    <TokenTable
      columns={["token", "value", "usage", "tailwind"]}
      rows={LINE_HEIGHT_ROWS}
    />
  ),
};

export const LetterSpacing: Story = {
  name: "Letter Spacing",
  render: () => <TokenTable rows={LETTER_SPACING_ROWS} />,
};

export const FontWeights: Story = {
  name: "Font Weights",
  render: () => <FontWeightGrid items={FONT_WEIGHT_ITEMS} />,
};

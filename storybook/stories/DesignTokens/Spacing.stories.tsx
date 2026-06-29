import type { Meta, StoryObj } from "@storybook/react";
import { TokenTable } from "../../src/TokenTable";
import { SPACING_ROWS } from "../../src/tokens/spacing";

const meta = {
  title: "Design Tokens/Spacing",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { disable: true },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Spacing: Story = {
  name: "Spacing",
  render: () => (
    <TokenTable
      previewLabel="Visual"
      rows={SPACING_ROWS}
      columns={["token", "value", "preview", "tailwind"]}
    />
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { TokenTable } from "../../src/TokenTable";
import { SHADOW_ROWS } from "../../src/tokens/shadows";

const meta = {
  title: "Design Tokens/Shadows",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { disable: true },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Shadows: Story = {
  name: "Shadows",
  render: () => (
    <TokenTable
      columns={["token", "value", "preview", "tailwind"]}
      rows={SHADOW_ROWS}
    />
  ),
};

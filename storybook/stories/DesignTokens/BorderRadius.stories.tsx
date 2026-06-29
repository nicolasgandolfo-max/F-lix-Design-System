import type { Meta, StoryObj } from "@storybook/react";
import { TokenTable } from "../../src/TokenTable";
import { BORDER_RADIUS_ROWS } from "../../src/tokens/border-radius";

const meta = {
  title: "Design Tokens/Border Radius",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { disable: true },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const BorderRadius: Story = {
  name: "Border Radius",
  render: () => (
    <TokenTable
      rows={BORDER_RADIUS_ROWS}
      columns={["token", "value", "preview", "tailwind"]}
    />
  ),
};

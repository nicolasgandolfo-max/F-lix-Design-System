import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  IconButton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@felix/ui";
import {
  CalendarBlankIcon,
  ChartBarIcon,
  GearSixIcon,
  LightningIcon,
  PlusIcon,
} from "@phosphor-icons/react";

/**
 * **Tabs** — A segmented control that swaps between sibling content panels,
 * built on `@radix-ui/react-tabs`. Implements Figma node `1035:8545` (Tab).
 *
 * Compound API:
 *
 * - `Tabs` — root; controls (un)controlled `value` and orientation
 * - `TabsList` — the rounded `bg-card` pill that holds the triggers
 * - `TabsTrigger` — one tab; supports `iconLeft` / `iconRight` and `disabled`
 * - `TabsContent` — the panel for a given `value`
 *
 * States per Figma:
 *
 * - **Default** — `text-secondary`
 * - **Active** — `bg-background` + `shadow-sm` + `text-foreground`
 * - **Disabled** — `text-(--neutral-300)`
 *
 * Fully keyboard-accessible: ArrowLeft / ArrowRight to move focus, Home / End
 * to jump, Enter / Space to activate, and disabled triggers are skipped.
 */
const meta = {
  title: "Components/Molecules/Tabs",
  component: Tabs,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      description:
        "Uncontrolled initial active value. Use `value` + `onValueChange` for controlled mode.",
      control: "text",
    },
    value: {
      description: "Controlled active value.",
      control: "text",
    },
    orientation: {
      description:
        "Layout direction. Defaults to `horizontal`; `vertical` is supported by Radix and renders the list as a column.",
      control: { type: "inline-radio" },
      options: ["horizontal", "vertical"],
      table: { defaultValue: { summary: "horizontal" } },
    },
    className: {
      description: "Merged with internal styles via `cn()`.",
      control: "text",
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

/**
 * Three tabs with simple text labels — the visual baseline that mirrors the
 * Figma `Tabs/Default` symbol.
 */
export const Default: Story = {
  args: { defaultValue: "overview" },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
};

// ─── With Icons ───────────────────────────────────────────────────────────────

/**
 * Each trigger accepts `iconLeft` and `iconRight` ReactNode slots. Unsized
 * SVGs are auto-sized to 14 px to match Figma.
 */
export const WithIcons: Story = {
  args: { defaultValue: "overview" },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="overview" iconLeft={<ChartBarIcon />}>
          Overview
        </TabsTrigger>
        <TabsTrigger value="activity" iconLeft={<LightningIcon />}>
          Activity
        </TabsTrigger>
        <TabsTrigger value="settings" iconLeft={<GearSixIcon />}>
          Settings
        </TabsTrigger>
      </TabsList>
    </Tabs>
  ),
};

// ─── With Content ─────────────────────────────────────────────────────────────

/**
 * Pair each `TabsTrigger` with a matching `TabsContent` (same `value`) to get
 * a full segmented-control with swappable panels.
 */
export const WithContent: Story = {
  args: { defaultValue: "overview" },
  render: (args) => (
    <Tabs {...args} className="w-[420px]">
      <TabsList>
        <TabsTrigger value="overview" iconLeft={<ChartBarIcon />}>
          Overview
        </TabsTrigger>
        <TabsTrigger value="activity" iconLeft={<LightningIcon />}>
          Activity
        </TabsTrigger>
        <TabsTrigger value="settings" iconLeft={<GearSixIcon />}>
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="overview"
        className="rounded-md border border-border p-4 text-sm leading-normal text-foreground"
      >
        High-level summary of recent activity, balances, and trends.
      </TabsContent>
      <TabsContent
        value="activity"
        className="rounded-md border border-border p-4 text-sm leading-normal text-foreground"
      >
        Most recent transactions and changes appear here.
      </TabsContent>
      <TabsContent
        value="settings"
        className="rounded-md border border-border p-4 text-sm leading-normal text-foreground"
      >
        Configure notification, privacy, and display preferences.
      </TabsContent>
    </Tabs>
  ),
};

// ─── Disabled tab ─────────────────────────────────────────────────────────────

/**
 * A disabled trigger uses the muted `--neutral-300` colour, takes no clicks,
 * and is skipped by keyboard navigation.
 */
export const WithDisabledTab: Story = {
  args: { defaultValue: "overview" },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="overview" iconLeft={<ChartBarIcon />}>
          Overview
        </TabsTrigger>
        <TabsTrigger value="activity" iconLeft={<LightningIcon />} disabled>
          Activity
        </TabsTrigger>
        <TabsTrigger value="settings" iconLeft={<GearSixIcon />}>
          Settings
        </TabsTrigger>
      </TabsList>
    </Tabs>
  ),
};

// ─── Controlled ───────────────────────────────────────────────────────────────

/**
 * Controlled mode — wire `value` + `onValueChange` to drive the selection
 * from external state.
 */
export const Controlled: Story = {
  render: () => {
    function ControlledTabs() {
      const [value, setValue] = React.useState("overview");
      return (
        <div className="flex flex-col items-start gap-3">
          <p className="text-xs leading-tight tracking-caption text-secondary">
            Active value: <span className="font-medium text-foreground">{value}</span>
          </p>
          <Tabs value={value} onValueChange={setValue}>
            <TabsList>
              <TabsTrigger value="overview" iconLeft={<ChartBarIcon />}>
                Overview
              </TabsTrigger>
              <TabsTrigger value="activity" iconLeft={<LightningIcon />}>
                Activity
              </TabsTrigger>
              <TabsTrigger value="settings" iconLeft={<GearSixIcon />}>
                Settings
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      );
    }
    return <ControlledTabs />;
  },
};

// ─── Trailing slot ────────────────────────────────────────────────────────────

/**
 * `TabsList` accepts arbitrary trailing children — drop in an `IconButton`
 * (or any other affordance) after the last `TabsTrigger` for an "Add tab"
 * pattern. Mirrors the placeholder slot in the Figma `Tabs/Default` symbol.
 */
export const WithTrailingSlot: Story = {
  render: () => {
    function WithAddTab() {
      const [tabs, setTabs] = React.useState([
        { id: "tab-1", label: "Tab 1" },
        { id: "tab-2", label: "Tab 2" },
      ]);
      const [active, setActive] = React.useState("tab-1");

      const addTab = () => {
        const id = `tab-${tabs.length + 1}`;
        setTabs((prev) => [...prev, { id, label: `Tab ${prev.length + 1}` }]);
        setActive(id);
      };

      return (
        <Tabs value={active} onValueChange={setActive}>
          <TabsList>
            {tabs.map((t) => (
              <TabsTrigger key={t.id} value={t.id} iconLeft={<CalendarBlankIcon />}>
                {t.label}
              </TabsTrigger>
            ))}
            <IconButton
              size="sm"
              variant="ghost"
              aria-label="Add tab"
              icon={<PlusIcon />}
              onClick={addTab}
            />
          </TabsList>
        </Tabs>
      );
    }
    return <WithAddTab />;
  },
};

// ─── Dark mode ────────────────────────────────────────────────────────────────

/**
 * Dark mode — toggle the theme in the Storybook toolbar. The active tab still
 * lifts via `bg-background` + `shadow-sm`, against the darker `bg-card`
 * container.
 */
export const DarkMode: Story = {
  parameters: { backgrounds: { default: "dark" } },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="rounded-xl bg-background p-8">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview" iconLeft={<ChartBarIcon />}>
            Overview
          </TabsTrigger>
          <TabsTrigger value="activity" iconLeft={<LightningIcon />}>
            Activity
          </TabsTrigger>
          <TabsTrigger value="settings" iconLeft={<GearSixIcon />} disabled>
            Settings
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  ),
};

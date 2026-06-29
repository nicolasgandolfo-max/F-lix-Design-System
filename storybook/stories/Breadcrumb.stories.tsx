import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@felix/ui";
import { HouseIcon } from "@phosphor-icons/react";

/**
 * **Breadcrumb** — a hierarchical trail showing the user's location in the
 * app. Built on plain semantic markup (`<nav>` + `<ol>` + `<li>` + `<a>`),
 * adapted to the Felix Figma spec (Breadcrumb showcase, node `1044:9463`).
 *
 * **Composition**
 *
 * - `Breadcrumb` — `<nav aria-label="breadcrumb">` root.
 * - `BreadcrumbList` — `<ol>` with the 4 px gap and 4/6 px padding from
 *   Figma node `880:1133`.
 * - `BreadcrumbItem` — `<li>` wrapper for each segment.
 * - `BreadcrumbLink` — navigable predecessor segment. `text-secondary` by
 *   default, `text-foreground` on hover. Pass `asChild` to wrap a router
 *   `<Link>`.
 * - `BreadcrumbPage` — the current page; `aria-current="page"`,
 *   `text-foreground` + semibold. Renders as `<span role="link"
 *   aria-disabled="true">` so it stays in the trail without being focusable.
 * - `BreadcrumbSeparator` — defaults to a 12 px `CaretRight`. Override the
 *   children for a slash, a dot, or any custom glyph.
 * - `BreadcrumbEllipsis` — the muted-pill truncation indicator from the
 *   Figma "Ellipsis" state.
 */
const meta = {
  title: "Components/Molecules/Breadcrumb",
  component: Breadcrumb,
  subcomponents: {
    BreadcrumbList: BreadcrumbList as React.ComponentType<unknown>,
    BreadcrumbItem: BreadcrumbItem as React.ComponentType<unknown>,
    BreadcrumbLink: BreadcrumbLink as React.ComponentType<unknown>,
    BreadcrumbPage: BreadcrumbPage as React.ComponentType<unknown>,
    BreadcrumbSeparator: BreadcrumbSeparator as React.ComponentType<unknown>,
    BreadcrumbEllipsis: BreadcrumbEllipsis as React.ComponentType<unknown>,
  },
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    className: {
      description: "Merged with internal styles via `cn()`.",
      control: "text",
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/library">Library</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/library/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

// ─── WithLeadingIcon ─────────────────────────────────────────────────────────

/**
 * The Figma "Breadcrumb" symbol leads with a 16 px `House` icon — drop it
 * inside the first `BreadcrumbLink` to reproduce the exact look from
 * node `880:1133`.
 */
export const WithLeadingIcon: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className="inline-flex items-center gap-1 [&_svg]:size-4"
            aria-label="Home"
          >
            <HouseIcon weight="regular" aria-hidden="true" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/library">Library</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Components</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

// ─── WithEllipsis ────────────────────────────────────────────────────────────

/**
 * Use `BreadcrumbEllipsis` to truncate a long trail. The pill is purely
 * decorative — pair it with a `BreadcrumbLink` (or trigger a dropdown like
 * the next story) when consumers should be able to expand the hidden
 * segments.
 */
export const WithEllipsis: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/library/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

// ─── LocalizedEllipsis ───────────────────────────────────────────────────────

/**
 * The `BreadcrumbEllipsis` indicator hides its label from sighted users
 * (it's `sr-only`) but assistive tech still reads it. The default is the
 * Spanish "Más" — pass `srLabel` to translate it for any other locale.
 */
export const LocalizedEllipsis: Story = {
  render: () => (
    <Breadcrumb aria-label="breadcrumb">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis srLabel="More" />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/library/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

// ─── WithDropdown ────────────────────────────────────────────────────────────

/**
 * Compose `BreadcrumbEllipsis` (or any custom trigger) with the existing
 * `DropdownMenu` to expose the collapsed segments on demand.
 */
export const WithDropdown: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Show more breadcrumbs"
              className="inline-flex"
            >
              <BreadcrumbEllipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Library</DropdownMenuItem>
              <DropdownMenuItem>Components</DropdownMenuItem>
              <DropdownMenuItem>Atomic</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

// ─── CustomSeparator ─────────────────────────────────────────────────────────

export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/library">Library</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Components</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

// ─── DarkMode ────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div className="dark rounded-md bg-background p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
};

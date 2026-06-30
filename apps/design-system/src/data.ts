import {
  SquaresFourIcon,
  StarIcon,
  PaletteIcon,
  TextAaIcon,
  ImageIcon,
  ShapesIcon,
  CubeIcon,
  PencilSimpleIcon,
  MarkdownLogoIcon,
  type Icon,
} from "@phosphor-icons/react";

export interface NavItem {
  id: string;
  path: string;
  /** Match the route exactly (only the index route "/" needs this). */
  end?: boolean;
  icon: Icon;
  es: string;
  en: string;
}
export interface NavGroup {
  group: { es: string; en: string };
  items: NavItem[];
}

export const NAV: NavGroup[] = [
  {
    group: { es: "Fundamentos", en: "Foundations" },
    items: [
      { id: "overview", path: "/", end: true, icon: SquaresFourIcon, es: "Visión general", en: "Overview" },
      { id: "principles", path: "/principios", icon: StarIcon, es: "Principios", en: "Principles" },
      { id: "colors", path: "/colores", icon: PaletteIcon, es: "Colores", en: "Colors" },
      { id: "typography", path: "/tipografia", icon: TextAaIcon, es: "Tipografía", en: "Typography" },
      { id: "illustrations", path: "/ilustraciones", icon: ImageIcon, es: "Ilustraciones", en: "Illustrations" },
      { id: "iconography", path: "/iconografia", icon: ShapesIcon, es: "Iconografía", en: "Iconography" },
    ],
  },
  {
    group: { es: "Construcción", en: "Build" },
    items: [
      { id: "tokens", path: "/tokens", icon: CubeIcon, es: "Design Tokens", en: "Design Tokens" },
      { id: "editorial", path: "/editorial", icon: PencilSimpleIcon, es: "Guía editorial", en: "Editorial" },
      { id: "design-md", path: "/design-md", icon: MarkdownLogoIcon, es: "DESIGN.md", en: "DESIGN.md" },
    ],
  },
];

export interface Swatch {
  name: string;
  hex: string;
  light?: boolean;
}
export const BRAND_COLORS: Swatch[] = [
  { name: "Turquoise", hex: "#2bf2f1" },
  { name: "Slate", hex: "#082422" },
  { name: "Linen", hex: "#fefcf9", light: true },
  { name: "Lime", hex: "#dcff00" },
  { name: "Stone", hex: "#efebe7", light: true },
  { name: "Concrete", hex: "#cfcabf" },
  { name: "FG muted", hex: "#636158" },
  { name: "Light sky", hex: "#d4fffe", light: true },
];
export const STATUS_COLORS: Swatch[] = [
  { name: "Success", hex: "#60d06f" },
  { name: "Warning", hex: "#ffd200" },
  { name: "Error", hex: "#f26629" },
  { name: "Info", hex: "#3b2e8c" },
];

export const COLOR_TOKENS: { v: string; hex: string; es: string; en: string }[] = [
  { v: "--primary", hex: "#2bf2f1", es: "CTAs, foco, marca", en: "CTAs, focus, brand" },
  { v: "--foreground", hex: "#082422", es: "Texto, superficies oscuras", en: "Text, dark surfaces" },
  { v: "--background", hex: "#fefcf9", es: "Lienzo cálido", en: "Warm canvas" },
  { v: "--muted", hex: "#efebe7", es: "Hover, fills secundarios", en: "Hover, secondary fills" },
  { v: "--status-success", hex: "#60d06f", es: "Completado, recibido", en: "Completed, received" },
  { v: "--status-warning", hex: "#ffd200", es: "Pendiente, en camino", en: "Pending, on its way" },
  { v: "--status-error", hex: "#f26629", es: "Bloqueante, destructivo", en: "Blocking, destructive" },
  { v: "--interactive-primary-hover", hex: "#1abfbe", es: "Hover de primario", en: "Primary hover" },
];

export const RADIUS_TOKENS: { t: string; v: string; es: string; en: string }[] = [
  { t: "--radius-xs", v: "2px", es: "—", en: "—" },
  { t: "--radius-md", v: "8px", es: "Inputs, cards chicas", en: "Inputs, small cards" },
  { t: "--radius-xl", v: "16px", es: "Cards estándar", en: "Standard cards" },
  { t: "--radius-2xl", v: "24px", es: "Hero cards, sheets", en: "Hero cards, sheets" },
  { t: "--radius-3xl", v: "32px", es: "Overlays grandes", en: "Large overlays" },
  { t: "--radius-full", v: "9999px", es: "Botones, badges, chips", en: "Buttons, badges, chips" },
];

export const SPACE_TOKENS: { t: string; v: string; rem: string }[] = [
  { t: "--spacing-1", v: "4px", rem: "0.25" },
  { t: "--spacing-2", v: "8px", rem: "0.5" },
  { t: "--spacing-3", v: "12px", rem: "0.75" },
  { t: "--spacing-4", v: "16px", rem: "1" },
  { t: "--spacing-6", v: "24px", rem: "1.5" },
  { t: "--spacing-8", v: "32px", rem: "2" },
  { t: "--spacing-12", v: "48px", rem: "3" },
  { t: "--spacing-16", v: "64px", rem: "4" },
];

export const SHADOW_TOKENS: { t: string; es: string; en: string }[] = [
  { t: "--shadow-sm", es: "Chips, tabs activas", en: "Chips, active tabs" },
  { t: "--shadow-md", es: "Card elevada", en: "Elevated card" },
  { t: "--shadow-lg", es: "Dropdowns, popovers", en: "Dropdowns, popovers" },
  { t: "--shadow-xl", es: "Diálogos", en: "Dialogs" },
  { t: "--shadow-turquoise", es: "Glow de botón primario", en: "Primary button glow" },
  { t: "--shadow-selection", es: "Foco turquesa (6px)", en: "Turquoise focus (6px)" },
];

export const INVENTORY: { group: string; items: string[] }[] = [
  {
    group: "Atoms",
    items: [
      "Avatar", "Badge", "Button", "Checkbox", "CoinLoader", "Dots", "IconButton",
      "Input", "Label", "Logo", "Progress", "RadioGroup", "Separator", "Skeleton",
      "Slider", "Spinner", "Switch", "Text", "Textarea",
    ],
  },
  {
    group: "Molecules",
    items: [
      "Accordion", "Alert", "Breadcrumb", "Calendar", "Card", "ChoiceCard", "Collapse",
      "DatePicker", "Dialog", "Drawer", "DropdownMenu", "HoverCard", "NavigationMenu",
      "Pagination", "Popover", "Select", "Sheet", "SidebarFooter", "Stepper", "Table",
      "Tabs", "Toast", "Tooltip",
    ],
  },
  { group: "Organisms", items: ["Sidebar"] },
];

/** URL-safe slug for a component name, e.g. "RadioGroup" → "radiogroup". */
export const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

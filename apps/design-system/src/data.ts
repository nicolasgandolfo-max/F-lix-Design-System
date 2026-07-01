import {
  SquaresFourIcon,
  StarIcon,
  PaletteIcon,
  TextAaIcon,
  ImageIcon,
  CubeIcon,
  PencilSimpleIcon,
  MarkdownLogoIcon,
  AtomIcon,
  CirclesThreeIcon,
  TreeStructureIcon,
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

/** Anchors within the /ilustraciones page, shown as a nested nav list under "Ilustraciones". */
export const ILLUSTRATION_SECTIONS: { id: string; es: string; en: string }[] = [
  { id: "felix-illustrations", es: "Ilustraciones de Felix", en: "Felix illustrations" },
  { id: "flags", es: "Banderas", en: "Flags" },
  { id: "phosphor", es: "Iconografía Phosphor", en: "Phosphor icons" },
  { id: "extra-icons", es: "Íconos extras", en: "Extra icons" },
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

export interface TypeStyle {
  token: string;
  category: "Display" | "Headings" | "Body" | "Caption";
  family: "Plain" | "Saans";
  weight: number;
  size: number;
  lineHeight: number;
  letterSpacing: string;
  es: string;
  en: string;
}

/** Every text style token from the Figma type scale, largest to smallest within its category. */
export const TYPE_SCALE: TypeStyle[] = [
  { token: "text-display-xl", category: "Display", family: "Plain", weight: 700, size: 56, lineHeight: 1.2, letterSpacing: "-2px", es: "$1,200.00", en: "$1,200.00" },
  { token: "text-display-lg", category: "Display", family: "Plain", weight: 700, size: 48, lineHeight: 1.2, letterSpacing: "-2px", es: "Enviaste con éxito", en: "Sent successfully" },
  { token: "text-display-md", category: "Display", family: "Plain", weight: 700, size: 28, lineHeight: 1.1, letterSpacing: "-1px", es: "Envío confirmado", en: "Transfer confirmed" },
  { token: "text-heading-1", category: "Headings", family: "Saans", weight: 600, size: 36, lineHeight: 1.2, letterSpacing: "-1px", es: "Tu dinero está en camino", en: "Your money is on its way" },
  { token: "text-heading-2", category: "Headings", family: "Saans", weight: 600, size: 30, lineHeight: 1.2, letterSpacing: "0px", es: "Historial de envíos", en: "Transfer history" },
  { token: "text-heading-3", category: "Headings", family: "Plain", weight: 700, size: 24, lineHeight: 1.3, letterSpacing: "0px", es: "Título de pantalla", en: "Screen title" },
  { token: "text-heading-4", category: "Headings", family: "Plain", weight: 700, size: 20, lineHeight: 1.5, letterSpacing: "0px", es: "Subtítulo de sección", en: "Section subtitle" },
  { token: "text-body-lg", category: "Body", family: "Saans", weight: 400, size: 18, lineHeight: 1.3, letterSpacing: "0px", es: "Texto de cuerpo grande para introducciones.", en: "Large body text for introductions." },
  { token: "text-body", category: "Body", family: "Saans", weight: 400, size: 16, lineHeight: 1.2, letterSpacing: "0px", es: "Texto de cuerpo para instrucciones y descripciones claras.", en: "Body text for clear instructions and descriptions." },
  { token: "text-body-sm", category: "Body", family: "Saans", weight: 400, size: 14, lineHeight: 1.5, letterSpacing: "0px", es: "Texto de cuerpo pequeño para detalles secundarios.", en: "Small body text for secondary details." },
  { token: "text-caption", category: "Caption", family: "Saans", weight: 400, size: 12, lineHeight: 1.2, letterSpacing: "0.25px", es: "RECIBIDO · HACE 2 MIN", en: "RECEIVED · 2 MIN AGO" },
  { token: "text-caption-sm", category: "Caption", family: "Saans", weight: 400, size: 11, lineHeight: 1.1, letterSpacing: "0px", es: "TÉRMINOS Y CONDICIONES", en: "TERMS & CONDITIONS" },
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

/** URL slug for each component group, used to build a single page per group. */
export const GROUP_SLUGS: Record<string, string> = {
  Atoms: "atoms",
  Molecules: "molecules",
  Organisms: "organisms",
};

export const GROUP_LABELS: Record<string, { es: string; en: string }> = {
  Atoms: { es: "Átomos", en: "Atoms" },
  Molecules: { es: "Moléculas", en: "Molecules" },
  Organisms: { es: "Organismos", en: "Organisms" },
};

/** Icon shown next to each component group's own nav row (Atoms, Molecules, Organisms). */
export const GROUP_ICONS: Record<string, Icon> = {
  Atoms: AtomIcon,
  Molecules: CirclesThreeIcon,
  Organisms: TreeStructureIcon,
};

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

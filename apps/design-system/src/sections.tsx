import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@felix/ui";
import {
  StarIcon,
  PaletteIcon,
  TextAaIcon,
  PuzzlePieceIcon,
  CubeIcon,
  PencilSimpleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowSquareOutIcon,
  PaperPlaneTiltIcon,
  HeartIcon,
  ShieldCheckIcon,
  GlobeIcon,
  ClockIcon,
  UserIcon,
  BellIcon,
  CreditCardIcon,
  WalletIcon,
  HouseIcon,
  CurrencyDollarIcon,
  ChatCircleTextIcon,
  BankIcon,
  ReceiptIcon,
  CheckIcon,
  DownloadSimpleIcon,
  CopyIcon,
  // Money & finance
  CoinIcon,
  CoinsIcon,
  PiggyBankIcon,
  HandCoinsIcon,
  ChartLineUpIcon,
  PercentIcon,
  InvoiceIcon,
  VaultIcon,
  // Communication
  EnvelopeIcon,
  PhoneIcon,
  ChatsCircleIcon,
  VideoCameraIcon,
  MegaphoneIcon,
  // People & account
  UsersIcon,
  UserCircleIcon,
  IdentificationCardIcon,
  UserPlusIcon,
  FingerprintIcon,
  LockIcon,
  // Navigation & actions
  CaretDownIcon,
  MagnifyingGlassIcon,
  GearIcon,
  ListIcon,
  DotsThreeIcon,
  PlusIcon,
  XIcon,
  TrashIcon,
  UploadSimpleIcon,
  ShareNetworkIcon,
  // Status & feedback
  CheckCircleIcon,
  XCircleIcon,
  WarningIcon,
  InfoIcon,
  HourglassIcon,
  ThumbsUpIcon,
  SmileyIcon,
  // Places & world
  MapPinIcon,
  AirplaneIcon,
  CalendarIcon,
  FlagIcon,
  CompassIcon,
  type Icon,
} from "@phosphor-icons/react";
import designMd from "../../../DESIGN.md?raw";
import { useTr } from "./i18n";
import {
  BRAND_COLORS,
  STATUS_COLORS,
  COLOR_TOKENS,
  RADIUS_TOKENS,
  SPACE_TOKENS,
  SHADOW_TOKENS,
  TYPE_SCALE,
  type Swatch,
} from "./data";
import { ILLUSTRATIONS, ILLUSTRATION_COUNT } from "./illustrations";
import { FLAGS } from "./flags";
import { EXTRA_ICONS } from "./icons-extra";

/* ─────────────────────────── Hero / Overview ─────────────────────────── */
export function Hero() {
  const tr = useTr();
  return (
    <header className="hero sec" id="overview">
      <span className="kicker">
        {tr("Felix Pago · Identidad de producto", "Felix Pago · Product identity")}
      </span>
      <h1>
        {tr("Las remesas no son transacciones. Son ", "Remittances aren't transactions. They're ")}
        <em>{tr("actos de presencia", "acts of presence")}</em>.
      </h1>
      <p className="desc">
        {tr(
          "El sistema de diseño de Felix: cálido, eléctrico y radicalmente transparente. Un compañero financiero para la comunidad latina en Estados Unidos — no un banco.",
          "Felix's design system: warm, electric, and radically transparent. A financial compañero for the Latin American community in the US — not a bank.",
        )}
      </p>
      <div className="cluster">
        <Button variant="primary" asChild>
          <Link to="/componentes">{tr("Ver componentes", "Explore components")}</Link>
        </Button>
        <Button variant="line" asChild>
          <Link to="/tokens">{tr("Design tokens", "Design tokens")}</Link>
        </Button>
      </div>
      <div className="meta">
        <div>
          <span className="k">{tr("Versión", "Version")}</span>
          <span className="v">1.0.0 · alpha</span>
        </div>
        <div>
          <span className="k">{tr("Componentes", "Components")}</span>
          <span className="v">43</span>
        </div>
        <div>
          <span className="k">{tr("Idioma", "Language")}</span>
          <span className="v">ES · EN · PT</span>
        </div>
        <div>
          <span className="k">Stack</span>
          <span className="v">React 19 · Tailwind v4</span>
        </div>
      </div>
    </header>
  );
}

/* ──────────────────────────── Start grid ─────────────────────────────── */
function Tile({ icon: I, to, title, desc, go }: { icon: Icon; to: string; title: string; desc: string; go: string }) {
  return (
    <Link className="tile" to={to}>
      <span className="ic">
        <I />
      </span>
      <b>{title}</b>
      <span className="d">{desc}</span>
      <span className="go">{go} →</span>
    </Link>
  );
}
export function StartGrid() {
  const tr = useTr();
  return (
    <section className="sec flush">
      <div className="eyebrow">
        <span>{tr("Por dónde empezar", "Where to start")}</span>
      </div>
      <div className="grid">
        <Tile icon={StarIcon} to="/principios" title={tr("Principios", "Principles")} desc={tr("Las cuatro ideas que guían cada decisión de diseño.", "The four ideas that guide every design decision.")} go={tr("Leer", "Read")} />
        <Tile icon={PaletteIcon} to="/colores" title={tr("Colores", "Colors")} desc={tr("Turquesa, slate y una base neutra cálida. Paleta pequeña a propósito.", "Turquoise, slate, and a warm neutral base. A deliberately small palette.")} go={tr("Ver paleta", "View palette")} />
        <Tile icon={TextAaIcon} to="/tipografia" title={tr("Tipografía", "Typography")} desc={tr("Plain para los momentos de impacto, Saans para todo lo demás.", "Plain for moments of impact, Saans for everything else.")} go={tr("Ver escala", "View scale")} />
        <Tile icon={PuzzlePieceIcon} to="/componentes" title={tr("Componentes", "Components")} desc={tr("43 piezas en React, construidas sobre Radix y accesibles por defecto.", "43 React pieces, built on Radix and accessible by default.")} go={tr("Explorar", "Explore")} />
        <Tile icon={CubeIcon} to="/tokens" title="Tokens" desc={tr("Variables CSS y Tailwind. Una sola fuente de verdad para light y dark.", "CSS & Tailwind variables. One source of truth for light and dark.")} go={tr("Ver tokens", "View tokens")} />
        <Tile icon={PencilSimpleIcon} to="/editorial" title={tr("Voz y copy", "Voice & copy")} desc={tr("Español primero, tú siempre. Claro, cálido, sin jerga.", "Spanish-first, informal tú always. Clear, warm, jargon-free.")} go={tr("Leer guía", "Read guide")} />
      </div>
    </section>
  );
}

/* ───────────────────────────── Overview page ─────────────────────────── */
export function Overview() {
  return (
    <>
      <Hero />
      <StartGrid />
    </>
  );
}

/* ──────────────────────────── Principles ─────────────────────────────── */
export function Principles() {
  const tr = useTr();
  const items = [
    { n: "01", t: tr("Cálido, no corporativo", "Warm, not corporate"), d: tr("Lienzo blanco cálido, esquinas redondeadas, turquesa vivo. El producto se siente como un compañero, no como una sucursal.", "A warm white canvas, rounded corners, living turquoise. The product feels like a compañero, not a bank branch.") },
    { n: "02", t: tr("Radicalmente transparente", "Radically transparent"), d: tr("Cada comisión es una línea visible — incluso cuando es cero. Nunca sorprendemos con costos.", "Every fee is a visible line item — even when it's zero. We never surprise with costs.") },
    { n: "03", t: tr("Claro en dos idiomas", "Clear in two languages"), d: tr("Español primero, sin jerga, tú siempre. El inglés solo para contextos internacionales o B2B.", "Spanish-first, jargon-free, informal tú always. English only for international or B2B contexts.") },
    { n: "04", t: tr("Accesible por defecto", "Accessible by default"), d: tr("Contraste WCAG AA, foco siempre visible, construido sobre primitivas Radix con ARIA correcto.", "WCAG AA contrast, always-visible focus, built on Radix primitives with correct ARIA.") },
  ];
  return (
    <section className="sec" id="principles">
      <div className="eyebrow"><span className="n">01</span><span>{tr("Principios de diseño", "Design principles")}</span></div>
      <h2 className="h2">{tr("Cuatro ideas, una misma intención", "Four ideas, one intent")}</h2>
      <p className="lead">{tr("Felix trata el dinero como un acto de cuidado entre familias. Estos principios mantienen el producto humano, no clínico.", "Felix treats money as an act of care between families. These principles keep the product human, not clinical.")}</p>
      <div className="princ">
        {items.map((p) => (
          <div className="p" key={p.n}><div className="num">{p.n}</div><b>{p.t}</b><span>{p.d}</span></div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────── Colors ──────────────────────────────── */
function SwatchCard({ s }: { s: Swatch }) {
  const tr = useTr();
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(s.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1100);
  };
  return (
    <button className="sw" onClick={copy} title={tr("Clic para copiar", "Click to copy")}>
      <div className="chip" style={{ background: s.hex, boxShadow: s.light ? "inset 0 0 0 1px rgba(8,36,34,.08)" : undefined }} />
      <div className="m2">
        <div className="nm">{s.name}</div>
        <div className="hx">{copied ? tr("Copiado ✓", "Copied ✓") : s.hex}</div>
      </div>
    </button>
  );
}
export function Colors() {
  const tr = useTr();
  return (
    <section className="sec" id="colors">
      <div className="eyebrow"><span className="n">02</span><span>{tr("Color", "Color")}</span></div>
      <h2 className="h2">{tr("Dos héroes y una base cálida", "Two heroes and a warm base")}</h2>
      <p className="lead">{tr("La paleta es deliberadamente pequeña: cada color se gana su lugar. El turquesa lleva la energía de marca; el slate, el peso y la autoridad.", "The palette is deliberately small — every color earns its place. Turquoise carries the brand energy; slate carries weight and authority.")}</p>
      <p className="copyhint">{tr("Tip: hacé clic en cualquier muestra para copiar su hex.", "Tip: click any swatch to copy its hex.")}</p>
      <h3 className="h3">{tr("Marca y base", "Brand & base")}</h3>
      <div className="swatches">{BRAND_COLORS.map((s) => <SwatchCard key={s.name} s={s} />)}</div>
      <h3 className="h3">{tr("Estados semánticos", "Semantic status")}</h3>
      <div className="swatches">{STATUS_COLORS.map((s) => <SwatchCard key={s.name} s={s} />)}</div>
      <p className="scale-note">{tr("Cada color semántico vive como escala completa (50–900) en theme.css y se expone como token: --primary, --status-success, --interactive-primary-hover, etc.", "Each semantic color lives as a full 50–900 scale in theme.css and is exposed as a token: --primary, --status-success, --interactive-primary-hover, etc.")}</p>
    </section>
  );
}

/* ──────────────────────────── Typography ─────────────────────────────── */
const TYPE_CATEGORY_LABELS: Record<string, { es: string; en: string }> = {
  Display: { es: "Display", en: "Display" },
  Headings: { es: "Encabezados", en: "Headings" },
  Body: { es: "Cuerpo", en: "Body" },
  Caption: { es: "Captions", en: "Captions" },
};
const TYPE_CATEGORIES = ["Display", "Headings", "Body", "Caption"] as const;

export function Typography() {
  const tr = useTr();
  return (
    <section className="sec" id="typography">
      <div className="eyebrow"><span className="n">03</span><span>{tr("Tipografía", "Typography")}</span></div>
      <h2 className="h2">{tr("Dos familias, dos registros", "Two families, two registers")}</h2>
      <p className="lead">{tr("Plain para el impacto — el monto que envías, el titular de éxito. Saans para la claridad — cada etiqueta, botón y párrafo.", "Plain for impact — the amount you send, the success headline. Saans for clarity — every label, button, and paragraph.")}</p>
      <div className="fam-card">
        <div className="fam"><div className="big disp">Ag</div><div className="lab">Plain · Display</div><div className="glyphs">Black 900 · Extrabold 800<br />AaBbCc · 0123456789 · $1,200</div></div>
        <div className="fam"><div className="big" style={{ fontWeight: 600 }}>Ag</div><div className="lab">Saans · UI</div><div className="glyphs">Regular 400 · SemiBold 600<br />AaBbCc · 0123456789 · áéíóúñ</div></div>
      </div>
      {TYPE_CATEGORIES.map((cat) => {
        const label = TYPE_CATEGORY_LABELS[cat];
        const items = TYPE_SCALE.filter((t) => t.category === cat);
        return (
          <div key={cat}>
            <h3 className="h3">{tr(label.es, label.en)}</h3>
            <div className="spec">
              {items.map((t) => (
                <div className="row" key={t.token}>
                  <div
                    className="sample"
                    style={{
                      fontFamily: t.family === "Plain" ? "var(--font-heading)" : "var(--font-sans)",
                      fontWeight: t.weight,
                      fontSize: t.size,
                      lineHeight: t.lineHeight,
                      letterSpacing: t.letterSpacing,
                    }}
                  >
                    {tr(t.es, t.en)}
                  </div>
                  <div className="info">
                    {t.token} · {t.family} {t.weight} · {t.size}/{t.lineHeight} · {t.letterSpacing}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

/* ─────────────────────────── Illustrations ───────────────────────────── */
const ILLUSTRATION_CATEGORY_LABELS: Record<string, { es: string; en: string }> = {
  "Brand & Characters": { es: "Marca y personajes", en: "Brand & Characters" },
  Hands: { es: "Manos", en: "Hands" },
  "Money & Payments": { es: "Dinero y pagos", en: "Money & Payments" },
  Communication: { es: "Comunicación", en: "Communication" },
  "Status & Alerts": { es: "Estados y alertas", en: "Status & Alerts" },
  "Navigation & Maps": { es: "Navegación y mapas", en: "Navigation & Maps" },
  Other: { es: "Otras", en: "Other" },
};

const PHOSPHOR_CATEGORIES: { es: string; en: string; icons: Icon[] }[] = [
  {
    es: "Dinero y finanzas", en: "Money & finance",
    icons: [CurrencyDollarIcon, WalletIcon, BankIcon, CreditCardIcon, CoinIcon, CoinsIcon, PiggyBankIcon, HandCoinsIcon, ReceiptIcon, ChartLineUpIcon, PercentIcon, InvoiceIcon, VaultIcon],
  },
  {
    es: "Comunicación", en: "Communication",
    icons: [ChatCircleTextIcon, ChatsCircleIcon, EnvelopeIcon, PhoneIcon, PaperPlaneTiltIcon, BellIcon, VideoCameraIcon, MegaphoneIcon],
  },
  {
    es: "Personas y cuenta", en: "People & account",
    icons: [UserIcon, UsersIcon, UserCircleIcon, IdentificationCardIcon, UserPlusIcon, FingerprintIcon, ShieldCheckIcon, LockIcon],
  },
  {
    es: "Navegación y acciones", en: "Navigation & actions",
    icons: [HouseIcon, ArrowRightIcon, ArrowLeftIcon, CaretDownIcon, MagnifyingGlassIcon, GearIcon, ListIcon, DotsThreeIcon, PlusIcon, XIcon, CheckIcon, TrashIcon, PencilSimpleIcon, DownloadSimpleIcon, UploadSimpleIcon, CopyIcon, ShareNetworkIcon],
  },
  {
    es: "Estados y feedback", en: "Status & feedback",
    icons: [CheckCircleIcon, XCircleIcon, WarningIcon, InfoIcon, ClockIcon, HourglassIcon, StarIcon, HeartIcon, ThumbsUpIcon, SmileyIcon],
  },
  {
    es: "Lugares y mundo", en: "Places & world",
    icons: [GlobeIcon, MapPinIcon, AirplaneIcon, CalendarIcon, FlagIcon, CompassIcon],
  },
];

export function Illustrations() {
  const tr = useTr();
  const { hash } = useLocation();

  // Jump to the requested subsection whenever the hash changes (Sidebar links use #id).
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    el?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [hash]);

  return (
    <section className="sec" id="illustrations">
      <div className="eyebrow"><span className="n">04</span><span>{tr("Ilustraciones", "Illustrations")}</span></div>
      <h2 className="h2">{tr("Ilustraciones, banderas e íconos", "Illustrations, flags & icons")}</h2>
      <p className="lead">
        {tr(
          "Todo el sistema visual de apoyo de Felix en un solo lugar: ilustraciones de marca, banderas de país, iconografía Phosphor y los íconos de métodos de pago.",
          "Felix's whole supporting visual system in one place: brand illustrations, country flags, Phosphor iconography, and payment method icons.",
        )}
      </p>

      {/* ── Felix illustrations ─────────────────────────────────────────── */}
      <div id="felix-illustrations" className="illo-section">
      <h3 className="h3">{tr("Ilustraciones de Felix", "Felix illustrations")} · {ILLUSTRATION_COUNT}</h3>
      <p className="copyhint">
        {tr(
          "Formas redondeadas, paleta de marca y un gesto humano para momentos de celebración, estados vacíos y onboarding.",
          "Rounded shapes, brand palette, and a human gesture for moments of celebration, empty states, and onboarding.",
        )}
      </p>
      {ILLUSTRATIONS.map((cat) => {
        const label = ILLUSTRATION_CATEGORY_LABELS[cat.category] ?? { es: cat.category, en: cat.category };
        return (
          <div key={cat.category}>
            <h4 className="h4">{tr(label.es, label.en)} · {cat.items.length}</h4>
            <div className="gallery-grid">
              {cat.items.map((ill) => {
                const src = `/illustrations/${encodeURIComponent(ill.file)}`;
                return (
                  <figure className="gallery-card" key={ill.file}>
                    <div className="gallery-preview">
                      <img src={src} alt={ill.name} loading="lazy" />
                    </div>
                    <figcaption className="gallery-meta">
                      <span className="gallery-name" title={ill.name}>{ill.name}</span>
                      <a className="gallery-dl" href={src} download={ill.file}>{tr("SVG", "SVG")}</a>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        );
      })}
      </div>

      {/* ── Flags ────────────────────────────────────────────────────────── */}
      <div id="flags" className="illo-section">
      <h3 className="h3">{tr("Banderas", "Flags")} · {FLAGS.length}</h3>
      <p className="copyhint">{tr("Un país por corredor de envío, listas para selectores y tarjetas de destino.", "One country per remittance corridor, ready for selectors and destination cards.")}</p>
      <div className="gallery-grid">
        {FLAGS.map((f) => {
          const src = `/flags/${encodeURIComponent(f.file)}`;
          return (
            <figure className="gallery-card" key={f.file}>
              <div className="gallery-preview flag-size"><img src={src} alt={tr(f.es, f.en)} loading="lazy" /></div>
              <figcaption className="gallery-meta">
                <span className="gallery-name">{tr(f.es, f.en)}</span>
                <a className="gallery-dl" href={src} download={f.file}>{tr("SVG", "SVG")}</a>
              </figcaption>
            </figure>
          );
        })}
      </div>
      </div>

      {/* ── Phosphor icons ───────────────────────────────────────────────── */}
      <div id="phosphor" className="illo-section">
      <h3 className="h3">{tr("Iconografía Phosphor", "Phosphor iconography")}</h3>
      <p className="lead">{tr("El sistema usa Phosphor Icons — duotone para estados en reposo, fill para activos. Nunca Lucide en producto. Trazo consistente, esquinas redondeadas.", "The system uses Phosphor Icons — duotone at rest, fill when active. Never Lucide in product. Consistent stroke, rounded corners.")}</p>
      {PHOSPHOR_CATEGORIES.map((cat) => (
        <div key={cat.en}>
          <h4 className="h4">{tr(cat.es, cat.en)} · {cat.icons.length}</h4>
          <div className="gallery-grid">
            {cat.icons.map((I, i) => (
              <div className="gallery-card" key={i}>
                <div className="gallery-preview icon-size"><I weight="duotone" /></div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <a className="btn-link" href="https://phosphoricons.com" target="_blank" rel="noreferrer">
        {tr("Ver la galería completa en phosphoricons.com", "Browse the full gallery on phosphoricons.com")} <ArrowSquareOutIcon />
      </a>
      </div>

      {/* ── Extra / payment icons ────────────────────────────────────────── */}
      <div id="extra-icons" className="illo-section">
      <h3 className="h3">{tr("Íconos extras", "Extra icons")} · {EXTRA_ICONS.length}</h3>
      <p className="copyhint">{tr("Marcas de tarjetas y métodos de pago, para checkout y pantallas de fondeo.", "Card brands and payment methods, for checkout and funding screens.")}</p>
      <div className="gallery-grid">
        {EXTRA_ICONS.map((ic) => {
          const src = `/icons-extra/${encodeURIComponent(ic.file)}`;
          return (
            <figure className="gallery-card" key={ic.file}>
              <div className="gallery-preview flag-size"><img src={src} alt={ic.name} loading="lazy" /></div>
              <figcaption className="gallery-meta">
                <span className="gallery-name">{ic.name}</span>
                <a className="gallery-dl" href={src} download={ic.file}>{tr("PNG", "PNG")}</a>
              </figcaption>
            </figure>
          );
        })}
      </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Tokens ──────────────────────────────── */
export function Tokens() {
  const tr = useTr();
  return (
    <section className="sec" id="tokens">
      <div className="eyebrow"><span className="n">06</span><span>Design Tokens</span></div>
      <h2 className="h2">{tr("Una sola fuente de verdad", "One source of truth")}</h2>
      <p className="lead">{tr("Todos los tokens viven en theme.css (generado desde tokens.ts) y se exponen como variables CSS y utilidades Tailwind v4. Los nombres cortos no existen — usá los reales.", "Every token lives in theme.css (generated from tokens.ts) and is exposed as CSS variables and Tailwind v4 utilities. Short names don't exist — use the real ones.")}</p>

      <h3 className="h3">{tr("Color semántico", "Semantic color")}</h3>
      <div className="tbl-wrap"><table className="tbl"><thead><tr><th>{tr("Variable CSS", "CSS variable")}</th><th>{tr("Valor", "Value")}</th><th>{tr("Uso", "Use")}</th></tr></thead>
        <tbody>{COLOR_TOKENS.map((r) => <tr key={r.v}><td className="mono"><span className="swatch-dot" style={{ background: r.hex }} />{r.v}</td><td className="mono">{r.hex}</td><td>{tr(r.es, r.en)}</td></tr>)}</tbody></table></div>

      <h3 className="h3">{tr("Radio de borde", "Border radius")}</h3>
      <div className="tbl-wrap"><table className="tbl"><thead><tr><th>Token</th><th>{tr("Valor", "Value")}</th><th>{tr("Aplicación", "Applies to")}</th></tr></thead>
        <tbody>{RADIUS_TOKENS.map((r) => <tr key={r.t}><td className="mono">{r.t}</td><td className="mono">{r.v}</td><td>{tr(r.es, r.en)}</td></tr>)}</tbody></table></div>

      <h3 className="h3">{tr("Espaciado · grilla base 4px", "Spacing · 4px base grid")}</h3>
      <div className="tbl-wrap"><table className="tbl"><thead><tr><th>Token</th><th>{tr("Valor", "Value")}</th><th>rem</th></tr></thead>
        <tbody>{SPACE_TOKENS.map((r) => <tr key={r.t}><td className="mono">{r.t}</td><td className="mono">{r.v}</td><td className="mono">{r.rem}rem</td></tr>)}</tbody></table></div>

      <h3 className="h3">{tr("Sombras · slate-tinted", "Shadows · slate-tinted")}</h3>
      <div className="tbl-wrap"><table className="tbl"><thead><tr><th>Token</th><th>{tr("Uso", "Use")}</th></tr></thead>
        <tbody>{SHADOW_TOKENS.map((r) => <tr key={r.t}><td className="mono">{r.t}</td><td>{tr(r.es, r.en)}</td></tr>)}</tbody></table></div>
    </section>
  );
}

/* ────────────────────────────── Editorial ────────────────────────────── */
const UX_PRINCIPLES: { es: string; en: string; descEs: string; descEn: string }[] = [
  { es: "Claridad", en: "Clarity", descEs: "Un mensaje, una idea. Sin ambigüedad sobre qué pasa con tu dinero.", descEn: "One message, one idea. No ambiguity about what happens to your money." },
  { es: "Concisión", en: "Concision", descEs: "Decí lo necesario, nada más. Cada palabra se gana su lugar.", descEn: "Say what's needed, nothing more. Every word earns its place." },
  { es: "Consistencia", en: "Consistency", descEs: "El mismo término para lo mismo, siempre — comisión es comisión, no tarifa.", descEn: "The same term for the same thing, always — a fee is a fee, not a charge." },
  { es: "Utilidad", en: "Utility", descEs: "El copy ayuda a decidir y actuar, no solo a informar.", descEn: "Copy helps people decide and act, not just inform." },
  { es: "Precisión", en: "Accuracy", descEs: "Sin errores de tipeo ni de género. La exactitud genera confianza.", descEn: "No typos, no gender mismatches. Accuracy builds trust." },
  { es: "Voz y tono", en: "Voice & tone", descEs: "Cálida y cercana de principio a fin — tú, nunca usted.", descEn: "Warm and close from start to finish — tú, never usted." },
  { es: "Accesibilidad", en: "Accessibility", descEs: "Lenguaje simple, legible en cualquier nivel de lectura.", descEn: "Simple language, legible at any reading level." },
  { es: "Deleite", en: "Delight", descEs: "Un gesto humano en el momento justo, sin sacrificar claridad.", descEn: "A human touch at the right moment, without sacrificing clarity." },
];

const CASE_STUDY_ROWS: { titleEs: string; titleEn: string; beforeEs: string; beforeEn: string; afterEs: string; afterEn: string }[] = [
  {
    titleEs: "Sobrecarga cognitiva", titleEn: "Cognitive overload",
    beforeEs: "“Contamos con varios métodos seguros para que pagues como prefieras” — mezcla seguridad y variedad, y promete opciones que la pantalla no mostraba.",
    beforeEn: "“We offer several secure methods so you can pay however you prefer” — bundles security and variety, and promises options the screen didn't show.",
    afterEs: "“Tus pagos están protegidos.”",
    afterEn: "“Your payments are protected.”",
  },
  {
    titleEs: "Voz inconsistente", titleEn: "Inconsistent voice",
    beforeEs: "El consentimiento pasaba a “usted” formal en un flujo que habla “tú” — frío justo en el momento de mayor confianza.",
    beforeEn: "Consent shifted to formal “usted” in a flow that otherwise speaks “tú” — cold right at the moment of trust.",
    afterEs: "Consentimiento en “tú” de punta a punta: autorizás, podés, seleccionás.",
    afterEn: "Consent in “tú” end to end: you authorize, you can, you select.",
  },
  {
    titleEs: "Errores en una pantalla de dinero", titleEn: "Errors on a money screen",
    beforeEs: "“opciones rápidas”, “métodos”, “Pagar después”, “Tarjeta de Débito” y el error de género “Listo para usar”.",
    beforeEn: "“quick options,” “methods,” “Pay later,” “Debit Card,” and the gender mismatch “Ready to use.”",
    afterEs: "Cada error corregido: “Tarjeta de débito”, “Lista para usar”.",
    afterEn: "Every error fixed: “Debit card,” “Ready to use” (correct gender agreement).",
  },
  {
    titleEs: "Sin vocabulario compartido", titleEn: "No shared vocabulary",
    beforeEs: "La comisión se llamaba “Tarifa” y “Sin impuestos”; el checkbox decía “De acuerdo” contra el legal “Estoy de acuerdo”.",
    beforeEn: "The fee was called “Tarifa” and “Sin impuestos”; the checkbox said “Agreed” against the legal text's “I agree.”",
    afterEs: "Un solo vocabulario: “Comisión de Félix” / “Sin comisiones”; el checkbox ahora dice “Estoy de acuerdo”.",
    afterEn: "One shared vocabulary: “Félix fee” / “No fees”; the checkbox now reads “I agree.”",
  },
  {
    titleEs: "El lenguaje no describía la acción real", titleEn: "Language ≠ reality",
    beforeEs: "“Al hacer clic…” — pero la acción real era seleccionar un checkbox, no hacer clic.",
    beforeEn: "“By clicking…” — but the real action was selecting a checkbox, not clicking.",
    afterEs: "Decí lo que realmente pasa: “Si seleccionás ‘Estoy de acuerdo’…”.",
    afterEn: "Say what actually happens: “If you select ‘I agree’…”",
  },
  {
    titleEs: "Fuera de contexto y verboso", titleEn: "Out of context & verbose",
    beforeEs: "Mención de “préstamo” dentro de un flujo de remesas; legal denso y repetitivo.",
    beforeEn: "A “loan” mention inside a remittance flow; dense, repetitive legalese.",
    afterEs: "La razón correcta, en contexto: “Necesitamos revisar tu cuenta…”; “Vinculá tu banco”.",
    afterEn: "The right reason, in context: “We need to review your account…”; “Link your bank.”",
  },
];

export function Editorial() {
  const tr = useTr();
  const voices = [
    { b: tr("Cálida", "Warm"), p: tr("“Tu dinero ya está en camino a casa.”", "“Your money is already on its way home.”") },
    { b: tr("Directa", "Direct"), p: tr("“Sin comisión. El tipo de cambio es 17.00.”", "“No fee. The exchange rate is 17.00.”") },
    { b: tr("Cercana", "Close"), p: tr("“¿Listo para enviar? Te toma 30 segundos.”", "“Ready to send? It takes you 30 seconds.”") },
  ];
  const dos = [
    tr("Escribí en español primero, con tú informal.", "Write Spanish-first, with informal tú."),
    tr("Mostrá el código de moneda en cada monto ($60.00 USD).", "Show the currency code on every amount ($60.00 USD)."),
    tr("Mostrá la comisión como línea visible, aunque sea cero.", "Show the fee as a visible line item, even when zero."),
    tr("Usá un solo botón primario por pantalla.", "Use a single primary button per screen."),
    tr("Usá el mismo término para lo mismo, siempre (comisión, no tarifa).", "Use the same term for the same thing, always (fee, not charge)."),
  ];
  const donts = [
    tr("Usar usted o lenguaje corporativo.", "Use usted or corporate language."),
    tr("Gradientes o emoji en UI de producto.", "Gradients or emoji in product UI."),
    tr("Naranja para advertencias — eso es amarillo.", "Orange for warnings — that's yellow."),
    tr("Borde y sombra juntos en la misma card.", "Border and shadow together on the same card."),
    tr("Prometer opciones que la pantalla no muestra.", "Promise options the screen doesn't show."),
  ];
  return (
    <section className="sec" id="editorial">
      <div className="eyebrow"><span className="n">07</span><span>{tr("Guía editorial", "Editorial guidelines")}</span></div>
      <h2 className="h2">{tr("La voz de Felix", "Felix's voice")}</h2>
      <p className="lead">{tr("Calmada, directa, cálida, transparente. Nunca corporativa. Felix habla de tú, jamás de usted, en español y en inglés.", "Calm, direct, warm, transparent. Never corporate. Felix speaks informally — tú, never usted — in Spanish and English.")}</p>
      <div className="voice">
        {voices.map((v) => <div className="v" key={v.b}><b>{v.b}</b><p>{v.p}</p></div>)}
      </div>

      <h3 className="h3">{tr("Principios de UX writing", "UX writing principles")}</h3>
      <p className="copyhint">{tr("Ocho ideas que guían cada revisión de contenido, del checkout a la guía de un componente.", "Eight ideas that guide every content review, from checkout copy to a component's help text.")}</p>
      <div className="ux-principles">
        {UX_PRINCIPLES.map((p) => (
          <div className="ux-principle" key={p.en}>
            <b>{tr(p.es, p.en)}</b>
            <span>{tr(p.descEs, p.descEn)}</span>
          </div>
        ))}
      </div>

      <h3 className="h3">{tr("Caso de estudio · Checkout & Payment", "Case study · Checkout & Payment")}</h3>
      <p className="copyhint">
        {tr(
          "De una revisión real de contenido UX (2026): en una pantalla de remesas, la claridad es confianza. Seis problemas de la versión original y cómo se resolvieron.",
          "From a real UX content review (2026): on a remittance screen, clarity is trust. Six problems in the original flow and how they were fixed.",
        )}
      </p>
      <div className="case-study">
        {CASE_STUDY_ROWS.map((row) => (
          <div className="case-row" key={row.titleEn}>
            <div className="case-label">{tr(row.titleEs, row.titleEn)}</div>
            <div className="case-before"><span className="case-tag before">{tr("Antes", "Before")}</span>{tr(row.beforeEs, row.beforeEn)}</div>
            <div className="case-after"><span className="case-tag after">{tr("Después", "After")}</span>{tr(row.afterEs, row.afterEn)}</div>
          </div>
        ))}
      </div>
      <p className="copyhint">
        {tr(
          "Heurísticas aplicadas: “consistencia y estándares” y “correspondencia entre el sistema y el mundo real” (Nielsen).",
          "Heuristics applied: “consistency & standards” and “match between system and the real world” (Nielsen).",
        )}
      </p>

      <h3 className="h3">{tr("Hacé y evitá", "Do and don't")}</h3>
      <div className="dd" style={{ marginTop: 4 }}>
        <div className="col do"><div className="ch">{tr("Hacé", "Do")}</div><ul>{dos.map((x, i) => <li key={i}>{x}</li>)}</ul></div>
        <div className="col dont"><div className="ch">{tr("Evitá", "Don't")}</div><ul>{donts.map((x, i) => <li key={i}>{x}</li>)}</ul></div>
      </div>
    </section>
  );
}

/* ──────────────────────────────── DESIGN.md ──────────────────────────── */
export function DesignMd() {
  const tr = useTr();
  const [copied, setCopied] = useState(false);

  const download = () => {
    const blob = new Blob([designMd], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "DESIGN.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(designMd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — the Download button still works */
    }
  };

  const tools: { name: string; es: string; en: string }[] = [
    {
      name: "Cursor",
      es: "Arrastrá el archivo al chat o referencialo con @DESIGN.md. Cursor lo toma como contexto de marca al generar UI.",
      en: "Drag the file into chat or reference it with @DESIGN.md. Cursor uses it as brand context when generating UI.",
    },
    {
      name: "Claude Code",
      es: "Pedile que lea DESIGN.md del repo (o adjuntalo) antes de generar componentes; respeta tokens, formas y voz.",
      en: "Ask it to read DESIGN.md from the repo (or attach it) before generating components; it respects tokens, shapes, and voice.",
    },
    {
      name: "v0",
      es: "Pegá el contenido como Project Instructions; v0 reskinnea shadcn con la estética de Felix. Ver V0_SETUP.md.",
      en: "Paste the content as Project Instructions; v0 reskins shadcn with Felix's look. See V0_SETUP.md.",
    },
    {
      name: "ChatGPT · Gemini · otros",
      es: "Usá «Copiar para tu LLM» y pegá el archivo al inicio de la conversación como contexto.",
      en: "Use “Copy for your LLM” and paste the file at the start of the conversation as context.",
    },
  ];

  return (
    <section className="sec" id="design-md">
      <div className="eyebrow"><span className="n">08</span><span>DESIGN.md</span></div>
      <h2 className="h2">{tr("El sistema, en un archivo que la IA entiende", "The system, in a file AI understands")}</h2>
      <p className="lead">
        {tr(
          "DESIGN.md es el contrato de identidad de Felix en un solo archivo legible por personas y por IA: colores, tipografía, tokens, componentes, formas y voz. Descargalo o copialo y pegáselo a tu herramienta de IA para que genere interfaces fieles a la marca.",
          "DESIGN.md is Felix's identity contract in a single file readable by people and AI: colors, typography, tokens, components, shapes, and voice. Download it or copy it into your AI tool so it generates on-brand interfaces.",
        )}
      </p>
      <div className="cluster">
        <Button variant="primary" onClick={download}>
          <DownloadSimpleIcon />
          {tr("Descargar DESIGN.md", "Download DESIGN.md")}
        </Button>
        <Button variant="line" onClick={copy}>
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? tr("¡Copiado!", "Copied!") : tr("Copiar para tu LLM", "Copy for your LLM")}
        </Button>
      </div>
      <h3 className="h3">{tr("Cómo usarlo", "How to use it")}</h3>
      <div className="voice" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
        {tools.map((t) => (
          <div className="v" key={t.name}>
            <b>{t.name}</b>
            <p>{tr(t.es, t.en)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export function Footer() {
  const tr = useTr();
  return (
    <footer className="foot">
      {tr("Felix Pago · Sistema de diseño · v1.0.0 alpha — generado desde DESIGN.md y @felix/ui.", "Felix Pago · Design System · v1.0.0 alpha — generated from DESIGN.md and @felix/ui.")}
    </footer>
  );
}

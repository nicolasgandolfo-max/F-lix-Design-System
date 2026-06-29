import { useState } from "react";
import {
  Button,
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
  Input,
  Switch,
  Checkbox,
  Progress,
  Card,
  CardContent,
  Text,
} from "@felix/ui";
import {
  StarIcon,
  PaletteIcon,
  TextAaIcon,
  PuzzlePieceIcon,
  CubeIcon,
  PencilSimpleIcon,
  ArrowRightIcon,
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
  type Icon,
} from "@phosphor-icons/react";
import { useTr } from "./i18n";
import {
  BRAND_COLORS,
  STATUS_COLORS,
  COLOR_TOKENS,
  RADIUS_TOKENS,
  SPACE_TOKENS,
  SHADOW_TOKENS,
  INVENTORY,
  type Swatch,
} from "./data";

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
          <a href="#components">{tr("Ver componentes", "Explore components")}</a>
        </Button>
        <Button variant="line" asChild>
          <a href="#tokens">{tr("Design tokens", "Design tokens")}</a>
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
function Tile({ icon: I, href, title, desc, go }: { icon: Icon; href: string; title: string; desc: string; go: string }) {
  return (
    <a className="tile" href={href}>
      <span className="ic">
        <I />
      </span>
      <b>{title}</b>
      <span className="d">{desc}</span>
      <span className="go">{go} →</span>
    </a>
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
        <Tile icon={StarIcon} href="#principles" title={tr("Principios", "Principles")} desc={tr("Las cuatro ideas que guían cada decisión de diseño.", "The four ideas that guide every design decision.")} go={tr("Leer", "Read")} />
        <Tile icon={PaletteIcon} href="#colors" title={tr("Colores", "Colors")} desc={tr("Turquesa, slate y una base neutra cálida. Paleta pequeña a propósito.", "Turquoise, slate, and a warm neutral base. A deliberately small palette.")} go={tr("Ver paleta", "View palette")} />
        <Tile icon={TextAaIcon} href="#typography" title={tr("Tipografía", "Typography")} desc={tr("Plain para los momentos de impacto, Saans para todo lo demás.", "Plain for moments of impact, Saans for everything else.")} go={tr("Ver escala", "View scale")} />
        <Tile icon={PuzzlePieceIcon} href="#components" title={tr("Componentes", "Components")} desc={tr("43 piezas en React, construidas sobre Radix y accesibles por defecto.", "43 React pieces, built on Radix and accessible by default.")} go={tr("Explorar", "Explore")} />
        <Tile icon={CubeIcon} href="#tokens" title="Tokens" desc={tr("Variables CSS y Tailwind. Una sola fuente de verdad para light y dark.", "CSS & Tailwind variables. One source of truth for light and dark.")} go={tr("Ver tokens", "View tokens")} />
        <Tile icon={PencilSimpleIcon} href="#editorial" title={tr("Voz y copy", "Voice & copy")} desc={tr("Español primero, tú siempre. Claro, cálido, sin jerga.", "Spanish-first, informal tú always. Clear, warm, jargon-free.")} go={tr("Leer guía", "Read guide")} />
      </div>
    </section>
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
export function Typography() {
  const tr = useTr();
  const rows = [
    { s: "$1,200.00", cls: "disp", style: { fontSize: "3.4rem" }, info: "display-2xl · Plain 900 · 72/1.0" },
    { s: tr("Enviaste con éxito", "Sent successfully"), cls: "disp", style: { fontSize: "2.2rem" }, info: "display-md · Plain 800 · 36/1.1" },
    { s: tr("Título de pantalla", "Screen title"), cls: "", style: { fontSize: "1.5rem", fontWeight: 600 }, info: "heading-md · Saans 600 · 24/1.35" },
    { s: tr("Texto de cuerpo para instrucciones y descripciones claras.", "Body text for clear instructions and descriptions."), cls: "", style: { fontSize: "1rem" }, info: "body-md · Saans 400 · 16/1.5" },
    { s: tr("RECIBIDO · HACE 2 MIN", "RECEIVED · 2 MIN AGO"), cls: "", style: { fontSize: ".75rem", fontWeight: 500, letterSpacing: ".0025em" }, info: "caption · Saans 500 · 11/1.2" },
  ];
  return (
    <section className="sec" id="typography">
      <div className="eyebrow"><span className="n">03</span><span>{tr("Tipografía", "Typography")}</span></div>
      <h2 className="h2">{tr("Dos familias, dos registros", "Two families, two registers")}</h2>
      <p className="lead">{tr("Plain para el impacto — el monto que envías, el titular de éxito. Saans para la claridad — cada etiqueta, botón y párrafo.", "Plain for impact — the amount you send, the success headline. Saans for clarity — every label, button, and paragraph.")}</p>
      <div className="fam-card">
        <div className="fam"><div className="big disp">Ag</div><div className="lab">Plain · Display</div><div className="glyphs">Black 900 · Extrabold 800<br />AaBbCc · 0123456789 · $1,200</div></div>
        <div className="fam"><div className="big" style={{ fontWeight: 600 }}>Ag</div><div className="lab">Saans · UI</div><div className="glyphs">Regular 400 · SemiBold 600<br />AaBbCc · 0123456789 · áéíóúñ</div></div>
      </div>
      <h3 className="h3">{tr("Escala tipográfica", "Type scale")}</h3>
      <div className="spec">
        {rows.map((r, i) => (
          <div className="row" key={i}>
            <div className={"sample " + r.cls} style={r.style}>{r.s}</div>
            <div className="info">{r.info}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────── Illustrations ───────────────────────────── */
export function Illustrations() {
  const tr = useTr();
  return (
    <section className="sec" id="illustrations">
      <div className="eyebrow"><span className="n">04</span><span>{tr("Ilustraciones", "Illustrations")}</span></div>
      <h2 className="h2">{tr("Calidez con geometría", "Warmth through geometry")}</h2>
      <p className="lead">{tr("Formas redondeadas, paleta de marca y un gesto humano. Las ilustraciones acompañan momentos de celebración y vacíos, nunca decoran de más.", "Rounded shapes, brand palette, and a human gesture. Illustrations accompany moments of celebration and empty states — never over-decorate.")}</p>
      <div className="illus">
        <div className="blob" style={{ background: "var(--light-sky)" }}><svg width="120" height="100" viewBox="0 0 120 100" fill="none"><circle cx="60" cy="46" r="30" fill="#2bf2f1" /><circle cx="60" cy="46" r="14" fill="#082422" /><rect x="30" y="80" width="60" height="10" rx="5" fill="#082422" /></svg></div>
        <div className="blob" style={{ background: "var(--stone)" }}><svg width="120" height="100" viewBox="0 0 120 100" fill="none"><path d="M20 70 Q60 10 100 70" stroke="#082422" strokeWidth="9" fill="none" strokeLinecap="round" /><circle cx="100" cy="70" r="11" fill="#dcff00" stroke="#082422" strokeWidth="3" /></svg></div>
        <div className="blob" style={{ background: "var(--slate)" }}><svg width="120" height="100" viewBox="0 0 120 100" fill="none"><rect x="34" y="28" width="52" height="44" rx="10" fill="#2bf2f1" /><path d="M44 50h32M60 38v24" stroke="#082422" strokeWidth="6" strokeLinecap="round" /></svg></div>
      </div>
    </section>
  );
}

/* ──────────────────────────── Iconography ────────────────────────────── */
export function Iconography() {
  const tr = useTr();
  const icons: Icon[] = [PaperPlaneTiltIcon, HeartIcon, ShieldCheckIcon, ClockIcon, UserIcon, BellIcon, CreditCardIcon, GlobeIcon, WalletIcon, HouseIcon, CurrencyDollarIcon, ChatCircleTextIcon, BankIcon, ReceiptIcon, CheckIcon, ArrowRightIcon];
  return (
    <section className="sec" id="iconography">
      <div className="eyebrow"><span className="n">05</span><span>{tr("Iconografía", "Iconography")}</span></div>
      <h2 className="h2">{tr("Phosphor, duotone primero", "Phosphor, duotone first")}</h2>
      <p className="lead">{tr("El sistema usa Phosphor Icons — duotone para estados en reposo, fill para activos. Nunca Lucide en producto. Trazo consistente, esquinas redondeadas.", "The system uses Phosphor Icons — duotone at rest, fill when active. Never Lucide in product. Consistent stroke, rounded corners.")}</p>
      <div className="icongrid">
        {icons.map((I, i) => <div className="ig" key={i}><I weight="duotone" /></div>)}
      </div>
    </section>
  );
}

/* ──────────────────────────── Components ─────────────────────────────── */
function ControlsDemo() {
  const tr = useTr();
  const [sw, setSw] = useState(true);
  const [ck, setCk] = useState(true);
  return (
    <div className="cluster" style={{ gap: 26 }}>
      <Switch checked={sw} onCheckedChange={setSw} aria-label={tr("Activar notificaciones", "Enable notifications")} />
      <Checkbox checked={ck} onCheckedChange={(v) => setCk(v === true)} aria-label={tr("Acepto los términos", "I accept the terms")} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 220 }}>
        <Progress value={62} aria-label={tr("Progreso del envío", "Transfer progress")} />
        <Text variant="caption" style={{ color: "var(--fg-subtle)" }}>62%</Text>
      </div>
    </div>
  );
}
export function Components() {
  const tr = useTr();
  return (
    <section className="sec" id="components">
      <div className="eyebrow"><span className="n">06</span><span>{tr("Componentes", "Components")}</span></div>
      <h2 className="h2">{tr("43 piezas, una sola estética", "43 pieces, one aesthetic")}</h2>
      <p className="lead">{tr("Construidas en React 19 sobre primitivas Radix. Pill en lo interactivo, redondeo suave en contenedores, foco turquesa siempre presente. Todo lo de abajo es @felix/ui real.", "Built in React 19 on Radix primitives. Pill on interactive elements, soft rounding on containers, turquoise focus always present. Everything below is real @felix/ui.")}</p>

      <div className="panel">
        <div className="ph">{tr("Botones — 5 variantes, 3 tamaños", "Buttons — 5 variants, 3 sizes")}</div>
        <div className="cluster">
          <Button variant="primary"><PaperPlaneTiltIcon />{tr("Enviar dinero", "Send money")}</Button>
          <Button variant="secondary">{tr("Secundario", "Secondary")}</Button>
          <Button variant="ghost">{tr("Ahora no", "Not now")}</Button>
          <Button variant="line">{tr("Editar", "Edit")}</Button>
          <Button variant="danger">{tr("Eliminar", "Delete")}</Button>
        </div>
        <div className="cluster" style={{ marginTop: 14 }}>
          <Button size="sm">sm · 36</Button>
          <Button size="md">md · 48</Button>
          <Button size="lg">lg · 56</Button>
        </div>
      </div>

      <div className="panel">
        <div className="ph">{tr("Badges", "Badges")}</div>
        <div className="cluster">
          <Badge variant="default">{tr("Nuevo", "New")}</Badge>
          <Badge variant="secondary">{tr("Promo", "Promo")}</Badge>
          <Badge variant="destructive">{tr("Cancelado", "Cancelled")}</Badge>
          <Badge variant="outline">{tr("Borrador", "Draft")}</Badge>
          <Badge variant="ghost">{tr("Etiqueta", "Tag")}</Badge>
          <Badge variant="dark">{tr("Beta", "Beta")}</Badge>
        </div>
      </div>

      <div className="panel">
        <div className="ph">{tr("Alerts — estados", "Alerts — status")}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Alert variant="success"><AlertTitle>{tr("Transferencia completada", "Transfer completed")}</AlertTitle><AlertDescription>{tr("María recibió $1,020.00 MXN.", "María received $1,020.00 MXN.")}</AlertDescription></Alert>
          <Alert variant="warning"><AlertTitle>{tr("Envío en camino", "Transfer on its way")}</AlertTitle><AlertDescription>{tr("Llega en aproximadamente 30 minutos.", "Arrives in about 30 minutes.")}</AlertDescription></Alert>
          <Alert variant="error"><AlertTitle>{tr("No pudimos procesar el pago", "We couldn't process the payment")}</AlertTitle><AlertDescription>{tr("Revisá tu método de pago e intentá de nuevo.", "Check your payment method and try again.")}</AlertDescription></Alert>
        </div>
      </div>

      <div className="panel">
        <div className="ph">{tr("Formularios y controles", "Forms & controls")}</div>
        <div className="cluster" style={{ alignItems: "flex-start", gap: 32 }}>
          <div style={{ maxWidth: 320, flex: "1 1 260px" }}>
            <Input label={tr("Monto a enviar", "Amount to send")} description={tr("Comisión $0.00 — sin sorpresas.", "Fee $0.00 — no surprises.")} defaultValue="$60.00 USD" />
          </div>
          <ControlsDemo />
        </div>
      </div>

      <div className="panel">
        <div className="ph">{tr("Card de transferencia", "Transfer card")}</div>
        <Card style={{ maxWidth: 320 }}>
          <CardContent style={{ padding: 20 }}>
            <Text variant="caption" style={{ color: "var(--fg-subtle)", display: "block", marginBottom: 4 }}>{tr("Recibe María", "María receives")}</Text>
            <div className="disp" style={{ fontSize: "2.4rem", fontVariantNumeric: "tabular-nums" }}>
              1,020.00<span style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 600, color: "var(--fg-subtle)", marginLeft: 6 }}>MXN</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--fg-muted)", marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--stone)" }}>
              <span>{tr("Tipo de cambio", "Exchange rate")}</span><span style={{ fontFamily: "var(--font-mono)" }}>17.00</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--fg-muted)", marginTop: 10 }}>
              <span>{tr("Comisión", "Fee")}</span><span style={{ fontFamily: "var(--font-mono)" }}>$0.00</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="panel">
        <div className="ph">{tr("Inventario completo", "Full inventory")}</div>
        <div className="inv">
          {INVENTORY.map((g) => (
            <div key={g.group} style={{ display: "contents" }}>
              <div className="ih">{g.group} · {g.items.length}</div>
              {g.items.map((c) => <span key={c}>{c}</span>)}
            </div>
          ))}
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
      <div className="eyebrow"><span className="n">07</span><span>Design Tokens</span></div>
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
  ];
  const donts = [
    tr("Usar usted o lenguaje corporativo.", "Use usted or corporate language."),
    tr("Gradientes o emoji en UI de producto.", "Gradients or emoji in product UI."),
    tr("Naranja para advertencias — eso es amarillo.", "Orange for warnings — that's yellow."),
    tr("Borde y sombra juntos en la misma card.", "Border and shadow together on the same card."),
  ];
  return (
    <section className="sec" id="editorial">
      <div className="eyebrow"><span className="n">08</span><span>{tr("Guía editorial", "Editorial guidelines")}</span></div>
      <h2 className="h2">{tr("La voz de Felix", "Felix's voice")}</h2>
      <p className="lead">{tr("Calmada, directa, cálida, transparente. Nunca corporativa. Felix habla de tú, jamás de usted, en español y en inglés.", "Calm, direct, warm, transparent. Never corporate. Felix speaks informally — tú, never usted — in Spanish and English.")}</p>
      <div className="voice">
        {voices.map((v) => <div className="v" key={v.b}><b>{v.b}</b><p>{v.p}</p></div>)}
      </div>
      <div className="dd" style={{ marginTop: 18 }}>
        <div className="col do"><div className="ch">{tr("Hacé", "Do")}</div><ul>{dos.map((x, i) => <li key={i}>{x}</li>)}</ul></div>
        <div className="col dont"><div className="ch">{tr("Evitá", "Don't")}</div><ul>{donts.map((x, i) => <li key={i}>{x}</li>)}</ul></div>
      </div>
    </section>
  );
}

/* ────────────────────────── Markdown / MCP ───────────────────────────── */
export function Markdown() {
  const tr = useTr();
  return (
    <section className="sec" id="markdown">
      <div className="eyebrow"><span className="n">09</span><span>Markdown</span></div>
      <h2 className="h2">{tr("El sistema como contrato legible", "The system as a readable contract")}</h2>
      <div className="holder exp">
        <span className="pill">{tr("Experimental", "Experimental")}</span>
        <p>{tr("DESIGN.md describe toda la identidad en un formato que entienden tanto las personas como las herramientas de IA (Cursor, Claude Code, v0). Tokens, tipografía, reglas y voz en un solo archivo versionable.", "DESIGN.md captures the entire identity in a format both people and AI tools (Cursor, Claude Code, v0) understand. Tokens, typography, rules, and voice in one versionable file.")}</p>
      </div>
    </section>
  );
}
export function MCP() {
  const tr = useTr();
  return (
    <section className="sec" id="mcp">
      <div className="eyebrow"><span className="n">10</span><span>MCP</span></div>
      <h2 className="h2">{tr("El design system, conectado a la IA", "The design system, wired to AI")}</h2>
      <div className="holder soon">
        <span className="pill">{tr("Próximamente", "Coming soon")}</span>
        <p>{tr("Un servidor MCP para que asistentes de IA consulten componentes, tokens y reglas en tiempo real, y generen prototipos que respetan a Felix desde el primer prompt.", "An MCP server so AI assistants can query components, tokens, and rules in real time — and generate prototypes that respect Felix from the first prompt.")}</p>
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

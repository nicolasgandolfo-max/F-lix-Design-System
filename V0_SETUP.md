# Generar UI de Felix en v0

v0 (v0.dev) genera componentes **shadcn/ui** sobre **Tailwind v4**. No puede
instalar `@felix/ui` (registry privado), pero **sí** podemos hacer que su salida
se vea como Felix: el `theme.css` de Felix usa los mismos nombres de variables
que shadcn (`--primary`, `--background`, `--border`, `--ring`…), así que le
pasamos los **valores de Felix** y sus componentes quedan reskinneados solos.

Flujo: **(1)** pegar el theme · **(2)** pegar las reglas de marca · **(3)**
pedir pantallas · **(4)** portar al repo real reemplazando imports por
`@felix/ui`.

---

## Paso 1 — Pegar el theme de Felix (globals.css)

En v0, en tu primer mensaje (o en *Project → Settings → Sources/Files*), pegá
esto como `app/globals.css` y decile: **"usá este globals.css como tema base"**.

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --radius: 0.75rem;

  /* shadcn semantic tokens — valores de Felix (light) */
  --background: #fefcf9;          /* linen — lienzo cálido, nunca blanco puro */
  --foreground: #082422;          /* slate */
  --card: #fefcf9;
  --card-foreground: #082422;
  --popover: #ffffff;
  --popover-foreground: #082422;
  --primary: #2bf2f1;             /* turquesa — el color de marca */
  --primary-foreground: #082422;  /* texto oscuro sobre turquesa */
  --secondary: #adaa9e;
  --secondary-foreground: #082422;
  --muted: #efebe7;               /* stone */
  --muted-foreground: #636158;
  --accent: #dcff00;              /* lime — solo marketing/realces */
  --accent-foreground: #082422;
  --destructive: #f26629;         /* naranja — el único "rojo" del sistema */
  --destructive-foreground: #ffffff;
  --border: #cfcabf;              /* concrete */
  --input: #cfcabf;
  --ring: #2bf2f1;                /* foco turquesa */

  /* Estados semánticos (para badges/alerts de éxito, aviso, error, info) */
  --success: #60d06f;  --success-bg: #eefbf0;  --success-foreground: #1b7a29;
  --warning: #ffd200;  --warning-bg: #fffce0;  --warning-foreground: #665500;
  --error:   #f26629;  --error-bg:   #fff5ef;  --error-foreground:   #a03808;
  --info:    #3b2e8c;  --info-bg:    #f2eeff;  --info-foreground:    #1c1249;

  /* Charts */
  --chart-1: #2bf2f1; --chart-2: #42b552; --chart-3: #f19d38;
  --chart-4: #6e58d8; --chart-5: #f77b42;
}

.dark {
  --background: #082422;
  --foreground: #fefcf9;
  --card: #234343;
  --card-foreground: #fefcf9;
  --popover: #152b2a;
  --popover-foreground: #fefcf9;
  --primary: #2bf2f1;
  --primary-foreground: #082422;
  --secondary: #35605f;
  --secondary-foreground: #fefcf9;
  --muted: #152b2a;
  --muted-foreground: #cfcabf;
  --accent: #b2d000;
  --accent-foreground: #082422;
  --destructive: #f26629;
  --destructive-foreground: #082422;
  --border: #35605f;
  --input: #35605f;
  --ring: #2bf2f1;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-error: var(--error);
  --color-info: var(--info);

  /* Radios — Felix es muy redondeado en lo interactivo */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
```

> Nota fuentes: **Plain** y **Saans** son tipografías propias (no están en
> Google Fonts), así que v0 no puede cargarlas. Para el prototipo usá una sans
> geométrica como stand-in (p. ej. una grotesk) y reservá un peso **bold/black**
> para montos y titulares. Las fuentes reales se aplican recién al portar al repo.

---

## Paso 2 — Pegar las reglas de marca (Project Instructions)

En v0: *Project → Settings → Instructions* (o al inicio del chat). Pegá:

```
Estás generando UI para FELIX PAGO, una app de remesas Spanish-first para la
comunidad latina en EE.UU. Estética: cálida, eléctrica, radicalmente transparente.
Felix es un "compañero financiero", no un banco.

TEMA
- Usá EXCLUSIVAMENTE los tokens del globals.css que te di (variables shadcn con
  valores de Felix). Nunca hardcodees hex; usá bg-primary, text-foreground,
  border-border, text-muted-foreground, etc.
- Turquesa (--primary) es la marca: CTAs, foco, realces. Nunca turquesa para texto.
- Lime (--accent) solo para marketing/realces, jamás en flujos transaccionales.
- Naranja = error/destructivo. Amarillo = warning. No los mezcles.

FORMA
- Elementos interactivos (botones, badges, chips, switches): pill, rounded-full.
- Contenedores (cards, inputs, sheets): rounded-xl / rounded-2xl.
- Una card usa borde O sombra, nunca ambos. Sombras cálidas (slate-tinted), no negro puro.
- Sin gradientes, sin emoji en UI de producto, sin esquinas filosas en lo interactivo.
- Foco siempre visible (ring turquesa). Nunca lo quites.

TIPOGRAFÍA
- Una sans para toda la UI; un peso black/extrabold solo para montos y titulares
  hero (стандин de la fuente "Plain"). Montos con tabular-nums.

COMPONENTES (mapeo a shadcn)
- Botón: variantes default(primary turquesa), secondary, ghost, outline(=line),
  destructive. Un solo botón primario por pantalla; el resto se degrada.
- Badge: default(turquesa), secondary, destructive, outline.
- Para estados usá Alert (success/warning/error/info) con los tokens --success/-bg/-foreground, etc.
- Input con label visible arriba (nunca solo placeholder) y helper/error debajo.

COPY
- Español primero, tú informal (nunca usted). Claro, cálido, sin jerga.
- Mostrá el código de moneda en cada monto: "$60.00 USD", "$1,200.00 MXN".
- Mostrá la comisión como línea visible, aunque sea $0.00.

Antes de generar, listá qué componentes shadcn vas a usar. Si algo no encaja, decímelo.
```

---

## Paso 3 — Pedir una pantalla (ejemplo)

```
Construí una pantalla "Confirmar envío" para móvil:
- Header con título "Confirmá tu envío".
- Monto grande en peso black: "$60.00 USD" → "Recibe María: $1,020.00 MXN".
- Card con desglose: tipo de cambio 17.00 y "Comisión $0.00" como línea visible.
- Datos del destinatario (nombre + banco) en una card.
- CTA primario full-width fijo abajo: "Enviar dinero".
- Un botón ghost "Editar" arriba. Copy en español, tú informal.
```

---

## Paso 4 — Portar al repo real

Cuando la pantalla te guste, traé el JSX al monorepo y:
1. Reemplazá los imports `@/components/ui/*` por `@felix/ui`.
2. Reemplazá cualquier hex suelto por el token semántico equivalente.
3. Aplicá las fuentes reales (ya cableadas en `apps/design-system`).

Claude Code o Cursor pueden hacer ese swap mecánicamente. Ver `AI_PROTOTYPING.md`
para el detalle del flujo y los guardrails.

import { Link } from "react-router-dom";
import { GROUP_LABELS, GROUP_SLUGS, INVENTORY, slugify } from "../data";
import { SHOWCASES } from "../components-registry";
import { useTr } from "../i18n";

export function ComponentsIndex() {
  const tr = useTr();
  return (
    <section className="sec flush">
      <div className="eyebrow"><span className="n">05</span><span>{tr("Componentes", "Components")}</span></div>
      <h2 className="h2">{tr("43 piezas, una sola estética", "43 pieces, one aesthetic")}</h2>
      <p className="lead">
        {tr(
          "Construidas en React 19 sobre primitivas Radix, pill en lo interactivo y foco turquesa siempre. Elegí un componente para ver su showcase en vivo.",
          "Built in React 19 on Radix primitives, pill interactive elements, turquoise focus always. Pick a component to see its live showcase.",
        )}
      </p>
      {INVENTORY.map((g) => {
        const groupSlug = GROUP_SLUGS[g.group];
        const label = GROUP_LABELS[g.group] ?? { es: g.group, en: g.group };
        return (
          <div key={g.group}>
            <div className="comp-group-head">
              <h3 className="h3">{tr(label.es, label.en)} · {g.items.length}</h3>
              <Link to={`/componentes/${groupSlug}`} className="btn-link">{tr("Ver todos", "View all")} →</Link>
            </div>
            <div className="comp-grid">
              {g.items.map((name) => {
                const slug = slugify(name);
                const entry = SHOWCASES[slug];
                const ready = Boolean(entry);
                return (
                  <div key={name} className="comp-card">
                    {/* Full-card hit area. A plain overlay (not wrapping the preview) avoids
                        nesting <a> tags when a component's own preview renders links. */}
                    <Link to={`/componentes/${groupSlug}#${slug}`} className="comp-card-hit" aria-label={name} />
                    <div className={"comp-preview" + (entry?.previewTall ? " tall" : "")}>
                      <div className="comp-preview-inner">
                        {ready ? entry.preview() : <span className="comp-preview-empty">{name}</span>}
                      </div>
                    </div>
                    <div className="comp-card-meta">
                      <span className="comp-name">{name}</span>
                      <span className={"comp-status" + (ready ? " ready" : "")}>
                        {ready ? tr("Listo", "Ready") : tr("Pronto", "Soon")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}

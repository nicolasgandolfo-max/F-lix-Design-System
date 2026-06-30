import { Link } from "react-router-dom";
import { INVENTORY, slugify } from "../data";
import { SHOWCASES } from "../components-registry";
import { useTr } from "../i18n";

export function ComponentsIndex() {
  const tr = useTr();
  return (
    <section className="sec flush">
      <div className="eyebrow"><span className="n">06</span><span>{tr("Componentes", "Components")}</span></div>
      <h2 className="h2">{tr("43 piezas, una sola estética", "43 pieces, one aesthetic")}</h2>
      <p className="lead">
        {tr(
          "Construidas en React 19 sobre primitivas Radix, pill en lo interactivo y foco turquesa siempre. Elegí un componente para ver su showcase en vivo.",
          "Built in React 19 on Radix primitives, pill interactive elements, turquoise focus always. Pick a component to see its live showcase.",
        )}
      </p>
      {INVENTORY.map((g) => (
        <div key={g.group}>
          <h3 className="h3">{g.group} · {g.items.length}</h3>
          <div className="comp-grid">
            {g.items.map((name) => {
              const slug = slugify(name);
              const ready = Boolean(SHOWCASES[slug]);
              return (
                <Link key={name} to={`/componentes/${slug}`} className="comp-card">
                  <span className="comp-name">{name}</span>
                  <span className={"comp-status" + (ready ? " ready" : "")}>
                    {ready ? tr("Listo", "Ready") : tr("Pronto", "Soon")}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

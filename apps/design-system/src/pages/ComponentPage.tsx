import { Link, useParams } from "react-router-dom";
import { INVENTORY, slugify } from "../data";
import { SHOWCASES } from "../components-registry";
import { useTr } from "../i18n";

export function ComponentPage() {
  const tr = useTr();
  const { slug = "" } = useParams();

  const group = INVENTORY.find((g) => g.items.some((n) => slugify(n) === slug));
  const name = group?.items.find((n) => slugify(n) === slug);
  const entry = SHOWCASES[slug];
  // Render as a component (capitalized) so showcases may use hooks (state, etc.).
  const Showcase = entry?.render;

  return (
    <section className="sec flush">
      <Link to="/componentes" className="back-link">← {tr("Componentes", "Components")}</Link>

      {name ? (
        <>
          <div className="eyebrow"><span>{group?.group}</span></div>
          <h2 className="h2">{name}</h2>
          {entry && Showcase ? (
            <>
              <p className="lead">{tr(entry.es, entry.en)}</p>
              <Showcase />
            </>
          ) : (
            <div className="holder" style={{ marginTop: 8 }}>
              <p>
                {tr(
                  "El showcase en vivo de este componente está en progreso. Por ahora podés verlo en el Storybook del repositorio.",
                  "This component's live showcase is in progress. For now you can see it in the repo's Storybook.",
                )}
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          <h2 className="h2">{tr("Componente no encontrado", "Component not found")}</h2>
          <p className="lead">{tr("Ese componente no existe en el sistema.", "That component doesn't exist in the system.")}</p>
        </>
      )}
    </section>
  );
}

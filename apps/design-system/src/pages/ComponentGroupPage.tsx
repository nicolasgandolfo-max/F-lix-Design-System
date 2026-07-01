import { useEffect } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { GROUP_LABELS, GROUP_SLUGS, INVENTORY, slugify } from "../data";
import { SHOWCASES } from "../components-registry";
import { useTr } from "../i18n";

/** All components of one group (Atoms/Molecules/Organisms) on a single scrollable page. */
export function ComponentGroupPage() {
  const tr = useTr();
  const { groupSlug = "" } = useParams();
  const { hash } = useLocation();
  const group = INVENTORY.find((g) => GROUP_SLUGS[g.group] === groupSlug);

  // Scroll to the requested component whenever the hash changes (Sidebar links use #slug).
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    el?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [hash, group]);

  if (!group) {
    // Support old per-component links (e.g. /componentes/avatar) by redirecting into the group page.
    const legacyGroup = INVENTORY.find((g) => g.items.some((n) => slugify(n) === groupSlug));
    if (legacyGroup) {
      return <Navigate to={`/componentes/${GROUP_SLUGS[legacyGroup.group]}#${groupSlug}`} replace />;
    }
    return (
      <section className="sec flush">
        <Link to="/componentes" className="back-link">← {tr("Componentes", "Components")}</Link>
        <h2 className="h2">{tr("Grupo no encontrado", "Group not found")}</h2>
        <p className="lead">{tr("Ese grupo no existe en el sistema.", "That group doesn't exist in the system.")}</p>
      </section>
    );
  }

  const label = GROUP_LABELS[group.group] ?? { es: group.group, en: group.group };

  return (
    <section className="sec flush">
      <Link to="/componentes" className="back-link">← {tr("Componentes", "Components")}</Link>
      <div className="eyebrow"><span>{tr(label.es, label.en)}</span></div>
      <h2 className="h2">{tr(label.es, label.en)} · {group.items.length}</h2>
      <p className="lead">
        {tr(
          `Todos los componentes de ${label.es.toLowerCase()} del sistema, en una sola página.`,
          `Every ${label.en.toLowerCase()} component in the system, on one page.`,
        )}
      </p>

      <nav className="comp-jump" aria-label={tr("Ir a componente", "Jump to component")}>
        {group.items.map((name) => (
          <a key={name} href={`#${slugify(name)}`} className="comp-jump-link">{name}</a>
        ))}
      </nav>

      {group.items.map((name) => {
        const slug = slugify(name);
        const entry = SHOWCASES[slug];
        const Showcase = entry?.render;
        return (
          <div key={name} id={slug} className="comp-block">
            <h3 className="h3">{name}</h3>
            {entry && Showcase ? (
              <>
                <p className="comp-desc">{tr(entry.es, entry.en)}</p>
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
          </div>
        );
      })}
    </section>
  );
}

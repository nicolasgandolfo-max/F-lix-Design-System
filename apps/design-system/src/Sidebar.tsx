import { Fragment, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CaretRightIcon, PuzzlePieceIcon } from "@phosphor-icons/react";
import { NAV, INVENTORY, GROUP_SLUGS, GROUP_ICONS, ILLUSTRATION_SECTIONS, slugify } from "./data";
import { useLang, useTr } from "./i18n";

function Logo() {
  return (
    <svg viewBox="0 0 218 78" aria-label="Félix" role="img">
      <g fill="currentColor">
        <path d="M101.276 57.9387C97.8253 69.4633 88.3903 77.9978 71.9509 77.9978C53.5844 77.9978 42.9286 66.1531 42.9286 47.8013C42.9286 30.5166 55.106 18.3518 72.5591 18.3518C90.0122 18.3518 101.884 29.5562 101.884 49.9355C101.884 50.8959 101.884 51.6428 101.782 53.0301H64.0331C64.3362 59.4326 67.2792 62.8473 72.4567 62.8473C77.3268 62.8473 79.3564 59.9662 80.067 57.9387H101.276ZM75.3604 16.002L78.2598 0H100.365L97.3806 16.002H75.3604ZM80.7777 41.401C80.1695 35.532 77.5295 32.5441 72.7619 32.5441C67.5865 32.5441 64.8463 35.9588 64.1378 41.401H80.7799H80.7777Z" />
        <path d="M105.802 76.2926V0H127.517V76.2926H105.802Z" />
        <path d="M132.662 0H154.377V16.002H132.662V0ZM132.662 76.2926V20.2726H154.377V76.2905H132.662V76.2926Z" />
        <path d="M173.757 47.8035L155.593 20.2747H180.048C181.976 24.223 184.208 27.6377 186.645 32.4396C188.675 28.2779 190.602 25.0766 193.139 20.2747H216.376C211.506 28.4913 203.996 39.6936 199.126 47.6968C204.504 56.7671 212.52 67.4358 218 76.2926H194.153C190.094 68.823 187.962 65.8352 186.44 62.8473C183.903 67.8626 181.67 71.7042 178.932 76.2926H155.491L173.757 47.8035Z" />
        <path d="M23.2584 50.8806H38.719L42.1525 31.8276H32.3141C15.9598 31.8276 1.7985 42.0543 1.21644 59.3673L0 76.2926H21.4861L23.2584 50.8806Z" />
        <path d="M24.8956 16.762H55.1671L58.2147 0H3.76704C3.76704 0 2.74026 5.05235 2.48738 8.14038C1.4279 21.0195 10.3027 30.2836 23.0884 30.6604L23.9822 30.6756L24.8978 16.762H24.8956Z" />
      </g>
    </svg>
  );
}

const navClass = ({ isActive }: { isActive: boolean }) => (isActive ? "active" : undefined);

export function Sidebar({ onNavigate, open }: { onNavigate: () => void; open: boolean }) {
  const { lang, setLang } = useLang();
  const tr = useTr();
  const { pathname } = useLocation();

  // Groups with nested sub-items (Atoms/Molecules/Organisms/Ilustraciones) start collapsed;
  // they auto-expand while their page is active, and the user can pin them open/closed via
  // the caret — that explicit choice then wins over the auto-expand-on-active default.
  const [manualOpen, setManualOpen] = useState<Record<string, boolean>>({});
  const isGroupOpen = (id: string, active: boolean) => manualOpen[id] ?? active;
  const toggleGroup = (id: string, active: boolean) =>
    setManualOpen((m) => ({ ...m, [id]: !isGroupOpen(id, active) }));

  return (
    <aside className={"sidebar" + (open ? " open" : "")} id="sidebar">
      <NavLink to="/" className="brand" onClick={onNavigate} aria-label="Felix — inicio">
        <Logo />
        <span className="sub">{tr("Sistema de diseño", "Design System")}</span>
        <span className="ver">v1.0.0 · alpha</span>
      </NavLink>

      <nav className="nav" aria-label={tr("Secciones", "Sections")}>
        {NAV.map((g) => (
          <Fragment key={g.group.en}>
            <span className="nav-group">{tr(g.group.es, g.group.en)}</span>
            {g.items.map((it) => {
              const Icon = it.icon;
              if (it.id !== "illustrations") {
                return (
                  <NavLink key={it.id} to={it.path} end={it.end} onClick={onNavigate} className={navClass}>
                    {({ isActive }) => (
                      <>
                        <Icon weight={isActive ? "fill" : "regular"} />
                        <span>{tr(it.es, it.en)}</span>
                      </>
                    )}
                  </NavLink>
                );
              }
              // Illustrations has 4 nested subsections — same collapsible pattern as the
              // Componentes groups below.
              const active = pathname === it.path;
              const expanded = isGroupOpen("illustrations", active);
              return (
                <Fragment key={it.id}>
                  <div className="nav-row">
                    <NavLink to={it.path} onClick={onNavigate} className={navClass}>
                      {({ isActive }) => (
                        <>
                          <Icon weight={isActive ? "fill" : "regular"} />
                          <span>{tr(it.es, it.en)}</span>
                        </>
                      )}
                    </NavLink>
                    <button
                      type="button"
                      className={"nav-caret" + (expanded ? " open" : "")}
                      aria-expanded={expanded}
                      aria-label={expanded ? tr("Colapsar", "Collapse") : tr("Expandir", "Expand")}
                      onClick={() => toggleGroup("illustrations", active)}
                    >
                      <CaretRightIcon />
                    </button>
                  </div>
                  {expanded &&
                    ILLUSTRATION_SECTIONS.map((s) => (
                      <Link key={s.id} to={`/ilustraciones#${s.id}`} onClick={onNavigate} className="sub">
                        <span>{tr(s.es, s.en)}</span>
                      </Link>
                    ))}
                </Fragment>
              );
            })}
          </Fragment>
        ))}

        {/* Componentes — full section with every component linked */}
        <span className="nav-group">{tr("Componentes", "Components")}</span>
        <NavLink to="/componentes" end onClick={onNavigate} className={navClass}>
          {({ isActive }) => (
            <>
              <PuzzlePieceIcon weight={isActive ? "fill" : "regular"} />
              <span>{tr("Visión general", "Overview")}</span>
            </>
          )}
        </NavLink>
        {INVENTORY.map((group) => {
          const groupSlug = GROUP_SLUGS[group.group];
          const GroupIcon = GROUP_ICONS[group.group];
          const active = pathname === `/componentes/${groupSlug}`;
          const expanded = isGroupOpen(groupSlug, active);
          return (
            <Fragment key={group.group}>
              <div className="nav-row">
                <NavLink to={`/componentes/${groupSlug}`} onClick={onNavigate} className={navClass}>
                  {({ isActive }) => (
                    <>
                      <GroupIcon weight={isActive ? "fill" : "regular"} />
                      <span>{group.group}</span>
                    </>
                  )}
                </NavLink>
                <button
                  type="button"
                  className={"nav-caret" + (expanded ? " open" : "")}
                  aria-expanded={expanded}
                  aria-label={expanded ? tr("Colapsar", "Collapse") : tr("Expandir", "Expand")}
                  onClick={() => toggleGroup(groupSlug, active)}
                >
                  <CaretRightIcon />
                </button>
              </div>
              {/* Nested one level deeper — plain Link (not NavLink) so they never pick up an
                  auto "active" class; all items in a group share the same pathname (only the
                  hash differs), so only the group row above should ever look selected. */}
              {expanded &&
                group.items.map((name) => (
                  <Link key={name} to={`/componentes/${groupSlug}#${slugify(name)}`} onClick={onNavigate} className="sub">
                    <span>{name}</span>
                  </Link>
                ))}
            </Fragment>
          );
        })}
      </nav>

      <div className="side-foot">
        <div className="lang" role="group" aria-label={tr("Idioma", "Language")}>
          <button aria-pressed={lang === "es"} onClick={() => setLang("es")}>
            ES
          </button>
          <button aria-pressed={lang === "en"} onClick={() => setLang("en")}>
            EN
          </button>
        </div>
      </div>
    </aside>
  );
}

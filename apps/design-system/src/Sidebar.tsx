import { Fragment } from "react";
import { NAV } from "./data";
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

export function Sidebar({
  active,
  onNavigate,
  open,
}: {
  active: string;
  onNavigate: () => void;
  open: boolean;
}) {
  const { lang, setLang } = useLang();
  const tr = useTr();
  return (
    <aside className={"sidebar" + (open ? " open" : "")} id="sidebar">
      <div className="brand">
        <Logo />
        <span className="sub">{tr("Sistema de diseño", "Design System")}</span>
        <span className="ver">v1.0.0 · alpha</span>
      </div>
      <nav className="nav" aria-label={tr("Secciones", "Sections")}>
        {NAV.map((g) => (
          <Fragment key={g.group.en}>
            <span className="nav-group">{tr(g.group.es, g.group.en)}</span>
            {g.items.map((it) => {
              const Icon = it.icon;
              const isActive = active === it.id;
              return (
                <a
                  key={it.id}
                  href={`#${it.id}`}
                  className={(isActive ? "active" : "") + (it.soon ? " soon" : "")}
                  aria-current={isActive ? "true" : undefined}
                  onClick={onNavigate}
                >
                  <Icon weight={isActive ? "fill" : "regular"} />
                  <span>{tr(it.es, it.en)}</span>
                  {it.tag && <span className="navtag">{tr(it.tag.es, it.tag.en)}</span>}
                </a>
              );
            })}
          </Fragment>
        ))}
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

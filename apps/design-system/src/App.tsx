import { useEffect, useState } from "react";
import { ListIcon } from "@phosphor-icons/react";
import { Sidebar } from "./Sidebar";
import { useTr } from "./i18n";
import {
  Hero,
  StartGrid,
  Principles,
  Colors,
  Typography,
  Illustrations,
  Iconography,
  Components,
  Tokens,
  Editorial,
  Markdown,
  MCP,
  Footer,
} from "./sections";

const SECTION_IDS = [
  "overview",
  "principles",
  "colors",
  "typography",
  "illustrations",
  "iconography",
  "components",
  "tokens",
  "editorial",
  "markdown",
  "mcp",
];

export function App() {
  const tr = useTr();
  const [active, setActive] = useState("overview");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <button className="menu-btn" aria-label={tr("Abrir menú", "Open menu")} onClick={() => setOpen((o) => !o)}>
        <ListIcon size={22} />
      </button>
      <div className={"scrim" + (open ? " show" : "")} onClick={() => setOpen(false)} aria-hidden="true" />
      <div className="shell">
        <Sidebar active={active} open={open} onNavigate={() => setOpen(false)} />
        <main className="main">
          <div className="wrap">
            <Hero />
            <StartGrid />
            <Principles />
            <Colors />
            <Typography />
            <Illustrations />
            <Iconography />
            <Components />
            <Tokens />
            <Editorial />
            <Markdown />
            <MCP />
            <Footer />
          </div>
        </main>
      </div>
    </>
  );
}

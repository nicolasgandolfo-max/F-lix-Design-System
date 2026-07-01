import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ListIcon } from "@phosphor-icons/react";
import { Sidebar } from "./Sidebar";
import { Footer } from "./sections";
import { useTr } from "./i18n";

export function Layout() {
  const tr = useTr();
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  // Reset scroll to top on every navigation, unless the link targets an anchor
  // (component group pages use #slug to jump to a specific component).
  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <button className="menu-btn" aria-label={tr("Abrir menú", "Open menu")} onClick={() => setOpen((o) => !o)}>
        <ListIcon size={22} />
      </button>
      <div className={"scrim" + (open ? " show" : "")} onClick={() => setOpen(false)} aria-hidden="true" />
      <div className="shell">
        <Sidebar open={open} onNavigate={() => setOpen(false)} />
        <main className="main">
          <div className="wrap">
            <Outlet />
            <Footer />
          </div>
        </main>
      </div>
    </>
  );
}

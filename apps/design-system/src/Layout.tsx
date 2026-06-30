import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ListIcon } from "@phosphor-icons/react";
import { Sidebar } from "./Sidebar";
import { Footer } from "./sections";
import { useTr } from "./i18n";

export function Layout() {
  const tr = useTr();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Reset scroll to top on every navigation.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

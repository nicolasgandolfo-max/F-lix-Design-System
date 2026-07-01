import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Layout } from "./Layout";
import {
  Overview,
  Principles,
  Colors,
  Typography,
  Illustrations,
  Tokens,
  Editorial,
  DesignMd,
} from "./sections";
import { ComponentsIndex } from "./pages/ComponentsIndex";
import { ComponentGroupPage } from "./pages/ComponentGroupPage";
import { useTr } from "./i18n";

function NotFound() {
  const tr = useTr();
  return (
    <section className="sec flush">
      <div className="eyebrow"><span>404</span></div>
      <h2 className="h2">{tr("Página no encontrada", "Page not found")}</h2>
      <p className="lead">{tr("Esa ruta no existe en el sistema.", "That route doesn't exist in the system.")}</p>
      <Link className="btn-link" to="/">{tr("← Volver al inicio", "← Back to overview")}</Link>
    </section>
  );
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Overview />} />
        <Route path="principios" element={<Principles />} />
        <Route path="colores" element={<Colors />} />
        <Route path="tipografia" element={<Typography />} />
        <Route path="ilustraciones" element={<Illustrations />} />
        {/* Iconography merged into Illustrations — keep old links working. */}
        <Route path="iconografia" element={<Navigate to="/ilustraciones" replace />} />
        <Route path="componentes" element={<ComponentsIndex />} />
        <Route path="componentes/:groupSlug" element={<ComponentGroupPage />} />
        <Route path="tokens" element={<Tokens />} />
        <Route path="editorial" element={<Editorial />} />
        <Route path="design-md" element={<DesignMd />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

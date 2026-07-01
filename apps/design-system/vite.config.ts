import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

const illustrationsPlugin = {
  name: "illustrations-middleware",
  apply: "serve",
  enforce: "pre",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url?.startsWith("/illustrations/")) {
        const url = new URL(req.url, "http://localhost");
        const fileName = decodeURIComponent(url.pathname.replace("/illustrations/", ""));
        const filePath = path.resolve(__dirname, "public/illustrations", fileName);
        try {
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath);
            res.setHeader("Content-Type", "image/svg+xml");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Content-Length", content.length);
            res.end(content);
            return;
          }
        } catch (e) {
          console.error("Error serving illustration:", e);
        }
      }
      next();
    });
  },
};

export default defineConfig({
  plugins: [illustrationsPlugin, react(), tailwindcss()],
  resolve: {
    alias: {
      // Alias the library theme to source so token edits hot-reload here.
      "@felix/ui/theme.css": path.resolve(__dirname, "../../packages/ui/src/theme.css"),
    },
  },
  server: {
    fs: {
      // Allow importing files from the repo root (e.g. DESIGN.md?raw) in dev.
      allow: [path.resolve(__dirname, "../..")],
    },
  },
});

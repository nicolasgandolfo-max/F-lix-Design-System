import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      // Alias CSS imports to source for hot reload in development
      "@felix/ui/fonts.css": path.resolve(__dirname, "../packages/ui/src/fonts.css"),
      "@felix/ui/theme.css": path.resolve(__dirname, "../packages/ui/src/theme.css"),
    },
  },
});


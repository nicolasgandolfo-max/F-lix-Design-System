import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Alias the library theme to source so token edits hot-reload here.
      "@felix/ui/theme.css": path.resolve(__dirname, "../../packages/ui/src/theme.css"),
    },
  },
});

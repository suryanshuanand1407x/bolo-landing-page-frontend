import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import path from "path";
import { fileURLToPath } from "url";

// Polyfill __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  // Use relative paths for CSS/JS assets
  base: './',

  // Serve from the repository root
  root: __dirname,

  plugins: [
    react(),
    ...(process.env.NODE_ENV !== "production"
      ? [runtimeErrorOverlay()]
      : [])
  ],

  resolve: {
    alias: {
      // point @ → src
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },

  build: {
    // output goes to /dist at repo root
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});

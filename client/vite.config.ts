import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import path from "path";
import { fileURLToPath } from "url";

// Polyfill __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  // Serve from /client locally and on Vercel
  root: path.resolve(__dirname, "client"),

  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID
      ? [
          // only load on Replit in dev
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer()
          ),
        ]
      : []),
  ],

  resolve: {
    alias: {
      // point @ → client/src
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },

  build: {
    // output goes to /dist/public at repo root
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
});
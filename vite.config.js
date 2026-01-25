import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
  server: {
    https: true,
    port: 3000,
    strictPort: true,
  },
  plugins: [react(), tailwindcss(), mkcert()],
  build: {
    sourcemap: true,
  },
  css: {
    devSourcemap: true,
  },
});

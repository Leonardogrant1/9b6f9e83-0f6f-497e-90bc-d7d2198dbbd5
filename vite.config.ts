import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@lib": fileURLToPath(new URL("./lib", import.meta.url)),
      "@src": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [react()],
});

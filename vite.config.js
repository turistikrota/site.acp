import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
  resolve: {
    alias: {
      "@": "/src",
      "~": "/src",
      "~domains": "/src/domains",
      "~subdomains": "/src/domains/root/subdomains",
      "~root": "/",
    },
  },
});

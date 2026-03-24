import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://sub-stack.github.io",
  base: "/company_v4",
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
});

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const [owner = "", repo = ""] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
const isUserOrOrgSite = owner && repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;

const site =
  process.env.SITE ??
  (owner ? `https://${owner}.github.io` : "https://sub-stack.github.io");

const base =
  process.env.BASE ??
  (isUserOrOrgSite ? "/" : repo ? `/${repo}` : "/company_v4");

// https://astro.build/config
export default defineConfig({
  site,
  base,
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
});

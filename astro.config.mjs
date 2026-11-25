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
  // Canonical URLs have no trailing slash, except the homepage.
  // Astro 6 preview rejects the slash form. Production 301s it via vercel.json.
  trailingSlash: "never",
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
});

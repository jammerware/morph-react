import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/morph-react/" : "/",
  plugins: [reactRouter(), tailwindcss()],
});

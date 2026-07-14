import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages project site base path
const REPO_NAME = process.env.VITE_BASE_PATH || "/che-portfolio/";

export default defineConfig({
  plugins: [react()],
  base: REPO_NAME,
});

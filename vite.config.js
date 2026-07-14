import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages 项目页：改成你的仓库名，例如 /che-portfolio/
// 若用 username.github.io 根域名，改为 base: '/'
const REPO_NAME = process.env.VITE_BASE_PATH || "/che-portfolio/";

export default defineConfig({
  plugins: [react()],
  base: REPO_NAME,
});

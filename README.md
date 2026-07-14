# Che Portfolio · 个人作品集网站

车行 / Ian Che 的双语个人作品集（React + Vite），参考组员 Ethan 的站点风格，展示 X-TechInsight、Avocado 等项目。

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开 http://localhost:5173

## 构建

```bash
npm run build
npm run preview
```

## 部署到 GitHub Pages（公网可访问）

### 1. 创建 GitHub 仓库

在 GitHub 新建仓库，例如：`che-portfolio`（名字与 `vite.config.js` 里 `REPO_NAME` 一致）

### 2. 推送代码

```bash
git init
git add .
git commit -m "feat: personal portfolio site"
git branch -M main
git remote add origin https://github.com/<你的用户名>/che-portfolio.git
git push -u origin main
```

### 3. 开启 GitHub Pages

仓库 → **Settings** → **Pages** → Source 选 **GitHub Actions**

推送 `main` 分支后，Actions 会自动构建部署。

### 4. 访问

```
https://<你的用户名>.github.io/che-portfolio/
```

若仓库名不是 `che-portfolio`，需同时修改：
- `vite.config.js` 中的 `REPO_NAME`
- `.github/workflows/deploy.yml` 中的 `VITE_BASE_PATH`

## 功能

- 中英文一键切换
- 深色科技风 UI + 滚动动画
- X-TechInsight 在线 Demo 链接
- 响应式（手机/桌面）

## 技术栈

React · Vite · CSS · react-icons · GitHub Pages

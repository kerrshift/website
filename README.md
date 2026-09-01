# Kerrshift Website

Lightweight organization web application for **kerrshift.com**, built with Astro, React, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build/) (Static Site Generation / Island Architecture)
- **UI & Islands**: React 19 (`@astrojs/react`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Package Manager**: `pnpm`
- **Hosting**: Cloudflare Pages

---

## 🛠️ Getting Started

### Install Dependencies
```bash
pnpm install
```

### Run Local Development Server
```bash
pnpm dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser.

### Build for Production
```bash
pnpm build
```
The output directory will be `dist/`.

---

## ☁️ Cloudflare Pages Deployment Settings

When setting up your repository in Cloudflare Pages:

- **Framework preset**: `Astro` (or `None`)
- **Build command**: `pnpm build`
- **Build output directory**: `dist`
- **Node.js version**: `20.x` or higher (e.g. `NODE_VERSION: 20` environment variable)

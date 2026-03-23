# 💧 AquaComply — LWMR 2024 Compliance Platform

Multi-plant STP compliance dashboard built for LWMR 2024 (Gazette No. 3982).  
Covers Pirana, Vadaj & Odhav STPs in Ahmedabad. Three role-based dashboards:  
**Operations Manager · Plant Operator · Govt. Officer (GPCB/CPCB)**

---

## 🗂 Project Structure

```
aquacomply/
├── index.html          ← Vite HTML entry point
├── vite.config.js      ← Vite + React config
├── package.json        ← Dependencies
├── netlify.toml        ← Netlify build + redirect rules
├── .gitignore
└── src/
    ├── main.jsx        ← React DOM root
    └── App.jsx         ← Entire application (single-file)
```

---

## 🚀 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

---

## 📦 GitHub → Netlify Deployment (Step-by-Step)

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — AquaComply light theme"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aquacomply.git
git push -u origin main
```

### Step 2 — Connect to Netlify

1. Go to [https://app.netlify.com](https://app.netlify.com) and sign in
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize Netlify
4. Select your `aquacomply` repository
5. Netlify will auto-detect settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **"Deploy site"**

### Step 3 — Done!

Your site will be live at a URL like `https://aquacomply-abc123.netlify.app`

> Every `git push` to `main` will auto-deploy via Netlify CI/CD.

---

## ⚙️ Tech Stack

| Layer | Library |
|---|---|
| UI Framework | React 18 |
| Charts | Recharts |
| Icons | Lucide React |
| Bundler | Vite 5 |
| Hosting | Netlify |

---

## 📋 Regulatory Framework

- **LWMR 2024** — Liquid Waste Management Rules  
- Gazette No. 3982 · MoEFCC, Government of India  
- Effective: October 1, 2025  
- CPCB STP discharge standards  
- GPCB state-level audit compliance  

---

*AquaComply v1.0 · Logicrest Technologies Pvt. Ltd. · CONFIDENTIAL*

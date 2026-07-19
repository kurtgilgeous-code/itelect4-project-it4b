# Campus Lost & Found — 8‑Bit Dashboard

A lightweight demo app for tracking found items and claim workflows with a playful 8‑bit UI.

**Quick Start**

- Install dependencies:

  `npm install`
- Run the dev server:

  `npm run dev`
- Build for production:

  `npm run build`

**Project Highlights**

- Status-aware item sorting (Pending → Approved → Rejected → Unclaimed)
- Selectable users and items; `Switch Profile` cycles to the next user
- Simple mock data in `src/App.tsx` for demo and testing

**Important Files**

- App entry and main UI: [src/App.tsx](src/App.tsx)
- User card component: [src/components/UserCard.tsx](src/components/UserCard.tsx)
- Item card component: [src/components/ItemCard.tsx](src/components/ItemCard.tsx)
- Claim display: [src/components/ClaimBadge.tsx](src/components/ClaimBadge.tsx)
- Types and domain models: [src/types/index.ts](src/types/index.ts)

**Development Notes**

- The app is built with Vite + React + TypeScript. If you see type-only import warnings, ensure TypeScript is at a compatible version.
- `npm run build` has been verified locally and produces a working production bundle.

**Pushing to GitHub**

1. Create a repo on GitHub and copy its remote URL.
2. From the project root run:

  `git init`
  `git add .`
  `git commit -m "Initial commit — Campus Lost & Found"`
  `git branch -M main`
  `git remote add origin <YOUR_REMOTE_URL>`
  `git push -u origin main`

**License**

MIT — feel free to change.

---

If you'd like, I can open a branch, create a starter commit, or prepare a minimal `.github/workflows/` CI file for you.# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

# Rocchio Project

Public investment website built with React, Vite, and Tailwind CSS. The site is independent of Base44 and can be hosted as a static site on GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Checks

```bash
npm run lint
npm run build
```

## Partner inquiry form

The Partner with Us form submits through FormSubmit to `eshahib@hotmail.com`. FormSubmit may send a one-time confirmation email before the first submission is delivered.

## GitHub Pages deployment

1. Push the repository to GitHub.
2. In GitHub, open **Settings → Pages**.
3. Select **GitHub Actions** as the source.
4. Add a Vite/GitHub Pages deployment workflow, or deploy the generated `dist/` directory through your preferred static hosting workflow.

The app has no required backend environment variables, authentication service, or Base44 configuration.

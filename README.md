# ELEGIDA Habana 🛍️

Tienda online de moda exclusiva en La Habana.

## Stack
- React + Vite + TypeScript
- Tailwind CSS
- Supabase (PostgreSQL + Auth + Storage)
- GitHub Pages + GitHub Actions
- PWA con Workbox

## Desarrollo local
1. Copiar `.env.example` a `.env` y rellenar con credenciales de Supabase
2. `npm install`
3. `npm run dev`

## Deploy
Push a `main` → GitHub Actions despliega automáticamente a GitHub Pages.

## Variables de entorno (GitHub Secrets)
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
# SmartBoard.Ai — Full Prototype
**Author:** Nazereke Kairatkyzy (nazerkekajratkyzy6@gmail.com)

This is a ready-to-deploy prototype containing:
- React frontend with interactive board, AI panel stub, formula rendering (KaTeX), simple mini-games and placeholders for 3D/AR.
- Socket.io server for realtime sync (server/index.js)
- Firebase client skeleton (src/firebase.js) — paste your config to enable DB features
- Instructions for Vercel deployment included below.

## Quick start (local development)
1. `npm install`
2. `npm run start` to run Vite dev server
3. `node server/index.js` to run socket.io server (optional)

## Deploy on Vercel
1. Push repo to GitHub.
2. Import project to Vercel (Framework: Vite).
3. Vercel will run `npm run build`. The project is already configured for Vercel.

Notes: AI features are placeholder calls — add your OpenAI / Wolfram / Math API keys in src/services/aiService.js

# Divina Client

React + Vite frontend for the Divina web programming project.

## Local development

Create a `.env` file from `.env.example`:

```env
VITE_API_URL=http://localhost:8000/api
```

Then run:

```bash
npm install
npm run dev
```

## Vercel deployment

Deploy this folder as the frontend project:

- Root Directory: `divina-client`
- Build Command: `npm run build`
- Output Directory: `dist`

Set this Vercel environment variable:

```env
VITE_API_URL=https://<your-real-server-project>.vercel.app/api
```

Replace the placeholder with the actual deployed `divina-server` URL. Do not use
`your-divina-server.vercel.app`; that is only placeholder text.

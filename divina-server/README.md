# Divina Server

Express + MongoDB API for the Divina web programming project.

## Local development

Create a `.env` file from `.env.example`, then run:

```bash
npm install
npm run dev
```

## Vercel deployment

Deploy this folder as the API project:

- Root Directory: `divina-server`
- Framework Preset: Other
- Build Command: leave empty, or use the default from `vercel.json`

Set these Vercel environment variables:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/webprog?retryWrites=true&w=majority
JWT_SECRET=replace-with-a-strong-secret
NODE_ENV=production
CLIENT_URL=https://helping-seb.vercel.app
```

After deployment, verify:

```txt
https://<your-real-server-project>.vercel.app/api/health
```

Use the deployed server URL in the client as:

```env
VITE_API_URL=https://<your-real-server-project>.vercel.app/api
```

Replace the placeholder with the actual server deployment URL from Vercel.

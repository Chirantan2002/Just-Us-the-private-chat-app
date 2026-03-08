# Just‑Us — Private Chat App

A lightweight, open‑source private chat application built with **Next.js**, **Elysia** (API framework), and **Upstash Redis / Realtime**. The goal is to provide ephemeral, two‑person chat rooms with a minimal footprint and real‑time messaging powered by serverless-friendly technologies.

---

## 🔍 Overview

- Users enter a username and create or join a randomly generated room.
- Rooms are limited to **two participants** and expire after 10 minutes of inactivity.
- Messages are persisted in Upstash Redis and broadcast via Upstash Realtime.
- Authentication is handled via short-lived tokens stored in cookies and validated on every request.
- CORS support allows the frontend (Next.js) to communicate with the backend API even when served from a custom domain like `e.ly`.


## 🚀 Features

- ✅ One‑time room creation with unique ID
- ✅ Simple username prompt (no registration)
- ✅ Real‑time message streaming using Upstash Realtime
- ✅ Expiry & cleanup of stale rooms/messages
- ✅ Server‑side API built with **Elysia** middleware and schema validation
- ✅ Client‑side API generated with `treaty` + React Query
- ✅ Portable: environment‑variable driven (Upstash credentials)


## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16 (app router), React 19, Tailwind CSS |
| API | Elysia, @elysiajs/cors, zod for input validation |
| Realtime | @upstash/realtime |
| Data store | @upstash/redis (serverless Redis) |
| Utils | nanoid, react-query, treaty, date-fns |


## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Upstash account (free tier is sufficient)

### Environment

Create a `.env.local` (or `.env`) file in the project root with the following variables:

```env
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000 # used by treaty client
```

### Install & Run

```bash
npm install
npm run dev      # start Next.js development server
```

The app will be available at `http://localhost:3000`.


## 📁 Project Structure

```
├── src/ 
    ├── lib/ 
    │   ├── redis.ts
    │   ├── realtime-client.ts
    │   ├── client.ts
    │   └── realtime.ts 
    ├── app/ 
    │   ├── favicon.ico
    │   ├── api/ 
    │   │   ├── realtime/ 
    │   │   │   └── route.ts
    │   │   └── [[...slugs]]/ 
    │   │   │   ├── auth.ts 
    │   │   │   └── route.ts 
    │   ├── _components/ 
    │   │   └── Provider.tsx
    │   ├── globals.css 
    │   ├── layout.tsx 
    │   ├── page.tsx 
    │   └── room/ 
    │   │   └── [roomId]/ 
    │   │       └── page.tsx 
    ├── components/ 
    │   ├── providers.tsx
    │   └── DotGrid.tsx 
    ├── hooks/ 
    │   └── use-username.ts 
    └── proxy.ts 
├── public/ 
    └── website_logo.png
├── vercel.json
├── postcss.config.mjs
├── next.config.ts
├── eslint.config.mjs
├── .gitignore 
├── tsconfig.json 
├── package.json 
├── LICENSE 
└── README.md 
```


## 🧪 Testing & Validation

- Lint: `npm run lint`
- (No automated tests included yet—contributions welcome!)


## 🗄️ Redis Schema & Expiry

- `meta:{roomId}` — hash storing connected tokens and creation timestamp
- `messages:{roomId}` — list of chat messages (max length unbounded)
- Rooms automatically expire after 10 minutes (600 seconds) using Redis TTL.


## 🔧 Deployment

For production you can deploy this as a standard Next.js app (Vercel, Netlify, etc.).
Ensure environment variables are set in your hosting provider.

Upstash handles the Redis and realtime backend without additional configuration.


## 💡 Tips

- The front‑end includes a `/ping` endpoint for a simple Redis connectivity check.
- You can change `ROOM_TTL_SECONDS` in `route.ts` to adjust expiration.
- CORS is enabled with `@elysiajs/cors` plugin; adjust allowed origins as needed.


## 📜 License

MIT © Just‑Us Chat App

---

Enjoy building lovely, ephemeral conversations! Contributions, bug reports, and feature requests are very welcome 😊

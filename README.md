# ERP Tools

A real-time ERP platform built with Next.js (client) and Express/Socket.IO (server). It includes modules for Chat, Inventory, Meetings, and Internal Requisitions.

---

## Project Structure

```
ERP-tools/
├── client/          # Next.js frontend
├── server/          # Express/Socket.IO backend
└── README.md
```

---

## Modules

- **Chat** — Real-time private and group messaging
- **Inventory** — Asset tracking, batch management, and stock movements
- **Meetings** — Meeting scheduling and management
- **Internal Requisitions** — Department-level request and approval workflows

---

## Getting Started

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Set up environment variables

**Client** — copy `client/env.example.txt` to `client/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
NEXT_PUBLIC_SOCKET_SERVER_URL=http://localhost:5001
```

**Server** — copy `server/env.example.txt` to `server/.env`:

```env
PORT=5001
CORS_ORIGIN=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

### 3. Start development servers

```bash
npm run dev
```

This starts both the client (port 3000) and server (port 5001) concurrently.

---

## Environment Variables

### Client

| Variable                        | Description          | Default                     |
| ------------------------------- | -------------------- | --------------------------- |
| `NEXT_PUBLIC_API_URL`           | Express API base URL | `http://localhost:5001/api` |
| `NEXT_PUBLIC_SOCKET_SERVER_URL` | Socket.IO server URL | `http://localhost:5001`     |

### Server

| Variable      | Description               | Default       |
| ------------- | ------------------------- | ------------- |
| `PORT`        | Server port               | `5001`        |
| `CORS_ORIGIN` | Allowed CORS origins      | `*`           |
| `MONGODB_URI` | MongoDB connection string | _(required)_  |
| `NODE_ENV`    | Environment mode          | `development` |

---

## Available Scripts

### Root

| Script                | Description                            |
| --------------------- | -------------------------------------- |
| `npm run install:all` | Install dependencies for all projects  |
| `npm run dev`         | Start client and server in development |
| `npm run build`       | Build client for production            |
| `npm start`           | Start client and server in production  |

### Client (`client/`)

| Script          | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start Next.js dev server |
| `npm run build` | Build for production     |
| `npm start`     | Start production server  |

### Server (`server/`)

| Script        | Description                       |
| ------------- | --------------------------------- |
| `npm run dev` | Start with nodemon (auto-restart) |
| `npm start`   | Start production server           |

---

## Production

1. Build the client:

   ```bash
   npm run build
   ```

2. Update environment variables for production (set `CORS_ORIGIN` to your actual client domain).

3. Start the servers:
   ```bash
   npm start
   ```

---

## Deployment Notes

- **Never commit `.env` files** to version control
- **CORS** — set `CORS_ORIGIN` to your production client domain in production
- **HTTPS** — use HTTPS for secure WebSocket connections in production
- **Load balancing** — configure sticky sessions for Socket.IO if deploying behind a load balancer

---

## Troubleshooting

| Issue                 | Fix                                                             |
| --------------------- | --------------------------------------------------------------- |
| Connection issues     | Verify both client and server are running with correct env vars |
| CORS errors           | Ensure `CORS_ORIGIN` matches the client URL                     |
| Port conflicts        | Check that ports 3000 and 5001 are available                    |
| Socket not connecting | Confirm `NEXT_PUBLIC_SOCKET_SERVER_URL` points to the server    |

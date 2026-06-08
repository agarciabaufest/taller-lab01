# FlowOps – Frontend

React web application that provides a **Login** screen and a **Welcome** (dashboard) screen for the FlowOps JWT backend.

---

## Tech stack

| Tool | Purpose |
|------|---------|
| [React 19](https://react.dev/) | UI library |
| [Vite 8](https://vite.dev/) | Build tool & dev server |
| [React Router 7](https://reactrouter.com/) | Client-side routing |
| Inter (Google Fonts) | Typography |
| CSS Modules | Component-scoped styles |

Design follows the **FlowOps Surgical Precision** system defined in [`DESIGN.md`](../DESIGN.md).

---

## Pages

| Route | Description | Access |
|-------|-------------|--------|
| `/login` | Login form – calls `POST /auth/login` and stores tokens in `sessionStorage` | Public |
| `/welcome` | Welcome dashboard with session info cards | Protected (requires login) |
| `/*` | Redirects to `/login` | – |

---

## Session management

- Tokens are persisted in `sessionStorage` (cleared when the browser tab is closed).
- The access token (valid for 300 seconds) is refreshed automatically 30 seconds before expiry using `POST /auth/refresh`.
- Unauthenticated access to `/welcome` redirects to `/login`.

---

## Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- The backend running at `http://localhost:8000` (see [`backend/README.md`](../backend/README.md))

---

## Getting started

### 1. Start the backend

```bash
cd backend
poetry install
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Or with Docker Compose:

```bash
cd backend
docker compose up --build
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app is available at **http://localhost:5173**.

The Vite dev server proxies `/auth/*` and `/health` requests to `http://localhost:8000`, so no CORS configuration is needed during development.

---

## Build for production

```bash
npm run build
```

Static files are output to `frontend/dist/`. Serve them with any static-file server (nginx, `vite preview`, etc.) and make sure the frontend can reach the backend API.

If the backend is at a different URL, set the environment variable before building:

```bash
VITE_API_URL=https://api.example.com npm run build
```

### Preview the production build locally

```bash
npm run preview
```

---

## Default credentials

The backend ships with a single pre-configured user:

| Username | Password |
|----------|----------|
| `admin` | `admin123` |

---

## Available scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

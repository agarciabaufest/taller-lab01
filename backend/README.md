# JWT Backend API

FastAPI application that implements **JSON Web Token (JWT)** authentication. Built with Python and managed with [Poetry](https://python-poetry.org/).

## Features

- **Login endpoint** – validates credentials and returns an access token (expires in 300 seconds) and a refresh token.
- **Refresh endpoint** – issues a new access token using a valid refresh token.
- **Health check endpoint** – simple liveness probe.
- Docker-ready (Dockerfile + docker-compose).

## Tech stack

| Tool | Purpose |
|------|---------|
| [FastAPI](https://fastapi.tiangolo.com/) | Web framework |
| [python-jose](https://python-jose.readthedocs.io/) | JWT encoding / decoding |
| [passlib](https://passlib.readthedocs.io/) | Password hashing (pbkdf2_sha256) |
| [uvicorn](https://www.uvicorn.org/) | ASGI server |
| [Poetry](https://python-poetry.org/) | Dependency management |

---

## Getting started

### Prerequisites

- Python ≥ 3.11
- [Poetry](https://python-poetry.org/docs/#installation)
- Docker & Docker Compose (optional, for container deployment)

---

### Run locally with Poetry

```bash
# 1. Navigate to the backend folder
cd backend

# 2. Install dependencies
poetry install

# 3. Start the server
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`.  
Interactive docs (Swagger UI) are at `http://localhost:8000/docs`.

---

### Run with Docker Compose

```bash
# From the backend folder
docker compose up --build
```

The service will start on port **8000**.

---

## API Reference

### `POST /auth/login`

Authenticate a user and receive tokens.

**Request body** (JSON):

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Success response** `200 OK`:

```json
{
  "access_token": "<JWT access token>",
  "refresh_token": "<JWT refresh token>",
  "token_type": "bearer",
  "expires_in": 300
}
```

**Error response** `401 Unauthorized` – invalid credentials.

---

### `POST /auth/refresh`

Obtain a new access token using a valid refresh token.

**Request body** (JSON):

```json
{
  "refresh_token": "<JWT refresh token>"
}
```

**Success response** `200 OK`:

```json
{
  "access_token": "<new JWT access token>",
  "token_type": "bearer",
  "expires_in": 300
}
```

**Error response** `401 Unauthorized` – invalid or expired refresh token.

---

### `GET /health`

Simple health check.

**Success response** `200 OK`:

```json
{ "status": "ok" }
```

---

## Usage example (curl)

```bash
# 1. Login
TOKEN_RESPONSE=$(curl -s -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}')

ACCESS_TOKEN=$(echo $TOKEN_RESPONSE | python3 -c "import sys,json; print(json.load(sys.stdin)['access_token'])")
REFRESH_TOKEN=$(echo $TOKEN_RESPONSE | python3 -c "import sys,json; print(json.load(sys.stdin)['refresh_token'])")

echo "Access token: $ACCESS_TOKEN"

# 2. Refresh the access token
curl -s -X POST http://localhost:8000/auth/refresh \
  -H "Content-Type: application/json" \
  -d "{\"refresh_token\": \"$REFRESH_TOKEN\"}"
```

---

## Token details

| Token | Expiry | Purpose |
|-------|--------|---------|
| Access token | 300 seconds | Authorize API requests |
| Refresh token | 7 days | Obtain new access tokens |

Tokens are signed with HS256. The secret key is configured via the `SECRET_KEY` environment variable (see `docker-compose.yml`).

> **⚠️ Production note:** Replace `SECRET_KEY` with a long, randomly generated value and store it securely (e.g. environment variable, secrets manager).

---

## Running tests

```bash
cd backend
poetry install
poetry run pytest
```

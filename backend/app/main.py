from fastapi import FastAPI, HTTPException, status
from jose import JWTError
from pydantic import BaseModel

from app.auth import (
    ACCESS_TOKEN_EXPIRE_SECONDS,
    authenticate_user,
    create_access_token,
    create_refresh_token,
    decode_token,
)

app = FastAPI(title="JWT Auth API", version="1.0.0")


# ---------------------------------------------------------------------------
# Request / Response schemas
# ---------------------------------------------------------------------------

class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int = ACCESS_TOKEN_EXPIRE_SECONDS


class RefreshRequest(BaseModel):
    refresh_token: str


class AccessTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int = ACCESS_TOKEN_EXPIRE_SECONDS


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@app.post("/auth/login", response_model=TokenResponse, status_code=status.HTTP_200_OK)
def login(request: LoginRequest):
    """Authenticate user and return access + refresh tokens."""
    user = authenticate_user(request.username, request.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token_data = {"sub": user["username"]}
    access_token = create_access_token(token_data)
    refresh_token = create_refresh_token(token_data)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
    )


@app.post(
    "/auth/refresh",
    response_model=AccessTokenResponse,
    status_code=status.HTTP_200_OK,
)
def refresh_token(request: RefreshRequest):
    """Issue a new access token using a valid refresh token."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired refresh token",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decode_token(request.refresh_token)
    except JWTError:
        raise credentials_exception

    if payload.get("type") != "refresh":
        raise credentials_exception

    username: str = payload.get("sub")
    if not username:
        raise credentials_exception

    new_access_token = create_access_token({"sub": username})
    return AccessTokenResponse(access_token=new_access_token)


@app.get("/health")
def health():
    """Health check endpoint."""
    return {"status": "ok"}

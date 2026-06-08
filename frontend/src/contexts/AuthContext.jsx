import { useCallback, useEffect, useState } from 'react';
import { refreshToken } from '../services/api';
import { AuthContext } from './authContext';

const SESSION_KEY = 'flowops_session';

function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(data) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => loadSession());

  const signIn = useCallback((tokenResponse) => {
    const data = {
      accessToken: tokenResponse.access_token,
      refreshToken: tokenResponse.refresh_token,
      expiresAt: Date.now() + tokenResponse.expires_in * 1000,
    };
    saveSession(data);
    setSession(data);
  }, []);

  const signOut = useCallback(() => {
    clearSession();
    setSession(null);
  }, []);

  // Silently refresh the access token before it expires
  useEffect(() => {
    if (!session) return;

    const msUntilExpiry = session.expiresAt - Date.now();
    const refreshIn = Math.max(msUntilExpiry - 30_000, 0); // refresh 30s before expiry

    const timer = setTimeout(async () => {
      try {
        const result = await refreshToken(session.refreshToken);
        const updated = {
          ...session,
          accessToken: result.access_token,
          expiresAt: Date.now() + result.expires_in * 1000,
        };
        saveSession(updated);
        setSession(updated);
      } catch {
        signOut();
      }
    }, refreshIn);

    return () => clearTimeout(timer);
  }, [session, signOut]);

  const isAuthenticated = Boolean(session);

  return (
    <AuthContext.Provider value={{ session, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

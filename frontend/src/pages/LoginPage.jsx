import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import { login } from '../services/api';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(username, password);
      signIn(data);
      navigate('/welcome', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.background}>
        <div className={styles.gradientOrb} />
      </div>

      <main className={styles.main}>
        <div className={styles.cardShell}>
          <div className={styles.card}>
            <div className={styles.header}>
              <span className={styles.badge}>FlowOps</span>
              <h1 className={styles.title}>Welcome back</h1>
              <p className={styles.subtitle}>Sign in to your account to continue</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  className={styles.input}
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  className={styles.input}
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {error && (
                <div className={styles.errorBox} role="alert">
                  {error}
                </div>
              )}

              <button
                className={styles.btnPrimary}
                type="submit"
                disabled={loading || !username || !password}
              >
                {loading ? (
                  <span className={styles.spinner} aria-hidden="true" />
                ) : null}
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>

            <p className={styles.hint}>
              Default credentials: <strong>admin</strong> / <strong>admin123</strong>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

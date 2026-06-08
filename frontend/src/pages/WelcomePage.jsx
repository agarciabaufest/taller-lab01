import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import styles from './WelcomePage.module.css';

export default function WelcomePage() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate('/login', { replace: true });
  }

  return (
    <div className={styles.page}>
      <div className={styles.background}>
        <div className={styles.gradientOrbTop} />
        <div className={styles.gradientOrbBottom} />
      </div>

      <header className={styles.topBar}>
        <span className={styles.brand}>FlowOps</span>
        <button className={styles.btnOutline} onClick={handleSignOut}>
          Sign out
        </button>
      </header>

      <main className={styles.main}>
        <div className={styles.heroSection}>
          <span className={styles.badge}>Dashboard</span>
          <h1 className={styles.heroTitle}>
            Welcome to<br />
            <span className={styles.heroAccent}>FlowOps</span>
          </h1>
          <p className={styles.heroSubtitle}>
            You have successfully authenticated. Your session is active and all
            features are available to you.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.cardShell}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h2 className={styles.cardTitle}>Authenticated</h2>
              <p className={styles.cardBody}>
                Your identity has been verified with a JWT access token. The session
                refreshes automatically before expiry.
              </p>
            </div>
          </div>

          <div className={styles.cardShell}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h2 className={styles.cardTitle}>Session Active</h2>
              <p className={styles.cardBody}>
                Your token expires in 5 minutes and renews silently. Closing the
                browser tab will end the session.
              </p>
            </div>
          </div>

          <div className={styles.cardShell}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <h2 className={styles.cardTitle}>Ready to Work</h2>
              <p className={styles.cardBody}>
                Explore the FlowOps dashboard, manage workflows, and monitor your
                operations from a single pane.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

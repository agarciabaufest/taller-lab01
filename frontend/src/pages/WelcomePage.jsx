import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import styles from './WelcomePage.module.css';

const MS_CERTIFICATIONS = [
  {
    code: 'AI-901',
    level: 'Fundamentals',
    title: 'Azure AI Fundamentals',
    description:
      'New for 2026. Validates foundational knowledge of AI concepts and Azure AI Foundry. Covers responsible AI, generative AI, and implementing AI solutions with Microsoft Foundry.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    code: 'DP-700',
    level: 'Associate',
    title: 'Fabric Data Engineer Associate',
    description:
      'Demonstrates expertise in designing, building, and maintaining data solutions in Microsoft Fabric. Covers data ingestion, transformation, and real-time analytics pipelines.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
      </svg>
    ),
  },
  {
    code: 'SC-900',
    level: 'Fundamentals',
    title: 'Security, Compliance & Identity Fundamentals',
    description:
      'Covers foundational knowledge of security, compliance, and identity across cloud and related Microsoft services, including Microsoft Entra, Defender, and Purview.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    code: 'AZ-305',
    level: 'Expert',
    title: 'Azure Solutions Architect Expert',
    description:
      'Validates advanced skills in designing cloud and hybrid solutions on Azure, including compute, network, storage, monitoring, identity, and governance architectures.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    code: 'SC-200',
    level: 'Associate',
    title: 'Security Operations Analyst Associate',
    description:
      'Covers threat investigation and mitigation using Microsoft Sentinel, Microsoft Defender for Cloud, and Microsoft 365 Defender for proactive security operations.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    code: 'MS-900',
    level: 'Fundamentals',
    title: 'Microsoft 365 Fundamentals',
    description:
      'Demonstrates understanding of cloud services, Microsoft 365 productivity apps, security, compliance, privacy, and trust in Microsoft 365 environments.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

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

        <div className={styles.certSection}>
          <div className={styles.heroSection}>
            <span className={styles.badge}>Microsoft Learn</span>
            <h2 className={styles.certTitle}>Microsoft Certifications 2026</h2>
            <p className={styles.heroSubtitle}>
              Explore the latest Microsoft certifications to validate your skills and advance your career in cloud, AI, security, and data.
            </p>
          </div>

          <div className={styles.grid}>
            {MS_CERTIFICATIONS.map((cert) => (
              <div key={cert.code} className={styles.cardShell}>
                <div className={styles.card}>
                  <div className={styles.cardIcon}>{cert.icon}</div>
                  <div className={styles.certMeta}>
                    <span className={`${styles.certLevel} ${styles[`certLevel${cert.level}`]}`}>
                      {cert.level}
                    </span>
                    <span className={styles.certCode}>{cert.code}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{cert.title}</h3>
                  <p className={styles.cardBody}>{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

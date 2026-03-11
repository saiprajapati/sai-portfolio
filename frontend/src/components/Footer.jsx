import { personal } from '../data'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '2.5rem 1.5rem',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.3rem',
          fontWeight: 600,
          color: 'var(--text)',
          marginBottom: 6,
        }}>
          Sai Prajapati<span style={{ color: 'var(--gold)' }}>.</span>
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--text-subtle)',
          letterSpacing: '0.15em',
        }}>
          © {new Date().getFullYear()} · Built with React + FastAPI · Designed with intent
        </p>
      </div>
    </footer>
  )
}

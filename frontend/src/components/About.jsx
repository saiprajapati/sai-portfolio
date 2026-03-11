import { motion } from 'framer-motion'
import { MapPin, GraduationCap, Calendar, Download } from 'lucide-react'
import { personal, stats, certifications } from '../data'
import saiPhoto from '../assets/sai.jpg'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
})

export default function About() {
  return (
    <section id="about" style={{ background: 'var(--bg-surface)' }}>
      <div className="section-pad">
        <motion.div {...fadeUp(0)}>
          <p className="section-label">About Me</p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '4rem',
          alignItems: 'start',
          marginTop: '1rem',
        }}>
          {/* Left — photo + text */}
          <div>
            {/* Photo */}
            <motion.div
              {...fadeUp(0.08)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.75rem',
                marginBottom: '2rem',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                {/* Animated ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    inset: -6,
                    borderRadius: '50%',
                    border: '1px dashed var(--gold-dim)',
                    opacity: 0.5,
                  }}
                />
                <img
                  src={saiPhoto}
                  alt="Sai Prajapati"
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    border: '2px solid var(--gold)',
                    boxShadow: '0 0 30px var(--border-glow)',
                    display: 'block',
                  }}
                />
                {/* Available dot */}
                <div style={{
                  position: 'absolute',
                  bottom: 6, right: 4,
                  width: 14, height: 14,
                  borderRadius: '50%',
                  background: '#2ecc71',
                  border: '2px solid var(--bg-surface)',
                  boxShadow: '0 0 8px #2ecc7180',
                }} />
              </div>

              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                  lineHeight: 1.2,
                }}>Sai Prajapati</h3>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--gold)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginTop: 4,
                }}>Software & ML Engineer</p>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  marginTop: 6,
                }}>VIT Bhopal · IIT Mandi</p>
              </div>
            </motion.div>

            <motion.h2 {...fadeUp(0.1)} className="section-heading">
              Building at the edge of<br />
              <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>ML & Engineering</em>
            </motion.h2>

            <motion.p {...fadeUp(0.2)} style={{
              color: 'var(--text-muted)',
              lineHeight: 1.85,
              marginBottom: '1.5rem',
              fontSize: '0.95rem',
            }}>
              {personal.bio}
            </motion.p>

            <motion.div {...fadeUp(0.3)} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {[
                { icon: <MapPin size={14} />,        text: personal.location },
                { icon: <GraduationCap size={14} />, text: `${personal.degree} · ${personal.university}` },
                { icon: <GraduationCap size={14} />, text: personal.minor },
                { icon: <Calendar size={14} />,      text: `Graduating ${personal.graduationYear}` },
              ].map(({ icon, text }) => (
                <div key={text} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  color: 'var(--text-muted)',
                }}>
                  <span style={{ color: 'var(--gold)', flexShrink: 0 }}>{icon}</span>
                  {text}
                </div>
              ))}
            </motion.div>

            <motion.a {...fadeUp(0.4)} href="/Sai_Prajapati_Resume.pdf" download className="btn-primary"
               style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Download size={14} />
              Download Resume
            </motion.a>
          </div>

          {/* Right — stats + certs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Stats grid */}
            <motion.div {...fadeUp(0.15)} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1px',
              background: 'var(--border)',
            }}>
              {stats.map(({ value, label }) => (
                <div key={label} style={{
                  background: 'var(--bg-card)',
                  padding: '1.5rem',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.4rem',
                    fontWeight: 700,
                    color: 'var(--gold)',
                    lineHeight: 1,
                    marginBottom: 4,
                  }}>{value}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                  }}>{label}</div>
                </div>
              ))}
            </motion.div>

            {/* Certifications */}
            <motion.div {...fadeUp(0.25)}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-subtle)',
                marginBottom: '0.75rem',
              }}>Certifications</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {certifications.map((c) => (
                  <div key={c.name} className="card" style={{ padding: '0.85rem 1rem', display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ fontSize: '1.2rem' }}>{c.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text)', fontWeight: 500 }}>{c.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{c.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

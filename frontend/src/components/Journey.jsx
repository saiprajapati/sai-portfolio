import { useState } from 'react'
import { motion } from 'framer-motion'
import { experience, education } from '../data'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
})

function TimelineItem({ item, index, type }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        display: 'flex',
        gap: '1.5rem',
        position: 'relative',
      }}
    >
      {/* Timeline line + dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: 10, height: 10,
          borderRadius: '50%',
          background: 'var(--gold)',
          border: '2px solid var(--bg)',
          boxShadow: '0 0 12px var(--gold)',
          flexShrink: 0,
          marginTop: 4,
        }} />
        <div style={{ flex: 1, width: 1, background: 'var(--border)', marginTop: 4 }} />
      </div>

      {/* Content */}
      <div style={{ paddingBottom: '2.5rem', flex: 1 }}>
        {/* Period */}
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          letterSpacing: '0.15em',
          color: 'var(--gold)',
          textTransform: 'uppercase',
        }}>
          {item.period || `${item.period}`}
        </span>

        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.25rem',
          fontWeight: 600,
          color: 'var(--text)',
          marginTop: 4,
          marginBottom: 2,
          lineHeight: 1.3,
        }}>
          {item.role || item.degree}
        </h3>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          color: 'var(--gold-dim)',
          marginBottom: '0.75rem',
          fontWeight: 500,
        }}>
          {item.org || item.institution}
        </p>

        {item.detail && (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 8 }}>
            {item.detail}
          </p>
        )}

        {item.bullets && item.bullets.map((b, i) => (
          <p key={i} style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            paddingLeft: 14,
            borderLeft: '2px solid var(--border)',
            marginBottom: 6,
          }}>
            {b}
          </p>
        ))}

        {item.tags && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {item.tags.map(t => <span key={t} className="tech-tag">{t}</span>)}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Journey() {
  const [tab, setTab] = useState('experience')

  return (
    <section id="journey">
      <div className="section-pad">
        <motion.div {...fadeUp(0)}>
          <p className="section-label">My Journey</p>
        </motion.div>

        <motion.h2 {...fadeUp(0.1)} className="section-heading" style={{ marginBottom: '0.5rem' }}>
          Experience & Education
        </motion.h2>
        <motion.p {...fadeUp(0.15)} style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
          The path that brought me here.
        </motion.p>

        {/* Tabs */}
        <motion.div {...fadeUp(0.2)} style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', borderBottom: '1px solid var(--border)', paddingBottom: 0 }}>
          {[
            { id: 'experience', label: 'Experience' },
            { id: 'education',  label: 'Education'  },
          ].map(({ id, label }) => (
            <button key={id} onClick={() => setTab(id)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${tab === id ? 'var(--gold)' : 'transparent'}`,
                color: tab === id ? 'var(--gold)' : 'var(--text-muted)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                fontWeight: 500,
                letterSpacing: '0.05em',
                padding: '0.75rem 1.25rem 0.75rem 0',
                transition: 'all 0.2s',
                marginBottom: -1,
              }}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div style={{ maxWidth: 620 }}>
          {tab === 'experience' && experience.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} type="experience" />
          ))}
          {tab === 'education' && education.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} type="education" />
          ))}
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { skills, skillCategories } from '../data'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
})

function SkillBar({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      style={{ marginBottom: '1.1rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          color: 'var(--text)',
          fontWeight: 500,
        }}>
          {skill.name}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--gold-dim)',
        }}>
          {skill.level}%
        </span>
      </div>
      <div style={{
        height: 2,
        background: 'var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 + index * 0.04 }}
          style={{
            height: '100%',
            background: skill.level >= 80
              ? 'linear-gradient(90deg, var(--gold-dim), var(--gold))'
              : skill.level >= 65
              ? 'linear-gradient(90deg, #3a5a8a, #4c7bc9)'
              : 'linear-gradient(90deg, #2a5a4a, #3aaa7a)',
            position: 'relative',
          }}
        >
          {/* Glow tip */}
          <div style={{
            position: 'absolute', right: 0, top: '50%',
            transform: 'translateY(-50%)',
            width: 6, height: 6,
            borderRadius: '50%',
            background: 'var(--gold-light)',
            boxShadow: '0 0 8px var(--gold)',
          }} />
        </motion.div>
      </div>
    </motion.div>
  )
}

// Hexagonal tech badge
function TechBadge({ name, level, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.08, borderColor: 'var(--gold)', color: 'var(--gold-light)' }}
      style={{
        padding: '0.55rem 1rem',
        border: '1px solid var(--border)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        color: 'var(--text-muted)',
        textAlign: 'center',
        transition: 'all 0.2s',
        background: 'var(--bg-card)',
        letterSpacing: '0.05em',
      }}
    >
      {name}
    </motion.div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory)

  // Group for bar display
  const grouped = filtered.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = []
    acc[s.category].push(s)
    return acc
  }, {})

  return (
    <section id="skills">
      <div className="section-pad">
        <motion.div {...fadeUp(0)}>
          <p className="section-label">Skills & Expertise</p>
        </motion.div>

        <motion.h2 {...fadeUp(0.1)} className="section-heading" style={{ marginBottom: '0.5rem' }}>
          What I work with
        </motion.h2>
        <motion.p {...fadeUp(0.15)} style={{
          color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2.5rem', maxWidth: 480,
        }}>
          Skill levels reflect honest self-assessment — built through projects, not just courses.
        </motion.p>

        {/* Category tabs */}
        <motion.div {...fadeUp(0.2)} style={{
          display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem',
        }}>
          {skillCategories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? 'var(--gold)' : 'transparent',
                border: `1px solid ${activeCategory === cat ? 'var(--gold)' : 'var(--border)'}`,
                color: activeCategory === cat ? 'var(--bg)' : 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.45rem 1rem',
                transition: 'all 0.2s',
                fontWeight: activeCategory === cat ? 600 : 400,
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skill bars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem 4rem',
        }}>
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-subtle)',
                marginBottom: '1.25rem',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '0.5rem',
              }}>{category}</p>
              {items.map((skill, i) => <SkillBar key={skill.name} skill={skill} index={i} />)}
            </div>
          ))}
        </div>

        {/* Tech badge cloud */}
        <motion.div {...fadeUp(0.3)} style={{ marginTop: '3.5rem' }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-subtle)',
            marginBottom: '1rem',
          }}>Also familiar with</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['Docker', 'Linux', 'Jupyter Notebook', 'Matplotlib', 'JWT', 'MVC', 'REST', 'Git', 'Postman', 'AWS', 'Oracle Cloud'].map((t, i) => (
              <TechBadge key={t} name={t} delay={i * 0.04} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

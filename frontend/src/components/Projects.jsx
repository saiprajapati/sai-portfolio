import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, X, ArrowUpRight } from 'lucide-react'
import { projects } from '../data'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
})

const tags = ['All', 'ml', 'backend', 'python', 'api', 'cv', 'ai']

function ProjectCard({ project, index, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(project)}
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--gold-dim)' : 'var(--border)'}`,
        padding: '2rem',
        cursor: 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-5px)' : 'none',
        boxShadow: hovered ? '0 20px 60px #c9a84c0a' : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Corner accent */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 60, height: 60,
        background: `linear-gradient(225deg, ${project.color}15, transparent)`,
        transition: 'opacity 0.3s',
        opacity: hovered ? 1 : 0,
      }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <span style={{ fontSize: '2rem' }}>{project.icon}</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href={project.github} target="_blank" rel="noreferrer"
             onClick={e => e.stopPropagation()}
             style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
             onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
             onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <Github size={17} />
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer"
               onClick={e => e.stopPropagation()}
               style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
            >
              <ExternalLink size={17} />
            </a>
          )}
        </div>
      </div>

      {/* Year */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        color: 'var(--text-subtle)',
        letterSpacing: '0.15em',
        marginBottom: 6,
      }}>
        {project.year}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.35rem',
        fontWeight: 600,
        color: 'var(--text)',
        marginBottom: 4,
        lineHeight: 1.2,
      }}>{project.title}</h3>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        color: 'var(--gold-dim)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: '0.85rem',
      }}>{project.subtitle}</p>

      <p style={{
        fontSize: '0.88rem',
        color: 'var(--text-muted)',
        lineHeight: 1.7,
        marginBottom: '1.5rem',
      }}>{project.description}</p>

      {/* Tech tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {project.tech.map(t => (
          <span key={t} className="tech-tag">{t}</span>
        ))}
      </div>

      {/* Read more indicator */}
      <div style={{
        position: 'absolute', bottom: '1.2rem', right: '1.2rem',
        color: 'var(--gold)',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translate(0,0)' : 'translate(4px,-4px)',
        transition: 'all 0.2s',
      }}>
        <ArrowUpRight size={16} />
      </div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }) {
  if (!project) return null
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(8,8,16,0.85)',
          backdropFilter: 'blur(10px)',
          zIndex: 2000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1.5rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            maxWidth: 580,
            width: '100%',
            padding: '2.5rem',
            position: 'relative',
            maxHeight: '85vh',
            overflowY: 'auto',
          }}
        >
          <button onClick={onClose}
            style={{
              position: 'absolute', top: '1.25rem', right: '1.25rem',
              background: 'none', border: 'none',
              color: 'var(--text-muted)',
            }}>
            <X size={20} />
          </button>

          <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>{project.icon}</span>

          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>
            {project.year} · {project.subtitle}
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1rem' }}>
            {project.title}
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '0.93rem' }}>
            {project.longDescription}
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-subtle)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
              Tech Stack
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href={project.github} target="_blank" rel="noreferrer" className="btn-primary"
               style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Github size={14} /> View Code
            </a>
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="btn-outline"
                 style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Projects() {
  const [activeTag, setActiveTag]   = useState('All')
  const [selected, setSelected]     = useState(null)

  const filtered = activeTag === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(activeTag))

  return (
    <section id="projects" style={{ background: 'var(--bg-surface)' }}>
      <div className="section-pad">
        <motion.div {...fadeUp(0)}>
          <p className="section-label">Projects</p>
        </motion.div>

        <motion.h2 {...fadeUp(0.1)} className="section-heading" style={{ marginBottom: '0.5rem' }}>
          Things I've built
        </motion.h2>
        <motion.p {...fadeUp(0.15)} style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', maxWidth: 440 }}>
          Click any project for the full story.
        </motion.p>

        {/* Tag filter */}
        <motion.div {...fadeUp(0.2)} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {tags.map(t => (
            <button key={t} onClick={() => setActiveTag(t)}
              style={{
                background: activeTag === t ? 'var(--gold)' : 'transparent',
                border: `1px solid ${activeTag === t ? 'var(--gold)' : 'var(--border)'}`,
                color: activeTag === t ? 'var(--bg)' : 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.4rem 0.9rem',
                transition: 'all 0.2s',
              }}>
              {t}
            </button>
          ))}
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          <AnimatePresence>
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onClick={setSelected} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p style={{ color: 'var(--text-subtle)', textAlign: 'center', padding: '3rem' }}>
            No projects in this category yet.
          </p>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

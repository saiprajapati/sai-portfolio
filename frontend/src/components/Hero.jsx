import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import { personal } from '../data'

// Animated background grid
function GridBg() {
  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        top: '20%', left: '60%',
        width: 600, height: 600,
        background: 'radial-gradient(circle, #c9a84c12 0%, transparent 70%)',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
      }} />
      <div style={{
        position: 'absolute',
        top: '70%', left: '15%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, #4c7bc910 0%, transparent 70%)',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
      }} />

      {/* Dot grid */}
      <svg width="100%" height="100%" style={{ opacity: 0.07 }}>
        <defs>
          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#c9a84c" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Diagonal accent line */}
      <div style={{
        position: 'absolute',
        top: 0, right: '25%',
        width: 1, height: '60%',
        background: 'linear-gradient(to bottom, transparent, #c9a84c30, transparent)',
      }} />
    </div>
  )
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
}

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

export default function Hero() {
  const scrollToAbout = () =>
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      <GridBg />

      <div style={{
        position: 'relative',
        maxWidth: 1100,
        margin: '0 auto',
        padding: '8rem 1.5rem 5rem',
        width: '100%',
      }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: '1.5rem',
            }}>
              <span style={{ display: 'inline-block', width: 30, height: 1, background: 'var(--gold)' }} />
              Available for opportunities
              <span style={{
                display: 'inline-block',
                width: 7, height: 7,
                borderRadius: '50%',
                background: '#2ecc71',
                animation: 'pulse-glow 2s infinite',
              }} />
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={fadeUp} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.2rem, 8vw, 7rem)',
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            marginBottom: '1rem',
          }}>
            Sai<br />
            <span style={{ color: 'var(--gold)' }}>Prajapati</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div variants={fadeUp} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--text-muted)',
            marginBottom: '1.75rem',
            minHeight: '2.5rem',
          }}>
            <TypeAnimation
              sequence={personal.roles.flatMap(r => [r, 2200])}
              repeat={Infinity}
              style={{ display: 'inline' }}
            />
          </motion.div>

          {/* Bio */}
          <motion.p variants={fadeUp} style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--text-muted)',
            maxWidth: 520,
            lineHeight: 1.8,
            marginBottom: '2.5rem',
          }}>
            {personal.shortBio}
            <br />
            <span style={{ color: 'var(--text-subtle)', fontSize: '0.9rem' }}>
              B.Tech CSE @ VIT Bhopal · IIT Mandi Minor · Vadodara, India
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <button
              className="btn-primary"
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </button>
            <a
              href="/Sai_Prajapati_Resume.pdf"
              download
              className="btn-outline"
            >
              Download Resume
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            {[
              { icon: <Github size={18} />,   href: personal.github,                    label: 'GitHub'   },
              { icon: <Linkedin size={18} />, href: personal.linkedin,                  label: 'LinkedIn' },
              { icon: <Mail size={18} />,     href: `mailto:${personal.email}`,          label: 'Email'    },
            ].map(({ icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                 aria-label={label}
                 style={{
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   width: 40, height: 40,
                   border: '1px solid var(--border)',
                   color: 'var(--text-muted)',
                   transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
                 }}
                 onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                 onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.transform = 'none' }}
              >
                {icon}
              </a>
            ))}
            <span style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 4px' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
              @saiprajapati
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)',
          background: 'none', border: 'none',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 6,
          color: 'var(--text-subtle)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>
    </section>
  )
}

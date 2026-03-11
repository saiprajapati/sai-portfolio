import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const links = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey',  href: '#journey'  },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  const [active,   setActive]   = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (href) => {
    setOpen(false)
    setActive(href)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: '1.1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          background: scrolled ? 'rgba(var(--bg-rgb, 8,8,16),0.85)' : 'transparent',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            fontWeight: 600,
            color: 'var(--text)',
            background: 'none',
            border: 'none',
            letterSpacing: '0.02em',
          }}
        >
          SP<span style={{ color: 'var(--gold)' }}>.</span>
        </button>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', gap: '2.2rem', alignItems: 'center' }}
             className="hide-mobile">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleClick(l.href)}
              style={{
                background: 'none', border: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: active === l.href ? 'var(--gold)' : 'var(--text-muted)',
                position: 'relative',
                transition: 'color 0.2s',
                padding: '4px 0',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color = active === l.href ? 'var(--gold)' : 'var(--text-muted)'}
            >
              {l.label}
            </button>
          ))}

          {/* Theme toggle */}
          <ThemeToggle />

          <a href="mailto:saiprajapati3085@gmail.com" className="btn-primary"
             style={{ padding: '0.5rem 1.25rem', fontSize: '0.75rem' }}>
            Hire Me
          </a>
        </nav>

        {/* Mobile right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
             className="show-mobile">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            style={{ background: 'none', border: 'none', color: 'var(--text)', padding: 4 }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{
              position: 'fixed', top: 0, right: 0,
              width: '75vw', maxWidth: 320,
              height: '100vh',
              background: 'var(--bg-card)',
              borderLeft: '1px solid var(--border)',
              zIndex: 999,
              padding: '5rem 2rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleClick(l.href)}
                style={{
                  background: 'none', border: 'none',
                  textAlign: 'left',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  fontWeight: 600,
                  color: 'var(--text)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 769px) { .hide-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 768px)  { .hide-mobile { display: none !important; } .show-mobile { display: flex !important; } }
      `}</style>
    </>
  )
}

import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      style={{
        position: 'relative',
        width: 52,
        height: 28,
        borderRadius: 14,
        border: '1px solid var(--border)',
        background: isDark ? 'var(--bg-card)' : '#e8d9b0',
        cursor: 'none',
        padding: 0,
        overflow: 'hidden',
        flexShrink: 0,
        transition: 'background 0.35s ease, border-color 0.3s',
      }}
    >
      {/* Track icons */}
      <span style={{
        position: 'absolute', left: 7, top: '50%',
        transform: 'translateY(-50%)',
        color: '#f5c842',
        opacity: isDark ? 0.25 : 0.9,
        transition: 'opacity 0.3s',
        pointerEvents: 'none',
        display: 'flex',
      }}>
        <Sun size={11} strokeWidth={2.5} />
      </span>
      <span style={{
        position: 'absolute', right: 7, top: '50%',
        transform: 'translateY(-50%)',
        color: 'var(--gold)',
        opacity: isDark ? 0.9 : 0.25,
        transition: 'opacity 0.3s',
        pointerEvents: 'none',
        display: 'flex',
      }}>
        <Moon size={11} strokeWidth={2.5} />
      </span>

      {/* Sliding knob */}
      <motion.div
        animate={{ x: isDark ? 26 : 4 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        style={{
          position: 'absolute',
          top: 3,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: isDark
            ? 'linear-gradient(135deg, var(--gold-dim), var(--gold))'
            : 'linear-gradient(135deg, #f9c74f, #f8961e)',
          boxShadow: isDark
            ? '0 0 8px var(--border-glow)'
            : '0 1px 4px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0,   scale: 1 }}
              exit={{   opacity: 0, rotate:  30,  scale: 0.5 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', color: '#fff' }}
            >
              <Moon size={10} strokeWidth={2.5} />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: 30,  scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0,   scale: 1 }}
              exit={{   opacity: 0, rotate: -30,  scale: 0.5 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', color: '#fff' }}
            >
              <Sun size={10} strokeWidth={2.5} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  )
}

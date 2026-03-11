import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { personal } from '../data'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
})

function Field({ label, name, type = 'text', value, onChange, multiline = false, error }) {
  const [focused, setFocused] = useState(false)
  const style = {
    width: '100%',
    background: 'var(--bg)',
    border: `1px solid ${error ? '#e74c3c' : focused ? 'var(--gold-dim)' : 'var(--border)'}`,
    color: 'var(--text)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    padding: '0.85rem 1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    resize: multiline ? 'vertical' : 'none',
    minHeight: multiline ? 130 : 'auto',
  }

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{
        display: 'block',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: focused ? 'var(--gold)' : 'var(--text-subtle)',
        marginBottom: 6,
        transition: 'color 0.2s',
      }}>{label}</label>
      {multiline
        ? <textarea name={name} value={value} onChange={onChange}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={style} />
        : <input type={type} name={name} value={value} onChange={onChange}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={style} />
      }
      {error && <p style={{ color: '#e74c3c', fontSize: '0.75rem', marginTop: 4 }}>{error}</p>}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" style={{ background: 'var(--bg-surface)' }}>
      <div className="section-pad">
        <motion.div {...fadeUp(0)}>
          <p className="section-label">Get In Touch</p>
        </motion.div>

        <motion.h2 {...fadeUp(0.1)} className="section-heading" style={{ marginBottom: '0.5rem' }}>
          Let's work together
        </motion.h2>
        <motion.p {...fadeUp(0.15)} style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '3rem', maxWidth: 440 }}>
          Whether it's a project, opportunity, or just a conversation — I'm always open.
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
          {/* Contact info */}
          <motion.div {...fadeUp(0.2)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {[
                { icon: <Mail size={16} />,    label: 'Email',    value: personal.email,    href: `mailto:${personal.email}` },
                { icon: <MapPin size={16} />,   label: 'Location', value: personal.location, href: null },
              ].map(({ icon, label, value, href }) => (
                <div key={label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--gold)', marginTop: 2 }}>{icon}</span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 2 }}>{label}</p>
                    {href
                      ? <a href={href} style={{ color: 'var(--text)', fontSize: '0.9rem', textDecoration: 'none' }}
                           onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                           onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}>{value}</a>
                      : <p style={{ color: 'var(--text)', fontSize: '0.9rem' }}>{value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: '1rem' }}>
                Connect
              </p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[
                  { icon: <Github size={17} />,   href: personal.github,   label: 'GitHub' },
                  { icon: <Linkedin size={17} />, href: personal.linkedin, label: 'LinkedIn' },
                ].map(({ icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                     style={{
                       display: 'flex', alignItems: 'center', gap: 8,
                       border: '1px solid var(--border)',
                       color: 'var(--text-muted)',
                       padding: '0.55rem 1rem',
                       fontSize: '0.8rem',
                       textDecoration: 'none',
                       transition: 'all 0.2s',
                     }}
                     onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
                     onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                  >
                    {icon} {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div {...fadeUp(0.25)}>
            {status === 'sent' ? (
              <div style={{
                border: '1px solid #2ecc71',
                padding: '2rem',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✓</div>
                <p style={{ color: '#2ecc71', fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600 }}>Message sent!</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 6 }}>I'll get back to you soon.</p>
                <button onClick={() => setStatus('idle')} className="btn-outline"
                  style={{ marginTop: '1.5rem', fontSize: '0.75rem' }}>Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <Field label="Name"    name="name"    value={form.name}    onChange={handleChange} error={errors.name} />
                <Field label="Email"   name="email"   type="email" value={form.email}   onChange={handleChange} error={errors.email} />
                <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} />
                <Field label="Message" name="message" value={form.message} onChange={handleChange} multiline error={errors.message} />

                <button type="submit" className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending...' : <><Send size={14} /> Send Message</>}
                </button>

                {status === 'error' && (
                  <p style={{ color: '#e74c3c', fontSize: '0.8rem', marginTop: 8, textAlign: 'center' }}>
                    Something went wrong. Email me directly at {personal.email}
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

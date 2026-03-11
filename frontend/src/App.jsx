import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'
import Cursor   from './components/Cursor'
import Navbar   from './components/Navbar'
import Hero     from './components/Hero'
import About    from './components/About'
import Skills   from './components/Skills'
import Projects from './components/Projects'
import Journey  from './components/Journey'
import Contact  from './components/Contact'
import Footer   from './components/Footer'

export default function App() {
  return (
    <ThemeProvider>
      <Cursor />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            fontFamily: 'var(--font-body)',
          }
        }}
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  )
}

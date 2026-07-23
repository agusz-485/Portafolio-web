import React from 'react'
import TechGrid from './components/TechGrid'
import ProjectsGrid from './components/ProjectsGrid'
import Timeline from './components/Timeline'
import Typewriter from './components/Typewriter'
import ScrollReveal from './components/ScrollReveal'
import { techCategories, projects, certifications, socialLinks } from './data/demoData'

// Inline ProfilePhoto to avoid HMR/import issue seen in some environments
const ProfilePhotoInline: React.FC<{ srcA: string; srcB: string; alt?: string }> = ({ srcA, srcB, alt = 'Foto' }) => {
  const [toggled, setToggled] = React.useState(false)
  const [transitioning, setTransitioning] = React.useState(false)
  const handleClick = () => {
    if (transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setToggled((v) => !v)
      setTransitioning(false)
    }, 600)
  }
  const activeA = !toggled
  return (
    <div className="w-40 h-40 rounded-full overflow-hidden cursor-pointer ring-2 ring-white/20 hover:ring-white/40 transition-all relative" onClick={handleClick}>
      <img
        src={srcA}
        alt={alt}
        loading="eager"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
          activeA
            ? transitioning
              ? 'fade-out-pixel z-20'
              : 'opacity-100 z-20'
            : transitioning
              ? 'fade-in-pixel z-10'
              : 'opacity-0 z-10'
        }`}
      />
      <img
        src={srcB}
        alt={alt}
        loading="eager"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
          !activeA
            ? transitioning
              ? 'fade-out-pixel z-20'
              : 'opacity-100 z-20'
            : transitioning
              ? 'fade-in-pixel z-10'
              : 'opacity-0 z-10'
        }`}
      />
    </div>
  )
}

import CursorBg from './components/CursorBg'

export default function App() {
  const [lang, setLang] = React.useState<'es'|'en'>('es')
  const t = {
    title: lang === 'en' ? 'Agustín David Nuñez' : 'Agustín David Nuñez',
    subtitle: lang === 'en' ? 'Full Stack Developer & IT Support Technician' : 'Desarrollador Full Stack & Soporte Técnico IT',
    nav: {
      projects: lang === 'en' ? 'Projects' : 'Proyectos',
      tech: lang === 'en' ? 'Technologies' : 'Tecnologías',
      certs: lang === 'en' ? 'Education' : 'Formación',
      contact: lang === 'en' ? 'Contact' : 'Contacto'
    },
    heroTitle: lang === 'en' ? 'Full Stack Developer & IT Technician' : 'Desarrollador Full Stack & Técnico IT',
    heroSubtitle: lang === 'en' ? 'Specialized in React, Node.js and JavaScript. Providing proactive solutions with clean, efficient and scalable code.' : 'Especializado en React, Node.js y JavaScript. Aportando soluciones proactivas con código limpio, eficiente y escalable.',
    contactText: lang === 'en' ? 'Connect with me on professional networks or contact me directly.' : 'Conecta conmigo en redes profesionales o contáctame directamente.'
  }

  return (
    <div className="min-h-screen">
      <CursorBg />
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">{t.title}</h1>
          <p className="text-sm text-slate-400">{t.subtitle}</p>
        </div>
        <nav className="flex gap-4 items-center">
          <a href="#projects" className="text-sm text-slate-300 hover:text-white">{t.nav.projects}</a>
          <a href="#tech" className="text-sm text-slate-300 hover:text-white">{t.nav.tech}</a>
          <a href="#certs" className="text-sm text-slate-300 hover:text-white">{t.nav.certs}</a>
          <a href="#contact" className="text-sm text-primary">{t.nav.contact}</a>
          <button onClick={() => setLang(lang === 'en' ? 'es' : 'en')} className="ml-4 badge">{lang === 'en' ? 'ES' : 'EN'}</button>
        </nav>
      </header>

      <main>
        <section className="max-w-6xl mx-auto px-6 py-12 flex items-center gap-6">
          <ScrollReveal animation="fade-up" duration={0.9} delay={0.1}>
            <div className="glass-card flex items-center gap-6">
              <div>
                <h2 className="text-3xl font-extrabold min-h-[40px] flex items-center flex-wrap gap-x-2">
                  <span>{lang === 'en' ? 'I am a' : 'Soy'}</span>
                  <Typewriter
                    words={
                      lang === 'en'
                        ? ['Full Stack Developer', 'IT Support Technician', 'React & Node.js Developer', 'Tech Enthusiast']
                        : ['Desarrollador Full Stack', 'Técnico de Soporte IT', 'Desarrollador React & Node.js', 'Entusiasta Tecnológico']
                    }
                    className="text-primary"
                  />
                </h2>
                <p className="mt-2 text-slate-300">{t.heroSubtitle}</p>
              </div>
              <div>
                {/* ProfilePhoto with placeholders - edit in demoData */}
                <ProfilePhotoInline srcA="/assets/profile.jpg" srcB="/assets/segundaimagen.png" alt={lang === 'en' ? 'My photo' : 'Mi foto'} />
              </div>
            </div>
          </ScrollReveal>
        </section>

        <div id="projects">
          <ProjectsGrid projects={projects} lang={lang} />
        </div>

        <div id="tech">
          <TechGrid categories={techCategories as any} lang={lang} />
        </div>

        <div id="certs">
          <Timeline items={certifications as any} lang={lang} />
        </div>

        <section id="contact" className="max-w-6xl mx-auto px-6 py-12">
          <ScrollReveal animation="reveal-text">
            <h2 className="text-2xl font-bold mb-4">{t.nav.contact}</h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up">
            <div className="glass-card">
              <p className="text-slate-300 mb-6">{t.contactText}</p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-slate-400 text-sm">{lang === 'en' ? 'Email:' : 'Correo:'}</span>
                  <a href={`mailto:${socialLinks.email}`} className="badge text-slate-100 hover:bg-white/20 transition-colors">{socialLinks.email}</a>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-400 text-sm">{lang === 'en' ? 'Phone:' : 'Teléfono:'}</span>
                  <a href={`tel:${socialLinks.phone}`} className="badge text-slate-100 hover:bg-white/20 transition-colors">{socialLinks.phone}</a>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <span className="text-slate-400 text-sm">{lang === 'en' ? 'Social:' : 'Redes:'}</span>
                  <div className="flex gap-3">
                    {socialLinks.linkedin && (
                      <a href={socialLinks.linkedin} className="badge" target="_blank" rel="noreferrer">LinkedIn</a>
                    )}
                    {socialLinks.github && (
                      <a href={socialLinks.github} className="badge" target="_blank" rel="noreferrer">GitHub</a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>
    </div>
  )
}

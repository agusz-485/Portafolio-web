import React, { useState, PropsWithChildren } from 'react'

const Chevron: React.FC<{ open: boolean }> = ({ open }) => (
  <svg className={`w-5 h-5 transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CollapsibleSection: React.FC<PropsWithChildren<{
  title: string
  subtitle?: string
  defaultOpen?: boolean
  lang?: 'es' | 'en'
}>> = ({ title, subtitle, defaultOpen = true, lang = 'es', children }) => {
  const [open, setOpen] = useState(defaultOpen)
  const labels = {
    expand: lang === 'en' ? 'Show content' : 'Desplegar contenido',
    collapse: lang === 'en' ? 'Hide content' : 'Contenido oculto',
    active: lang === 'en' ? 'Active' : 'Activo',
    inactive: lang === 'en' ? 'Inactive' : 'Inactivo'
  }
  return (
    <section className="max-w-6xl mx-auto px-6 py-6">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left flex items-center justify-between py-3 group"
        aria-expanded={open}
      >
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-3">
            <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse" />
            {title}
          </h2>
          <div className="text-sm text-slate-400 mt-1">{subtitle ?? (open ? labels.collapse : labels.expand)}</div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-300 opacity-80 bg-white/3 px-2 py-1 rounded-full">{open ? labels.active : labels.inactive}</div>
          <span className="p-2 rounded-full bg-white/3 text-slate-100 group-hover:bg-white/5 transition-colors">
            <Chevron open={open} />
          </span>
        </div>
      </button>

      <div className={`transition-[max-height,opacity,transform] duration-300 overflow-hidden ${open ? 'max-h-[2000px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}`}>
        {children}
      </div>
    </section>
  )
}

export default CollapsibleSection

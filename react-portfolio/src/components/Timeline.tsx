import React, { useState, useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import CollapsibleSection from './CollapsibleSection'

type Cert = {
  id: string
  title: string
  issuer: string
  issuer_en?: string
  title_en?: string
  date: string
  images?: string[]
}

const Timeline: React.FC<{ items: Cert[]; lang?: 'es' | 'en' }> = ({ items, lang = 'es' }) => {
  const sectionTitle = lang === 'en' ? 'Education & Certificates' : 'Formación y Certificados'

  // 1. Group certificates by localized issuer
  const grouped = useMemo(() => {
    return items.reduce((acc, cert) => {
      const key = lang === 'en' && cert.issuer_en ? cert.issuer_en : cert.issuer
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(cert)
      return acc
    }, {} as Record<string, Cert[]>)
  }, [items, lang])

  // 2. Select initial issuer tab
  const issuers = useMemo(() => Object.keys(grouped), [grouped])
  const [selectedIssuer, setSelectedIssuer] = useState<string>('')

  // Initialize selectedIssuer once grouped data is available
  useEffect(() => {
    if (issuers.length > 0 && !issuers.includes(selectedIssuer)) {
      setSelectedIssuer(issuers[0])
    }
  }, [issuers, selectedIssuer])

  const activeCerts = useMemo(() => {
    return selectedIssuer ? grouped[selectedIssuer] || [] : []
  }, [grouped, selectedIssuer])

  // 3. Carousel active index and hover state
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Reset active index when changing issuer tab
  useEffect(() => {
    setActiveIndex(0)
  }, [selectedIssuer])

  // 4. Auto-play loop (3 seconds) with hover pause
  useEffect(() => {
    if (isHovered || activeCerts.length <= 1) return

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activeCerts.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [isHovered, activeCerts.length])

  // 5. GSAP animation for 3D carousel cards
  useGSAP(
    () => {
      if (!containerRef.current || activeCerts.length === 0) return

      const cards = containerRef.current.querySelectorAll('.carousel-card')
      const isMobile = window.innerWidth < 768
      const xOffset = isMobile ? 80 : 170

      cards.forEach((cardEl) => {
        const indexAttr = cardEl.getAttribute('data-index')
        if (!indexAttr) return
        const index = parseInt(indexAttr, 10)

        let diff = index - activeIndex
        const len = activeCerts.length

        // Circular calculations to wrap around items
        if (len > 2) {
          if (diff < -1) {
            if (diff < -len / 2) diff += len
          } else if (diff > 1) {
            if (diff > len / 2) diff -= len
          }
        }

        let xTranslate = 0
        let scale = 0.5
        let opacity = 0
        let zIndex = 0
        let rotateY = 0
        let pointerEvents: 'auto' | 'none' = 'none'

        if (diff === 0) {
          xTranslate = 0
          scale = 1
          opacity = 1
          zIndex = 10
          rotateY = 0
          pointerEvents = 'auto'
        } else if (diff === -1) {
          xTranslate = -xOffset
          scale = 0.8
          opacity = 0.5
          zIndex = 5
          rotateY = 22
          pointerEvents = 'auto'
        } else if (diff === 1) {
          xTranslate = xOffset
          scale = 0.8
          opacity = 0.5
          zIndex = 5
          rotateY = -22
          pointerEvents = 'auto'
        } else if (diff < -1) {
          xTranslate = -xOffset * 1.5
          scale = 0.6
          opacity = 0
          zIndex = 0
          rotateY = 40
          pointerEvents = 'none'
        } else if (diff > 1) {
          xTranslate = xOffset * 1.5
          scale = 0.6
          opacity = 0
          zIndex = 0
          rotateY = -40
          pointerEvents = 'none'
        }

        gsap.to(cardEl, {
          x: xTranslate,
          scale,
          opacity,
          zIndex,
          transformPerspective: 1000,
          rotateY,
          pointerEvents,
          duration: 0.65,
          ease: 'power2.out'
        })
      })
    },
    { dependencies: [activeIndex, activeCerts, selectedIssuer], scope: containerRef }
  )

  if (issuers.length === 0) return null

  return (
    <CollapsibleSection title={sectionTitle} defaultOpen={true} lang={lang}>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 justify-center mb-8 border-b border-white/5 pb-5">
        {issuers.map((issuer) => {
          const isActive = selectedIssuer === issuer
          return (
            <button
              key={issuer}
              onClick={() => setSelectedIssuer(issuer)}
              className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {issuer}
            </button>
          )
        })}
      </div>

      {/* Carousel Container */}
      <div 
        className="relative flex flex-col items-center w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          ref={containerRef} 
          className="relative w-full h-[370px] md:h-[400px] flex items-center justify-center overflow-hidden py-4"
        >
          {activeCerts.map((cert, index) => (
            <div
              key={cert.id}
              data-index={index}
              className="carousel-card absolute w-[280px] sm:w-[320px] md:w-[380px] select-none cursor-pointer"
              onClick={() => setActiveIndex(index)}
            >
              <div className="glass-card h-full min-h-[300px] md:min-h-[340px] flex flex-col justify-between p-5 border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-2">
                    <span className="text-xs text-primary font-semibold tracking-wider uppercase">{cert.date}</span>
                    <h3 className="font-bold text-base md:text-lg mt-1 text-white leading-snug group-hover:text-primary transition-colors duration-300">
                      {lang === 'en' && cert.title_en ? cert.title_en : cert.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-400 mt-1">
                      {lang === 'en' && cert.issuer_en ? cert.issuer_en : cert.issuer}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 flex-grow flex items-center justify-center overflow-hidden rounded-lg bg-slate-950/40 relative min-h-[140px] md:min-h-[160px] border border-white/5">
                  {cert.images && cert.images.length > 0 ? (
                    <img
                      src={cert.images[0]}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      draggable="false"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-slate-500">
                      <svg className="w-12 h-12 md:w-16 md:h-16 opacity-30 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                      <span className="text-[10px] md:text-xs uppercase tracking-widest text-slate-400 font-semibold">{lang === 'en' ? 'Certificate' : 'Certificación'}</span>
                    </div>
                  )}
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dot Indicators */}
        {activeCerts.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-4 z-20">
            {activeCerts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'w-6 bg-primary' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </CollapsibleSection>
  )
}

export default Timeline

import React from 'react'
import TechCard from './TechCard'
import type { FC } from 'react'
import CollapsibleSection from './CollapsibleSection'
import ScrollReveal from './ScrollReveal'

type Category = {
  id: string
  title: string
  items: string[]
  images?: string[]
}

const TechGrid: FC<{ categories: Category[]; lang?: 'es'|'en' }> = ({ categories, lang = 'es' }) => {
  const sectionTitle = lang === 'en' ? 'Technologies' : 'Tecnologías'
  return (
    <CollapsibleSection title={sectionTitle} defaultOpen={true} lang={lang}>
      <ScrollReveal animation="stagger-list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((c) => (
          <div key={c.id}>
            <TechCard title={lang === 'en' && (c as any).title_en ? (c as any).title_en : c.title} items={c.items} />
            {c.images && c.images.length > 0 && (
              <div className="mt-3 flex gap-2">
                {c.images.map((img, i) => (
                  // eslint-disable-next-line jsx-a11y/img-redundant-alt
                  <img key={i} src={img} alt={`${lang === 'en' && (c as any).title_en ? (c as any).title_en : c.title} ref ${i}`} className="w-36 h-20 object-cover rounded" />
                ))}
              </div>
            )}
          </div>
        ))}
      </ScrollReveal>
    </CollapsibleSection>
  )
}

export default TechGrid

import React from 'react'
import ProjectCard from './ProjectCard'
import CollapsibleSection from './CollapsibleSection'
import ScrollReveal from './ScrollReveal'

type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  link?: string
  images?: string[]
}

const ProjectsGrid: React.FC<{ projects: Project[]; lang?: 'es'|'en' }> = ({ projects, lang = 'es' }) => {
  const sectionTitle = lang === 'en' ? 'Projects' : 'Proyectos'
  return (
    <CollapsibleSection title={sectionTitle} defaultOpen={true} lang={lang}>
      <ScrollReveal animation="stagger-list" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.id} title={lang === 'en' && (p as any).title_en ? (p as any).title_en : p.title} description={lang === 'en' && (p as any).description_en ? (p as any).description_en : p.description} tags={p.tags} link={p.link} lang={lang} image={p.images?.[0]} />
        ))}
      </ScrollReveal>
    </CollapsibleSection>
  )
}

export default ProjectsGrid

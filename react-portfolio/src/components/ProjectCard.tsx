import React from 'react'

type Props = {
  title: string
  description: string
  tags: string[]
  link?: string
  lang?: 'es'|'en'
  image?: string
}

const ProjectCard: React.FC<Props> = ({ title, description, tags, link, lang = 'es', image }) => {
  return (
    <div className="glass-card flex flex-col justify-between h-full">
      {image && (
        <div className="mb-4 -mx-5 -mt-5 mb-4">
          <img src={image} alt={title} className="w-full h-56 object-cover rounded-t-xl" />
        </div>
      )}
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-slate-300 mt-2">{description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="badge">{t}</span>
          ))}
        </div>
        <a href={link} className="ml-4 text-sm text-primary hover:underline">{lang === 'en' ? 'View' : 'Ver'}</a>
      </div>
    </div>
  )
}

export default ProjectCard

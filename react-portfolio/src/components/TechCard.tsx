import React from 'react'

type Props = {
  title: string
  items: string[]
}

const TechCard: React.FC<Props> = ({ title, items }) => {
  return (
    <div className="glass-card">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((t) => (
          <span key={t} className="badge">{t}</span>
        ))}
      </div>
    </div>
  )
}

export default TechCard

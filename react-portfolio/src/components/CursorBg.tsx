import React, { useEffect } from 'react'

const CursorBg: React.FC = () => {
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      document.documentElement.style.setProperty('--cursor-x', x + 'px')
      document.documentElement.style.setProperty('--cursor-y', y + 'px')
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  // palette: blue range
  const colors = ['rgb(96 165 250)', 'rgb(14 165 233)', 'rgb(125 211 252)']
  const length = 25
  const animationTime = 45 // seconds

  const permutations = [
    [0,1,2],[0,2,1],[2,0,1],[2,1,0],[1,2,0],[1,0,2]
  ]

  const stripes = Array.from({ length }).map((_, i) => {
    const perm = permutations[i % permutations.length]
    const c1 = colors[perm[0]]
    const c2 = colors[perm[1]]
    const c3 = colors[perm[2]]

    const duration = animationTime - (animationTime / length / 2) * i
    const delay = -(i / length) * animationTime

    // soften the white highlights so stripes remain behind content
    const boxShadow = `-130px 0 80px 40px rgba(255,255,255,0.02), -50px 0 50px 25px ${c1}, 0 0 50px 25px ${c2}, 50px 0 50px 25px ${c3}, 130px 0 80px 40px rgba(255,255,255,0.02)`

    return (
      <div
        key={i}
        className="rainbow"
        style={{
          boxShadow,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    )
  })

  return (
    <>
      <div id="cursor-bg" aria-hidden="true" />
      {stripes}
      <div className="h" />
      <div className="v" />
    </>
  )
}

export default CursorBg

import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: React.ReactNode
  animation?: 'fade-up' | 'fade-in' | 'reveal-text' | 'stagger-list' | 'slide-in-right'
  duration?: number
  delay?: number
  stagger?: number
  once?: boolean
  className?: string
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  duration = 0.8,
  delay = 0,
  stagger = 0.08,
  once = true,
  className
}) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!elementRef.current) return

      const el = elementRef.current
      const toggleActions = once ? 'play none none none' : 'play reverse play reverse'

      if (animation === 'fade-up') {
        gsap.fromTo(
          el,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions
            }
          }
        )
      } else if (animation === 'fade-in') {
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration,
            delay,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions
            }
          }
        )
      } else if (animation === 'reveal-text') {
        gsap.fromTo(
          el,
          { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 15, opacity: 0 },
          {
            clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
            y: 0,
            opacity: 1,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions
            }
          }
        )
      } else if (animation === 'slide-in-right') {
        gsap.fromTo(
          el,
          { opacity: 0, x: 45 },
          {
            opacity: 1,
            x: 0,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions
            }
          }
        )
      } else if (animation === 'stagger-list') {
        // Find direct children to animate them in stagger
        const targets = el.children
        if (targets.length > 0) {
          gsap.fromTo(
            targets,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration,
              delay,
              stagger,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions
              }
            }
          )
        }
      }
    },
    { dependencies: [animation, duration, delay, stagger, once], scope: elementRef }
  )

  return (
    <div ref={elementRef} className={`will-change-transform ${className || ''}`}>
      {children}
    </div>
  )
}

export default ScrollReveal

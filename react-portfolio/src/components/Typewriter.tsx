import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { useGSAP } from '@gsap/react'

// Register TextPlugin with GSAP
gsap.registerPlugin(TextPlugin)

interface TypewriterProps {
  words: string[]
  className?: string
}

const Typewriter: React.FC<TypewriterProps> = ({ words, className }) => {
  const textRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (!textRef.current) return

      // Blinking cursor animation
      const cursorTween = gsap.to(cursorRef.current, {
        opacity: 0,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        duration: 0.5
      })

      // Typewriter timeline
      const tl = gsap.timeline({ repeat: -1 })
      
      // Ensure element starts empty
      textRef.current.textContent = ''

      words.forEach((word) => {
        // Type word
        tl.to(textRef.current, {
          duration: Math.max(0.6, word.length * 0.08),
          text: {
            value: word
          },
          ease: 'power1.inOut'
        })
        // Pause to read the word
        .to({}, { duration: 1.8 })
        // Backspace word
        .to(textRef.current, {
          duration: Math.max(0.3, word.length * 0.04),
          text: {
            value: ''
          },
          ease: 'power1.in'
        })
        // Pause before next word
        .to({}, { duration: 0.4 })
      })

      return () => {
        cursorTween.kill()
        tl.kill()
      }
    },
    { dependencies: [words], revertOnUpdate: true }
  )

  return (
    <span className={className}>
      <span ref={textRef} className="select-all"></span>
      <span ref={cursorRef} className="ml-0.5 font-light text-primary">|</span>
    </span>
  )
}

export default Typewriter

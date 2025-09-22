"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap } from "gsap"

interface ParticleBackgroundProps {
  children: ReactNode
}

export function ParticleBackground({ children }: ParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const particles = Array.from({ length: 50 }, (_, i) => {
      const particle = document.createElement("div")
      particle.className = "absolute w-2 h-2 bg-white/30 rounded-full particle"
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.animationDelay = `${Math.random() * 6}s`
      containerRef.current?.appendChild(particle)
      particlesRef.current.push(particle)
      return particle
    })

    return () => {
      particles.forEach((particle) => particle.remove())
      particlesRef.current = []
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden z-0">
      {children}
    </div>
  )
}

interface TypewriterTextProps {
  texts: string[]
  className?: string
}

export function TypewriterText({ texts, className = "" }: TypewriterTextProps) {
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const tl = gsap.timeline({ repeat: -1 })

    texts.forEach((text, index) => {
      tl.to(textRef.current, {
        duration: 0.05 * text.length,
        text: text,
        ease: "none",
      }).to(textRef.current, {
        duration: 2,
        delay: 1,
      })
      if (index < texts.length - 1) {
        tl.to(textRef.current, {
          duration: 0.02 * text.length,
          text: "",
          ease: "none",
        })
      }
    })

    return () => {
      tl.kill()
    }
  }, [texts])

  return <span ref={textRef} className={className}></span>
}

interface GlowButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function GlowButton({ children, className = "", onClick }: GlowButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!buttonRef.current) return

    const button = buttonRef.current

    const handleMouseEnter = () => {
      gsap.to(button, {
        boxShadow: "0 0 30px rgba(37, 99, 235, 0.6), 0 0 60px rgba(37, 99, 235, 0.4)",
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        boxShadow: "0 0 0px rgba(37, 99, 235, 0)",
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    button.addEventListener("mouseenter", handleMouseEnter)
    button.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter)
      button.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <button ref={buttonRef} className={className} onClick={onClick}>
      {children}
    </button>
  )
}

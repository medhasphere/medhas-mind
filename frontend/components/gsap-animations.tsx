"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Hero Animation Component
export function HeroAnimation({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Animate hero elements with stagger
      tl.fromTo(".hero-badge", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
        .fromTo(".hero-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.4")
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6",
        )
        .fromTo(
          ".hero-buttons",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4",
        )
        .fromTo(".hero-note", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.2")
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return <div ref={containerRef}>{children}</div>
}

// Fade In Up Animation for sections
export function FadeInUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, elementRef)

    return () => ctx.revert()
  }, [delay])

  return <div ref={elementRef}>{children}</div>
}

// Stagger Animation for cards/grid items
export function StaggerAnimation({ children, stagger = 0.1 }: { children: React.ReactNode; stagger?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stagger-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, containerRef)

    return () => ctx.revert()
  }, [stagger])

  return <div ref={containerRef}>{children}</div>
}

// Scale on Hover Animation
export function ScaleOnHover({ children }: { children: React.ReactNode }) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseEnter = () => {
      gsap.to(element, { scale: 1.05, duration: 0.3, ease: "power2.out" })
    }

    const handleMouseLeave = () => {
      gsap.to(element, { scale: 1, duration: 0.3, ease: "power2.out" })
    }

    element.addEventListener("mouseenter", handleMouseEnter)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return <div ref={elementRef}>{children}</div>
}

// Slide In From Left
export function SlideInLeft({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, elementRef)

    return () => ctx.revert()
  }, [delay])

  return <div ref={elementRef}>{children}</div>
}

// Slide In From Right
export function SlideInRight({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, elementRef)

    return () => ctx.revert()
  }, [delay])

  return <div ref={elementRef}>{children}</div>
}

// Counter Animation
export function CounterAnimation({
  children,
  targetNumber,
  duration = 2,
}: {
  children: React.ReactNode
  targetNumber: number
  duration?: number
}) {
  const elementRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef({ value: 0 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(counterRef.current, {
        value: targetNumber,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          if (elementRef.current) {
            elementRef.current.textContent = Math.round(counterRef.current.value).toString()
          }
        },
      })
    }, elementRef)

    return () => ctx.revert()
  }, [targetNumber, duration])

  return <div ref={elementRef}>0</div>
}

// FadeIn component for simple fade animations
export function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, elementRef)

    return () => ctx.revert()
  }, [delay])

  return <div ref={elementRef}>{children}</div>
}

// SlideUp component for upward slide animations
export function SlideUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, elementRef)

    return () => ctx.revert()
  }, [delay])

  return <div ref={elementRef}>{children}</div>
}

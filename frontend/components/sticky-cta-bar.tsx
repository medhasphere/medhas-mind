"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Zap } from "lucide-react"

export function StickyCTABar() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Show after scrolling 50% of viewport height
      setIsVisible(scrollPosition > windowHeight * 0.5)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isDismissed || !isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg animate-in slide-in-from-bottom-full duration-300">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <p className="font-semibold">Still unsure? Try for Free Today.</p>
            <p className="text-sm opacity-90">7-day free trial • No credit card required</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" size="sm" className="bg-white text-blue-600 hover:bg-gray-100">
            Start Free Trial
            <Zap className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDismissed(true)}
            className="text-white hover:bg-white/20 p-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

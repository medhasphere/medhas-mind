"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { FadeInUp } from "@/components/gsap-animations"
import { AuthDropdown } from "@/components/auth/auth-dropdown"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <FadeInUp>
      <nav
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
              <Image
                src="/images/medhasmind-logo.png"
                alt="MedhasMind Logo"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/features" className="text-foreground hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-foreground hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>

            <div className="hidden md:flex">
              <AuthDropdown />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
                <Link
                  href="/"
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/features"
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/about"
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                <div className="px-3 py-2">
                  <AuthDropdown />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </FadeInUp>
  )
}

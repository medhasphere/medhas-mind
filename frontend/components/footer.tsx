import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/medhasmind-logo.png"
                alt="MedhasMind Logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <div className="text-2xl font-bold gradient-text">MedhasMind</div>
            </div>
            <p className="text-muted-foreground text-sm">
              MedhasMind: Where Vision Meets Precision. Empowering students to excel in tech innovation through
              strategic thinking and precise execution.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/features"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Pricing
              </Link>
              <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </Link>
              <Link
                href="/contact"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <div className="space-y-2">
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Documentation
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Tutorials
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Blog
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Support
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">© 2024 MedhasMind. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

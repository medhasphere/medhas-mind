import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative py-20 lg:py-32 overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <Badge className="mb-6 text-white border-white/30 backdrop-blur-sm text-lg px-6 py-2 bg-white/20">
              🚀 MedhasMind: Where Vision Meets Precision
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 leading-tight text-white">
              Where{" "}
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                Vision Meets Precision
              </span>
              <br />
              in Tech Innovation
            </h1>

            <p className="text-xl md:text-2xl text-balance mb-8 max-w-3xl mx-auto leading-relaxed text-white/90">
              Master hackathons with precision-driven AI learning paths, strategic simulation environments, and
              visionary mentorship. Join thousands of students building their tech careers with clarity and purpose.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Link href="/pricing">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-full"
                >
                  Start Your Hackathon Journey →
                </Button>
              </Link>
              <Link href="/features">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold text-lg px-8 py-4 rounded-full bg-transparent"
                >
                  ▶ Watch Demo
                </Button>
              </Link>
            </div>

            <div className="text-center mb-8">
              <p className="text-lg mb-4 font-medium text-white/80">Trusted by 5000+ visionary students</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
                <div className="backdrop-blur-sm rounded-lg px-4 py-2 font-semibold bg-white/10 text-white">MLH</div>
                <div className="backdrop-blur-sm rounded-lg px-4 py-2 font-semibold bg-white/10 text-white">SIH</div>
                <div className="backdrop-blur-sm rounded-lg px-4 py-2 font-semibold bg-white/10 text-white">
                  Devfolio
                </div>
                <div className="backdrop-blur-sm rounded-lg px-4 py-2 font-semibold bg-white/10 text-white">Unstop</div>
              </div>
            </div>

            <p className="text-sm text-white/70">Free 7-day trial • No credit card required</p>
          </div>

          <div className="mt-16 relative z-10">
            <div className="backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-white/20 bg-white/10">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="text-white">
                  <div className="text-3xl font-bold mb-2">10,000+</div>
                  <p className="text-white/80">Students Trained</p>
                </div>
                <div className="text-white">
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <p className="text-white/80">Hackathons Won</p>
                </div>
                <div className="text-white">
                  <div className="text-3xl font-bold mb-2">95%</div>
                  <p className="text-white/80">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem We Solve */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Problem We Solve</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Traditional learning lacks the vision and precision needed for the fast-paced, collaborative world of
              hackathons
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 text-2xl">🎯</span>
                </div>
                <CardTitle>Lack of Real Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Students learn theory but struggle with real-world problem-solving under time pressure
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 text-2xl">👥</span>
                </div>
                <CardTitle>No Team Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Most learning happens in isolation, missing the crucial teamwork skills needed for hackathons
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 text-2xl">📚</span>
                </div>
                <CardTitle>Generic Learning Paths</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  One-size-fits-all courses don't adapt to individual strengths and learning styles
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Precision-Driven Solution</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience hackathons before you compete. Learn with vision, practice with precision, and excel with our
              comprehensive platform
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <span className="text-primary text-2xl">🧠</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Learning Paths</h3>
                  <p className="text-muted-foreground">
                    Personalized curricula that adapt to your skill level and learning pace
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <span className="text-secondary text-2xl">💻</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Hackathon Simulation</h3>
                  <p className="text-muted-foreground">
                    Practice with AI teammates in realistic hackathon environments
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <span className="text-primary text-2xl">🏆</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Portfolio Builder</h3>
                  <p className="text-muted-foreground">
                    Showcase your projects with GitHub integration and professional templates
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold mb-2">Ready to Launch?</h3>
                <p className="text-muted-foreground">Join 10,000+ students already mastering hackathons</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Transform Vision into Precision?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join 10,000+ students who've transformed their hackathon performance with MedhasMind's precision-driven
            approach
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                Start Free Trial ⚡
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent font-semibold"
              >
                View Pricing
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-white/80">
            <div className="flex items-center">
              <span className="mr-2">✓</span>
              Free 7-day trial
            </div>
            <div className="flex items-center">
              <span className="mr-2">✓</span>
              No credit card required
            </div>
            <div className="flex items-center">
              <span className="mr-2">✓</span>
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

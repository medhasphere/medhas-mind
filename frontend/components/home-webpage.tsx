import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Brain,
  Code,
  Users,
  Trophy,
  Zap,
  Target,
  Star,
  ArrowRight,
  CheckCircle,
  Rocket,
  BookOpen,
  Award,
} from "lucide-react"
import Link from "next/link"
import {
  HeroAnimation,
  FadeInUp,
  StaggerAnimation,
  ScaleOnHover,
  SlideInLeft,
  SlideInRight,
  CounterAnimation,
} from "@/components/gsap-animations"

export default function HomeWebpage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <HeroAnimation>
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="hero-badge mb-6 bg-primary text-primary-foreground border-primary/20">
                🚀 India's #1 Hackathon Platform
              </Badge>
              <h1 className="hero-title text-4xl md:text-6xl font-bold text-balance mb-6">
                India's #1 <span className="gradient-text">Hackathon-Prep</span> & AI-Driven Skills Platform
              </h1>
              <p className="hero-description text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Master hackathons with AI-powered learning paths, simulation environments, and personalized mentorship.
                Join thousands of students building their tech careers.
              </p>
              <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Start Your Hackathon Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>
              <p className="hero-note text-sm text-muted-foreground mt-4">Free 7-day trial • No credit card required</p>
            </div>
          </HeroAnimation>
        </div>
      </section>

      {/* Problem We Solve */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Problem We Solve</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Traditional learning doesn't prepare students for the fast-paced, collaborative world of hackathons
              </p>
            </div>
          </FadeInUp>
          <StaggerAnimation>
            <div className="grid md:grid-cols-3 gap-8">
              <ScaleOnHover>
                <Card className="stagger-item text-center">
                  <CardHeader>
                    <Target className="h-12 w-12 text-destructive mx-auto mb-4" />
                    <CardTitle>Lack of Real Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Students learn theory but struggle with real-world problem-solving under time pressure
                    </p>
                  </CardContent>
                </Card>
              </ScaleOnHover>
              <ScaleOnHover>
                <Card className="stagger-item text-center">
                  <CardHeader>
                    <Users className="h-12 w-12 text-destructive mx-auto mb-4" />
                    <CardTitle>No Team Collaboration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Most learning happens in isolation, missing the crucial teamwork skills needed for hackathons
                    </p>
                  </CardContent>
                </Card>
              </ScaleOnHover>
              <ScaleOnHover>
                <Card className="stagger-item text-center">
                  <CardHeader>
                    <BookOpen className="h-12 w-12 text-destructive mx-auto mb-4" />
                    <CardTitle>Generic Learning Paths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      One-size-fits-all courses don't adapt to individual strengths and learning styles
                    </p>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            </div>
          </StaggerAnimation>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our AI-Powered Solution</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience hackathons before you compete. Learn, practice, and excel with our comprehensive platform
              </p>
            </div>
          </FadeInUp>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <SlideInLeft>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Brain className="h-6 w-6 text-primary" />
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
                    <Code className="h-6 w-6 text-secondary" />
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
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Portfolio Builder</h3>
                    <p className="text-muted-foreground">
                      Showcase your projects with GitHub integration and professional templates
                    </p>
                  </div>
                </div>
              </div>
            </SlideInLeft>
            <SlideInRight>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 text-center">
                  <Rocket className="h-24 w-24 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Ready to Launch?</h3>
                  <p className="text-muted-foreground">
                    Join <CounterAnimation targetNumber={10000} />+ students already mastering hackathons
                  </p>
                </div>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to excel in hackathons and build your tech career
              </p>
            </div>
          </FadeInUp>
          <StaggerAnimation stagger={0.15}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ScaleOnHover>
                <Card className="stagger-item text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Brain className="h-10 w-10 text-primary mx-auto mb-2" />
                    <CardTitle className="text-lg">AI Mentorship</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">24/7 AI coach for personalized guidance</p>
                  </CardContent>
                </Card>
              </ScaleOnHover>
              <ScaleOnHover>
                <Card className="stagger-item text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Users className="h-10 w-10 text-secondary mx-auto mb-2" />
                    <CardTitle className="text-lg">Team Matching</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Find perfect teammates with AI matching</p>
                  </CardContent>
                </Card>
              </ScaleOnHover>
              <ScaleOnHover>
                <Card className="stagger-item text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Code className="h-10 w-10 text-primary mx-auto mb-2" />
                    <CardTitle className="text-lg">Live Coding</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Real-time collaborative coding environment</p>
                  </CardContent>
                </Card>
              </ScaleOnHover>
              <ScaleOnHover>
                <Card className="stagger-item text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Award className="h-10 w-10 text-secondary mx-auto mb-2" />
                    <CardTitle className="text-lg">Pitch Coach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">AI-powered presentation feedback</p>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            </div>
          </StaggerAnimation>
          <FadeInUp delay={0.5}>
            <div className="text-center mt-12">
              <Link href="/features">
                <Button variant="outline" size="lg">
                  Explore All Features
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Students Say</h2>
              <p className="text-xl text-muted-foreground">Join thousands of successful hackathon participants</p>
            </div>
          </FadeInUp>
          <StaggerAnimation stagger={0.2}>
            <div className="grid md:grid-cols-3 gap-8">
              <ScaleOnHover>
                <Card className="stagger-item">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardTitle className="text-lg">Priya Sharma</CardTitle>
                    <CardDescription>IIT Delhi, Winner of HackIndia 2024</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      "UpSkill Hub's AI mentorship helped me identify my weak areas and improve systematically. Won my
                      first hackathon after just 2 months!"
                    </p>
                  </CardContent>
                </Card>
              </ScaleOnHover>
              <ScaleOnHover>
                <Card className="stagger-item">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardTitle className="text-lg">Arjun Patel</CardTitle>
                    <CardDescription>NIT Surat, 3x Hackathon Winner</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      "The simulation environment is incredible. It's like having a hackathon practice ground available
                      24/7. My team coordination improved dramatically."
                    </p>
                  </CardContent>
                </Card>
              </ScaleOnHover>
              <ScaleOnHover>
                <Card className="stagger-item">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardTitle className="text-lg">Sneha Reddy</CardTitle>
                    <CardDescription>BITS Pilani, Google Intern</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      "The portfolio builder helped me showcase my hackathon projects professionally. Landed my dream
                      internship thanks to the skills I built here!"
                    </p>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            </div>
          </StaggerAnimation>
        </div>
      </section>

      {/* CTA Section */}
      <FadeInUp>
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Dominate Your Next Hackathon?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join <CounterAnimation targetNumber={10000} />+ students who've transformed their hackathon performance
              with UpSkill Hub
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                Start Free Trial
                <Zap className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
              >
                View Pricing
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-8 text-sm opacity-80">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Free 7-day trial
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Cancel anytime
              </div>
            </div>
          </div>
        </section>
      </FadeInUp>

      <Footer />
    </div>
  )
}

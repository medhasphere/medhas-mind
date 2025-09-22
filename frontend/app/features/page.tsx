import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnimatedCounter } from "@/components/animated-counter"
import {
  Brain,
  Code,
  Users,
  Trophy,
  Zap,
  ArrowRight,
  CheckCircle,
  MessageSquare,
  BarChart3,
  Clock,
  Shield,
  Lightbulb,
  Play,
  Star,
  Quote,
} from "lucide-react"
import Link from "next/link"
import {
  HeroAnimation,
  FadeInUp,
  StaggerAnimation,
  ScaleOnHover,
  SlideInLeft,
  SlideInRight,
} from "@/components/gsap-animations"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section
        className="py-20 lg:py-32 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #1e40af 100%)",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <HeroAnimation>
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                🚀 Comprehensive Platform
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white text-balance mb-6">
                Everything You Need to{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Excel in Hackathons
                </span>
              </h1>
              <p className="text-xl text-white/90 text-balance mb-8 max-w-2xl mx-auto">
                From AI-powered learning paths to real-time collaboration tools, discover how our platform transforms
                students into hackathon champions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent backdrop-blur-sm"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Explore Features
                </Button>
              </div>
            </div>
          </HeroAnimation>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our flagship features that set us apart from traditional learning platforms
              </p>
            </div>
          </FadeInUp>

          <StaggerAnimation stagger={0.2}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              <ScaleOnHover>
                <Card className="stagger-item hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto bg-blue-100 p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
                      <Brain className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">AI Learning Paths</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground text-sm">
                      Personalized curriculum that adapts to your coding style and learning pace
                    </p>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              <ScaleOnHover>
                <Card className="stagger-item hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto bg-purple-100 p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">Hackathon Simulation</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground text-sm">
                      Practice with AI teammates in realistic 24-48 hour hackathon environments
                    </p>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              <ScaleOnHover>
                <Card className="stagger-item hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto bg-green-100 p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
                      <Trophy className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">Portfolio Builder</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground text-sm">
                      Showcase projects with GitHub integration and professional templates
                    </p>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              <ScaleOnHover>
                <Card className="stagger-item hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto bg-orange-100 p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
                      <MessageSquare className="h-8 w-8 text-orange-600" />
                    </div>
                    <CardTitle className="text-lg">AI Mentor & Pitch Coach</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground text-sm">
                      24/7 guidance and pitch practice with real-time feedback
                    </p>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            </div>
          </StaggerAnimation>

          <div className="space-y-20">
            {/* AI Learning Paths */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <SlideInLeft>
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">AI-Powered</Badge>
                  <h3 className="text-3xl font-bold mb-4">Personalized Learning Paths</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Our AI analyzes your coding style, strengths, and areas for improvement to create a completely
                    personalized curriculum that adapts as you grow.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span>Adaptive difficulty based on performance</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span>Multi-language support (Python, JavaScript, Java, C++)</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span>Real-time progress tracking and analytics</span>
                    </div>
                  </div>
                </div>
              </SlideInLeft>
              <SlideInRight>
                <div className="relative">
                  <img
                    src="/ai-powered-personalized-learning-dashboard-with-ad.jpg"
                    alt="AI-Powered Learning Paths Dashboard"
                    className="rounded-lg shadow-2xl w-full h-64 md:h-80 lg:h-96 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </SlideInRight>
            </div>

            {/* Hackathon Simulation */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2">
                <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">Simulation</Badge>
                <h3 className="text-3xl font-bold mb-4">Hackathon Simulation with AI Teammates</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Practice in realistic hackathon environments with AI teammates that simulate different personality
                  types and skill levels, preparing you for any team dynamic.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span>24/48-hour simulation challenges</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span>AI teammates with different specializations</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span>Real-world problem statements from industry</span>
                  </div>
                </div>
              </div>
              <div className="lg:order-1">
                <img
                  src="/hackathon-simulation-environment-with-ai-teammates.jpg"
                  alt="Hackathon Simulation with AI Teammates"
                  className="rounded-lg shadow-2xl w-full h-64 md:h-80 lg:h-96 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Students Worldwide</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Join thousands of students who have transformed their hackathon performance
            </p>
          </div>

          {/* Animated Counters */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                <AnimatedCounter end={10000} suffix="+" />
              </div>
              <p className="text-white/80">Hackathon Hours</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">
                <AnimatedCounter end={5000} suffix="+" />
              </div>
              <p className="text-white/80">Students Trained</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                <AnimatedCounter end={250} suffix="+" />
              </div>
              <p className="text-white/80">Hackathons Won</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">
                <AnimatedCounter end={95} suffix="%" />
              </div>
              <p className="text-white/80">Success Rate</p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-white/60 mb-4" />
                <p className="text-white/90 mb-4">
                  "UpSkill Hub's AI mentor helped me win my first hackathon. The personalized learning path was exactly
                  what I needed."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-white">Priya Sharma</p>
                    <p className="text-sm text-white/60">IIT Delhi, Winner SIH 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-white/60 mb-4" />
                <p className="text-white/90 mb-4">
                  "The hackathon simulation feature is incredible. It's like having a practice arena before the real
                  competition."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-white">Arjun Patel</p>
                    <p className="text-sm text-white/60">NIT Trichy, MLH Winner</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-white/60 mb-4" />
                <p className="text-white/90 mb-4">
                  "My portfolio built with UpSkill Hub landed me internships at 3 top tech companies. Game changer!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-white">Sneha Reddy</p>
                    <p className="text-sm text-white/60">BITS Pilani, Google Intern</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Additional Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                More tools to enhance your hackathon preparation and performance
              </p>
            </div>
          </FadeInUp>
          <StaggerAnimation stagger={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ScaleOnHover>
                <Card className="stagger-item hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <MessageSquare className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>AI Mentorship & Pitch Coach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Get 24/7 guidance from our AI mentor and practice your pitch with real-time feedback on delivery,
                      content, and presentation skills.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mr-2" />
                        Real-time pitch analysis
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mr-2" />
                        Personalized improvement tips
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              <ScaleOnHover>
                <Card className="stagger-item hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Code className="h-10 w-10 text-secondary mb-2" />
                    <CardTitle>Live Coding Environment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Collaborate in real-time with your team using our integrated IDE with version control, debugging
                      tools, and instant deployment.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-secondary mr-2" />
                        Multi-language support
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-secondary mr-2" />
                        Instant deployment
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              <ScaleOnHover>
                <Card className="stagger-item hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <BarChart3 className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Performance Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Track your progress with detailed analytics on coding speed, problem-solving efficiency, and team
                      collaboration metrics.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mr-2" />
                        Detailed progress reports
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mr-2" />
                        Skill gap analysis
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              <ScaleOnHover>
                <Card className="stagger-item hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Clock className="h-10 w-10 text-secondary mb-2" />
                    <CardTitle>Time Management Tools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Master hackathon time constraints with built-in timers, milestone tracking, and productivity
                      optimization suggestions.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-secondary mr-2" />
                        Smart time allocation
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-secondary mr-2" />
                        Milestone reminders
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              <ScaleOnHover>
                <Card className="stagger-item hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Shield className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Secure Team Workspace</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Collaborate safely with encrypted communication, secure file sharing, and privacy controls for
                      your hackathon projects.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mr-2" />
                        End-to-end encryption
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mr-2" />
                        Private repositories
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              <ScaleOnHover>
                <Card className="stagger-item hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Lightbulb className="h-10 w-10 text-secondary mb-2" />
                    <CardTitle>Idea Generation Hub</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Never run out of ideas with our AI-powered idea generator, trend analysis, and problem statement
                      database from real hackathons.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-secondary mr-2" />
                        AI idea generation
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-secondary mr-2" />
                        Trend analysis
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            </div>
          </StaggerAnimation>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience These Features?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Start your free trial today and see how our comprehensive platform can transform your hackathon performance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Free Trial
              <Zap className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent backdrop-blur-sm"
              >
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

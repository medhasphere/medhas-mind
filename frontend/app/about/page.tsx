import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Target, Eye, Heart, Users, Trophy, Lightbulb, ArrowRight, Linkedin, Twitter, Github, Mail } from "lucide-react"
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <HeroAnimation>
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="hero-badge mb-6 bg-primary/10 text-primary border-primary/20">🚀 Our Vision</Badge>
              <h1 className="hero-title text-4xl md:text-6xl font-bold text-balance mb-6">
                Empowering the Next Generation with <span className="gradient-text">Vision & Precision</span>
              </h1>
              <p className="hero-description text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                We're on a mission to democratize tech innovation success by combining visionary thinking with precision
                execution, making world-class education accessible to every student.
              </p>
            </div>
          </HeroAnimation>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerAnimation stagger={0.2}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Mission */}
              <ScaleOnHover>
                <Card className="stagger-item text-center">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      To bridge the gap between traditional education and real-world tech skills by providing
                      precision-driven, AI-powered learning experiences that transform vision into executable solutions.
                    </p>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              {/* Vision */}
              <ScaleOnHover>
                <Card className="stagger-item text-center">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                      <Eye className="h-8 w-8 text-secondary" />
                    </div>
                    <CardTitle className="text-2xl">Our Vision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      To become the leading platform where vision meets precision, creating a generation of confident,
                      skilled innovators who can tackle any challenge with clarity and execute with excellence.
                    </p>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              {/* Values */}
              <ScaleOnHover>
                <Card className="stagger-item text-center">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Heart className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Our Values</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Vision, precision, and student success drive everything we do. We believe in learning with
                      purpose, executing with accuracy, and making transformative education accessible to all.
                    </p>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            </div>
          </StaggerAnimation>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <SlideInLeft>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">The Story Behind MedhasMind</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    MedhasMind was born from a simple observation: despite India producing some of the world's most
                    talented engineers, many students struggle in hackathons because traditional education lacks the
                    vision to see possibilities and the precision to execute them effectively.
                  </p>
                  <p>
                    Our founders, having participated in and organized dozens of hackathons, noticed that the most
                    successful participants weren't necessarily the smartest, but those who combined clear vision with
                    precise execution, thinking strategically under pressure while building complete solutions
                    efficiently.
                  </p>
                  <p>
                    This insight led to the creation of MedhasMind - where vision meets precision. A platform that
                    develops both the strategic thinking and tactical skills that traditional courses miss, creating
                    well-rounded innovators ready for any challenge.
                  </p>
                </div>
              </div>
            </SlideInLeft>
            <SlideInRight>
              <div className="relative">
                <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Lightbulb className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">2023</h3>
                        <p className="text-sm text-muted-foreground">Idea conceived during HackIndia</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Early 2024</h3>
                        <p className="text-sm text-muted-foreground">Beta launch with 100 students</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Trophy className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Today</h3>
                        <p className="text-sm text-muted-foreground">
                          <CounterAnimation targetNumber={10000} />+ students across India
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A passionate group of educators, engineers, and innovators dedicated to transforming tech education
              </p>
            </div>
          </FadeInUp>

          <StaggerAnimation stagger={0.15}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Team Member 1 */}
              <ScaleOnHover>
                <Card className="stagger-item text-center">
                  <CardHeader>
                    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-white">AR</span>
                    </div>
                    <CardTitle className="text-xl">Arjun Rajesh</CardTitle>
                    <p className="text-muted-foreground">Co-Founder & CEO</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Former Google engineer with 8+ years in EdTech. Winner of 15+ hackathons including Smart India
                      Hackathon.
                    </p>
                    <div className="flex justify-center space-x-3">
                      <Button size="sm" variant="ghost">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              {/* Team Member 2 */}
              <ScaleOnHover>
                <Card className="stagger-item text-center">
                  <CardHeader>
                    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-white">PS</span>
                    </div>
                    <CardTitle className="text-xl">Priya Sharma</CardTitle>
                    <p className="text-muted-foreground">Co-Founder & CTO</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      AI/ML expert from IIT Delhi. Led engineering teams at Microsoft and Flipkart. PhD in Computer
                      Science.
                    </p>
                    <div className="flex justify-center space-x-3">
                      <Button size="sm" variant="ghost">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              {/* Team Member 3 */}
              <ScaleOnHover>
                <Card className="stagger-item text-center">
                  <CardHeader>
                    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-white">RK</span>
                    </div>
                    <CardTitle className="text-xl">Rahul Kumar</CardTitle>
                    <p className="text-muted-foreground">Head of Product</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Product strategist with experience at Zomato and Paytm. Expert in user experience and educational
                      technology.
                    </p>
                    <div className="flex justify-center space-x-3">
                      <Button size="sm" variant="ghost">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              {/* Team Member 4 */}
              <ScaleOnHover>
                <Card className="stagger-item text-center">
                  <CardHeader>
                    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-white">SG</span>
                    </div>
                    <CardTitle className="text-xl">Sneha Gupta</CardTitle>
                    <p className="text-muted-foreground">Head of Education</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Former professor at NIT Surat. Curriculum design expert with 10+ years in computer science
                      education.
                    </p>
                    <div className="flex justify-center space-x-3">
                      <Button size="sm" variant="ghost">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              {/* Team Member 5 */}
              <ScaleOnHover>
                <Card className="stagger-item text-center">
                  <CardHeader>
                    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-white">VT</span>
                    </div>
                    <CardTitle className="text-xl">Vikram Thakur</CardTitle>
                    <p className="text-muted-foreground">Lead AI Engineer</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Machine learning specialist from IISC Bangalore. Expert in natural language processing and
                      educational AI.
                    </p>
                    <div className="flex justify-center space-x-3">
                      <Button size="sm" variant="ghost">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Github className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              {/* Team Member 6 */}
              <ScaleOnHover>
                <Card className="stagger-item text-center">
                  <CardHeader>
                    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-white">AM</span>
                    </div>
                    <CardTitle className="text-xl">Anita Mehta</CardTitle>
                    <p className="text-muted-foreground">Community Manager</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Community building expert with experience at GitHub and Stack Overflow. Passionate about developer
                      communities.
                    </p>
                    <div className="flex justify-center space-x-3">
                      <Button size="sm" variant="ghost">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            </div>
          </StaggerAnimation>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
              <p className="text-xl text-muted-foreground">Numbers that reflect our commitment to student success</p>
            </div>
          </FadeInUp>

          <StaggerAnimation stagger={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ScaleOnHover>
                <Card className="stagger-item text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-primary mb-2">
                      <CounterAnimation targetNumber={10000} />+
                    </div>
                    <p className="text-muted-foreground">Students Trained</p>
                  </CardContent>
                </Card>
              </ScaleOnHover>
              <ScaleOnHover>
                <Card className="stagger-item text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-secondary mb-2">
                      <CounterAnimation targetNumber={500} />+
                    </div>
                    <p className="text-muted-foreground">Hackathons Won</p>
                  </CardContent>
                </Card>
              </ScaleOnHover>
              <ScaleOnHover>
                <Card className="stagger-item text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-primary mb-2">
                      <CounterAnimation targetNumber={50} />+
                    </div>
                    <p className="text-muted-foreground">Partner Colleges</p>
                  </CardContent>
                </Card>
              </ScaleOnHover>
              <ScaleOnHover>
                <Card className="stagger-item text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-secondary mb-2">
                      <CounterAnimation targetNumber={95} />%
                    </div>
                    <p className="text-muted-foreground">Student Satisfaction</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Vision</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Whether you're a student looking to transform vision into precision or an educator wanting to
              revolutionize learning, we'd love to have you on board.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
                >
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </FadeInUp>

      <Footer />
    </div>
  )
}

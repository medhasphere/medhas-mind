"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PricingToggle } from "@/components/pricing-toggle"
import { StickyCTABar } from "@/components/sticky-cta-bar"
import { CheckCircle, X, Zap, Users, Building, Star, ArrowRight, Sparkles } from "lucide-react"
import {
  HeroAnimation,
  FadeInUp,
  StaggerAnimation,
  ScaleOnHover,
  SlideInLeft,
  SlideInRight,
  CounterAnimation,
} from "@/components/gsap-animations"

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true)

  const pricingData = {
    student: {
      monthly: { price: 999, breakdown: "₹999/month" },
      yearly: { price: 799, breakdown: "₹799/year → Less than ₹67/month" },
    },
    pro: {
      monthly: { price: 1899, breakdown: "₹1,899/month" },
      yearly: { price: 1499, breakdown: "₹1,499/year → Less than ₹125/month" },
    },
    enterprise: {
      monthly: { price: "3,500-5,000", breakdown: "₹3,500-₹5,000/student/month" },
      yearly: { price: "2,500-4,000", breakdown: "₹2,500-₹4,000/student/year" },
    },
  }

  const currentPricing = isYearly ? "yearly" : "monthly"

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
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
                💰 Simple, Transparent Pricing
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 text-white">
                Choose Your{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Learning Journey
                </span>
              </h1>
              <p className="text-xl text-white/90 text-balance mb-8 max-w-2xl mx-auto">
                Simple, transparent yearly pricing. Cancel anytime. Start with our free trial and upgrade when you're
                ready.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Free 7-day trial
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  No credit card required
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                  <Sparkles className="h-4 w-4 mr-1" />
                  Cancel anytime
                </Badge>
              </div>
            </div>
          </HeroAnimation>
        </div>
      </section>

      {/* Pricing Toggle */}
      <section className="py-12 -mt-8 relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <PricingToggle onToggle={setIsYearly} defaultYearly={true} />
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerAnimation stagger={0.2}>
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Student Plan */}
              <ScaleOnHover>
                <Card className="stagger-item relative hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardHeader className="text-center pb-8">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl">Student</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">₹{pricingData.student[currentPricing].price}</span>
                      <span className="text-muted-foreground">/{isYearly ? "year" : "month"}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {pricingData.student[currentPricing].breakdown}
                    </p>
                    <Badge className="mt-3 bg-green-100 text-green-700 border-green-200">
                      <Zap className="h-3 w-3 mr-1" />
                      Free 7-day Trial
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">AI-powered learning paths</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Hackathon simulation (5 per month)</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Portfolio builder with GitHub integration</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">AI mentorship (limited)</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Basic analytics</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Community access</span>
                      </div>
                      <div className="flex items-center">
                        <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-400">Team collaboration</span>
                      </div>
                      <div className="flex items-center">
                        <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-400">Priority support</span>
                      </div>
                    </div>
                    <Button className="w-full mt-6 bg-transparent" variant="outline">
                      Start Free Trial
                    </Button>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              {/* Pro Plan - Most Popular */}
              <ScaleOnHover>
                <Card className="stagger-item relative border-2 border-blue-500 shadow-2xl scale-105 hover:scale-110 transition-all duration-300 bg-gradient-to-b from-blue-50 to-purple-50">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 shadow-lg animate-pulse">
                      ⭐ Most Popular
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg"></div>
                  <CardHeader className="text-center pb-8 relative z-10">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Pro</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">₹{pricingData.pro[currentPricing].price}</span>
                      <span className="text-muted-foreground">/{isYearly ? "year" : "month"}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{pricingData.pro[currentPricing].breakdown}</p>
                    <Badge className="mt-3 bg-green-100 text-green-700 border-green-200">
                      <Zap className="h-3 w-3 mr-1" />
                      Free 7-day Trial
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4 relative z-10">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm font-medium">Everything in Student plan</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Unlimited hackathon simulations</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Advanced AI mentorship</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Team collaboration tools</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Advanced analytics & insights</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">AI Pitch Coach with video analysis</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Priority support</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Custom learning paths</span>
                      </div>
                    </div>
                    <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                      Start Free Trial
                      <Zap className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              {/* Enterprise Plan */}
              <ScaleOnHover>
                <Card className="stagger-item relative hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardHeader className="text-center pb-8">
                    <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <Building className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-2xl">Enterprise</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">₹{pricingData.enterprise[currentPricing].price}</span>
                      <span className="text-muted-foreground">/{isYearly ? "student/year" : "student/month"}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {pricingData.enterprise[currentPricing].breakdown}
                    </p>
                    <Badge className="mt-3 bg-green-100 text-green-700 border-green-200">
                      <Zap className="h-3 w-3 mr-1" />
                      Free 7-day Trial
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm font-medium">Everything in Pro plan</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Bulk student licenses</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Faculty training program</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Campus hackathon support</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Performance analytics dashboard</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Dedicated account manager</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Custom integrations</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">24/7 priority support</span>
                      </div>
                    </div>
                    <Button className="w-full mt-6 bg-transparent" variant="outline">
                      Contact Sales
                    </Button>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            </div>
          </StaggerAnimation>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Students Across India</h2>
              <p className="text-xl text-muted-foreground">See what our community is saying</p>
            </div>
          </FadeInUp>

          <StaggerAnimation stagger={0.2}>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="stagger-item p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "UpSkill Hub's AI mentorship helped me win my first hackathon. The simulation feature is incredibly
                  realistic!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold">A</span>
                  </div>
                  <div>
                    <p className="font-semibold">Arjun Patel</p>
                    <p className="text-sm text-muted-foreground">IIT Delhi, Computer Science</p>
                  </div>
                </div>
              </Card>

              <Card className="stagger-item p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "The portfolio builder integrated with GitHub saved me weeks of work. Got placed at a top tech
                  company!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-semibold">P</span>
                  </div>
                  <div>
                    <p className="font-semibold">Priya Sharma</p>
                    <p className="text-sm text-muted-foreground">NIT Surat, Software Engineering</p>
                  </div>
                </div>
              </Card>

              <Card className="stagger-item p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "Our college hackathon success rate increased by 200% after partnering with UpSkill Hub. Amazing
                  platform!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-semibold">R</span>
                  </div>
                  <div>
                    <p className="font-semibold">Dr. Rajesh Kumar</p>
                    <p className="text-sm text-muted-foreground">Professor, BITS Pilani</p>
                  </div>
                </div>
              </Card>
            </div>
          </StaggerAnimation>

          {/* Animated Counters */}
          <FadeInUp>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  <CounterAnimation targetNumber={10000} />+
                </div>
                <p className="text-muted-foreground">Hackathon Hours Completed</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  <CounterAnimation targetNumber={5000} />+
                </div>
                <p className="text-muted-foreground">Students Trained</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  <CounterAnimation targetNumber={85} />%
                </div>
                <p className="text-muted-foreground">Success Rate Improvement</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  <CounterAnimation targetNumber={200} />+
                </div>
                <p className="text-muted-foreground">Partner Colleges</p>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* College Partnership Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">College Partnership Program</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Special pricing for educational institutions looking to enhance their students' hackathon readiness
              </p>
            </div>
          </FadeInUp>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <SlideInLeft>
              <div>
                <h3 className="text-2xl font-bold mb-6">Transform Your Campus into a Hackathon Hub</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Bulk Student Licenses</h4>
                      <p className="text-muted-foreground">₹2,500 - ₹4,000 per student per year based on volume</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Faculty Training Program</h4>
                      <p className="text-muted-foreground">Comprehensive training for educators to guide students</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Campus Hackathon Support</h4>
                      <p className="text-muted-foreground">
                        Tools and resources to organize successful campus hackathons
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Performance Analytics</h4>
                      <p className="text-muted-foreground">
                        Track student progress and engagement across your institution
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button size="lg" className="gradient-primary text-white hover:opacity-90">
                    Request Partnership Info
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </SlideInLeft>

            <SlideInRight>
              <Card className="p-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    <CounterAnimation targetNumber={500} />+
                  </div>
                  <p className="text-muted-foreground mb-6">Students already using UpSkill Hub across India</p>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">
                        <CounterAnimation targetNumber={85} />%
                      </div>
                      <p className="text-sm text-muted-foreground">Improvement in hackathon performance</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">
                        <CounterAnimation targetNumber={3} />x
                      </div>
                      <p className="text-sm text-muted-foreground">Higher placement rates</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-left">
                    <p className="text-sm text-muted-foreground">
                      <strong>IIT Delhi:</strong> "Our students' hackathon success rate increased by 200%"
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>NIT Surat:</strong> "The AI mentorship feature is game-changing"
                    </p>
                  </div>
                </div>
              </Card>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground">Everything you need to know about our pricing</p>
            </div>
          </FadeInUp>

          <StaggerAnimation stagger={0.1}>
            <div className="max-w-3xl mx-auto space-y-6">
              <ScaleOnHover>
                <Card className="stagger-item hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">How does the free trial work?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      You get full access to all Pro features for 7 days, no credit card required. After the trial, you
                      can choose to upgrade or continue with limited free access.
                    </p>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              <ScaleOnHover>
                <Card className="stagger-item hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">Can I switch between monthly and yearly plans?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! You can upgrade or downgrade your plan at any time. Yearly plans offer 20% savings compared
                      to monthly billing.
                    </p>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              <ScaleOnHover>
                <Card className="stagger-item hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We accept all major credit cards, debit cards, UPI, and net banking. For enterprise plans, we also
                      offer invoice-based billing.
                    </p>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              <ScaleOnHover>
                <Card className="stagger-item hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">Is there a student discount?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our Student plan is already designed with student budgets in mind. Additionally, students from
                      partner colleges get access through their institution at discounted rates.
                    </p>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            </div>
          </StaggerAnimation>
        </div>
      </section>

      <Footer />
      <StickyCTABar />
    </div>
  )
}

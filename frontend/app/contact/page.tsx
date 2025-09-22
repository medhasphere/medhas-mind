"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Building, CheckCircle } from "lucide-react"
import {
  HeroAnimation,
  FadeInUp,
  StaggerAnimation,
  ScaleOnHover,
  SlideInLeft,
  SlideInRight,
} from "@/components/gsap-animations"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "general",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiryType: "general",
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <HeroAnimation>
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="hero-badge mb-6 bg-primary/10 text-primary border-primary/20">📞 Get in Touch</Badge>
              <h1 className="hero-title text-4xl md:text-6xl font-bold text-balance mb-6">
                Let's <span className="gradient-text">Connect</span> and Transform Education Together
              </h1>
              <p className="hero-description text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Have questions about our platform? Want to partner with us? Or just want to say hello? We'd love to hear
                from you.
              </p>
            </div>
          </HeroAnimation>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerAnimation stagger={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <ScaleOnHover>
                <Card className="stagger-item text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">General Inquiries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">Questions about our platform or services</p>
                    <p className="text-sm font-medium">hello@upskillhub.in</p>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              <ScaleOnHover>
                <Card className="stagger-item text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-2">
                      <Users className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="text-lg">Student Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">Help with your learning journey</p>
                    <p className="text-sm font-medium">support@upskillhub.in</p>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              <ScaleOnHover>
                <Card className="stagger-item text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                      <Building className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">College Partnerships</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">Institutional collaborations</p>
                    <p className="text-sm font-medium">partnerships@upskillhub.in</p>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              <ScaleOnHover>
                <Card className="stagger-item text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-2">
                      <Phone className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="text-lg">Phone Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">Speak with our team directly</p>
                    <p className="text-sm font-medium">+91 98765 43210</p>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            </div>
          </StaggerAnimation>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <SlideInLeft>
              <div>
                <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                {isSubmitted ? (
                  <Card className="p-8 text-center bg-green-50 border-green-200">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
                    <p className="text-green-700">Thank you for reaching out. We'll get back to you soon.</p>
                  </Card>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Student Support</option>
                        <option value="partnership">College Partnership</option>
                        <option value="technical">Technical Issue</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="Brief subject of your message"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full gradient-primary text-white hover:opacity-90">
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                )}
              </div>
            </SlideInLeft>

            {/* Contact Information */}
            <SlideInRight>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                  <p className="text-muted-foreground mb-8">
                    We're here to help you succeed. Reach out through any of these channels.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Us</h3>
                      <p className="text-muted-foreground">hello@upskillhub.in</p>
                      <p className="text-sm text-muted-foreground">We typically respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/10 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Call Us</h3>
                      <p className="text-muted-foreground">+91 98765 43210</p>
                      <p className="text-sm text-muted-foreground">Mon-Fri, 9:00 AM - 6:00 PM IST</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Visit Us</h3>
                      <p className="text-muted-foreground">
                        Tech Hub, Koramangala
                        <br />
                        Bangalore, Karnataka 560034
                        <br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/10 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Office Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM IST
                        <br />
                        Saturday: 10:00 AM - 4:00 PM IST
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Newsletter Signup */}
                <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <h3 className="text-xl font-semibold mb-3">Stay Updated</h3>
                  <p className="text-muted-foreground mb-4">
                    Subscribe to our newsletter for the latest updates, tips, and hackathon opportunities.
                  </p>
                  <div className="flex space-x-2">
                    <Input placeholder="Enter your email" className="flex-1" />
                    <Button className="gradient-primary text-white hover:opacity-90">Subscribe</Button>
                  </div>
                </Card>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground">Quick answers to common questions</p>
            </div>
          </FadeInUp>

          <StaggerAnimation stagger={0.1}>
            <div className="max-w-3xl mx-auto space-y-6">
              <ScaleOnHover>
                <Card className="stagger-item">
                  <CardHeader>
                    <CardTitle className="text-lg">How quickly do you respond to inquiries?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We aim to respond to all inquiries within 24 hours during business days. For urgent matters,
                      please call us directly.
                    </p>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              <ScaleOnHover>
                <Card className="stagger-item">
                  <CardHeader>
                    <CardTitle className="text-lg">Do you offer campus visits for college partnerships?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! We regularly visit partner colleges for demos, workshops, and training sessions. Contact our
                      partnerships team to schedule a visit.
                    </p>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              <ScaleOnHover>
                <Card className="stagger-item">
                  <CardHeader>
                    <CardTitle className="text-lg">Can I schedule a demo of the platform?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We offer personalized demos for individuals, teams, and institutions. Use the contact form above
                      or email us to schedule one.
                    </p>
                  </CardContent>
                </Card>
              </ScaleOnHover>

              <ScaleOnHover>
                <Card className="stagger-item">
                  <CardHeader>
                    <CardTitle className="text-lg">Do you provide technical support for students?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes, we have a dedicated student support team available via email and chat. Pro and Team plan
                      users get priority support.
                    </p>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            </div>
          </StaggerAnimation>
        </div>
      </section>

      <Footer />
    </div>
  )
}

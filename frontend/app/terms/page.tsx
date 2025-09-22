import { FadeIn, SlideUp } from "@/components/gsap-animations"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FadeIn>
          <div className="max-w-4xl mx-auto">
            <SlideUp>
              <div className="mb-8">
                <Link href="/">
                  <Button variant="ghost" className="group">
                    <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </SlideUp>

            <SlideUp>
              <h1 className="text-4xl font-bold text-center mb-8 gradient-text">Terms of Service</h1>
              <p className="text-muted-foreground text-center mb-12">Last updated: {new Date().toLocaleDateString()}</p>
            </SlideUp>

            <div className="prose prose-lg max-w-none space-y-8">
              <SlideUp delay={0.1}>
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
                  <p className="text-muted-foreground">
                    By accessing and using UpSkill Hub's services, you accept and agree to be bound by the terms and
                    provision of this agreement. If you do not agree to abide by the above, please do not use this
                    service.
                  </p>
                </section>
              </SlideUp>

              <SlideUp delay={0.2}>
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Description of Service</h2>
                  <p className="text-muted-foreground mb-4">
                    UpSkill Hub provides an AI-driven skills platform focused on hackathon preparation, including:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Personalized learning paths and skill assessments</li>
                    <li>AI-powered project recommendations and mentorship</li>
                    <li>Access to hackathon opportunities and team formation</li>
                    <li>Progress tracking and performance analytics</li>
                    <li>Community features and peer collaboration tools</li>
                  </ul>
                </section>
              </SlideUp>

              <SlideUp delay={0.3}>
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">3. User Accounts</h2>
                  <p className="text-muted-foreground mb-4">
                    To access certain features of our service, you must create an account. You agree to:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized use</li>
                  </ul>
                </section>
              </SlideUp>

              <SlideUp delay={0.4}>
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Acceptable Use</h2>
                  <p className="text-muted-foreground mb-4">You agree not to use the service to:</p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe on intellectual property rights</li>
                    <li>Transmit harmful or malicious content</li>
                    <li>Interfere with the service's operation</li>
                    <li>Share account credentials with others</li>
                  </ul>
                </section>
              </SlideUp>

              <SlideUp delay={0.5}>
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Intellectual Property</h2>
                  <p className="text-muted-foreground">
                    The service and its original content, features, and functionality are owned by UpSkill Hub and are
                    protected by international copyright, trademark, patent, trade secret, and other intellectual
                    property laws.
                  </p>
                </section>
              </SlideUp>

              <SlideUp delay={0.6}>
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Payment Terms</h2>
                  <p className="text-muted-foreground mb-4">For paid services:</p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Payments are processed securely through third-party providers</li>
                    <li>Subscriptions auto-renew unless cancelled</li>
                    <li>Refunds are subject to our refund policy</li>
                    <li>Price changes will be communicated in advance</li>
                  </ul>
                </section>
              </SlideUp>

              <SlideUp delay={0.7}>
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Limitation of Liability</h2>
                  <p className="text-muted-foreground">
                    UpSkill Hub shall not be liable for any indirect, incidental, special, consequential, or punitive
                    damages, including without limitation, loss of profits, data, use, goodwill, or other intangible
                    losses.
                  </p>
                </section>
              </SlideUp>

              <SlideUp delay={0.8}>
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Contact Information</h2>
                  <p className="text-muted-foreground">
                    For questions about these Terms of Service, please contact us at:
                    <br />
                    Email: legal@upskillhub.com
                    <br />
                    Address: [Your Company Address]
                  </p>
                </section>
              </SlideUp>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

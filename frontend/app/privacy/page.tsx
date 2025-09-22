import { FadeIn, SlideUp } from "@/components/gsap-animations"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicy() {
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
              <h1 className="text-4xl font-bold text-center mb-8 gradient-text">Privacy Policy</h1>
              <p className="text-muted-foreground text-center mb-12">Last updated: {new Date().toLocaleDateString()}</p>
            </SlideUp>

            <div className="prose prose-lg max-w-none space-y-8">
              <SlideUp delay={0.1}>
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Information We Collect</h2>
                  <p className="text-muted-foreground mb-4">
                    At UpSkill Hub, we collect information you provide directly to us, such as when you create an
                    account, participate in our hackathon preparation programs, or contact us for support.
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Personal information (name, email address, phone number)</li>
                    <li>Educational background and skill assessments</li>
                    <li>Usage data and learning progress</li>
                    <li>Communication preferences</li>
                  </ul>
                </section>
              </SlideUp>

              <SlideUp delay={0.2}>
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">2. How We Use Your Information</h2>
                  <p className="text-muted-foreground mb-4">
                    We use the information we collect to provide, maintain, and improve our services:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Personalize your learning experience and recommendations</li>
                    <li>Track your progress and provide performance analytics</li>
                    <li>Send you updates about new features and hackathon opportunities</li>
                    <li>Provide customer support and respond to your inquiries</li>
                    <li>Improve our AI-driven assessment and recommendation systems</li>
                  </ul>
                </section>
              </SlideUp>

              <SlideUp delay={0.3}>
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Information Sharing</h2>
                  <p className="text-muted-foreground mb-4">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your
                    consent, except in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>With your explicit consent</li>
                    <li>To comply with legal obligations</li>
                    <li>To protect our rights and prevent fraud</li>
                    <li>With trusted service providers who assist in our operations</li>
                  </ul>
                </section>
              </SlideUp>

              <SlideUp delay={0.4}>
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Data Security</h2>
                  <p className="text-muted-foreground">
                    We implement appropriate security measures to protect your personal information against unauthorized
                    access, alteration, disclosure, or destruction. This includes encryption, secure servers, and
                    regular security audits.
                  </p>
                </section>
              </SlideUp>

              <SlideUp delay={0.5}>
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Your Rights</h2>
                  <p className="text-muted-foreground mb-4">You have the right to:</p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Access and update your personal information</li>
                    <li>Delete your account and associated data</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Request a copy of your data</li>
                  </ul>
                </section>
              </SlideUp>

              <SlideUp delay={0.6}>
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Contact Us</h2>
                  <p className="text-muted-foreground">
                    If you have any questions about this Privacy Policy, please contact us at:
                    <br />
                    Email: privacy@upskillhub.com
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

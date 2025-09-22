import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import { Chatbot } from "@/components/chatbot"
import { AuthProvider } from "@/lib/auth-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "MedhasMind - India's #1 Hackathon-Prep & AI-Driven Skills Platform",
  description:
    "Master hackathons with AI-powered learning paths, simulation environments, and personalized mentorship. Join thousands of students building their tech careers.",
  generator: "v0.app",
  keywords: ["hackathon", "AI learning", "skills platform", "programming", "tech education", "India"],
  authors: [{ name: "MedhasMind Team" }],
  openGraph: {
    title: "MedhasMind - India's #1 Hackathon-Prep Platform",
    description: "Master hackathons with AI-powered learning paths and personalized mentorship",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Chatbot />
        </AuthProvider>
      </body>
    </html>
  )
}

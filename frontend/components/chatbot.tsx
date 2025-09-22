"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { MessageCircle, X, Send, RotateCcw, User, Bot, Sparkles, Clock, GraduationCap, Briefcase } from "lucide-react"

type UserType = "student" | "partner" | null
type Message = {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "quick-reply" | "suggestion"
}

const studentQueries = {
  pricing:
    "Our Student plan is ₹799/year (less than ₹70/month) with a 7-day free trial. It includes AI learning paths, hackathon simulations, portfolio builder, and basic mentorship. We also offer student discounts and flexible payment options!",
  features:
    "Students get access to: 🚀 AI-powered learning paths, 🏆 Hackathon simulation with AI teammates, 📁 Portfolio builder with GitHub integration, 🤖 AI mentor & pitch coach, 📚 Access to 500+ practice problems, 🎯 Skill assessments, and 👥 Community forums.",
  trial:
    "Yes! We offer a 7-day free trial for all plans. No credit card required. You can cancel anytime during the trial period. Start your journey today!",
  support:
    "Students get 24/7 chat support, community access, weekly office hours, personalized learning recommendations, and direct mentor connections.",
  hackathons:
    "Our platform simulates real hackathon environments where you can practice with AI teammates, work on time-bound projects, get feedback, and participate in monthly challenges with prizes!",
  portfolio:
    "The portfolio builder integrates with GitHub, showcases your projects with professional templates, includes project analytics, and helps you create compelling case studies for recruiters.",
  career:
    "We provide career guidance, interview preparation, resume reviews, job matching with our partner companies, and networking opportunities with industry professionals.",
  learning:
    "Our AI-powered learning paths adapt to your pace, provide personalized recommendations, track your progress, and offer certificates upon completion.",
  community:
    "Join our vibrant community of 10,000+ students, participate in study groups, attend virtual events, and collaborate on open-source projects.",
  mentorship:
    "Get paired with industry mentors, schedule 1-on-1 sessions, receive project feedback, and get career advice from experienced professionals.",
}

const partnerQueries = {
  partnership:
    "We offer various partnership opportunities including corporate training programs, hackathon sponsorships, talent pipeline access, custom learning solutions, and co-branded initiatives.",
  enterprise:
    "Enterprise plans start at ₹2500-₹4000/student/year with bulk discounts, custom integrations, dedicated support, detailed analytics dashboards, and white-label options.",
  training:
    "We provide comprehensive corporate training programs covering hackathon methodologies, rapid prototyping, team collaboration, innovation frameworks, and leadership development.",
  recruitment:
    "Partners get access to our talent pipeline of 10,000+ trained students, skill assessments, project portfolios, direct recruitment support, and campus hiring programs.",
  custom:
    "We can create custom learning paths, branded environments, specialized curricula, API integrations, and tailored solutions for your organization's specific needs and technologies.",
  analytics:
    "Enterprise partners receive detailed analytics on student progress, skill development, engagement metrics, ROI tracking, performance dashboards, and custom reporting.",
  integration:
    "We offer seamless integrations with your existing LMS, HR systems, project management tools, and can provide API access for custom implementations.",
  scaling:
    "Our platform scales from small teams to enterprise-wide deployments, with dedicated infrastructure, 99.9% uptime SLA, and 24/7 technical support.",
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [userType, setUserType] = useState<UserType>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [chatHistory, setChatHistory] = useState<Message[][]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (text: string, sender: "user" | "bot", type: "text" | "quick-reply" | "suggestion" = "text") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      type,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleUserTypeSelection = (type: UserType) => {
    setUserType(type)
    const welcomeMessage =
      type === "student"
        ? "🎓 Welcome to MedhasMind! I'm your AI learning assistant. I can help you with:\n\n• Learning paths & skill development\n• Hackathon preparation & simulation\n• Portfolio building & career guidance\n• Pricing & trial information\n• Community & mentorship programs\n\nWhat would you like to explore first?"
        : "🤝 Welcome to MedhasMind Enterprise! I'm here to help you with:\n\n• Partnership opportunities\n• Corporate training solutions\n• Talent recruitment & assessment\n• Custom enterprise solutions\n• Analytics & ROI tracking\n\nHow can I assist your organization today?"

    addMessage(welcomeMessage, "bot")
  }

  const handleSendMessage = () => {
    if (!inputValue.trim() || !userType) return

    addMessage(inputValue, "user")
    setIsTyping(true)

    const query = inputValue.toLowerCase()
    const queries = userType === "student" ? studentQueries : partnerQueries

    let response =
      "I understand you're asking about that topic. Let me connect you with our team for detailed information."

    // Enhanced keyword matching
    for (const [key, value] of Object.entries(queries)) {
      if (query.includes(key) || query.includes(key.slice(0, -1))) {
        response = value
        break
      }
    }

    // Add contextual suggestions
    if (response.includes("connect you with our team")) {
      if (userType === "student") {
        response +=
          "\n\n💡 Quick suggestions:\n• Try asking about 'features' or 'pricing'\n• Check our 'free trial' options\n• Learn about 'hackathons' and 'portfolio' building\n• Get 'career' guidance and 'mentorship'\n\n📧 Contact: support@medhasmind.com"
      } else {
        response +=
          "\n\n💼 Let me help you with:\n• 'Partnership' opportunities\n• 'Enterprise' solutions and pricing\n• 'Training' programs for your team\n• 'Recruitment' and talent pipeline\n• 'Custom' integrations\n\n📧 Contact: partnerships@medhasmind.com"
      }
    }

    setTimeout(() => {
      setIsTyping(false)
      addMessage(response, "bot")
    }, 1500)

    setInputValue("")
  }

  const resetChat = () => {
    if (messages.length > 0) {
      setChatHistory((prev) => [...prev, messages])
    }
    setUserType(null)
    setMessages([])
  }

  const quickQuestions =
    userType === "student"
      ? [
          "💰 Pricing plans",
          "🆓 Free trial",
          "🏆 Hackathons",
          "📁 Portfolio",
          "🚀 Career help",
          "🤖 AI Learning",
          "👥 Community",
          "🎯 Mentorship",
        ]
      : [
          "🤝 Partnerships",
          "💼 Enterprise pricing",
          "📚 Training programs",
          "👨‍💼 Recruitment",
          "🔧 Custom solutions",
          "📊 Analytics",
          "🔗 Integrations",
          "📈 Scaling",
        ]

  const suggestedResponses = [
    "Tell me more",
    "How does it work?",
    "What's the cost?",
    "Can I try it?",
    "Contact support",
  ]

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "h-16 w-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110",
              isOpen
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700",
            )}
          >
            {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </Button>
          {!isOpen && (
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full animate-pulse">
              <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-[420px] h-[600px] z-50 shadow-2xl border-2 animate-in slide-in-from-bottom-4 duration-300 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-bold text-lg">MedhasMind AI</div>
                  <div className="text-xs opacity-90">Your AI learning buddy</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 h-full flex flex-col bg-gradient-to-b from-gray-50 to-white">
            {!userType ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse shadow-lg">
                    <Bot className="h-7 w-7 text-white animate-bounce" />
                  </div>
                  <h3 className="font-bold text-2xl mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Welcome to MedhasMind!
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">Select your role to get tailored help</p>
                </div>

                <Button
                  onClick={() => handleUserTypeSelection("student")}
                  className="w-full h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
                >
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-6 w-6" />
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-base">Student</span>
                      <span className="text-xs opacity-90">Learning & Growth</span>
                    </div>
                  </div>
                </Button>

                <Button
                  onClick={() => handleUserTypeSelection("partner")}
                  className="w-full h-16 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
                >
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-6 w-6" />
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-base">Partner/Enterprise</span>
                      <span className="text-xs opacity-90">Business Solutions</span>
                    </div>
                  </div>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="flex items-center justify-between mb-4 p-3 bg-white rounded-lg shadow-sm border">
                    <Badge variant={userType === "student" ? "default" : "secondary"} className="px-3 py-1">
                      {userType === "student" ? "🎓 Student Mode" : "🤝 Partner Mode"}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetChat}
                      className="text-xs hover:bg-gray-100 rounded-full"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Switch
                    </Button>
                  </div>

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex items-start gap-2",
                        message.sender === "user" ? "justify-end" : "justify-start",
                      )}
                    >
                      {message.sender === "bot" && (
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[85%] p-4 rounded-2xl text-sm whitespace-pre-line shadow-sm",
                          message.sender === "user"
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-md"
                            : "bg-white border rounded-bl-md",
                        )}
                      >
                        {message.text}
                        <div
                          className={cn(
                            "text-xs mt-2 flex items-center gap-1",
                            message.sender === "user" ? "text-blue-100" : "text-gray-500",
                          )}
                        >
                          <Clock className="h-3 w-3" />
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                      {message.sender === "user" && (
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-white border rounded-2xl rounded-bl-md p-4 shadow-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-3 border-t bg-gray-50">
                  <div className="text-xs text-gray-600 mb-2 font-medium">Quick questions:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {quickQuestions.map((question) => (
                      <Button
                        key={question}
                        variant="outline"
                        size="sm"
                        className="text-xs bg-white hover:bg-blue-50 hover:border-blue-300 rounded-lg h-auto py-2 px-3 text-left justify-start"
                        onClick={() => {
                          setInputValue(question.replace(/[🎓💰🆓🏆📁🚀🤖👥🎯🤝💼📚👨‍💼🔧📊🔗📈]/gu, "").trim())
                          setTimeout(() => handleSendMessage(), 100)
                        }}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="p-4 border-t bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 text-center">
                    Powered by MedhasMind AI • Always learning, always helping
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </>
  )
}

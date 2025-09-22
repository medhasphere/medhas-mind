"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Calendar,
  Clock,
  Trophy,
  Users,
  Target,
  TrendingUp,
  Bell,
  Play,
  CheckCircle,
  Star,
  Award,
  Code,
  Lightbulb,
  Loader2,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { useAuth } from "@/lib/auth-context"
import { useEffect, useState } from "react"

export default function StudentDashboard() {
  const { user, isLoading } = useAuth()
  const [dashboardData, setDashboardData] = useState({
    courses: [],
    progress: [],
    skills: [],
    events: [],
    achievements: []
  })

  useEffect(() => {
    if (user) {
      // TODO: Fetch real dashboard data from API
      // For now, using placeholder data that would come from the backend
      setDashboardData({
        courses: [
          {
            id: 1,
            title: "Full Stack Web Development",
            description: "React & Node.js",
            progress: 75,
            status: "in_progress"
          },
          {
            id: 2,
            title: "Machine Learning Basics",
            description: "Python & TensorFlow",
            progress: 25,
            status: "new"
          }
        ],
        progress: [
          { name: "Web Dev", completed: 85 },
          { name: "Data Science", completed: 60 },
          { name: "Mobile Dev", completed: 40 },
          { name: "AI/ML", completed: 25 },
        ],
        skills: [
          { name: "JavaScript", value: 85, color: "#059669" },
          { name: "Python", value: 70, color: "#10b981" },
          { name: "React", value: 80, color: "#d97706" },
          { name: "Node.js", value: 65, color: "#be123c" },
        ],
        events: [
          { title: "Hackathon Workshop", time: "Tomorrow, 2:00 PM", type: "required" },
          { title: "Study Group", time: "Friday, 4:00 PM", type: "optional" },
          { title: "Project Demo", time: "Next Week", type: "deadline" }
        ],
        achievements: [
          {title: "JavaScript Master", description: "Completed advanced JS course"},
          {title: "First Hackathon", description: "Participated in coding challenge"},
          {title: "Team Player", description: "Collaborated on group project"}
        ]
      })
    }
  }, [user])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to access your dashboard</h2>
          <p className="text-muted-foreground">You need to be logged in to view this page.</p>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/student-avatar.png" />
                <AvatarFallback className="bg-primary text-primary-foreground">JS</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Welcome back, {user.name}!</h1>
                <p className="text-muted-foreground">Ready to continue your learning journey?</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <Play className="h-4 w-4 mr-2" />
                Continue Learning
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">12</p>
                      <p className="text-sm text-muted-foreground">Courses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <Trophy className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-secondary">8</p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-chart-3/10 rounded-lg">
                      <Target className="h-5 w-5 text-chart-3" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-chart-3">156</p>
                      <p className="text-sm text-muted-foreground">Hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-chart-4/10 to-chart-4/5 border-chart-4/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-chart-4/10 rounded-lg">
                      <Award className="h-5 w-5 text-chart-4" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-chart-4">24</p>
                      <p className="text-sm text-muted-foreground">Badges</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Current Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Continue Learning
                </CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dashboardData.courses.map((course: any) => (
                    <div key={course.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Code className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{course.title}</h3>
                            <p className="text-sm text-muted-foreground">{course.description}</p>
                          </div>
                        </div>
                        <Badge variant={course.status === 'in_progress' ? 'secondary' : 'outline'}>
                          {course.status === 'in_progress' ? 'In Progress' : 'New'}
                        </Badge>
                      </div>
                      <Progress value={course.progress} className="mb-3" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{course.progress}% Complete</span>
                        <Button size="sm" className={course.status === 'in_progress' ? 'bg-primary hover:bg-primary/90' : 'variant="outline"'}>
                          {course.status === 'in_progress' ? 'Continue' : 'Start'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Learning Progress
                </CardTitle>
                <CardDescription>Your progress across different tracks</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dashboardData.progress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="completed" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                  <div className="p-1 bg-primary/10 rounded">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Hackathon Workshop</h4>
                    <p className="text-sm text-muted-foreground">Tomorrow, 2:00 PM</p>
                    <Badge variant="secondary" className="mt-1">
                      Required
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-secondary/5 rounded-lg">
                  <div className="p-1 bg-secondary/10 rounded">
                    <Users className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Study Group</h4>
                    <p className="text-sm text-muted-foreground">Friday, 4:00 PM</p>
                    <Badge variant="outline" className="mt-1">
                      Optional
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-chart-3/5 rounded-lg">
                  <div className="p-1 bg-chart-3/10 rounded">
                    <Trophy className="h-4 w-4 text-chart-3" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Project Demo</h4>
                    <p className="text-sm text-muted-foreground">Next Week</p>
                    <Badge variant="destructive" className="mt-1">
                      Deadline
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Skills Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.skills.map((skill: any, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.value}%</span>
                      </div>
                      <Progress value={skill.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-primary/5 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">JavaScript Master</p>
                    <p className="text-xs text-muted-foreground">Completed advanced JS course</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 bg-secondary/5 rounded-lg">
                  <Trophy className="h-5 w-5 text-secondary" />
                  <div>
                    <p className="font-medium">First Hackathon</p>
                    <p className="text-xs text-muted-foreground">Participated in coding challenge</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 bg-chart-3/5 rounded-lg">
                  <Star className="h-5 w-5 text-chart-3" />
                  <div>
                    <p className="font-medium">Team Player</p>
                    <p className="text-xs text-muted-foreground">Collaborated on group project</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

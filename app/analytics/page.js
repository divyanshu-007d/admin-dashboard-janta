import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  BarChart3,
  Activity
} from 'lucide-react'

export default function Analytics() {
  const kpiData = [
    {
      title: "Total Complaints",
      value: "2,847",
      change: "+12%",
      trend: "up",
      description: "From last month",
      icon: AlertTriangle
    },
    {
      title: "Resolved Issues",
      value: "2,234",
      change: "+8%",
      trend: "up", 
      description: "78.5% resolution rate",
      icon: CheckCircle
    },
    {
      title: "Active Engineers",
      value: "156",
      change: "-2%",
      trend: "down",
      description: "Currently deployed",
      icon: Users
    },
    {
      title: "Avg Response Time",
      value: "2.4h",
      change: "-15%",
      trend: "up",
      description: "Faster than last month",
      icon: Clock
    }
  ]

  const categoryData = [
    { name: "Water Supply", count: 486, percentage: 17.1, color: "bg-blue-500" },
    { name: "Electricity", count: 423, percentage: 14.9, color: "bg-yellow-500" },
    { name: "Road Maintenance", count: 398, percentage: 14.0, color: "bg-green-500" },
    { name: "Garbage Collection", count: 312, percentage: 11.0, color: "bg-purple-500" },
    { name: "Drainage", count: 287, percentage: 10.1, color: "bg-orange-500" },
    { name: "Others", count: 941, percentage: 33.1, color: "bg-gray-400" }
  ]

  const recentTrends = [
    { week: "Week 1", complaints: 245, resolved: 198 },
    { week: "Week 2", complaints: 289, resolved: 234 },
    { week: "Week 3", complaints: 312, resolved: 267 },
    { week: "Week 4", complaints: 298, resolved: 289 }
  ]

  const engineerPerformance = [
    { name: "Rajesh Kumar", resolved: 45, pending: 3, rating: 4.8 },
    { name: "Priya Singh", resolved: 42, pending: 5, rating: 4.7 },
    { name: "Amit Sharma", resolved: 38, pending: 7, rating: 4.5 },
    { name: "Sunita Devi", resolved: 36, pending: 4, rating: 4.6 },
    { name: "Vikash Gupta", resolved: 34, pending: 8, rating: 4.4 }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Advanced analytics and insights dashboard
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">{kpi.title}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <p className="text-sm text-muted-foreground">{kpi.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="complaints">Complaints Analysis</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Complaint Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Complaint Categories</span>
                  </CardTitle>
                  <CardDescription>Distribution by issue type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryData.map((category, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{category.name}</span>
                          <span className="font-medium">{category.count} ({category.percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${category.color}`}
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Weekly Trends</span>
                  </CardTitle>
                  <CardDescription>Complaints vs Resolutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTrends.map((week, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{week.week}</span>
                          <span className="text-muted-foreground">
                            {week.complaints} filed, {week.resolved} resolved
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <div className="flex-1">
                            <div className="text-xs text-muted-foreground mb-1">Complaints</div>
                            <Progress value={(week.complaints / 400) * 100} className="h-2" />
                          </div>
                          <div className="flex-1">
                            <div className="text-xs text-muted-foreground mb-1">Resolved</div>
                            <Progress value={(week.resolved / 400) * 100} className="h-2 bg-green-100" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="complaints" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Priority Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Badge variant="destructive">High</Badge>
                        <span className="text-sm">23%</span>
                      </div>
                      <span className="text-sm font-medium">654</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">Medium</Badge>
                        <span className="text-sm">45%</span>
                      </div>
                      <span className="text-sm font-medium">1,281</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Low</Badge>
                        <span className="text-sm">32%</span>
                      </div>
                      <span className="text-sm font-medium">912</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resolution Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">&lt; 24 hours</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">1-3 days</span>
                      <span className="text-sm font-medium">32%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">3-7 days</span>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">&gt; 7 days</span>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Satisfaction Ratings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Excellent</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={75} className="w-16 h-2" />
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Good</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={18} className="w-16 h-2" />
                        <span className="text-sm font-medium">18%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Poor</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={7} className="w-16 h-2" />
                        <span className="text-sm font-medium">7%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Engineers</CardTitle>
                <CardDescription>Based on resolution rate and citizen feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {engineerPerformance.map((engineer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {engineer.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">{engineer.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {engineer.resolved} resolved, {engineer.pending} pending
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium">{engineer.rating}</span>
                          <span className="text-yellow-500">★</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
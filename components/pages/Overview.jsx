'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts'
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  TrendingUp, 
  TrendingDown,
  MapPin,
  Phone,
  MessageSquare,
  Star
} from 'lucide-react'

// Mock data for demonstration
const complaintData = [
  { month: 'Jan', total: 120, resolved: 95, pending: 25 },
  { month: 'Feb', total: 140, resolved: 110, pending: 30 },
  { month: 'Mar', total: 160, resolved: 125, pending: 35 },
  { month: 'Apr', total: 180, resolved: 150, pending: 30 },
  { month: 'May', total: 200, resolved: 170, pending: 30 },
  { month: 'Jun', total: 220, resolved: 190, pending: 30 },
]

const categoryData = [
  { name: 'Potholes', value: 35, color: '#3b82f6' },
  { name: 'Street Lights', value: 25, color: '#ef4444' },
  { name: 'Waste Management', value: 20, color: '#f59e0b' },
  { name: 'Water Supply', value: 15, color: '#10b981' },
  { name: 'Others', value: 5, color: '#8b5cf6' },
]

const engineerPerformance = [
  { name: 'Rahul Kumar', completed: 45, rating: 4.8, area: 'Zone A' },
  { name: 'Priya Singh', completed: 42, rating: 4.7, area: 'Zone B' },
  { name: 'Amit Sharma', completed: 38, rating: 4.6, area: 'Zone C' },
  { name: 'Sneha Patel', completed: 35, rating: 4.5, area: 'Zone D' },
  { name: 'Raj Verma', completed: 32, rating: 4.4, area: 'Zone E' },
]

const recentComplaints = [
  { 
    id: 'CMP-001', 
    issue: 'Pothole on Main Street', 
    location: 'Ranchi, Sector 5', 
    status: 'In Progress', 
    priority: 'High',
    assignedTo: 'Rahul Kumar',
    reportedAt: '2 hours ago'
  },
  { 
    id: 'CMP-002', 
    issue: 'Street light not working', 
    location: 'Dhanbad, Block A', 
    status: 'Pending', 
    priority: 'Medium',
    assignedTo: 'Unassigned',
    reportedAt: '4 hours ago'
  },
  { 
    id: 'CMP-003', 
    issue: 'Garbage overflow', 
    location: 'Jamshedpur, Ward 12', 
    status: 'Completed', 
    priority: 'Low',
    assignedTo: 'Priya Singh',
    reportedAt: '1 day ago'
  },
]

const StatCard = ({ title, value, change, icon: Icon, trend }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
        {trend === 'up' ? (
          <TrendingUp className="h-3 w-3 text-green-500" />
        ) : (
          <TrendingDown className="h-3 w-3 text-red-500" />
        )}
        <span className={trend === 'up' ? 'text-green-500' : 'text-red-500'}>
          {change}%
        </span>
        <span>from last month</span>
      </div>
    </CardContent>
  </Card>
)

const getStatusColor = (status) => {
  switch (status) {
    case 'Completed': return 'bg-green-100 text-green-800'
    case 'In Progress': return 'bg-blue-100 text-blue-800'
    case 'Pending': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High': return 'bg-red-100 text-red-800'
    case 'Medium': return 'bg-orange-100 text-orange-800'
    case 'Low': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function Overview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Monitor civic issues, field engineers, and system performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Complaints"
          value="1,234"
          change={12}
          trend="up"
          icon={AlertTriangle}
        />
        <StatCard
          title="Resolved Issues"
          value="987"
          change={8}
          trend="up"
          icon={CheckCircle}
        />
        <StatCard
          title="Active Engineers"
          value="45"
          change={5}
          trend="up"
          icon={Users}
        />
        <StatCard
          title="Avg Resolution Time"
          value="2.4 days"
          change={15}
          trend="down"
          icon={Clock}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Complaints Trend */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Complaint Trends</CardTitle>
            <CardDescription>
              Monthly complaint submissions and resolutions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={complaintData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="resolved" 
                  stackId="2"
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.8}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Issue Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Issue Categories</CardTitle>
            <CardDescription>
              Distribution of complaint types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Complaints */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Complaints</CardTitle>
            <CardDescription>
              Latest reported issues requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentComplaints.map((complaint) => (
                <div key={complaint.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{complaint.id}</span>
                      <Badge className={getPriorityColor(complaint.priority)}>
                        {complaint.priority}
                      </Badge>
                      <Badge className={getStatusColor(complaint.status)}>
                        {complaint.status}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{complaint.issue}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{complaint.location}</span>
                      </div>
                      <span>•</span>
                      <span>Assigned to: {complaint.assignedTo}</span>
                      <span>•</span>
                      <span>{complaint.reportedAt}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Engineers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Engineers</CardTitle>
            <CardDescription>
              Best performing field engineers this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {engineerPerformance.map((engineer, index) => (
                <div key={engineer.name} className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{engineer.name}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{engineer.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{engineer.area}</span>
                      <span>{engineer.completed} completed</span>
                    </div>
                    <Progress value={(engineer.completed / 50) * 100} className="h-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Operational</div>
            <p className="text-xs text-muted-foreground">All services running normally</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Response Time</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245ms</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">-12ms</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+18%</span> from last week
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Download,
  FileText,
  BarChart3,
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  Filter,
  Eye,
  Share,
  Printer,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react'
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'

// Mock data for reports
const summaryReports = [
  {
    id: 'RPT-001',
    title: 'Monthly Complaint Resolution Report',
    description: 'Comprehensive analysis of complaint resolution trends and performance metrics',
    type: 'Monthly',
    category: 'Performance',
    generatedAt: '2024-01-15T10:00:00Z',
    period: 'December 2023',
    status: 'Generated',
    size: '2.4 MB',
    format: 'PDF',
    downloadCount: 23
  },
  {
    id: 'RPT-002',
    title: 'Field Engineer Productivity Analysis',
    description: 'Detailed breakdown of field engineer performance and efficiency metrics',
    type: 'Weekly',
    category: 'HR Analytics',
    generatedAt: '2024-01-14T15:30:00Z',
    period: 'Week 2, January 2024',
    status: 'Generated',
    size: '1.8 MB',
    format: 'Excel',
    downloadCount: 15
  },
  {
    id: 'RPT-003',
    title: 'Citizen Satisfaction Survey Results',
    description: 'Analysis of citizen feedback and satisfaction ratings for resolved complaints',
    type: 'Quarterly',
    category: 'Customer Satisfaction',
    generatedAt: '2024-01-10T09:00:00Z',
    period: 'Q4 2023',
    status: 'Generated',
    size: '3.2 MB',
    format: 'PDF',
    downloadCount: 45
  },
  {
    id: 'RPT-004',
    title: 'Geographic Complaint Distribution',
    description: 'Heat map analysis of complaint distribution across Jharkhand zones',
    type: 'Monthly',
    category: 'Geographic Analysis',
    generatedAt: '2024-01-12T14:20:00Z',
    period: 'December 2023',
    status: 'Generating',
    size: '1.2 MB',
    format: 'PDF',
    downloadCount: 0
  }
]

const analyticsData = {
  complaintTrends: [
    { month: 'Jul', total: 1234, resolved: 1156, pending: 78 },
    { month: 'Aug', total: 1456, resolved: 1398, pending: 58 },
    { month: 'Sep', total: 1189, resolved: 1134, pending: 55 },
    { month: 'Oct', total: 1578, resolved: 1523, pending: 55 },
    { month: 'Nov', total: 1345, resolved: 1289, pending: 56 },
    { month: 'Dec', total: 1267, resolved: 1198, pending: 69 },
    { month: 'Jan', total: 845, resolved: 798, pending: 47 }
  ],
  categoryBreakdown: [
    { name: 'Roads & Infrastructure', value: 35, count: 296, color: '#8884d8' },
    { name: 'Water Supply', value: 25, count: 211, color: '#82ca9d' },
    { name: 'Electrical Issues', value: 20, count: 169, color: '#ffc658' },
    { name: 'Waste Management', value: 15, count: 127, color: '#ff7c7c' },
    { name: 'Other', value: 5, count: 42, color: '#8dd1e1' }
  ],
  engineerPerformance: [
    { name: 'Rahul Singh', completed: 145, efficiency: 92, rating: 4.8 },
    { name: 'Sneha Patel', completed: 156, efficiency: 95, rating: 4.9 },
    { name: 'Priya Sharma', completed: 98, efficiency: 88, rating: 4.6 },
    { name: 'Manoj Kumar', completed: 203, efficiency: 89, rating: 4.7 },
    { name: 'Amit Verma', completed: 134, efficiency: 91, rating: 4.5 }
  ],
  resolutionTimes: [
    { category: 'Roads', avgDays: 2.5, target: 3.0 },
    { category: 'Water', avgDays: 3.1, target: 2.5 },
    { category: 'Electrical', avgDays: 1.8, target: 2.0 },
    { category: 'Waste', avgDays: 1.2, target: 1.5 },
    { category: 'Other', avgDays: 2.8, target: 3.0 }
  ]
}

const getStatusColor = (status) => {
  switch (status) {
    case 'Generated': return 'bg-green-100 text-green-800 border-green-200'
    case 'Generating': return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'Failed': return 'bg-red-100 text-red-800 border-red-200'
    case 'Scheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getFormatIcon = (format) => {
  switch (format) {
    case 'PDF': return <FileText className="h-4 w-4 text-red-500" />
    case 'Excel': return <FileText className="h-4 w-4 text-green-500" />
    case 'CSV': return <FileText className="h-4 w-4 text-blue-500" />
    default: return <FileText className="h-4 w-4 text-gray-500" />
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('reports')
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const filteredReports = summaryReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || report.type === typeFilter
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter
    return matchesSearch && matchesType && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Generate insights and download comprehensive reports
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              +3 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">1,234</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution</CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">2.3</div>
            <p className="text-xs text-muted-foreground">
              Days (improved)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94.5%</div>
            <p className="text-xs text-muted-foreground">
              Resolution success
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filter Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <Input
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Performance">Performance</SelectItem>
                    <SelectItem value="HR Analytics">HR Analytics</SelectItem>
                    <SelectItem value="Customer Satisfaction">Customer Satisfaction</SelectItem>
                    <SelectItem value="Geographic Analysis">Geographic Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reports Table */}
          <Card>
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>
                Showing {filteredReports.length} of {summaryReports.length} reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Generated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div>
                          <div className="flex items-center space-x-2">
                            {getFormatIcon(report.format)}
                            <p className="font-medium">{report.title}</p>
                          </div>
                          <p className="text-sm text-gray-500 mt-1 max-w-[300px] truncate">
                            {report.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{report.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{report.category}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {report.period}
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatDate(report.generatedAt)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {report.size}
                      </TableCell>
                      <TableCell className="text-center">
                        {report.downloadCount}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Complaint Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Complaint Resolution Trends</CardTitle>
                <CardDescription>
                  Monthly complaint statistics and resolution rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analyticsData.complaintTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="total" stackId="1" stroke="#8884d8" fill="#8884d8" name="Total" />
                    <Area type="monotone" dataKey="resolved" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Resolved" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Complaint Categories</CardTitle>
                <CardDescription>
                  Distribution of complaints by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {analyticsData.categoryBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name, props) => [`${props.payload.count} complaints`, name]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Resolution Times */}
          <Card>
            <CardHeader>
              <CardTitle>Average Resolution Times by Category</CardTitle>
              <CardDescription>
                Comparing actual vs target resolution times
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.resolutionTimes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avgDays" fill="#8884d8" name="Actual (Days)" />
                  <Bar dataKey="target" fill="#82ca9d" name="Target (Days)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          {/* Engineer Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Field Engineer Performance</CardTitle>
              <CardDescription>
                Individual engineer productivity and efficiency metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analyticsData.engineerPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="completed" fill="#8884d8" name="Completed Tasks" />
                  <Bar yAxisId="right" dataKey="efficiency" fill="#82ca9d" name="Efficiency %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Engineer</TableHead>
                    <TableHead>Completed Tasks</TableHead>
                    <TableHead>Efficiency</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analyticsData.engineerPerformance.map((engineer, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{engineer.name}</TableCell>
                      <TableCell>{engineer.completed}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${engineer.efficiency}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{engineer.efficiency}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="ml-1">{engineer.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={engineer.efficiency >= 90 ? 'bg-green-100 text-green-800' : 
                                   engineer.efficiency >= 80 ? 'bg-yellow-100 text-yellow-800' : 
                                   'bg-red-100 text-red-800'}
                        >
                          {engineer.efficiency >= 90 ? 'Excellent' : 
                           engineer.efficiency >= 80 ? 'Good' : 'Needs Improvement'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>
                Complaint distribution across Jharkhand zones and districts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map Feature</h3>
                <p className="text-gray-500 mb-4">
                  Geographic visualization of complaint distribution, engineer locations, and zone-wise analytics.
                </p>
                <Button variant="outline">
                  <MapPin className="h-4 w-4 mr-2" />
                  View Interactive Map
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Zone Statistics */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ranchi Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Complaints:</span>
                    <span className="font-medium">456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Resolved:</span>
                    <span className="font-medium text-green-600">423</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Engineers:</span>
                    <span className="font-medium">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Resolution:</span>
                    <span className="font-medium">2.3 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dhanbad Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Complaints:</span>
                    <span className="font-medium">312</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Resolved:</span>
                    <span className="font-medium text-green-600">298</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Engineers:</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Resolution:</span>
                    <span className="font-medium">2.1 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Jamshedpur Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Complaints:</span>
                    <span className="font-medium">278</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Resolved:</span>
                    <span className="font-medium text-green-600">267</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Engineers:</span>
                    <span className="font-medium">10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Resolution:</span>
                    <span className="font-medium">1.9 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
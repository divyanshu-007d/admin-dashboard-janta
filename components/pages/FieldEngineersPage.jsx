'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { 
  Search, 
  MapPin, 
  Phone,
  Mail,
  Star,
  Trophy,
  CheckCircle,
  Clock,
  AlertTriangle,
  User,
  Calendar,
  Award,
  TrendingUp,
  Activity,
  Users,
  Eye,
  UserPlus,
  Download,
  Filter
} from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

// Mock data for field engineers
const engineersData = [
  {
    id: 'ENG-001',
    name: 'Rahul Singh',
    email: 'rahul.singh@gov.jh.in',
    phone: '+91 9876543201',
    avatar: '/engineer1.jpg',
    specialization: 'Roads & Infrastructure',
    location: 'Ranchi Zone',
    status: 'Active',
    joinedDate: '2023-06-15',
    experience: '5 years',
    rating: 4.8,
    assignedComplaints: 12,
    completedComplaints: 145,
    inProgressComplaints: 3,
    averageResolutionTime: '2.5 days',
    efficiency: 92,
    lastActive: '2024-01-15T14:30:00Z',
    badges: ['Expert', 'Fast Resolver', 'Top Performer'],
    recentActivity: [
      { type: 'resolved', description: 'Completed pothole repair on Main Street', time: '2 hours ago' },
      { type: 'assigned', description: 'Assigned to water supply issue', time: '4 hours ago' },
      { type: 'comment', description: 'Added progress update with photos', time: '6 hours ago' }
    ]
  },
  {
    id: 'ENG-002',
    name: 'Priya Sharma',
    email: 'priya.sharma@gov.jh.in',
    phone: '+91 9876543202',
    avatar: '/engineer2.jpg',
    specialization: 'Electrical Systems',
    location: 'Dhanbad Zone',
    status: 'Active',
    joinedDate: '2023-08-20',
    experience: '3 years',
    rating: 4.6,
    assignedComplaints: 8,
    completedComplaints: 98,
    inProgressComplaints: 2,
    averageResolutionTime: '1.8 days',
    efficiency: 88,
    lastActive: '2024-01-15T13:45:00Z',
    badges: ['Electrical Expert', 'Quick Response'],
    recentActivity: [
      { type: 'resolved', description: 'Fixed street lighting on Park Road', time: '1 hour ago' },
      { type: 'started', description: 'Started work on transformer issue', time: '3 hours ago' }
    ]
  },
  {
    id: 'ENG-003',
    name: 'Sneha Patel',
    email: 'sneha.patel@gov.jh.in',
    phone: '+91 9876543203',
    avatar: '/engineer3.jpg',
    specialization: 'Waste Management',
    location: 'Jamshedpur Zone',
    status: 'Active',
    joinedDate: '2023-04-10',
    experience: '4 years',
    rating: 4.9,
    assignedComplaints: 6,
    completedComplaints: 156,
    inProgressComplaints: 1,
    averageResolutionTime: '1.2 days',
    efficiency: 95,
    lastActive: '2024-01-15T15:00:00Z',
    badges: ['Expert', 'Environmental Champion', 'Top Performer'],
    recentActivity: [
      { type: 'resolved', description: 'Cleaned garbage overflow area', time: '30 minutes ago' },
      { type: 'comment', description: 'Updated waste collection schedule', time: '2 hours ago' }
    ]
  },
  {
    id: 'ENG-004',
    name: 'Manoj Kumar',
    email: 'manoj.kumar@gov.jh.in',
    phone: '+91 9876543204',
    avatar: '/engineer4.jpg',
    specialization: 'Water Supply',
    location: 'Ranchi Zone',
    status: 'On Leave',
    joinedDate: '2023-01-12',
    experience: '6 years',
    rating: 4.7,
    assignedComplaints: 0,
    completedComplaints: 203,
    inProgressComplaints: 0,
    averageResolutionTime: '3.1 days',
    efficiency: 89,
    lastActive: '2024-01-12T18:00:00Z',
    badges: ['Senior Engineer', 'Water Systems Expert'],
    recentActivity: [
      { type: 'leave', description: 'Started medical leave', time: '3 days ago' }
    ]
  }
]

const performanceData = [
  { month: 'Aug', completed: 45, assigned: 50 },
  { month: 'Sep', completed: 52, assigned: 55 },
  { month: 'Oct', completed: 48, assigned: 52 },
  { month: 'Nov', completed: 61, assigned: 63 },
  { month: 'Dec', completed: 55, assigned: 58 },
  { month: 'Jan', completed: 42, assigned: 45 }
]

const specializationData = [
  { name: 'Roads & Infrastructure', value: 35, color: '#8884d8' },
  { name: 'Electrical Systems', value: 25, color: '#82ca9d' },
  { name: 'Water Supply', value: 20, color: '#ffc658' },
  { name: 'Waste Management', value: 15, color: '#ff7c7c' },
  { name: 'Other', value: 5, color: '#8dd1e1' }
]

const getStatusColor = (status) => {
  switch (status) {
    case 'Active': return 'bg-green-100 text-green-800 border-green-200'
    case 'On Leave': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'Inactive': return 'bg-red-100 text-red-800 border-red-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getActivityIcon = (type) => {
  switch (type) {
    case 'resolved': return <CheckCircle className="h-4 w-4 text-green-500" />
    case 'assigned': return <UserPlus className="h-4 w-4 text-blue-500" />
    case 'started': return <Activity className="h-4 w-4 text-purple-500" />
    case 'comment': return <Activity className="h-4 w-4 text-gray-500" />
    case 'leave': return <Clock className="h-4 w-4 text-yellow-500" />
    default: return <Activity className="h-4 w-4 text-gray-500" />
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

const EngineerDetailsDialog = ({ engineer, isOpen, onClose }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={engineer.avatar} />
            <AvatarFallback>{engineer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{engineer.name}</h2>
            <p className="text-sm text-gray-500">{engineer.id} • {engineer.specialization}</p>
          </div>
        </DialogTitle>
      </DialogHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Personal Info */}
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Contact Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{engineer.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{engineer.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{engineer.location}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Professional Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Experience:</span>
                <span>{engineer.experience}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Joined:</span>
                <span>{new Date(engineer.joinedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <Badge className={getStatusColor(engineer.status)}>{engineer.status}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rating:</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1">{engineer.rating}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Badges & Achievements</h4>
            <div className="flex flex-wrap gap-2">
              {engineer.badges.map((badge, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  <Trophy className="h-3 w-3 mr-1" />
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column - Performance & Activity */}
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Performance Metrics</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Efficiency</span>
                  <span>{engineer.efficiency}%</span>
                </div>
                <Progress value={engineer.efficiency} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-blue-600 font-semibold">{engineer.completedComplaints}</p>
                  <p className="text-gray-600">Completed</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-purple-600 font-semibold">{engineer.inProgressComplaints}</p>
                  <p className="text-gray-600">In Progress</p>
                </div>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Average Resolution:</span>
                <span className="ml-2 font-medium">{engineer.averageResolutionTime}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Recent Activity</h4>
            <div className="space-y-2">
              {engineer.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p>{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)

export default function FieldEngineersPage() {
  const [selectedEngineer, setSelectedEngineer] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [specializationFilter, setSpecializationFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEngineers = engineersData.filter(engineer => {
    const matchesStatus = statusFilter === 'all' || engineer.status === statusFilter
    const matchesSpecialization = specializationFilter === 'all' || engineer.specialization === specializationFilter
    const matchesSearch = engineer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         engineer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         engineer.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesStatus && matchesSpecialization && matchesSearch
  })

  const totalEngineers = engineersData.length
  const activeEngineers = engineersData.filter(e => e.status === 'Active').length
  const totalAssigned = engineersData.reduce((sum, e) => sum + e.assignedComplaints, 0)
  const averageRating = (engineersData.reduce((sum, e) => sum + e.rating, 0) / engineersData.length).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Field Engineers</h1>
          <p className="text-muted-foreground">
            Manage field engineer workforce and track performance
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Engineer
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Engineers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEngineers}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Engineers</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeEngineers}</div>
            <p className="text-xs text-muted-foreground">
              {((activeEngineers / totalEngineers) * 100).toFixed(0)}% availability
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Tasks</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalAssigned}</div>
            <p className="text-xs text-muted-foreground">
              Active assignments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{averageRating}</div>
            <p className="text-xs text-muted-foreground">
              Out of 5.0
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>
              Monthly completion vs assignment rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="assigned" fill="#8884d8" name="Assigned" />
                <Bar dataKey="completed" fill="#82ca9d" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Specialization Distribution</CardTitle>
            <CardDescription>
              Engineers by area of expertise
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={specializationData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {specializationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Engineers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search engineers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                <SelectItem value="Roads & Infrastructure">Roads & Infrastructure</SelectItem>
                <SelectItem value="Electrical Systems">Electrical Systems</SelectItem>
                <SelectItem value="Water Supply">Water Supply</SelectItem>
                <SelectItem value="Waste Management">Waste Management</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Engineers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Engineers List</CardTitle>
          <CardDescription>
            Showing {filteredEngineers.length} of {engineersData.length} engineers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Engineer</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Assigned</TableHead>
                <TableHead>Completed</TableHead>
                <TableHead>Efficiency</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEngineers.map((engineer) => (
                <TableRow key={engineer.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={engineer.avatar} />
                        <AvatarFallback>{engineer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{engineer.name}</p>
                        <p className="text-sm text-gray-500">{engineer.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{engineer.specialization}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-gray-500" />
                      <span className="text-sm">{engineer.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(engineer.status)}>
                      {engineer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{engineer.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="bg-blue-50">
                      {engineer.assignedComplaints}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="bg-green-50">
                      {engineer.completedComplaints}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={engineer.efficiency} className="w-16 h-2" />
                      <span className="text-sm">{engineer.efficiency}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(engineer.lastActive)}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedEngineer(engineer)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Engineer Details Dialog */}
      {selectedEngineer && (
        <EngineerDetailsDialog
          engineer={selectedEngineer}
          isOpen={!!selectedEngineer}
          onClose={() => setSelectedEngineer(null)}
        />
      )}
    </div>
  )
}
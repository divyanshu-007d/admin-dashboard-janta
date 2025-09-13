'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  User, 
  Phone,
  Mail,
  Camera,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  UserPlus,
  Download,
  RefreshCw
} from 'lucide-react'

// Mock data for complaints
const complaintsData = [
  {
    id: 'CMP-001',
    title: 'Large pothole on Main Street',
    description: 'Deep pothole causing traffic issues and vehicle damage near the market area.',
    category: 'Roads & Infrastructure',
    priority: 'High',
    status: 'In Progress',
    location: 'Main Street, Ranchi, Sector 5',
    coordinates: { lat: 23.3441, lng: 85.3096 },
    reportedBy: {
      name: 'Rajesh Kumar',
      phone: '+91 9876543210',
      email: 'rajesh.kumar@email.com'
    },
    assignedTo: {
      name: 'Rahul Singh',
      id: 'ENG-001',
      avatar: '/engineer1.jpg'
    },
    reportedAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    images: ['/complaint1.jpg', '/complaint1b.jpg'],
    upvotes: 23,
    comments: 5,
    estimatedResolution: '2024-01-18T18:00:00Z'
  },
  {
    id: 'CMP-002',
    title: 'Street light not working',
    description: 'Multiple street lights are not functioning on Park Road, creating safety concerns.',
    category: 'Electrical',
    priority: 'Medium',
    status: 'Pending',
    location: 'Park Road, Dhanbad, Block A',
    coordinates: { lat: 23.7957, lng: 86.4304 },
    reportedBy: {
      name: 'Priya Sharma',
      phone: '+91 9876543211',
      email: 'priya.sharma@email.com'
    },
    assignedTo: null,
    reportedAt: '2024-01-15T08:15:00Z',
    updatedAt: '2024-01-15T08:15:00Z',
    images: ['/complaint2.jpg'],
    upvotes: 15,
    comments: 3,
    estimatedResolution: null
  },
  {
    id: 'CMP-003',
    title: 'Garbage overflow in residential area',
    description: 'Garbage bins are overflowing and waste is scattered around the area.',
    category: 'Waste Management',
    priority: 'Low',
    status: 'Completed',
    location: 'Gandhi Nagar, Jamshedpur, Ward 12',
    coordinates: { lat: 22.8046, lng: 86.2029 },
    reportedBy: {
      name: 'Amit Verma',
      phone: '+91 9876543212',
      email: 'amit.verma@email.com'
    },
    assignedTo: {
      name: 'Sneha Patel',
      id: 'ENG-003',
      avatar: '/engineer2.jpg'
    },
    reportedAt: '2024-01-14T16:45:00Z',
    updatedAt: '2024-01-15T12:30:00Z',
    images: ['/complaint3.jpg'],
    upvotes: 8,
    comments: 2,
    estimatedResolution: '2024-01-16T12:00:00Z'
  },
  {
    id: 'CMP-004',
    title: 'Water supply disruption',
    description: 'No water supply for the past 3 days in the residential complex.',
    category: 'Water Supply',
    priority: 'High',
    status: 'Assigned',
    location: 'Satellite Town, Ranchi, Block C',
    coordinates: { lat: 23.3629, lng: 85.3371 },
    reportedBy: {
      name: 'Sunita Devi',
      phone: '+91 9876543213',
      email: 'sunita.devi@email.com'
    },
    assignedTo: {
      name: 'Manoj Kumar',
      id: 'ENG-004',
      avatar: '/engineer3.jpg'
    },
    reportedAt: '2024-01-15T06:20:00Z',
    updatedAt: '2024-01-15T11:45:00Z',
    images: ['/complaint4.jpg', '/complaint4b.jpg'],
    upvotes: 31,
    comments: 8,
    estimatedResolution: '2024-01-17T16:00:00Z'
  }
]

const getStatusColor = (status) => {
  switch (status) {
    case 'Completed': return 'bg-green-100 text-green-800 border-green-200'
    case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'Assigned': return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'Rejected': return 'bg-red-100 text-red-800 border-red-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High': return 'bg-red-100 text-red-800 border-red-200'
    case 'Medium': return 'bg-orange-100 text-orange-800 border-orange-200'
    case 'Low': return 'bg-green-100 text-green-800 border-green-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getStatusIcon = (status) => {
  switch (status) {
    case 'Completed': return <CheckCircle className="h-4 w-4" />
    case 'In Progress': return <RefreshCw className="h-4 w-4" />
    case 'Assigned': return <UserPlus className="h-4 w-4" />
    case 'Pending': return <Clock className="h-4 w-4" />
    case 'Rejected': return <XCircle className="h-4 w-4" />
    default: return <AlertCircle className="h-4 w-4" />
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

const ComplaintDetailsDialog = ({ complaint, isOpen, onClose }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center justify-between">
          <span>{complaint.title}</span>
          <Badge className={getStatusColor(complaint.status)}>
            {getStatusIcon(complaint.status)}
            <span className="ml-1">{complaint.status}</span>
          </Badge>
        </DialogTitle>
        <DialogDescription>
          Complaint ID: {complaint.id} • Reported {formatDate(complaint.reportedAt)}
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-sm text-gray-600">{complaint.description}</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Location</h4>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{complaint.location}</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Reporter Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span>{complaint.reportedBy.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{complaint.reportedBy.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{complaint.reportedBy.email}</span>
              </div>
            </div>
          </div>
          
          {complaint.assignedTo && (
            <div>
              <h4 className="font-semibold mb-2">Assigned Engineer</h4>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={complaint.assignedTo.avatar} />
                  <AvatarFallback>{complaint.assignedTo.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{complaint.assignedTo.name}</p>
                  <p className="text-xs text-gray-500">{complaint.assignedTo.id}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Details</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Category:</span>
                <Badge variant="outline">{complaint.category}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Priority:</span>
                <Badge className={getPriorityColor(complaint.priority)}>
                  {complaint.priority}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Upvotes:</span>
                <span className="text-sm">{complaint.upvotes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Comments:</span>
                <span className="text-sm">{complaint.comments}</span>
              </div>
            </div>
          </div>
          
          {complaint.images && complaint.images.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Images</h4>
              <div className="grid grid-cols-2 gap-2">
                {complaint.images.map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <Camera className="h-8 w-8 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex space-x-2">
            <Button size="sm" className="flex-1">
              <UserPlus className="h-4 w-4 mr-2" />
              Assign Engineer
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Add Comment
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)

export default function ComplaintsPage() {
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredComplaints = complaintsData.filter(complaint => {
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || complaint.priority === priorityFilter
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesStatus && matchesPriority && matchesSearch
  })

  const statusCounts = {
    all: complaintsData.length,
    pending: complaintsData.filter(c => c.status === 'Pending').length,
    assigned: complaintsData.filter(c => c.status === 'Assigned').length,
    'in-progress': complaintsData.filter(c => c.status === 'In Progress').length,
    completed: complaintsData.filter(c => c.status === 'Completed').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Complaints Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage civic issue complaints from citizens
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Status Overview Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.all}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned</CardTitle>
            <UserPlus className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{statusCounts.assigned}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <RefreshCw className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{statusCounts['in-progress']}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statusCounts.completed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search complaints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Assigned">Assigned</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Complaints Table */}
      <Card>
        <CardHeader>
          <CardTitle>Complaints List</CardTitle>
          <CardDescription>
            Showing {filteredComplaints.length} of {complaintsData.length} complaints
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Reported</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComplaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell className="font-medium">{complaint.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{complaint.title}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                        <span>👍 {complaint.upvotes}</span>
                        <span>💬 {complaint.comments}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-gray-500" />
                      <span className="text-sm">{complaint.location.split(',')[0]}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{complaint.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(complaint.priority)}>
                      {complaint.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(complaint.status)}>
                      {getStatusIcon(complaint.status)}
                      <span className="ml-1">{complaint.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {complaint.assignedTo ? (
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={complaint.assignedTo.avatar} />
                          <AvatarFallback className="text-xs">
                            {complaint.assignedTo.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{complaint.assignedTo.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(complaint.reportedAt)}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedComplaint(complaint)}
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

      {/* Complaint Details Dialog */}
      {selectedComplaint && (
        <ComplaintDetailsDialog
          complaint={selectedComplaint}
          isOpen={!!selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
        />
      )}
    </div>
  )
}
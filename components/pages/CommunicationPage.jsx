'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
  Send, 
  MessageSquare,
  Bell,
  Mail,
  Smartphone,
  Users,
  BroadcastIcon as Broadcast,
  Filter,
  Download,
  Plus,
  Eye,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  MapPin,
  Settings
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts'

// Mock data for notifications and messages
const notificationsData = [
  {
    id: 'NOT-001',
    title: 'High Priority Complaint Alert',
    message: 'New high priority complaint reported in Ranchi Zone - Water supply disruption affecting 200+ households',
    type: 'alert',
    priority: 'High',
    targetAudience: 'Field Engineers',
    recipientCount: 12,
    sentAt: '2024-01-15T10:30:00Z',
    status: 'Delivered',
    readCount: 8,
    responseCount: 3,
    channels: ['In-App', 'SMS', 'Email']
  },
  {
    id: 'NOT-002',
    title: 'Monthly Performance Update',
    message: 'Your monthly performance report is now available. Check your dashboard for detailed insights.',
    type: 'info',
    priority: 'Medium',
    targetAudience: 'All Engineers',
    recipientCount: 45,
    sentAt: '2024-01-15T09:00:00Z',
    status: 'Delivered',
    readCount: 32,
    responseCount: 0,
    channels: ['In-App', 'Email']
  },
  {
    id: 'NOT-003',
    title: 'Citizen Appreciation Message',
    message: 'Great job on resolving the Main Street pothole! Citizens are appreciating your quick response.',
    type: 'appreciation',
    priority: 'Low',
    targetAudience: 'Specific Engineer',
    recipientCount: 1,
    sentAt: '2024-01-15T14:20:00Z',
    status: 'Read',
    readCount: 1,
    responseCount: 1,
    channels: ['In-App']
  }
]

const messagesData = [
  {
    id: 'MSG-001',
    subject: 'Equipment Request - Pothole Repair Tools',
    content: 'Need additional equipment for large pothole repairs in sector 5. Current tools are insufficient.',
    from: {
      name: 'Rahul Singh',
      id: 'ENG-001',
      avatar: '/engineer1.jpg'
    },
    to: 'Admin Team',
    timestamp: '2024-01-15T11:30:00Z',
    status: 'Unread',
    priority: 'Medium',
    category: 'Equipment Request'
  },
  {
    id: 'MSG-002',
    subject: 'Status Update - Water Supply Issue',
    content: 'Progress update on water supply restoration. Estimated completion by evening. Need approval for overtime.',
    from: {
      name: 'Manoj Kumar',
      id: 'ENG-004',
      avatar: '/engineer4.jpg'
    },
    to: 'Admin Team',
    timestamp: '2024-01-15T13:45:00Z',
    status: 'Read',
    priority: 'High',
    category: 'Status Update'
  }
]

const communicationStats = [
  { month: 'Aug', notifications: 145, messages: 89, responses: 67 },
  { month: 'Sep', notifications: 162, messages: 95, responses: 78 },
  { month: 'Oct', notifications: 138, messages: 76, responses: 82 },
  { month: 'Nov', notifications: 189, messages: 112, responses: 95 },
  { month: 'Dec', notifications: 156, messages: 98, responses: 73 },
  { month: 'Jan', notifications: 78, messages: 45, responses: 38 }
]

const channelDistribution = [
  { name: 'In-App', value: 45, color: '#8884d8' },
  { name: 'SMS', value: 30, color: '#82ca9d' },
  { name: 'Email', value: 20, color: '#ffc658' },
  { name: 'Push Notification', value: 5, color: '#ff7c7c' }
]

const getTypeColor = (type) => {
  switch (type) {
    case 'alert': return 'bg-red-100 text-red-800 border-red-200'
    case 'info': return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'appreciation': return 'bg-green-100 text-green-800 border-green-200'
    case 'update': return 'bg-purple-100 text-purple-800 border-purple-200'
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

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const SendNotificationDialog = ({ isOpen, onClose }) => {
  const [notificationData, setNotificationData] = useState({
    title: '',
    message: '',
    type: 'info',
    priority: 'Medium',
    targetAudience: 'All Engineers',
    channels: ['In-App']
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Send New Notification</DialogTitle>
          <DialogDescription>
            Compose and send notifications to field engineers
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              placeholder="Notification title"
              value={notificationData.title}
              onChange={(e) => setNotificationData({...notificationData, title: e.target.value})}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Message</label>
            <Textarea
              placeholder="Notification message"
              value={notificationData.message}
              onChange={(e) => setNotificationData({...notificationData, message: e.target.value})}
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Type</label>
              <Select value={notificationData.type} onValueChange={(value) => setNotificationData({...notificationData, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Information</SelectItem>
                  <SelectItem value="alert">Alert</SelectItem>
                  <SelectItem value="appreciation">Appreciation</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Priority</label>
              <Select value={notificationData.priority} onValueChange={(value) => setNotificationData({...notificationData, priority: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Target Audience</label>
            <Select value={notificationData.targetAudience} onValueChange={(value) => setNotificationData({...notificationData, targetAudience: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Engineers">All Engineers</SelectItem>
                <SelectItem value="Ranchi Zone">Ranchi Zone</SelectItem>
                <SelectItem value="Dhanbad Zone">Dhanbad Zone</SelectItem>
                <SelectItem value="Jamshedpur Zone">Jamshedpur Zone</SelectItem>
                <SelectItem value="Specific Engineer">Specific Engineer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={onClose}>
              <Send className="h-4 w-4 mr-2" />
              Send Notification
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState('notifications')
  const [showSendDialog, setShowSendDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  const filteredNotifications = notificationsData.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || notification.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Communication Hub</h1>
          <p className="text-muted-foreground">
            Manage notifications, messages, and communication with field engineers
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowSendDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Send Notification
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98.5%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Read Rate</CardTitle>
            <Eye className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">76.3%</div>
            <p className="text-xs text-muted-foreground">
              Average read rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <MessageSquare className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">42.8%</div>
            <p className="text-xs text-muted-foreground">
              When response needed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Communication Trends</CardTitle>
            <CardDescription>
              Monthly communication statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={communicationStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="notifications" stroke="#8884d8" name="Notifications" />
                <Line type="monotone" dataKey="messages" stroke="#82ca9d" name="Messages" />
                <Line type="monotone" dataKey="responses" stroke="#ffc658" name="Responses" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Channel Distribution</CardTitle>
            <CardDescription>
              Notification delivery channels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={channelDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {channelDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="broadcasts">Broadcasts</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filter Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search notifications..."
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
                    <SelectItem value="alert">Alert</SelectItem>
                    <SelectItem value="info">Information</SelectItem>
                    <SelectItem value="appreciation">Appreciation</SelectItem>
                    <SelectItem value="update">Update</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>
                Showing {filteredNotifications.length} notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Read Rate</TableHead>
                    <TableHead>Sent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-sm text-gray-500 truncate max-w-[200px]">
                            {notification.message}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(notification.type)}>
                          {notification.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3 text-gray-500" />
                          <span className="text-sm">{notification.targetAudience}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {notification.recipientCount}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {notification.readCount}/{notification.recipientCount}
                          <span className="text-gray-500 ml-1">
                            ({Math.round((notification.readCount / notification.recipientCount) * 100)}%)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatDate(notification.sentAt)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={notification.status === 'Delivered' ? 'default' : 'secondary'}>
                          {notification.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>
                Messages from field engineers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>From</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messagesData.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={message.from.avatar} />
                            <AvatarFallback>{message.from.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{message.from.name}</p>
                            <p className="text-sm text-gray-500">{message.from.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{message.subject}</p>
                          <p className="text-sm text-gray-500 truncate max-w-[300px]">
                            {message.content}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{message.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(message.priority)}>
                          {message.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatDate(message.timestamp)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={message.status === 'Unread' ? 'destructive' : 'secondary'}>
                          {message.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="broadcasts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Broadcast Center</CardTitle>
              <CardDescription>
                Send mass communications to all or specific groups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Broadcast className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Broadcast Feature</h3>
                <p className="text-gray-500 mb-4">Send announcements, updates, and emergency alerts to multiple engineers at once.</p>
                <Button onClick={() => setShowSendDialog(true)}>
                  <Broadcast className="h-4 w-4 mr-2" />
                  Create Broadcast
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Communication Settings</CardTitle>
              <CardDescription>
                Configure notification preferences and delivery settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Default Channels</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">In-App Notifications</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">SMS for High Priority</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Email Notifications</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Auto-Response Settings</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Auto-acknowledge message receipt</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Send delivery confirmations</span>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Send Notification Dialog */}
      <SendNotificationDialog
        isOpen={showSendDialog}
        onClose={() => setShowSendDialog(false)}
      />
    </div>
  )
}
import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Users as UsersIcon, 
  UserPlus, 
  Search, 
  MoreHorizontal, 
  Edit,
  Trash2,
  Shield,
  Mail,
  Phone,
  Calendar,
  Activity,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'

export default function Users() {
  const users = [
    {
      id: 1,
      name: "Rajesh Kumar Singh",
      email: "rajesh.singh@gov.in",
      phone: "+91 98765 43210",
      role: "Field Engineer",
      department: "Water Supply",
      status: "active",
      lastLogin: "2 hours ago",
      joinDate: "2023-01-15",
      assignedComplaints: 23,
      resolvedComplaints: 156,
      avatar: "/avatars/rajesh.jpg"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@gov.in",
      phone: "+91 87654 32109",
      role: "Admin",
      department: "Administration",
      status: "active",
      lastLogin: "1 hour ago",
      joinDate: "2022-08-10",
      assignedComplaints: 0,
      resolvedComplaints: 0,
      avatar: "/avatars/priya.jpg"
    },
    {
      id: 3,
      name: "Amit Gupta",
      email: "amit.gupta@gov.in",
      phone: "+91 76543 21098",
      role: "Supervisor",
      department: "Electricity",
      status: "active",
      lastLogin: "5 hours ago",
      joinDate: "2023-03-22",
      assignedComplaints: 0,
      resolvedComplaints: 0,
      avatar: "/avatars/amit.jpg"
    },
    {
      id: 4,
      name: "Sunita Devi",
      email: "sunita.devi@gov.in",
      phone: "+91 65432 10987",
      role: "Field Engineer",
      department: "Sanitation",
      status: "inactive",
      lastLogin: "2 days ago",
      joinDate: "2023-05-01",
      assignedComplaints: 12,
      resolvedComplaints: 89,
      avatar: "/avatars/sunita.jpg"
    },
    {
      id: 5,
      name: "Vikash Prasad",
      email: "vikash.prasad@gov.in",
      phone: "+91 54321 09876",
      role: "Field Engineer",
      department: "Road Maintenance",
      status: "active",
      lastLogin: "30 minutes ago",
      joinDate: "2023-07-18",
      assignedComplaints: 18,
      resolvedComplaints: 67,
      avatar: "/avatars/vikash.jpg"
    }
  ]

  const roles = [
    { name: "Admin", count: 3, permissions: "Full access" },
    { name: "Supervisor", count: 8, permissions: "Department oversight" },
    { name: "Field Engineer", count: 145, permissions: "Issue resolution" },
    { name: "Data Entry", count: 12, permissions: "Data input only" }
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'inactive':
        return <XCircle className="h-4 w-4 text-gray-500" />
      case 'suspended':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getRoleBadge = (role) => {
    switch (role) {
      case 'Admin':
        return <Badge variant="default">Admin</Badge>
      case 'Supervisor':
        return <Badge className="bg-blue-100 text-blue-800">Supervisor</Badge>
      case 'Field Engineer':
        return <Badge className="bg-purple-100 text-purple-800">Field Engineer</Badge>
      case 'Data Entry':
        return <Badge variant="outline">Data Entry</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">
              Manage system users, roles, and permissions
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account for the system.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter phone number" />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                      <SelectItem value="engineer">Field Engineer</SelectItem>
                      <SelectItem value="data-entry">Data Entry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="water">Water Supply</SelectItem>
                      <SelectItem value="electricity">Electricity</SelectItem>
                      <SelectItem value="roads">Road Maintenance</SelectItem>
                      <SelectItem value="sanitation">Sanitation</SelectItem>
                      <SelectItem value="admin">Administration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Create User</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            <TabsTrigger value="activity">Activity Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <UsersIcon className="h-5 w-5" />
                      <span>System Users</span>
                    </CardTitle>
                    <CardDescription>Manage user accounts and their information</CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search users..." className="pl-9 w-64" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getRoleBadge(user.role)}
                        </TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(user.status)}
                            {getStatusBadge(user.status)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {user.role === 'Field Engineer' ? (
                            <div className="text-sm">
                              <div>{user.resolvedComplaints} resolved</div>
                              <div className="text-muted-foreground">{user.assignedComplaints} pending</div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">N/A</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {user.lastLogin}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Shield className="h-4 w-4 mr-2" />
                                Permissions
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roles.map((role, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{role.name}</span>
                      <Badge variant="outline">{role.count}</Badge>
                    </CardTitle>
                    <CardDescription>{role.permissions}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <Shield className="h-4 w-4 mr-2" />
                      Manage Permissions
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Permission Matrix</CardTitle>
                <CardDescription>Overview of role-based permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Feature</TableHead>
                      <TableHead>Admin</TableHead>
                      <TableHead>Supervisor</TableHead>
                      <TableHead>Field Engineer</TableHead>
                      <TableHead>Data Entry</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>View Complaints</TableCell>
                      <TableCell><CheckCircle className="h-4 w-4 text-green-500" /></TableCell>
                      <TableCell><CheckCircle className="h-4 w-4 text-green-500" /></TableCell>
                      <TableCell><CheckCircle className="h-4 w-4 text-green-500" /></TableCell>
                      <TableCell><CheckCircle className="h-4 w-4 text-green-500" /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Assign Engineers</TableCell>
                      <TableCell><CheckCircle className="h-4 w-4 text-green-500" /></TableCell>
                      <TableCell><CheckCircle className="h-4 w-4 text-green-500" /></TableCell>
                      <TableCell><XCircle className="h-4 w-4 text-gray-400" /></TableCell>
                      <TableCell><XCircle className="h-4 w-4 text-gray-400" /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>User Management</TableCell>
                      <TableCell><CheckCircle className="h-4 w-4 text-green-500" /></TableCell>
                      <TableCell><XCircle className="h-4 w-4 text-gray-400" /></TableCell>
                      <TableCell><XCircle className="h-4 w-4 text-gray-400" /></TableCell>
                      <TableCell><XCircle className="h-4 w-4 text-gray-400" /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>System Settings</TableCell>
                      <TableCell><CheckCircle className="h-4 w-4 text-green-500" /></TableCell>
                      <TableCell><XCircle className="h-4 w-4 text-gray-400" /></TableCell>
                      <TableCell><XCircle className="h-4 w-4 text-gray-400" /></TableCell>
                      <TableCell><XCircle className="h-4 w-4 text-gray-400" /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Analytics & Reports</TableCell>
                      <TableCell><CheckCircle className="h-4 w-4 text-green-500" /></TableCell>
                      <TableCell><CheckCircle className="h-4 w-4 text-green-500" /></TableCell>
                      <TableCell><XCircle className="h-4 w-4 text-gray-400" /></TableCell>
                      <TableCell><XCircle className="h-4 w-4 text-gray-400" /></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>Track user actions and system events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 border rounded">
                    <div className="h-2 w-2 rounded-full bg-green-500 mt-3"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">User Login</h4>
                        <span className="text-sm text-muted-foreground">2 minutes ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Rajesh Kumar Singh logged in</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 border rounded">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-3"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">User Created</h4>
                        <span className="text-sm text-muted-foreground">1 hour ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">New field engineer added: Rahul Verma</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 border rounded">
                    <div className="h-2 w-2 rounded-full bg-yellow-500 mt-3"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Role Updated</h4>
                        <span className="text-sm text-muted-foreground">3 hours ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Priya Sharma promoted to Admin</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 border rounded">
                    <div className="h-2 w-2 rounded-full bg-red-500 mt-3"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Failed Login</h4>
                        <span className="text-sm text-muted-foreground">6 hours ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Failed login attempt for admin@gov.in</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 border rounded">
                    <div className="h-2 w-2 rounded-full bg-purple-500 mt-3"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Permissions Changed</h4>
                        <span className="text-sm text-muted-foreground">1 day ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Analytics access granted to supervisors</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
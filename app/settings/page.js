import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Mail, 
  Globe, 
  Database,
  Users,
  Save,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'

export default function Settings() {
  const systemStatus = [
    { service: "Database", status: "operational", uptime: "99.9%" },
    { service: "Email Service", status: "operational", uptime: "99.7%" },
    { service: "SMS Gateway", status: "maintenance", uptime: "95.2%" },
    { service: "File Storage", status: "operational", uptime: "99.8%" },
    { service: "Backup System", status: "operational", uptime: "100%" }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'maintenance':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'operational':
        return <Badge className="bg-green-100 text-green-800">Operational</Badge>
      case 'maintenance':
        return <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            System configuration and preferences
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <SettingsIcon className="h-5 w-5" />
                    <span>Organization Settings</span>
                  </CardTitle>
                  <CardDescription>Basic organization information and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="org-name">Organization Name</Label>
                      <Input id="org-name" defaultValue="Government of Jharkhand" />
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" defaultValue="Civic Administration" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" defaultValue="Secretariat, Ranchi, Jharkhand - 834001" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact">Contact Number</Label>
                      <Input id="contact" defaultValue="+91-651-2446721" />
                    </div>
                    <div>
                      <Label htmlFor="email">Official Email</Label>
                      <Input id="email" defaultValue="admin@gov.jh.in" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="asia-kolkata">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asia-kolkata">Asia/Kolkata (IST)</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Default Settings</CardTitle>
                  <CardDescription>System-wide default configurations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="response-time">Default Response Time (hours)</Label>
                    <Select defaultValue="24">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="24">24 hours</SelectItem>
                        <SelectItem value="48">48 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority-auto">Auto Priority Assignment</Label>
                    <Select defaultValue="enabled">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Default Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="bho">Bhojpuri</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="working-hours">Working Hours</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input defaultValue="09:00" type="time" />
                      <Input defaultValue="18:00" type="time" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>Configure how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SMS Alerts</h4>
                      <p className="text-sm text-muted-foreground">Critical alerts via SMS</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Push Notifications</h4>
                      <p className="text-sm text-muted-foreground">Browser and mobile push notifications</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Notification Types</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">New Complaints</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">High Priority Issues</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Weekly Reports</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">System Maintenance</span>
                      <Badge variant="outline">Disabled</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Security Settings</span>
                  </CardTitle>
                  <CardDescription>Manage system security and access controls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Select defaultValue="60">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="480">8 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="password-policy">Password Policy</Label>
                    <Select defaultValue="strong">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="strong">Strong</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <Select defaultValue="optional">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disabled">Disabled</SelectItem>
                        <SelectItem value="optional">Optional</SelectItem>
                        <SelectItem value="required">Required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Update Security Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Access Logs</CardTitle>
                  <CardDescription>Recent system access and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>Admin Login</span>
                        <span className="text-muted-foreground">2 hours ago</span>
                      </div>
                      <div className="flex justify-between">
                        <span>System Backup</span>
                        <span className="text-muted-foreground">6 hours ago</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Failed Login Attempt</span>
                        <span className="text-muted-foreground">1 day ago</span>
                      </div>
                      <div className="flex justify-between">
                        <span>User Created</span>
                        <span className="text-muted-foreground">2 days ago</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">View Full Logs</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>External Integrations</span>
                </CardTitle>
                <CardDescription>Manage third-party service integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-8 w-8 text-blue-500" />
                      <div>
                        <h4 className="font-medium">Email Service</h4>
                        <p className="text-sm text-muted-foreground">SMTP configuration for notifications</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded bg-green-500 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">SMS</span>
                      </div>
                      <div>
                        <h4 className="font-medium">SMS Gateway</h4>
                        <p className="text-sm text-muted-foreground">SMS service for alerts and notifications</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded bg-orange-500 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">GIS</span>
                      </div>
                      <div>
                        <h4 className="font-medium">GIS Services</h4>
                        <p className="text-sm text-muted-foreground">Geographic information system integration</p>
                      </div>
                    </div>
                    <Badge variant="outline">Not Connected</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5" />
                    <span>System Status</span>
                  </CardTitle>
                  <CardDescription>Current status of system services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemStatus.map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(service.status)}
                          <div>
                            <h4 className="font-medium">{service.service}</h4>
                            <p className="text-sm text-muted-foreground">Uptime: {service.uptime}</p>
                          </div>
                        </div>
                        {getStatusBadge(service.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Maintenance</CardTitle>
                  <CardDescription>Database and system maintenance options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Database className="h-4 w-4 mr-2" />
                      Database Optimization
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Clear Cache
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <SettingsIcon className="h-4 w-4 mr-2" />
                      System Restart
                    </Button>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Backup Settings</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Last Backup:</span>
                        <span className="text-muted-foreground">2 hours ago</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Next Backup:</span>
                        <span className="text-muted-foreground">In 22 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Backup Size:</span>
                        <span className="text-muted-foreground">2.4 GB</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-3">
                      <Database className="h-4 w-4 mr-2" />
                      Create Backup Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
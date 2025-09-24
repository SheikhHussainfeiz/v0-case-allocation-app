"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Search, UserPlus, Edit, Crown, User, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for users
const mockUsers = [
  {
    psid: "PS001",
    userName: "Alice Johnson",
    teamLead: true,
    isActive: true,
    activeCaseCount: 18,
    todayNewCount: 3,
    todayDate: "2024-03-11",
    lastAssignedAtUtc: "2024-03-11T14:30:00Z",
    maxDailyNew: 5,
    email: "alice.johnson@company.com",
    department: "Finance",
    joinedDate: "2023-01-15",
  },
  {
    psid: "PS002",
    userName: "Bob Smith",
    teamLead: false,
    isActive: true,
    activeCaseCount: 22,
    todayNewCount: 5,
    todayDate: "2024-03-11",
    lastAssignedAtUtc: "2024-03-11T15:45:00Z",
    maxDailyNew: 5,
    email: "bob.smith@company.com",
    department: "IT",
    joinedDate: "2023-03-20",
  },
  {
    psid: "PS003",
    userName: "Carol Williams",
    teamLead: false,
    isActive: true,
    activeCaseCount: 15,
    todayNewCount: 2,
    todayDate: "2024-03-11",
    lastAssignedAtUtc: "2024-03-11T13:15:00Z",
    maxDailyNew: 5,
    email: "carol.williams@company.com",
    department: "HR",
    joinedDate: "2023-02-10",
  },
  {
    psid: "PS004",
    userName: "David Brown",
    teamLead: false,
    isActive: false,
    activeCaseCount: 8,
    todayNewCount: 0,
    todayDate: "2024-03-11",
    lastAssignedAtUtc: "2024-03-10T16:20:00Z",
    maxDailyNew: 5,
    email: "david.brown@company.com",
    department: "Marketing",
    joinedDate: "2023-05-08",
  },
  {
    psid: "PS005",
    userName: "Eva Green",
    teamLead: true,
    isActive: true,
    activeCaseCount: 12,
    todayNewCount: 1,
    todayDate: "2024-03-11",
    lastAssignedAtUtc: "2024-03-11T11:30:00Z",
    maxDailyNew: 5,
    email: "eva.green@company.com",
    department: "Sales",
    joinedDate: "2022-11-12",
  },
]

export function UserManager() {
  const [users, setUsers] = useState(mockUsers)
  const [selectedUser, setSelectedUser] = useState<(typeof mockUsers)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const toggleUserStatus = (psid: string) => {
    setUsers((prev) => prev.map((user) => (user.psid === psid ? { ...user, isActive: !user.isActive } : user)))
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "short",
      timeStyle: "short",
    })
  }

  const getWorkloadColor = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage >= 90) return "text-destructive"
    if (percentage >= 70) return "text-yellow-500"
    return "text-secondary"
  }

  const filteredUsers = users.filter(
    (user) =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.psid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const activeUsers = users.filter((user) => user.isActive).length
  const totalCases = users.reduce((sum, user) => sum + user.activeCaseCount, 0)
  const todayAssignments = users.reduce((sum, user) => sum + user.todayNewCount, 0)

  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage team members and workload distribution</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Team members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <CheckCircle className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCases}</div>
            <p className="text-xs text-muted-foreground">Assigned cases</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Assignments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAssignments}</div>
            <p className="text-xs text-muted-foreground">New cases today</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name, PSID, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Workload</TableHead>
                <TableHead>Today's Cases</TableHead>
                <TableHead>Last Assigned</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.psid}>
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {user.userName}
                        {user.teamLead && <Crown className="h-4 w-4 text-yellow-500" />}
                      </div>
                      <div className="text-sm text-muted-foreground">{user.psid}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.department}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        user.teamLead
                          ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                          : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                      }
                    >
                      {user.teamLead ? "Team Lead" : "Member"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch checked={user.isActive} onCheckedChange={() => toggleUserStatus(user.psid)} />
                      <Badge
                        className={
                          user.isActive
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                        }
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className={cn("text-sm font-medium", getWorkloadColor(user.activeCaseCount, 25))}>
                        {user.activeCaseCount}/25 cases
                      </div>
                      <Progress value={(user.activeCaseCount / 25) * 100} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={cn("text-sm font-medium", getWorkloadColor(user.todayNewCount, user.maxDailyNew))}>
                      {user.todayNewCount}/{user.maxDailyNew}
                    </div>
                    <Progress value={(user.todayNewCount / user.maxDailyNew) * 100} className="h-2 mt-1" />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.lastAssignedAtUtc ? formatTime(user.lastAssignedAtUtc) : "Never"}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => setSelectedUser(user)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>User Details - {selectedUser?.userName}</DialogTitle>
                        </DialogHeader>
                        {selectedUser && <UserDetailsDialog userData={selectedUser} />}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Workload Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Workload Distribution</CardTitle>
          <p className="text-sm text-muted-foreground">Current case distribution across active team members</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users
              .filter((user) => user.isActive)
              .map((user) => (
                <div key={user.psid} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium">
                    {user.userName}
                    {user.teamLead && <Crown className="h-3 w-3 inline ml-1 text-yellow-500" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Cases: {user.activeCaseCount}/25</span>
                      <span>{Math.round((user.activeCaseCount / 25) * 100)}%</span>
                    </div>
                    <Progress value={(user.activeCaseCount / 25) * 100} />
                  </div>
                  <div className="w-20 text-sm text-muted-foreground">
                    Today: {user.todayNewCount}/{user.maxDailyNew}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function UserDetailsDialog({ userData }: { userData: (typeof mockUsers)[0] }) {
  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Full Name</label>
          <p className="text-sm font-medium">{userData.userName}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">PSID</label>
          <p className="text-sm font-medium">{userData.psid}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Email</label>
          <p className="text-sm">{userData.email}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Department</label>
          <p className="text-sm">{userData.department}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Role</label>
          <Badge
            className={
              userData.teamLead
                ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                : "bg-blue-500/10 text-blue-500 border-blue-500/20"
            }
          >
            {userData.teamLead ? "Team Lead" : "Team Member"}
          </Badge>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Status</label>
          <Badge
            className={
              userData.isActive
                ? "bg-green-500/10 text-green-500 border-green-500/20"
                : "bg-gray-500/10 text-gray-500 border-gray-500/20"
            }
          >
            {userData.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>

      {/* Workload Stats */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Workload Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">{userData.activeCaseCount}</div>
              <p className="text-sm text-muted-foreground">Active Cases</p>
              <Progress value={(userData.activeCaseCount / 25) * 100} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">{userData.todayNewCount}</div>
              <p className="text-sm text-muted-foreground">Today's New Cases</p>
              <Progress value={(userData.todayNewCount / userData.maxDailyNew) * 100} className="mt-2" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-medium mb-2">Recent Activity</h3>
        <div className="text-sm text-muted-foreground">
          Last assigned:{" "}
          {userData.lastAssignedAtUtc
            ? new Date(userData.lastAssignedAtUtc).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                dateStyle: "full",
                timeStyle: "short",
              })
            : "Never"}
        </div>
        <div className="text-sm text-muted-foreground">
          Joined:{" "}
          {new Date(userData.joinedDate).toLocaleDateString("en-IN", {
            dateStyle: "long",
          })}
        </div>
      </div>
    </div>
  )
}

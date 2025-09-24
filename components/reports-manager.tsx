"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, TrendingUp, CheckCircle, Clock, Users } from "lucide-react"

// Mock data for reports
const slaPerformanceData = [
  { date: "2024-03-04", onTime: 45, breached: 8, total: 53 },
  { date: "2024-03-05", onTime: 52, breached: 6, total: 58 },
  { date: "2024-03-06", onTime: 38, breached: 12, total: 50 },
  { date: "2024-03-07", onTime: 41, breached: 9, total: 50 },
  { date: "2024-03-08", onTime: 47, breached: 5, total: 52 },
  { date: "2024-03-09", onTime: 43, breached: 7, total: 50 },
  { date: "2024-03-10", onTime: 49, breached: 4, total: 53 },
]

const workloadTrendData = [
  { week: "Week 1", alice: 18, bob: 22, carol: 15, david: 8, eva: 12 },
  { week: "Week 2", alice: 20, bob: 19, carol: 17, david: 10, eva: 14 },
  { week: "Week 3", alice: 16, bob: 24, carol: 13, david: 6, eva: 16 },
  { week: "Week 4", alice: 18, bob: 22, carol: 15, david: 8, eva: 12 },
]

const caseDistributionData = [
  { name: "Open", value: 45, color: "hsl(var(--chart-1))" },
  { name: "In Progress", value: 78, color: "hsl(var(--chart-2))" },
  { name: "On Hold", value: 23, color: "hsl(var(--chart-3))" },
  { name: "Resolved", value: 156, color: "hsl(var(--chart-4))" },
]

const userPerformanceData = [
  {
    user: "Alice Johnson",
    totalCases: 89,
    resolved: 76,
    slaBreaches: 3,
    avgResolutionTime: "2.1 days",
    resolutionRate: 85.4,
  },
  {
    user: "Bob Smith",
    totalCases: 94,
    resolved: 82,
    slaBreaches: 5,
    avgResolutionTime: "2.8 days",
    resolutionRate: 87.2,
  },
  {
    user: "Carol Williams",
    totalCases: 67,
    resolved: 58,
    slaBreaches: 2,
    avgResolutionTime: "1.9 days",
    resolutionRate: 86.6,
  },
  {
    user: "David Brown",
    totalCases: 34,
    resolved: 28,
    slaBreaches: 1,
    avgResolutionTime: "2.5 days",
    resolutionRate: 82.4,
  },
  {
    user: "Eva Green",
    totalCases: 56,
    resolved: 49,
    slaBreaches: 2,
    avgResolutionTime: "2.2 days",
    resolutionRate: 87.5,
  },
]

export function ReportsManager() {
  const [dateRange, setDateRange] = useState("last30days")
  const [reportType, setReportType] = useState("overview")

  const exportReport = (type: string) => {
    // Simulate export functionality
    console.log(`Exporting ${type} report for ${dateRange}`)
  }

  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Performance insights and case management analytics</p>
        </div>
        <div className="flex gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="last90days">Last 90 Days</SelectItem>
              <SelectItem value="thisyear">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => exportReport(reportType)}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">340</div>
            <p className="text-xs text-muted-foreground">+12% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SLA Compliance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.2%</div>
            <p className="text-xs text-muted-foreground">+2.1% improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3 days</div>
            <p className="text-xs text-muted-foreground">-0.2 days faster</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Team members</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SLA Performance */}
        <Card>
          <CardHeader>
            <CardTitle>SLA Performance Trend</CardTitle>
            <p className="text-sm text-muted-foreground">Daily SLA compliance over time</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={slaPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                  }
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Line
                  type="monotone"
                  dataKey="onTime"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-4))" }}
                />
                <Line
                  type="monotone"
                  dataKey="breached"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--destructive))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Case Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Case Status Distribution</CardTitle>
            <p className="text-sm text-muted-foreground">Current case status breakdown</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={caseDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {caseDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {caseDistributionData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">
                    {item.name} ({item.value})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Workload Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Team Workload Trends</CardTitle>
            <p className="text-sm text-muted-foreground">Weekly case assignments by team member</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={workloadTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Bar dataKey="alice" fill="hsl(var(--chart-1))" radius={2} />
                <Bar dataKey="bob" fill="hsl(var(--chart-2))" radius={2} />
                <Bar dataKey="carol" fill="hsl(var(--chart-3))" radius={2} />
                <Bar dataKey="david" fill="hsl(var(--chart-4))" radius={2} />
                <Bar dataKey="eva" fill="hsl(var(--chart-5))" radius={2} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* User Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Performance Summary</CardTitle>
          <p className="text-sm text-muted-foreground">Individual performance metrics for the selected period</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Total Cases</TableHead>
                <TableHead>Resolved</TableHead>
                <TableHead>SLA Breaches</TableHead>
                <TableHead>Avg Resolution Time</TableHead>
                <TableHead>Resolution Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userPerformanceData.map((user) => (
                <TableRow key={user.user}>
                  <TableCell className="font-medium">{user.user}</TableCell>
                  <TableCell>{user.totalCases}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20">{user.resolved}</Badge>
                  </TableCell>
                  <TableCell>
                    {user.slaBreaches > 0 ? (
                      <Badge variant="destructive">{user.slaBreaches}</Badge>
                    ) : (
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20">0</Badge>
                    )}
                  </TableCell>
                  <TableCell>{user.avgResolutionTime}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{user.resolutionRate}%</span>
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${user.resolutionRate}%` }} />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
          <p className="text-sm text-muted-foreground">Download detailed reports in various formats</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" onClick={() => exportReport("sla-performance")}>
              <Download className="h-4 w-4 mr-2" />
              SLA Performance Report
            </Button>
            <Button variant="outline" onClick={() => exportReport("user-performance")}>
              <Download className="h-4 w-4 mr-2" />
              User Performance Report
            </Button>
            <Button variant="outline" onClick={() => exportReport("case-summary")}>
              <Download className="h-4 w-4 mr-2" />
              Case Summary Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

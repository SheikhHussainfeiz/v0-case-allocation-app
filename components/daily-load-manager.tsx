"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Play, Clock, CheckCircle, AlertCircle, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for daily loads
const mockLoads = [
  {
    id: "DL-2024-001",
    customerId: "CUST-001",
    customerName: "Acme Corporation",
    recordCount: 45,
    createdOn: "2024-03-11T08:30:00Z",
    processed: false,
    runId: null,
    estimatedProcessTime: "2-3 minutes",
  },
  {
    id: "DL-2024-002",
    customerId: "CUST-002",
    customerName: "Global Tech Solutions",
    recordCount: 78,
    createdOn: "2024-03-11T09:15:00Z",
    processed: false,
    runId: null,
    estimatedProcessTime: "3-4 minutes",
  },
  {
    id: "DL-2024-003",
    customerId: "CUST-003",
    customerName: "Innovation Labs",
    recordCount: 23,
    createdOn: "2024-03-11T10:00:00Z",
    processed: false,
    runId: null,
    estimatedProcessTime: "1-2 minutes",
  },
  {
    id: "DL-2024-004",
    customerId: "CUST-004",
    customerName: "Enterprise Systems",
    recordCount: 156,
    createdOn: "2024-03-11T07:45:00Z",
    processed: true,
    runId: "RUN-001",
    processedOnUtc: "2024-03-11T08:00:00Z",
    estimatedProcessTime: "5-6 minutes",
  },
]

const processingStats = {
  totalLoads: 4,
  unprocessed: 3,
  processed: 1,
  totalRecords: 302,
  unprocessedRecords: 146,
}

export function DailyLoadManager() {
  const [loads, setLoads] = useState(mockLoads)
  const [processing, setProcessing] = useState<string | null>(null)

  const handleProcessLoad = async (loadId: string) => {
    setProcessing(loadId)

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setLoads((prev) =>
      prev.map((load) =>
        load.id === loadId
          ? {
              ...load,
              processed: true,
              runId: `RUN-${Date.now()}`,
              processedOnUtc: new Date().toISOString(),
            }
          : load,
      ),
    )

    setProcessing(null)
  }

  const handleProcessAll = async () => {
    const unprocessedLoads = loads.filter((load) => !load.processed)

    for (const load of unprocessedLoads) {
      await handleProcessLoad(load.id)
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "short",
      timeStyle: "short",
    })
  }

  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Daily Load Management</h1>
          <p className="text-muted-foreground">Process customer data loads and auto-assign cases</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleProcessAll}
            disabled={processing !== null || loads.every((load) => load.processed)}
            className="bg-primary hover:bg-primary/90"
          >
            <Play className="h-4 w-4 mr-2" />
            Process All Unprocessed
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Loads</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processingStats.totalLoads}</div>
            <p className="text-xs text-muted-foreground">Today's loads</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unprocessed</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{processingStats.unprocessed}</div>
            <p className="text-xs text-muted-foreground">Pending loads</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processed</CardTitle>
            <CheckCircle className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{processingStats.processed}</div>
            <p className="text-xs text-muted-foreground">Completed today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processingStats.totalRecords}</div>
            <p className="text-xs text-muted-foreground">All records</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((processingStats.processed / processingStats.totalLoads) * 100)}%
            </div>
            <Progress value={(processingStats.processed / processingStats.totalLoads) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Loads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Loads</CardTitle>
          <p className="text-sm text-muted-foreground">Customer data loads ready for processing and case creation</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Load ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Est. Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loads.map((load) => (
                <TableRow key={load.id}>
                  <TableCell className="font-mono text-sm">{load.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{load.customerName}</div>
                      <div className="text-sm text-muted-foreground">{load.customerId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{load.recordCount} records</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{formatTime(load.createdOn)}</TableCell>
                  <TableCell>
                    {load.processed ? (
                      <Badge className="bg-secondary text-secondary-foreground">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Processed
                      </Badge>
                    ) : processing === load.id ? (
                      <Badge className="bg-primary text-primary-foreground">
                        <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                        Processing...
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{load.estimatedProcessTime}</TableCell>
                  <TableCell>
                    {!load.processed && (
                      <Button
                        size="sm"
                        onClick={() => handleProcessLoad(load.id)}
                        disabled={processing !== null}
                        className={cn(processing === load.id && "opacity-50 cursor-not-allowed")}
                      >
                        {processing === load.id ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                    {load.processed && (
                      <div className="text-sm text-muted-foreground">
                        Processed at {load.processedOnUtc && formatTime(load.processedOnUtc)}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Processing Rules Info */}
      <Card>
        <CardHeader>
          <CardTitle>Auto-Assignment Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium">Case Creation</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Each record creates a new case</li>
                <li>• Auto-assigned using round-robin</li>
                <li>• Max 5 cases per user per day</li>
                <li>• SLA set to next day 9:30 PM IST</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">User Workload</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Active users only receive assignments</li>
                <li>• Workload balanced across team</li>
                <li>• Daily counters reset at midnight</li>
                <li>• Team leads get priority cases</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

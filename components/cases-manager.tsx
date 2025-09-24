"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Eye, UserCheck, Clock, AlertTriangle, CheckCircle, Pause, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for cases
const mockCases = [
  {
    caseId: "CASE-001",
    customerId: "CUST-001",
    customerName: "Acme Corporation",
    assignedToPSID: "PS001",
    assignedToName: "Alice Johnson",
    status: "Open",
    createdOnUtc: "2024-03-11T08:30:00Z",
    loadDate: "2024-03-11",
    slaDueUtc: "2024-03-12T21:30:00Z",
    notes: "Initial assessment required",
    reassignedCount: 0,
  },
  {
    caseId: "CASE-002",
    customerId: "CUST-002",
    customerName: "Global Tech Solutions",
    assignedToPSID: "PS002",
    assignedToName: "Bob Smith",
    status: "In Progress",
    createdOnUtc: "2024-03-11T09:15:00Z",
    loadDate: "2024-03-11",
    slaDueUtc: "2024-03-12T21:30:00Z",
    notes: "Customer contacted, awaiting response",
    reassignedCount: 1,
  },
  {
    caseId: "CASE-003",
    customerId: "CUST-003",
    customerName: "Innovation Labs",
    assignedToPSID: "PS003",
    assignedToName: "Carol Williams",
    status: "On Hold",
    createdOnUtc: "2024-03-10T10:00:00Z",
    loadDate: "2024-03-10",
    slaDueUtc: "2024-03-11T21:30:00Z",
    notes: "Waiting for customer documentation",
    reassignedCount: 0,
  },
  {
    caseId: "CASE-004",
    customerId: "CUST-004",
    customerName: "Enterprise Systems",
    assignedToPSID: "PS001",
    assignedToName: "Alice Johnson",
    status: "Resolved",
    createdOnUtc: "2024-03-09T07:45:00Z",
    loadDate: "2024-03-09",
    slaDueUtc: "2024-03-10T21:30:00Z",
    notes: "Issue resolved successfully",
    reassignedCount: 0,
  },
]

const mockUsers = [
  { psid: "PS001", name: "Alice Johnson" },
  { psid: "PS002", name: "Bob Smith" },
  { psid: "PS003", name: "Carol Williams" },
  { psid: "PS004", name: "David Brown" },
]

export function CasesManager() {
  const [cases, setCases] = useState(mockCases)
  const [selectedCase, setSelectedCase] = useState<(typeof mockCases)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [assigneeFilter, setAssigneeFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "In Progress":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "On Hold":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "Resolved":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <Clock className="h-3 w-3" />
      case "In Progress":
        return <UserCheck className="h-3 w-3" />
      case "On Hold":
        return <Pause className="h-3 w-3" />
      case "Resolved":
        return <CheckCircle className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  const isSLABreached = (slaDueUtc: string) => {
    return new Date(slaDueUtc) < new Date()
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "short",
      timeStyle: "short",
    })
  }

  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch =
      caseItem.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.assignedToName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || caseItem.status === statusFilter
    const matchesAssignee = assigneeFilter === "all" || caseItem.assignedToPSID === assigneeFilter

    return matchesSearch && matchesStatus && matchesAssignee
  })

  const handleStatusUpdate = (caseId: string, newStatus: string) => {
    setCases((prev) => prev.map((c) => (c.caseId === caseId ? { ...c, status: newStatus } : c)))
  }

  const handleReassign = (caseId: string, newAssignee: string) => {
    const user = mockUsers.find((u) => u.psid === newAssignee)
    if (user) {
      setCases((prev) =>
        prev.map((c) =>
          c.caseId === caseId
            ? {
                ...c,
                assignedToPSID: newAssignee,
                assignedToName: user.name,
                reassignedCount: c.reassignedCount + 1,
              }
            : c,
        ),
      )
    }
  }

  const handleAddNote = (caseId: string, note: string) => {
    setCases((prev) =>
      prev.map((c) =>
        c.caseId === caseId ? { ...c, notes: c.notes + "\n" + new Date().toLocaleString() + ": " + note } : c,
      ),
    )
  }

  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cases Management</h1>
          <p className="text-muted-foreground">Track, update, and manage customer cases</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cases, customers, or assignees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignees</SelectItem>
                {mockUsers.map((user) => (
                  <SelectItem key={user.psid} value={user.psid}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cases Table */}
      <Card>
        <CardHeader>
          <CardTitle>Cases ({filteredCases.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>SLA Due</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCases.map((caseItem) => (
                <TableRow key={caseItem.caseId}>
                  <TableCell className="font-mono text-sm">
                    {caseItem.caseId}
                    {caseItem.reassignedCount > 0 && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        Reassigned {caseItem.reassignedCount}x
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{caseItem.customerName}</div>
                      <div className="text-sm text-muted-foreground">{caseItem.customerId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{caseItem.assignedToName}</div>
                    <div className="text-sm text-muted-foreground">{caseItem.assignedToPSID}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("border", getStatusColor(caseItem.status))}>
                      {getStatusIcon(caseItem.status)}
                      <span className="ml-1">{caseItem.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div
                      className={cn(
                        "text-sm",
                        isSLABreached(caseItem.slaDueUtc) && caseItem.status !== "Resolved"
                          ? "text-destructive font-medium"
                          : "text-muted-foreground",
                      )}
                    >
                      {formatTime(caseItem.slaDueUtc)}
                      {isSLABreached(caseItem.slaDueUtc) && caseItem.status !== "Resolved" && (
                        <AlertTriangle className="h-3 w-3 inline ml-1" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatTime(caseItem.createdOnUtc)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedCase(caseItem)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Case Details - {selectedCase?.caseId}</DialogTitle>
                          </DialogHeader>
                          {selectedCase && (
                            <CaseDetailsDialog
                              caseData={selectedCase}
                              onStatusUpdate={handleStatusUpdate}
                              onReassign={handleReassign}
                              onAddNote={handleAddNote}
                            />
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function CaseDetailsDialog({
  caseData,
  onStatusUpdate,
  onReassign,
  onAddNote,
}: {
  caseData: (typeof mockCases)[0]
  onStatusUpdate: (caseId: string, status: string) => void
  onReassign: (caseId: string, assignee: string) => void
  onAddNote: (caseId: string, note: string) => void
}) {
  const [newNote, setNewNote] = useState("")

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(caseData.caseId, newNote.trim())
      setNewNote("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Case Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Customer</label>
          <p className="text-sm font-medium">{caseData.customerName}</p>
          <p className="text-xs text-muted-foreground">{caseData.customerId}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Current Assignee</label>
          <p className="text-sm font-medium">{caseData.assignedToName}</p>
          <p className="text-xs text-muted-foreground">{caseData.assignedToPSID}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Created</label>
          <p className="text-sm">
            {new Date(caseData.createdOnUtc).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              dateStyle: "full",
              timeStyle: "short",
            })}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">SLA Due</label>
          <p className="text-sm">
            {new Date(caseData.slaDueUtc).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              dateStyle: "full",
              timeStyle: "short",
            })}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Update Status</label>
          <Select value={caseData.status} onValueChange={(value) => onStatusUpdate(caseData.caseId, value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="On Hold">On Hold</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Reassign To</label>
          <Select value={caseData.assignedToPSID} onValueChange={(value) => onReassign(caseData.caseId, value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mockUsers.map((user) => (
                <SelectItem key={user.psid} value={user.psid}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="text-sm font-medium text-muted-foreground">Case Notes</label>
        <div className="mt-2 p-3 bg-muted rounded-lg text-sm whitespace-pre-wrap">
          {caseData.notes || "No notes available"}
        </div>
      </div>

      {/* Add Note */}
      <div>
        <label className="text-sm font-medium text-muted-foreground">Add Note</label>
        <div className="flex gap-2 mt-2">
          <Textarea
            placeholder="Add a note about this case..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleAddNote} disabled={!newNote.trim()}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}

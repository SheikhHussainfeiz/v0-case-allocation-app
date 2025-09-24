"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Save, RefreshCw, Settings, Clock, Users, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock configuration data
const initialConfig = {
  maxDailyNewPerUser: 5,
  slaCutoffLocal: "21:30",
  slaTzId: "Asia/Kolkata",
  autoAssignmentEnabled: true,
  roundRobinEnabled: true,
  teamLeadPriority: true,
  slaReminderInterval: 30,
  businessHoursStart: "09:00",
  businessHoursEnd: "18:00",
  weekendProcessing: false,
  escalationThreshold: 24,
}

const timezones = [
  { value: "Asia/Kolkata", label: "India Standard Time (IST)" },
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
  { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
]

export function ConfigManager() {
  const [config, setConfig] = useState(initialConfig)
  const [hasChanges, setHasChanges] = useState(false)
  const { toast } = useToast()

  const handleConfigChange = (key: string, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      setHasChanges(false)
      toast({
        title: "Configuration saved",
        description: "All settings have been updated successfully.",
      })
    }, 1000)
  }

  const handleReset = () => {
    setConfig(initialConfig)
    setHasChanges(false)
    toast({
      title: "Configuration reset",
      description: "All settings have been reset to default values.",
    })
  }

  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Configuration</h1>
          <p className="text-muted-foreground">Manage global settings and automation rules</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleReset} disabled={!hasChanges}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {hasChanges && (
        <Card className="border-yellow-500/20 bg-yellow-500/5">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-yellow-600">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">You have unsaved changes</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Case Assignment Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Case Assignment Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="maxDaily">Maximum Daily Cases Per User</Label>
              <Input
                id="maxDaily"
                type="number"
                value={config.maxDailyNewPerUser}
                onChange={(e) => handleConfigChange("maxDailyNewPerUser", Number.parseInt(e.target.value))}
                min="1"
                max="20"
              />
              <p className="text-xs text-muted-foreground">Maximum number of new cases assigned to each user per day</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="escalationThreshold">Escalation Threshold (hours)</Label>
              <Input
                id="escalationThreshold"
                type="number"
                value={config.escalationThreshold}
                onChange={(e) => handleConfigChange("escalationThreshold", Number.parseInt(e.target.value))}
                min="1"
                max="72"
              />
              <p className="text-xs text-muted-foreground">Hours before unresolved cases are escalated</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Assignment</Label>
                <p className="text-sm text-muted-foreground">Automatically assign new cases to users</p>
              </div>
              <Badge
                className={
                  config.autoAssignmentEnabled
                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                    : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                }
              >
                {config.autoAssignmentEnabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Round Robin Assignment</Label>
                <p className="text-sm text-muted-foreground">Distribute cases evenly across team members</p>
              </div>
              <Badge
                className={
                  config.roundRobinEnabled
                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                    : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                }
              >
                {config.roundRobinEnabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Team Lead Priority</Label>
                <p className="text-sm text-muted-foreground">Give priority cases to team leads</p>
              </div>
              <Badge
                className={
                  config.teamLeadPriority
                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                    : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                }
              >
                {config.teamLeadPriority ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SLA Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            SLA Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="slaCutoff">SLA Cutoff Time</Label>
              <Input
                id="slaCutoff"
                type="time"
                value={config.slaCutoffLocal}
                onChange={(e) => handleConfigChange("slaCutoffLocal", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Daily SLA deadline time (local timezone)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={config.slaTzId} onValueChange={(value) => handleConfigChange("slaTzId", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Timezone for SLA calculations</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reminderInterval">SLA Reminder Interval (minutes)</Label>
              <Input
                id="reminderInterval"
                type="number"
                value={config.slaReminderInterval}
                onChange={(e) => handleConfigChange("slaReminderInterval", Number.parseInt(e.target.value))}
                min="5"
                max="120"
              />
              <p className="text-xs text-muted-foreground">How often to check for SLA breaches and send reminders</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Business Hours
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="businessStart">Business Hours Start</Label>
              <Input
                id="businessStart"
                type="time"
                value={config.businessHoursStart}
                onChange={(e) => handleConfigChange("businessHoursStart", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessEnd">Business Hours End</Label>
              <Input
                id="businessEnd"
                type="time"
                value={config.businessHoursEnd}
                onChange={(e) => handleConfigChange("businessHoursEnd", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Weekend Processing</Label>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-muted-foreground">Process cases on weekends</span>
                <Badge
                  className={
                    config.weekendProcessing
                      ? "bg-green-500/10 text-green-500 border-green-500/20"
                      : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                  }
                >
                  {config.weekendProcessing ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Settings Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Current Configuration Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Max Daily Cases:</span>
              <span className="ml-2 text-muted-foreground">{config.maxDailyNewPerUser} per user</span>
            </div>
            <div>
              <span className="font-medium">SLA Cutoff:</span>
              <span className="ml-2 text-muted-foreground">
                {config.slaCutoffLocal} {config.slaTzId.split("/")[1]}
              </span>
            </div>
            <div>
              <span className="font-medium">Reminder Interval:</span>
              <span className="ml-2 text-muted-foreground">{config.slaReminderInterval} minutes</span>
            </div>
            <div>
              <span className="font-medium">Business Hours:</span>
              <span className="ml-2 text-muted-foreground">
                {config.businessHoursStart} - {config.businessHoursEnd}
              </span>
            </div>
            <div>
              <span className="font-medium">Auto Assignment:</span>
              <span className="ml-2 text-muted-foreground">{config.autoAssignmentEnabled ? "On" : "Off"}</span>
            </div>
            <div>
              <span className="font-medium">Weekend Processing:</span>
              <span className="ml-2 text-muted-foreground">{config.weekendProcessing ? "On" : "Off"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

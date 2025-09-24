import { Sidebar } from "@/components/sidebar"
import { ReportsManager } from "@/components/reports-manager"

export default function ReportsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <ReportsManager />
      </main>
    </div>
  )
}

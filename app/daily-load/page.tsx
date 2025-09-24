import { Sidebar } from "@/components/sidebar"
import { DailyLoadManager } from "@/components/daily-load-manager"

export default function DailyLoadPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <DailyLoadManager />
      </main>
    </div>
  )
}

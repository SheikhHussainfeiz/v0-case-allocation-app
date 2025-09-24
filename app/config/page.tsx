import { Sidebar } from "@/components/sidebar"
import { ConfigManager } from "@/components/config-manager"

export default function ConfigPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <ConfigManager />
      </main>
    </div>
  )
}

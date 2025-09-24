import { Sidebar } from "@/components/sidebar"
import { CasesManager } from "@/components/cases-manager"

export default function CasesPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <CasesManager />
      </main>
    </div>
  )
}

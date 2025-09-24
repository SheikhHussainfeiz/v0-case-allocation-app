import { Sidebar } from "@/components/sidebar"
import { UserManager } from "@/components/user-manager"

export default function UsersPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <UserManager />
      </main>
    </div>
  )
}

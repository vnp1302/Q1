import type React from "react"
import { DashboardSidebar } from "./components/DashboardSidebar"
import { DashboardHeader } from "./components/DashboardHeader"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background-default">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Home,
  Wallet,
  TrendingUp,
  ArrowLeftRight,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react"

const sidebarItems = [
  {
    title: "نمای کلی",
    href: "/dashboard/overview",
    icon: <Home className="w-5 h-5" />,
  },
  {
    title: "کیف پول",
    href: "/dashboard/wallet",
    icon: <Wallet className="w-5 h-5" />,
  },
  {
    title: "استیکینگ",
    href: "/dashboard/staking",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    title: "پل بین زنجیره‌ها",
    href: "/dashboard/bridge",
    icon: <ArrowLeftRight className="w-5 h-5" />,
  },
  {
    title: "تحلیل و گزارش",
    href: "/dashboard/analytics",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    title: "تنظیمات",
    href: "/dashboard/settings",
    icon: <Settings className="w-5 h-5" />,
  },
  {
    title: "راهنما",
    href: "/dashboard/help",
    icon: <HelpCircle className="w-5 h-5" />,
  },
]

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 right-0 h-screen bg-background-paper border-l border-neutral-light z-40
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-16" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-neutral-light">
            <Link href="/dashboard" className="flex items-center space-x-3 space-x-reverse">
              <div className="w-8 h-8 bg-gradient-primary rounded-medium flex items-center justify-center">
                <span className="text-text-inverted font-bold">Q2</span>
              </div>
              {!isCollapsed && <span className="text-xl font-bold text-primary-main">داشبورد</span>}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center space-x-3 space-x-reverse p-3 rounded-medium transition-colors duration-200
                        ${
                          isActive
                            ? "bg-primary-main text-text-inverted"
                            : "text-text-secondary hover:bg-primary-main/10 hover:text-primary-main"
                        }
                      `}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {item.icon}
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Collapse Button */}
          <div className="p-4 border-t border-neutral-light hidden lg:block">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full justify-center"
            >
              <ChevronLeft className={`w-4 h-4 transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}

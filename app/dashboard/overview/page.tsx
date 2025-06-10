"use client"
import { Card, CardContent } from "@/components/ui/card"
import { QuickActions } from "../components/QuickActions"
import { ActivityFeed } from "../components/ActivityFeed"
import { BalanceWidget } from "../components/BalanceWidget"
import { TrendingUp, TrendingDown } from "lucide-react"


const portfolioData = [
  {
    title: "موجودی کل",
    value: "12,450.75 Q2T",
    change: "+5.2%",
    trend: "up",
    description: "نسبت به هفته گذشته",
  },
  {
    title: "سود استیکینگ",
    value: "1,245.30 Q2T",
    change: "+12.8%",
    trend: "up",
    description: "سود ماهانه",
  },
  {
    title: "ارزش پرتفوی",
    value: "$45,230.50",
    change: "-2.1%",
    trend: "down",
    description: "معادل دلار",
  },
  {
    title: "تراکنش‌های امروز",
    value: "8",
    change: "+3",
    trend: "up",
    description: "تراکنش موفق",
  },
]

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-primary text-text-inverted rounded-large p-8">
        <h1 className="text-3xl font-bold mb-2">خوش آمدید، علی احمدی!</h1>
        <p className="text-neutral-light">مدیریت دارایی‌های دیجیتال خود را از اینجا شروع کنید</p>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolioData.map((item, index) => (
          <Card key={index} className="hover:shadow-medium transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-text-secondary">{item.title}</h3>
                <div
                  className={`flex items-center space-x-1 space-x-reverse ${
                    item.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="text-sm font-medium">{item.change}</span>
                </div>
              </div>
              <div className="mb-1">
                <span className="text-2xl font-bold text-primary-main">{item.value}</span>
              </div>
              <p className="text-xs text-neutral-main">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Balance Widget */}
        <div className="lg:col-span-2">
          <BalanceWidget />
        </div>

        {/* Quick Actions */}
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Activity Feed */}
      <ActivityFeed />
    </div>
  )
}

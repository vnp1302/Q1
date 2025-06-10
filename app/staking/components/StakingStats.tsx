"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TrendingUp, Users, Coins, Activity, DollarSign, Clock } from "lucide-react"

interface StakingStat {
  icon: React.ReactNode
  label: string
  value: string
  change: string
  trend: "up" | "down"
  description: string
}

export function StakingStats() {
  const [stats, setStats] = useState<StakingStat[]>([
    {
      icon: <Coins className="w-6 h-6" />,
      label: "کل Q2T استیک شده",
      value: "45.2M",
      change: "+2.1%",
      trend: "up",
      description: "از کل عرضه",
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: "تعداد Staker ها",
      value: "12,450",
      change: "+5.8%",
      trend: "up",
      description: "کاربر فعال",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: "میانگین APR",
      value: "12.5%",
      change: "+0.3%",
      trend: "up",
      description: "بازدهی سالانه",
    },
    {
      icon: <Activity className="w-6 h-6" />,
      label: "Validator های فعال",
      value: "156",
      change: "+4",
      trend: "up",
      description: "validator معتبر",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      label: "پاداش پرداختی",
      value: "$2.1M",
      change: "+15.2%",
      trend: "up",
      description: "در ماه گذشته",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "زمان Unbonding",
      value: "21 روز",
      change: "0",
      trend: "up",
      description: "دوره انتظار",
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) =>
        prevStats.map((stat) => ({
          ...stat,
          // Simulate small changes in values
          value: stat.label === "کل Q2T استیک شده" ? `${(45.2 + Math.random() * 0.1).toFixed(1)}M` : stat.value,
        })),
      )
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="section-padding bg-background-default" role="region" aria-labelledby="stats-title">
      <div className="container-max px-4">
        <div className="text-center mb-16">
          <h2 id="stats-title" className="text-h2 text-primary-main mb-4">
            آمار استیکینگ در زمان واقعی
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">اطلاعات به‌روز از وضعیت استیکینگ در شبکه Q2</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-medium transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-primary-main/10 rounded-medium text-primary-main">{stat.icon}</div>
                  <div
                    className={`text-sm font-medium flex items-center ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <TrendingUp className={`w-3 h-3 ml-1 ${stat.trend === "down" ? "rotate-180" : ""}`} />
                    {stat.change}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary-main">{stat.value}</div>
                  <div className="font-medium text-text-primary">{stat.label}</div>
                  <div className="text-sm text-text-secondary">{stat.description}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Network Health Indicator */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-center space-x-3 space-x-reverse">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-800 font-medium">شبکه سالم و فعال</span>
              </div>
              <p className="text-green-700 text-sm mt-2">تمام سیستم‌های استیکینگ به درستی کار می‌کنند</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

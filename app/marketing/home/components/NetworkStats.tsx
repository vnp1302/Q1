"use client"
import { useState } from "react"
import type React from "react"

import { TrendingUp, Users, Shield, Clock, DollarSign, Activity } from "lucide-react"

interface StatItem {
  icon: React.ReactNode
  value: string
  label: string
  trend: string
  color: string
}

export function NetworkStats() {
  const [stats, setStats] = useState<StatItem[]>([
    {
      icon: <Shield className="w-8 h-8" />,
      value: "99.9%",
      label: "آپتایم سرویس",
      trend: "+0.1%",
      color: "text-green-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: "150K+",
      label: "کاربر فعال",
      trend: "+15%",
      color: "text-blue-600",
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      value: "$2.5B",
      label: "حجم تراکنش",
      trend: "+25%",
      color: "text-purple-600",
    },
    {
      icon: <Activity className="w-8 h-8" />,
      value: "1.2M",
      label: "تراکنش روزانه",
      trend: "+8%",
      color: "text-orange-600",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: "2.1s",
      label: "زمان تایید",
      trend: "-0.3s",
      color: "text-teal-600",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: "45+",
      label: "زنجیره پشتیبانی",
      trend: "+5",
      color: "text-indigo-600",
    },
  ])

  return (
    <section className="section-padding bg-background-default" role="region" aria-labelledby="network-stats">
      <div className="container-max px-4">
        <div className="text-center mb-16">
          <h2 id="network-stats" className="text-h2 text-primary-main mb-4">
            آمار شبکه در زمان واقعی
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            اعداد و ارقامی که نشان‌دهنده قدرت و اعتماد کاربران به پلتفرم Q2 است
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Real-time indicator */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-green-50 text-green-700 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">به‌روزرسانی زنده</span>
          </div>
        </div>
      </div>
    </section>
  )
}

interface StatCardProps {
  stat: StatItem
  index: number
}

function StatCard({ stat, index }: StatCardProps) {
  return (
    <div className="card group hover:shadow-high transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-large ${stat.color} bg-opacity-10`}>
          <div className={stat.color}>{stat.icon}</div>
        </div>
        <div className={`text-sm font-medium ${stat.color} flex items-center`}>
          <TrendingUp className="w-4 h-4 ml-1" />
          {stat.trend}
        </div>
      </div>

      <div className="mb-2">
        <span className="text-3xl font-bold text-primary-main">{stat.value}</span>
      </div>

      <p className="text-text-secondary font-medium">{stat.label}</p>
    </div>
  )
}

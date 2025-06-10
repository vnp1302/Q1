"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Percent, Activity, Target } from "lucide-react"

interface MetricCard {
  title: string
  value: string
  change: number
  changeLabel: string
  icon: React.ReactNode
  trend: "up" | "down" | "neutral"
}

export function PerformanceMetrics() {
  // Mock data - در پیاده‌سازی واقعی از API دریافت می‌شود
  const metrics: MetricCard[] = [
    {
      title: "ارزش کل پرتفوی",
      value: "$11,800",
      change: 18.0,
      changeLabel: "از ماه گذشته",
      icon: <DollarSign className="h-4 w-4" />,
      trend: "up",
    },
    {
      title: "بازدهی کل",
      value: "24.5%",
      change: 5.2,
      changeLabel: "از هفته گذشته",
      icon: <Percent className="h-4 w-4" />,
      trend: "up",
    },
    {
      title: "فعالیت روزانه",
      value: "8 تراکنش",
      change: -12.0,
      changeLabel: "از دیروز",
      icon: <Activity className="h-4 w-4" />,
      trend: "down",
    },
    {
      title: "هدف ماهانه",
      value: "78%",
      change: 8.1,
      changeLabel: "پیشرفت",
      icon: <Target className="h-4 w-4" />,
      trend: "up",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <div className="text-muted-foreground">{metric.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge
                variant={metric.trend === "up" ? "default" : metric.trend === "down" ? "destructive" : "secondary"}
                className="flex items-center gap-1"
              >
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : metric.trend === "down" ? (
                  <TrendingDown className="h-3 w-3" />
                ) : null}
                {metric.change >= 0 ? "+" : ""}
                {metric.change}%
              </Badge>
              <span className="text-xs text-muted-foreground">{metric.changeLabel}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

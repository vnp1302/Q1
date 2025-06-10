"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react'

const metrics = [
  {
    title: "ارزش کل پورتفولیو",
    value: "$125,430.75",
    change: "+2.34%",
    changeValue: "+$2,876.50",
    isPositive: true,
    icon: <DollarSign className="w-5 h-5" />,
  },
  {
    title: "سود/زیان ۲۴ ساعته",
    value: "+$1,234.56",
    change: "+1.89%",
    changeValue: "از دیروز",
    isPositive: true,
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    title: "بهترین دارایی",
    value: "Q2 Token",
    change: "+5.67%",
    changeValue: "+$3,456.78",
    isPositive: true,
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    title: "بازدهی کل",
    value: "+23.45%",
    change: "از ابتدای سال",
    changeValue: "+$24,567.89",
    isPositive: true,
    icon: <Percent className="w-5 h-5" />,
  },
]

export function PerformanceMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">
              {metric.title}
            </CardTitle>
            <div className="text-primary-main">{metric.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">{metric.value}</div>
            <div className="flex items-center space-x-2 space-x-reverse mt-2">
              {metric.isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-sm ${metric.isPositive ? "text-green-600" : "text-red-600"}`}>
                {metric.change}
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-1">{metric.changeValue}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

interface ChartData {
  date: string
  value: number
  change: number
}

export function PortfolioChart() {
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "3M" | "1Y">("1M")

  // Mock data - در پیاده‌سازی واقعی از API دریافت می‌شود
  const chartData: ChartData[] = [
    { date: "2024-01-01", value: 10000, change: 0 },
    { date: "2024-01-02", value: 10250, change: 2.5 },
    { date: "2024-01-03", value: 9800, change: -4.4 },
    { date: "2024-01-04", value: 11200, change: 14.3 },
    { date: "2024-01-05", value: 11800, change: 5.4 },
  ]

  const currentValue = 11800
  const totalChange = 18.0
  const totalChangeAmount = 1800

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>نمودار پرتفوی</CardTitle>
          <div className="flex gap-1">
            {(["1D", "1W", "1M", "3M", "1Y"] as const).map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe(period)}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* مقدار فعلی */}
          <div className="space-y-2">
            <div className="text-3xl font-bold">${currentValue.toLocaleString("en-US")}</div>
            <div className="flex items-center gap-2">
              <Badge variant={totalChange >= 0 ? "default" : "destructive"} className="flex items-center gap-1">
                {totalChange >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {totalChange >= 0 ? "+" : ""}
                {totalChange}%
              </Badge>
              <span className={`text-sm ${totalChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                {totalChange >= 0 ? "+" : ""}${totalChangeAmount.toLocaleString("en-US")}
              </span>
              <span className="text-sm text-muted-foreground">
                در{" "}
                {timeframe === "1D"
                  ? "روز گذشته"
                  : timeframe === "1W"
                    ? "هفته گذشته"
                    : timeframe === "1M"
                      ? "ماه گذشته"
                      : timeframe === "3M"
                        ? "3 ماه گذشته"
                        : "سال گذشته"}
              </span>
            </div>
          </div>

          {/* نمودار ساده */}
          <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="text-muted-foreground">نمودار پرتفوی</div>
              <div className="text-sm text-muted-foreground">نمودار تعاملی در نسخه کامل پیاده‌سازی خواهد شد</div>
            </div>
          </div>

          {/* آمار سریع */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">بالاترین مقدار</div>
              <div className="font-medium">$12,450</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">پایین‌ترین مقدار</div>
              <div className="font-medium">$9,200</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">میانگین</div>
              <div className="font-medium">$10,825</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

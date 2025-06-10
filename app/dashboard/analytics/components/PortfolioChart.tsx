"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function PortfolioChart() {
  const [timeRange, setTimeRange] = useState("7d")

  // Mock data for demonstration
  const chartData = {
    "1d": [100, 102, 98, 105, 103, 108, 110],
    "7d": [100, 105, 102, 110, 108, 115, 120, 118],
    "30d": [100, 110, 105, 120, 115, 125, 130, 128, 135, 140],
    "1y": [100, 120, 110, 140, 130, 150, 160, 155, 170, 180, 175, 190],
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-primary-main">نمودار عملکرد پورتفولیو</CardTitle>
            <CardDescription>تغییرات ارزش کل دارایی‌های شما</CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">۱ روز</SelectItem>
              <SelectItem value="7d">۷ روز</SelectItem>
              <SelectItem value="30d">۳۰ روز</SelectItem>
              <SelectItem value="1y">۱ سال</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 flex items-center justify-center bg-gray-50 rounded-medium">
          <div className="text-center text-text-secondary">
            <div className="text-4xl mb-4">📊</div>
            <p>نمودار عملکرد پورتفولیو</p>
            <p className="text-sm mt-2">بازه زمانی: {timeRange}</p>
            <p className="text-xs mt-1">
              (در پیاده‌سازی واقعی، از کتابخانه‌هایی مانند Chart.js یا Recharts استفاده می‌شود)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioChart } from "./components/PortfolioChart"
import { PerformanceMetrics } from "./components/PerformanceMetrics"
import { AssetAllocation } from "./components/AssetAllocation"
import { TradingHistory } from "./components/TradingHistory"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-main">تحلیل و گزارش</h1>
        <p className="text-text-secondary">تحلیل عملکرد پورتفولیو و دارایی‌های شما</p>
      </div>

      <PerformanceMetrics />

      <Tabs defaultValue="portfolio" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="portfolio">نمودار پورتفولیو</TabsTrigger>
          <TabsTrigger value="allocation">تخصیص دارایی</TabsTrigger>
          <TabsTrigger value="history">تاریخچه معاملات</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio">
          <PortfolioChart />
        </TabsContent>

        <TabsContent value="allocation">
          <AssetAllocation />
        </TabsContent>

        <TabsContent value="history">
          <TradingHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}

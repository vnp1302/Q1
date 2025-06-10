import type { Metadata } from "next"
import { Suspense } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioChart } from "./components/PortfolioChart"
import { PerformanceMetrics } from "./components/PerformanceMetrics"
import { AssetAllocation } from "./components/AssetAllocation"
import { TradingHistory } from "./components/TradingHistory"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "تحلیل و آمار | Q2 Token Platform",
  description: "مشاهده آمار و تحلیل پرتفوی خود",
}

function AnalyticsLoading() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24 mb-2" />
              <Skeleton className="h-3 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">تحلیل و آمار</h1>
        <p className="text-muted-foreground">مشاهده عملکرد پرتفوی و آمار معاملات خود</p>
      </div>

      <Suspense fallback={<AnalyticsLoading />}>
        <div className="space-y-6">
          {/* متریک‌های کلیدی */}
          <PerformanceMetrics />

          {/* تب‌های اصلی */}
          <Tabs defaultValue="portfolio" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="portfolio">پرتفوی</TabsTrigger>
              <TabsTrigger value="allocation">تخصیص دارایی</TabsTrigger>
              <TabsTrigger value="history">تاریخچه معاملات</TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio" className="space-y-4">
              <PortfolioChart />
            </TabsContent>

            <TabsContent value="allocation" className="space-y-4">
              <AssetAllocation />
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <TradingHistory />
            </TabsContent>
          </Tabs>
        </div>
      </Suspense>
    </div>
  )
}

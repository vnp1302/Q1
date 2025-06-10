"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Wallet, TrendingUp, TrendingDown, Eye, EyeOff, RefreshCw, PieChart } from "lucide-react"
import { useApi } from "@/src/hooks/useApi"

interface WalletData {
  totalBalance: number
  totalBalanceUSD: number
  change24h: number
  change24hPercent: number
  portfolioAllocation: Array<{
    symbol: string
    name: string
    balance: number
    valueUSD: number
    percentage: number
    color: string
  }>
}

export function WalletOverview() {
  const [showBalance, setShowBalance] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const { data: walletData, loading, error, refetch } = useApi<WalletData>("/api/wallet/overview")

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refetch()
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  if (loading) {
    return <WalletOverviewSkeleton />
  }

  if (error || !walletData) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">خطا در بارگذاری اطلاعات کیف پول</div>
        </CardContent>
      </Card>
    )
  }

  const isPositiveChange = walletData.change24h >= 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          مجموع دارایی‌ها
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setShowBalance(!showBalance)}>
            {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* مجموع موجودی */}
          <div>
            <div className="text-2xl font-bold">
              {showBalance ? (
                <>
                  {walletData.totalBalance.toLocaleString("fa-IR")} Q2
                  <div className="text-sm text-muted-foreground mt-1">
                    ${walletData.totalBalanceUSD.toLocaleString("en-US")}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-32 h-6 bg-muted rounded animate-pulse" />
                  <div className="w-20 h-4 bg-muted rounded animate-pulse" />
                </div>
              )}
            </div>

            {/* تغییرات 24 ساعته */}
            <div className="flex items-center gap-2 mt-2">
              {isPositiveChange ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <Badge
                variant={isPositiveChange ? "default" : "destructive"}
                className={isPositiveChange ? "bg-green-100 text-green-800" : ""}
              >
                {isPositiveChange ? "+" : ""}
                {walletData.change24hPercent.toFixed(2)}%
              </Badge>
              <span className="text-sm text-muted-foreground">
                ({isPositiveChange ? "+" : ""}${walletData.change24h.toFixed(2)})
              </span>
            </div>
          </div>

          {/* تخصیص پورتفولیو */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              <span className="text-sm font-medium">تخصیص پورتفولیو</span>
            </div>

            <div className="space-y-2">
              {walletData.portfolioAllocation.map((asset, index) => (
                <div key={asset.symbol} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }} />
                      <span>{asset.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {asset.symbol}
                      </Badge>
                    </div>
                    <div className="text-left">
                      <div className="font-medium">
                        {showBalance ? `${asset.balance.toLocaleString("fa-IR")}` : "***"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {showBalance ? `$${asset.valueUSD.toLocaleString("en-US")}` : "***"}
                      </div>
                    </div>
                  </div>
                  <Progress
                    value={asset.percentage}
                    className="h-2"
                    style={
                      {
                        "--progress-background": asset.color,
                      } as React.CSSProperties
                    }
                  />
                  <div className="text-xs text-muted-foreground text-left">{asset.percentage.toFixed(1)}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function WalletOverviewSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          <span className="text-sm font-medium">مجموع دارایی‌ها</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-muted rounded animate-pulse" />
          <div className="w-8 h-8 bg-muted rounded animate-pulse" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="w-48 h-8 bg-muted rounded animate-pulse" />
            <div className="w-32 h-4 bg-muted rounded animate-pulse mt-2" />
            <div className="flex items-center gap-2 mt-2">
              <div className="w-16 h-6 bg-muted rounded animate-pulse" />
              <div className="w-20 h-4 bg-muted rounded animate-pulse" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="w-32 h-4 bg-muted rounded animate-pulse" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-muted rounded-full animate-pulse" />
                    <div className="w-16 h-4 bg-muted rounded animate-pulse" />
                    <div className="w-12 h-4 bg-muted rounded animate-pulse" />
                  </div>
                  <div className="w-20 h-4 bg-muted rounded animate-pulse" />
                </div>
                <div className="w-full h-2 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

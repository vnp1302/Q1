"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, TrendingUp, TrendingDown, RefreshCw } from "lucide-react"

interface TokenBalance {
  symbol: string
  name: string
  balance: string
  value: string
  change: string
  trend: "up" | "down"
  logo: string
}

const tokenBalances: TokenBalance[] = [
  {
    symbol: "Q2T",
    name: "Q2 Token",
    balance: "12,450.75",
    value: "$42,577.56",
    change: "+5.2%",
    trend: "up",
    logo: "/placeholder.svg?height=32&width=32",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: "2.45",
    value: "$4,890.00",
    change: "-1.8%",
    trend: "down",
    logo: "/placeholder.svg?height=32&width=32",
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    balance: "1,250.00",
    value: "$1,250.00",
    change: "0.0%",
    trend: "up",
    logo: "/placeholder.svg?height=32&width=32",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    balance: "0.125",
    value: "$5,375.00",
    change: "+3.4%",
    trend: "up",
    logo: "/placeholder.svg?height=32&width=32",
  },
]

export function BalanceWidget() {
  const [showBalances, setShowBalances] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const totalValue = tokenBalances.reduce((sum, token) => {
    return sum + Number.parseFloat(token.value.replace(/[$,]/g, ""))
  }, 0)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-primary-main">موجودی کیف پول</CardTitle>
            <CardDescription>مجموع دارایی‌های شما در زنجیره‌های مختلف</CardDescription>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Button variant="outline" size="sm" onClick={() => setShowBalances(!showBalances)} className="p-2">
              {showBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing} className="p-2">
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Total Value */}
        <div className="mb-6 p-4 bg-gradient-primary text-text-inverted rounded-large">
          <div className="text-sm text-neutral-light mb-1">کل ارزش پرتفوی</div>
          <div className="text-3xl font-bold">{showBalances ? `$${totalValue.toLocaleString()}` : "••••••"}</div>
          <div className="flex items-center mt-2 text-green-300">
            <TrendingUp className="w-4 h-4 ml-1" />
            <span className="text-sm">+8.5% این هفته</span>
          </div>
        </div>

        {/* Token List */}
        <div className="space-y-4">
          {tokenBalances.map((token, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border border-neutral-light rounded-medium hover:bg-background-default transition-colors duration-200"
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <img
                  src={token.logo || "/placeholder.svg"}
                  alt={`${token.name} logo`}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="font-medium text-text-primary">{token.symbol}</div>
                  <div className="text-sm text-text-secondary">{token.name}</div>
                </div>
              </div>

              <div className="text-left">
                <div className="font-semibold text-text-primary">
                  {showBalances ? token.balance : "••••••"} {token.symbol}
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-sm text-text-secondary">{showBalances ? token.value : "••••••"}</span>
                  <span
                    className={`text-sm flex items-center ${token.trend === "up" ? "text-green-600" : "text-red-600"}`}
                  >
                    {token.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 ml-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 ml-1" />
                    )}
                    {token.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <Button className="flex-1 btn-primary">افزودن دارایی</Button>
          <Button variant="outline" className="flex-1">
            تاریخچه تراکنش‌ها
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

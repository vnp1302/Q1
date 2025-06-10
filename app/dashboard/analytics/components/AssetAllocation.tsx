"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Asset {
  id: string
  name: string
  symbol: string
  allocation: number
  value: number
  change24h: number
  logo?: string
}

export function AssetAllocation() {
  // Mock data - در پیاده‌سازی واقعی از API دریافت می‌شود
  const assets: Asset[] = [
    {
      id: "1",
      name: "Q2 Token",
      symbol: "Q2",
      allocation: 45,
      value: 5310,
      change24h: 12.5,
      logo: "/tokens/q2.png",
    },
    {
      id: "2",
      name: "Ethereum",
      symbol: "ETH",
      allocation: 30,
      value: 3540,
      change24h: -2.1,
      logo: "/tokens/eth.png",
    },
    {
      id: "3",
      name: "Tether USD",
      symbol: "USDT",
      allocation: 15,
      value: 1770,
      change24h: 0.1,
      logo: "/tokens/usdt.png",
    },
    {
      id: "4",
      name: "Bitcoin",
      symbol: "BTC",
      allocation: 10,
      value: 1180,
      change24h: 8.3,
      logo: "/tokens/btc.png",
    },
  ]

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* نمودار دایره‌ای */}
      <Card>
        <CardHeader>
          <CardTitle>تخصیص دارایی</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* نمودار ساده */}
            <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="text-muted-foreground">نمودار دایره‌ای</div>
                <div className="text-sm text-muted-foreground">نمودار تعاملی در نسخه کامل</div>
              </div>
            </div>

            {/* لژاند */}
            <div className="space-y-2">
              {assets.map((asset) => (
                <div key={asset.id} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: `hsl(${asset.allocation * 8}, 70%, 50%)`,
                    }}
                  />
                  <span className="text-sm">{asset.symbol}</span>
                  <span className="text-sm text-muted-foreground mr-auto">{asset.allocation}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* جزئیات دارایی‌ها */}
      <Card>
        <CardHeader>
          <CardTitle>جزئیات دارایی‌ها</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assets.map((asset) => (
              <div key={asset.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={asset.logo || "/placeholder.svg"} alt={asset.name} />
                      <AvatarFallback>{asset.symbol.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{asset.symbol}</div>
                      <div className="text-sm text-muted-foreground">{asset.name}</div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-medium">${asset.value.toLocaleString("en-US")}</div>
                    <div className="flex items-center gap-1">
                      <Badge variant={asset.change24h >= 0 ? "default" : "destructive"} className="text-xs">
                        {asset.change24h >= 0 ? "+" : ""}
                        {asset.change24h}%
                      </Badge>
                    </div>
                  </div>
                </div>
                <Progress value={asset.allocation} className="h-2" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{asset.allocation}% از پرتفوی</span>
                  <span>${((asset.value / totalValue) * 100).toFixed(1)}% از کل</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

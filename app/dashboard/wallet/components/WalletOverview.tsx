"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Wallet, Eye, EyeOff } from 'lucide-react'
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function WalletOverview() {
  const [showBalance, setShowBalance] = useState(true)

  const totalBalance = 125430.75
  const change24h = 2.34
  const changePercent = 1.89

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-primary-main">موجودی کل</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="text-3xl font-bold text-text-primary">
                {showBalance ? `$${totalBalance.toLocaleString()}` : "••••••"}
              </div>
              <div className="flex items-center space-x-2 space-x-reverse mt-2">
                {changePercent >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <span className={`text-sm ${changePercent >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {showBalance ? `${changePercent >= 0 ? "+" : ""}${changePercent}%` : "••••"}
                </span>
                <span className="text-text-secondary text-sm">
                  ({showBalance ? `${change24h >= 0 ? "+" : ""}$${change24h}` : "••••"} در ۲۴ ساعت گذشته)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary-main flex items-center space-x-2 space-x-reverse">
            <Wallet className="w-5 h-5" />
            <span>آدرس کیف پول</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-medium">
              <div className="text-xs text-text-secondary mb-1">Q2 Network</div>
              <div className="font-mono text-sm break-all">q2x1abc...def123</div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              کپی آدرس
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

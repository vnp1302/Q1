"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Send, ArrowDownToLine } from 'lucide-react'

interface Token {
  id: string
  symbol: string
  name: string
  balance: number
  value: number
  change24h: number
  icon: string
}

const tokens: Token[] = [
  {
    id: "q2",
    symbol: "Q2",
    name: "Q2 Token",
    balance: 15420.5,
    value: 92530.75,
    change24h: 2.34,
    icon: "🔷",
  },
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    balance: 8.75,
    value: 21875.0,
    change24h: -1.23,
    icon: "⟠",
  },
  {
    id: "usdt",
    symbol: "USDT",
    name: "Tether USD",
    balance: 5000.0,
    value: 5000.0,
    change24h: 0.01,
    icon: "₮",
  },
  {
    id: "bnb",
    symbol: "BNB",
    name: "BNB",
    balance: 12.3,
    value: 6025.25,
    change24h: 3.45,
    icon: "🟡",
  },
]

export function TokenList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary-main">لیست توکن‌ها</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tokens.map((token) => (
            <div
              key={token.id}
              className="flex items-center justify-between p-4 border border-neutral-light rounded-medium hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-primary-main/10 rounded-full flex items-center justify-center text-2xl">
                  {token.icon}
                </div>
                <div>
                  <div className="font-semibold text-text-primary">{token.symbol}</div>
                  <div className="text-sm text-text-secondary">{token.name}</div>
                </div>
              </div>

              <div className="text-center">
                <div className="font-semibold text-text-primary">
                  {token.balance.toLocaleString()} {token.symbol}
                </div>
                <div className="text-sm text-text-secondary">
                  ${token.value.toLocaleString()}
                </div>
              </div>

              <div className="text-center">
                <div className={`flex items-center space-x-1 space-x-reverse ${
                  token.change24h >= 0 ? "text-green-600" : "text-red-600"
                }`}>
                  {token.change24h >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="text-sm">
                    {token.change24h >= 0 ? "+" : ""}{token.change24h}%
                  </span>
                </div>
              </div>

              <div className="flex space-x-2 space-x-reverse">
                <Button size="sm" variant="outline">
                  <Send className="w-4 h-4 ml-1" />
                  ارسال
                </Button>
                <Button size="sm" variant="outline">
                  <ArrowDownToLine className="w-4 h-4 ml-1" />
                  دریافت
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

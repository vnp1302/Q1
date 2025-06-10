"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from 'lucide-react'

interface Trade {
  id: string
  type: "buy" | "sell"
  pair: string
  amount: number
  price: number
  total: number
  profit?: number
  timestamp: string
  status: "completed" | "pending"
}

const trades: Trade[] = [
  {
    id: "1",
    type: "buy",
    pair: "Q2/USDT",
    amount: 1000,
    price: 6.0,
    total: 6000,
    timestamp: "2024-01-15T10:30:00Z",
    status: "completed",
  },
  {
    id: "2",
    type: "sell",
    pair: "ETH/USDT",
    amount: 0.5,
    price: 2500,
    total: 1250,
    profit: 125,
    timestamp: "2024-01-14T15:45:00Z",
    status: "completed",
  },
  {
    id: "3",
    type: "buy",
    pair: "BNB/USDT",
    amount: 10,
    price: 490,
    total: 4900,
    timestamp: "2024-01-13T09:15:00Z",
    status: "pending",
  },
]

export function TradingHistory() {
  const getTypeColor = (type: string) => {
    return type === "buy" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const getTypeLabel = (type: string) => {
    return type === "buy" ? "خرید" : "فروش"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary-main">تاریخچه معاملات</CardTitle>
        <CardDescription>آخرین معاملات انجام شده</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trades.map((trade) => (
            <div
              key={trade.id}
              className="flex items-center justify-between p-4 border border-neutral-light rounded-medium hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  {trade.type === "buy" ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <div className="font-semibold text-text-primary">{trade.pair}</div>
                  <div className="text-sm text-text-secondary">
                    {new Date(trade.timestamp).toLocaleDateString("fa-IR")} - {new Date(trade.timestamp).toLocaleTimeString("fa-IR")}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Badge className={getTypeColor(trade.type)}>
                  {getTypeLabel(trade.type)}
                </Badge>
                <div className="text-sm text-text-secondary mt-1">
                  {trade.amount} @ ${trade.price}
                </div>
              </div>

              <div className="text-center">
                <div className="font-semibold text-text-primary">
                  ${trade.total.toLocaleString()}
                </div>
                {trade.profit && (
                  <div className={`text-sm ${trade.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {trade.profit >= 0 ? "+" : ""}${trade.profit}
                  </div>
                )}
              </div>

              <div className="text-center">
                <Badge className={trade.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                  {trade.status === "completed" ? "تکمیل شده" : "در انتظار"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

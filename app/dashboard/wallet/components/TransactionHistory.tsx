"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight, ExternalLink } from 'lucide-react'

interface Transaction {
  id: string
  type: "send" | "receive" | "swap"
  token: string
  amount: number
  value: number
  to?: string
  from?: string
  hash: string
  timestamp: string
  status: "completed" | "pending" | "failed"
}

const transactions: Transaction[] = [
  {
    id: "1",
    type: "receive",
    token: "Q2",
    amount: 1000,
    value: 6000,
    from: "q2x1xyz...abc789",
    hash: "0x1234...5678",
    timestamp: "2024-01-15T10:30:00Z",
    status: "completed",
  },
  {
    id: "2",
    type: "send",
    token: "ETH",
    amount: 0.5,
    value: 1250,
    to: "0xabc...def123",
    hash: "0x9876...5432",
    timestamp: "2024-01-14T15:45:00Z",
    status: "completed",
  },
  {
    id: "3",
    type: "swap",
    token: "USDT → Q2",
    amount: 500,
    value: 500,
    hash: "0xdef...abc456",
    timestamp: "2024-01-13T09:15:00Z",
    status: "pending",
  },
]

export function TransactionHistory() {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "send":
        return <ArrowUpRight className="w-4 h-4 text-red-600" />
      case "receive":
        return <ArrowDownLeft className="w-4 h-4 text-green-600" />
      case "swap":
        return <ArrowLeftRight className="w-4 h-4 text-blue-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "تکمیل شده"
      case "pending":
        return "در انتظار"
      case "failed":
        return "ناموفق"
      default:
        return "نامشخص"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "send":
        return "ارسال"
      case "receive":
        return "دریافت"
      case "swap":
        return "تبدیل"
      default:
        return type
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-primary-main">تاریخچه تراکنش‌ها</CardTitle>
          <Button variant="outline" size="sm">
            مشاهده همه
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 border border-neutral-light rounded-medium hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  {getTransactionIcon(tx.type)}
                </div>
                <div>
                  <div className="font-semibold text-text-primary">
                    {getTypeLabel(tx.type)} {tx.token}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {new Date(tx.timestamp).toLocaleDateString("fa-IR")} - {new Date(tx.timestamp).toLocaleTimeString("fa-IR")}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="font-semibold text-text-primary">
                  {tx.type === "send" ? "-" : tx.type === "receive" ? "+" : ""}{tx.amount} {tx.token.split(" ")[0]}
                </div>
                <div className="text-sm text-text-secondary">
                  ${tx.value.toLocaleString()}
                </div>
              </div>

              <div className="text-center">
                <Badge className={getStatusColor(tx.status)}>
                  {getStatusLabel(tx.status)}
                </Badge>
                <div className="text-xs text-text-secondary mt-1">
                  {tx.to && `به: ${tx.to.substring(0, 8)}...`}
                  {tx.from && `از: ${tx.from.substring(0, 8)}...`}
                </div>
              </div>

              <Button variant="ghost" size="icon">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ArrowUpDown, ExternalLink } from "lucide-react"

interface Transaction {
  id: string
  type: "buy" | "sell" | "transfer" | "stake"
  asset: {
    symbol: string
    name: string
    logo?: string
  }
  amount: number
  price: number
  total: number
  date: string
  status: "completed" | "pending" | "failed"
  txHash?: string
}

export function TradingHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"date" | "amount" | "total">("date")

  // Mock data - در پیاده‌سازی واقعی از API دریافت می‌شود
  const transactions: Transaction[] = [
    {
      id: "1",
      type: "buy",
      asset: { symbol: "Q2", name: "Q2 Token", logo: "/tokens/q2.png" },
      amount: 1000,
      price: 2.5,
      total: 2500,
      date: "2024-01-15T10:30:00Z",
      status: "completed",
      txHash: "0x1234...5678",
    },
    {
      id: "2",
      type: "sell",
      asset: { symbol: "ETH", name: "Ethereum", logo: "/tokens/eth.png" },
      amount: 0.5,
      price: 2400,
      total: 1200,
      date: "2024-01-14T15:45:00Z",
      status: "completed",
      txHash: "0x2345...6789",
    },
    {
      id: "3",
      type: "transfer",
      asset: { symbol: "USDT", name: "Tether USD", logo: "/tokens/usdt.png" },
      amount: 500,
      price: 1,
      total: 500,
      date: "2024-01-13T09:15:00Z",
      status: "pending",
    },
    {
      id: "4",
      type: "stake",
      asset: { symbol: "Q2", name: "Q2 Token", logo: "/tokens/q2.png" },
      amount: 2000,
      price: 2.3,
      total: 4600,
      date: "2024-01-12T14:20:00Z",
      status: "completed",
      txHash: "0x3456...7890",
    },
  ]

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "buy":
        return "خرید"
      case "sell":
        return "فروش"
      case "transfer":
        return "انتقال"
      case "stake":
        return "استیک"
      default:
        return type
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "buy":
        return "default"
      case "sell":
        return "destructive"
      case "transfer":
        return "secondary"
      case "stake":
        return "outline"
      default:
        return "secondary"
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
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "pending":
        return "secondary"
      case "failed":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>تاریخچه معاملات</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 ml-2" />
              فیلتر
            </Button>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="h-4 w-4 ml-2" />
              مرتب‌سازی
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* فیلترها */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="جستجو در تراکنش‌ها..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="نوع تراکنش" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه</SelectItem>
                <SelectItem value="buy">خرید</SelectItem>
                <SelectItem value="sell">فروش</SelectItem>
                <SelectItem value="transfer">انتقال</SelectItem>
                <SelectItem value="stake">استیک</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* لیست تراکنش‌ها */}
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={tx.asset.logo || "/placeholder.svg"} alt={tx.asset.name} />
                    <AvatarFallback>{tx.asset.symbol.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{tx.asset.symbol}</span>
                      <Badge variant={getTypeColor(tx.type) as any}>{getTypeLabel(tx.type)}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{formatDate(tx.date)}</div>
                  </div>
                </div>

                <div className="text-left">
                  <div className="font-medium">
                    {tx.amount.toLocaleString("fa-IR")} {tx.asset.symbol}
                  </div>
                  <div className="text-sm text-muted-foreground">${tx.total.toLocaleString("en-US")}</div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(tx.status) as any}>{getStatusLabel(tx.status)}</Badge>
                  {tx.txHash && (
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* صفحه‌بندی */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">نمایش 1-4 از 24 تراکنش</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                قبلی
              </Button>
              <Button variant="outline" size="sm">
                بعدی
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

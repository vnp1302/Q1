"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, ExternalLink, ArrowUpRight, ArrowDownLeft, RefreshCw } from "lucide-react"
import { useApi } from "@/src/hooks/useApi"

interface Transaction {
  id: string
  hash: string
  type: "send" | "receive" | "stake" | "unstake" | "bridge" | "swap"
  status: "pending" | "confirmed" | "failed"
  amount: number
  token: {
    symbol: string
    name: string
    logo: string
  }
  valueUSD: number
  fee: number
  feeUSD: number
  timestamp: string
  from?: string
  to?: string
  blockNumber?: number
  confirmations?: number
}

const TRANSACTION_TYPES = {
  send: { label: "ارسال", icon: ArrowUpRight, color: "text-red-500" },
  receive: { label: "دریافت", icon: ArrowDownLeft, color: "text-green-500" },
  stake: { label: "استیک", icon: RefreshCw, color: "text-blue-500" },
  unstake: { label: "آن‌استیک", icon: RefreshCw, color: "text-orange-500" },
  bridge: { label: "پل", icon: RefreshCw, color: "text-purple-500" },
  swap: { label: "تبدیل", icon: RefreshCw, color: "text-indigo-500" },
}

const STATUS_STYLES = {
  pending: { label: "در انتظار", variant: "secondary" as const },
  confirmed: { label: "تأیید شده", variant: "default" as const },
  failed: { label: "ناموفق", variant: "destructive" as const },
}

export function TransactionHistory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const { data: transactions, loading, error, refetch } = useApi<Transaction[]>("/api/wallet/transactions")

  const filteredTransactions =
    transactions?.filter((tx) => {
      const matchesSearch =
        tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.token.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = selectedType === "all" || tx.type === selectedType
      const matchesStatus = selectedStatus === "all" || tx.status === selectedStatus
      return matchesSearch && matchesType && matchesStatus
    }) || []

  const handleExportTransactions = () => {
    // Export functionality
    console.log("Exporting transactions...")
  }

  if (loading) {
    return <TransactionHistorySkeleton />
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">خطا در بارگذاری تاریخچه تراکنش‌ها</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">تاریخچه تراکنش‌ها</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExportTransactions}>
              <Download className="h-4 w-4 ml-2" />
              خروجی
            </Button>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="جستجو در تراکنش‌ها..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>

          <Tabs value={selectedType} onValueChange={setSelectedType} className="w-auto">
            <TabsList className="grid grid-cols-4 lg:grid-cols-7">
              <TabsTrigger value="all" className="text-xs">
                همه
              </TabsTrigger>
              <TabsTrigger value="send" className="text-xs">
                ارسال
              </TabsTrigger>
              <TabsTrigger value="receive" className="text-xs">
                دریافت
              </TabsTrigger>
              <TabsTrigger value="stake" className="text-xs">
                استیک
              </TabsTrigger>
              <TabsTrigger value="bridge" className="text-xs">
                پل
              </TabsTrigger>
              <TabsTrigger value="swap" className="text-xs">
                تبدیل
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {filteredTransactions.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              {searchQuery ? "تراکنشی یافت نشد" : "هیچ تراکنشی موجود نیست"}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredTransactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface TransactionItemProps {
  transaction: Transaction
}

function TransactionItem({ transaction }: TransactionItemProps) {
  const typeConfig = TRANSACTION_TYPES[transaction.type]
  const statusConfig = STATUS_STYLES[transaction.status]
  const TypeIcon = typeConfig.icon

  const formatDate = (timestamp: string) => {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(timestamp))
  }

  const handleViewOnExplorer = () => {
    window.open(`https://explorer.example.com/tx/${transaction.hash}`, "_blank")
  }

  return (
    <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b last:border-b-0">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full bg-muted ${typeConfig.color}`}>
          <TypeIcon className="h-4 w-4" />
        </div>

        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={transaction.token.logo || "/placeholder.svg"} alt={transaction.token.name} />
            <AvatarFallback>{transaction.token.symbol.slice(0, 2)}</AvatarFallback>
          </Avatar>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{typeConfig.label}</span>
              <Badge variant={statusConfig.variant} className="text-xs">
                {statusConfig.label}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">{formatDate(transaction.timestamp)}</div>
          </div>
        </div>
      </div>

      <div className="text-left">
        <div className="font-medium">
          <span className={transaction.type === "send" ? "text-red-500" : "text-green-500"}>
            {transaction.type === "send" ? "-" : "+"}
            {transaction.amount.toLocaleString("fa-IR")} {transaction.token.symbol}
          </span>
          <div className="text-sm text-muted-foreground">${transaction.valueUSD.toLocaleString("en-US")}</div>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground">
            کارمزد: {transaction.fee} ({transaction.feeUSD.toFixed(2)}$)
          </span>
          <Button variant="ghost" size="sm" onClick={handleViewOnExplorer} className="h-6 w-6 p-0">
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function TransactionHistorySkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="w-32 h-6 bg-muted rounded animate-pulse" />
          <div className="flex gap-2">
            <div className="w-16 h-8 bg-muted rounded animate-pulse" />
            <div className="w-8 h-8 bg-muted rounded animate-pulse" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 h-10 bg-muted rounded animate-pulse" />
          <div className="w-48 h-10 bg-muted rounded animate-pulse" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
                  <div className="space-y-1">
                    <div className="w-20 h-4 bg-muted rounded animate-pulse" />
                    <div className="w-24 h-3 bg-muted rounded animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="text-left space-y-1">
                <div className="w-24 h-4 bg-muted rounded animate-pulse" />
                <div className="w-16 h-3 bg-muted rounded animate-pulse" />
                <div className="w-20 h-3 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"
import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftRight, Clock, CheckCircle, XCircle, ExternalLink, Search } from "lucide-react"

interface Transaction {
  id: string
  fromChain: string
  toChain: string
  token: string
  amount: string
  status: "pending" | "completed" | "failed"
  timestamp: string
  txHash: string
  recipient: string
  fee: string
}

// Sample data - in a real app, this would come from an API
const transactions: Transaction[] = [
  {
    id: "tx-001",
    fromChain: "اتریوم",
    toChain: "پالیگان",
    token: "USDT",
    amount: "1000",
    status: "completed",
    timestamp: "۱۴۰۲/۰۳/۱۵ ۱۴:۳۰",
    txHash: "0x1234567890abcdef1234567890abcdef12345678",
    recipient: "0xabcdef1234567890abcdef1234567890abcdef12",
    fee: "0.5",
  },
  {
    id: "tx-002",
    fromChain: "بایننس اسمارت چین",
    toChain: "اتریوم",
    token: "Q2T",
    amount: "500",
    status: "pending",
    timestamp: "۱۴۰۲/۰۳/۱۵ ۱۵:۴۵",
    txHash: "0x2345678901abcdef2345678901abcdef23456789",
    recipient: "0xbcdef1234567890abcdef1234567890abcdef123",
    fee: "0.3",
  },
  {
    id: "tx-003",
    fromChain: "پالیگان",
    toChain: "آربیتروم",
    token: "USDC",
    amount: "750",
    status: "failed",
    timestamp: "۱۴۰۲/۰۳/۱۴ ۱۰:۲۰",
    txHash: "0x3456789012abcdef3456789012abcdef34567890",
    recipient: "0xcdef1234567890abcdef1234567890abcdef1234",
    fee: "0.4",
  },
  {
    id: "tx-004",
    fromChain: "اولنچ",
    toChain: "اپتیمیزم",
    token: "Q2T",
    amount: "250",
    status: "completed",
    timestamp: "۱۴۰۲/۰۳/۱۳ ۰۹:۱۵",
    txHash: "0x4567890123abcdef4567890123abcdef45678901",
    recipient: "0xdef1234567890abcdef1234567890abcdef12345",
    fee: "0.2",
  },
]

const statusFilters = [
  { key: "all", label: "همه" },
  { key: "pending", label: "در حال انجام" },
  { key: "completed", label: "تکمیل شده" },
  { key: "failed", label: "ناموفق" },
]

export function TransactionHistory() {
  const [activeStatus, setActiveStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTransactions = useMemo(() => {
    let filtered = transactions

    // Filter by status
    if (activeStatus !== "all") {
      filtered = filtered.filter((tx) => tx.status === activeStatus)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (tx) =>
          tx.id.toLowerCase().includes(query) ||
          tx.fromChain.toLowerCase().includes(query) ||
          tx.toChain.toLowerCase().includes(query) ||
          tx.token.toLowerCase().includes(query) ||
          tx.txHash.toLowerCase().includes(query) ||
          tx.recipient.toLowerCase().includes(query),
      )
    }

    return filtered
  }, [activeStatus, searchQuery])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "failed":
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "در حال انجام"
      case "completed":
        return "تکمیل شده"
      case "failed":
        return "ناموفق"
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <section className="section-padding bg-background-default" role="region" aria-labelledby="history-title">
      <div className="container-max px-4">
        <div className="text-center mb-16">
          <h2 id="history-title" className="text-h2 text-primary-main mb-4">
            تاریخچه تراکنش‌ها
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            تاریخچه تراکنش‌های انتقال بین زنجیره‌ای خود را مشاهده و پیگیری کنید
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div>
                <CardTitle className="text-primary-main">تراکنش‌های اخیر</CardTitle>
                <CardDescription>تاریخچه انتقال‌های بین زنجیره‌ای</CardDescription>
              </div>

              <div className="flex flex-wrap gap-2">
                {statusFilters.map((filter) => (
                  <Button
                    key={filter.key}
                    onClick={() => setActiveStatus(filter.key)}
                    variant={activeStatus === filter.key ? "default" : "outline"}
                    size="sm"
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="relative w-full mt-4">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-main w-5 h-5" />
              <input
                type="text"
                placeholder="جستجو در تراکنش‌ها..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-neutral-light rounded-medium focus:outline-none focus:ring-2 focus:ring-primary-light"
              />
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-light">
                    <th className="text-right py-3 px-4 font-semibold text-text-primary">شناسه</th>
                    <th className="text-right py-3 px-4 font-semibold text-text-primary">زنجیره‌ها</th>
                    <th className="text-right py-3 px-4 font-semibold text-text-primary">توکن</th>
                    <th className="text-right py-3 px-4 font-semibold text-text-primary">مقدار</th>
                    <th className="text-right py-3 px-4 font-semibold text-text-primary">وضعیت</th>
                    <th className="text-right py-3 px-4 font-semibold text-text-primary">زمان</th>
                    <th className="text-right py-3 px-4 font-semibold text-text-primary">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-neutral-light/50 hover:bg-background-paper/50">
                      <td className="py-3 px-4 text-sm">
                        <div className="font-mono">{tx.id}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <span>{tx.fromChain}</span>
                          <ArrowLeftRight className="w-4 h-4 mx-1 text-neutral-main" />
                          <span>{tx.toChain}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{tx.token}</td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{tx.amount}</div>
                        <div className="text-xs text-text-secondary">کارمزد: {tx.fee}</div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(tx.status)}>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            {getStatusIcon(tx.status)}
                            <span>{getStatusText(tx.status)}</span>
                          </div>
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-text-secondary">{tx.timestamp}</td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="مشاهده جزئیات">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredTransactions.length === 0 && (
              <div className="text-center py-12 text-text-secondary">
                <p>هیچ تراکنشی با معیارهای جستجوی شما یافت نشد.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

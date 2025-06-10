"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, Clock } from "lucide-react"

interface Activity {
  id: string
  type: "send" | "receive" | "stake" | "unstake" | "swap"
  amount: string
  description: string
  time: string
  status: "completed" | "pending" | "failed"
  hash?: string
}

const activities: Activity[] = [
  {
    id: "1",
    type: "receive",
    amount: "+500.00 Q2T",
    description: "دریافت از کیف پول 0x1234...5678",
    time: "۲ ساعت پیش",
    status: "completed",
    hash: "0xabcd1234...",
  },
  {
    id: "2",
    type: "send",
    amount: "-150.50 Q2T",
    description: "ارسال به کیف پول 0x9876...5432",
    time: "۵ ساعت پیش",
    status: "completed",
    hash: "0xefgh5678...",
  },
  {
    id: "3",
    type: "stake",
    amount: "+25.75 Q2T",
    description: "پاداش استیکینگ از validator-01",
    time: "۱ روز پیش",
    status: "completed",
  },
  {
    id: "4",
    type: "swap",
    amount: "100 USDT → 95.5 Q2T",
    description: "تبدیل در صرافی داخلی",
    time: "۲ روز پیش",
    status: "completed",
  },
  {
    id: "5",
    type: "send",
    amount: "-75.00 Q2T",
    description: "ارسال به کیف پول 0x1111...2222",
    time: "۳ روز پیش",
    status: "pending",
  },
]

export function ActivityFeed() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "receive":
        return <ArrowDownRight className="w-5 h-5 text-green-600" />
      case "send":
        return <ArrowUpRight className="w-5 h-5 text-red-600" />
      case "stake":
      case "unstake":
        return <TrendingUp className="w-5 h-5 text-blue-600" />
      case "swap":
        return <Wallet className="w-5 h-5 text-purple-600" />
      default:
        return <Wallet className="w-5 h-5 text-neutral-main" />
    }
  }

  const getAmountColor = (amount: string) => {
    if (amount.startsWith("+")) return "text-green-600"
    if (amount.startsWith("-")) return "text-red-600"
    return "text-text-primary"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">تکمیل شده</span>
      case "pending":
        return <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">در انتظار</span>
      case "failed":
        return <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">ناموفق</span>
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary-main flex items-center">
          <Clock className="w-5 h-5 ml-2" />
          فعالیت‌های اخیر
        </CardTitle>
        <CardDescription>آخرین تراکنش‌ها و فعالیت‌های کیف پول شما</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 border border-neutral-light rounded-medium hover:bg-background-default transition-colors duration-200"
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="p-2 bg-background-default rounded-medium">{getActivityIcon(activity.type)}</div>

                <div className="flex-1">
                  <p className="font-medium text-text-primary">{activity.description}</p>
                  <div className="flex items-center space-x-2 space-x-reverse mt-1">
                    <p className="text-sm text-neutral-main">{activity.time}</p>
                    {getStatusBadge(activity.status)}
                  </div>
                  {activity.hash && <p className="text-xs text-neutral-main mt-1 font-mono">Hash: {activity.hash}</p>}
                </div>
              </div>

              <div className="text-left">
                <p className={`font-semibold ${getAmountColor(activity.amount)}`}>{activity.amount}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="text-primary-main hover:text-primary-dark font-medium transition-colors duration-200">
            مشاهده همه فعالیت‌ها
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

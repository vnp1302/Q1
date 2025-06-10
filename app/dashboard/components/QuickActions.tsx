"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Download, TrendingUp, Plus, ArrowUpRight } from "lucide-react"

const quickActions = [
  {
    icon: <Send className="w-5 h-5" />,
    title: "ارسال توکن",
    description: "انتقال سریع به کیف پول دیگر",
    action: "send",
    color: "bg-blue-500",
  },
  {
    icon: <Download className="w-5 h-5" />,
    title: "دریافت توکن",
    description: "دریافت توکن از کیف پول دیگر",
    action: "receive",
    color: "bg-green-500",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "شروع استیکینگ",
    description: "کسب درآمد از دارایی‌های خود",
    action: "stake",
    color: "bg-purple-500",
  },
  {
    icon: <Plus className="w-5 h-5" />,
    title: "خرید توکن",
    description: "خرید مستقیم از صرافی",
    action: "buy",
    color: "bg-orange-500",
  },
]

export function QuickActions() {
  const handleAction = (action: string) => {
    console.log(`Action: ${action}`)
    // Handle different actions
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary-main">عملیات سریع</CardTitle>
        <CardDescription>دسترسی آسان به عملیات پرکاربرد</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start h-auto p-4 hover:bg-primary-main/5 transition-colors duration-200"
            onClick={() => handleAction(action.action)}
          >
            <div className={`p-2 rounded-medium ${action.color} text-white ml-4`}>{action.icon}</div>
            <div className="text-right flex-1">
              <div className="font-medium text-text-primary">{action.title}</div>
              <div className="text-sm text-text-secondary">{action.description}</div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-main" />
          </Button>
        ))}

        {/* Market Summary */}
        <div className="mt-6 pt-6 border-t border-neutral-light">
          <h4 className="font-semibold text-text-primary mb-4">خلاصه بازار</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Q2T/USD</span>
              <div className="text-left">
                <div className="font-semibold">$3.45</div>
                <div className="text-green-600 text-sm flex items-center">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  +2.5%
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">حجم ۲۴ ساعته</span>
              <div className="font-semibold">$2.1M</div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">کل عرضه</span>
              <div className="font-semibold">100M Q2T</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

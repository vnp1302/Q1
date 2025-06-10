"use client"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeftRight, Clock, Shield, Zap } from "lucide-react"

const bridgeStats = [
  {
    icon: <ArrowLeftRight className="w-8 h-8" />,
    value: "45+",
    label: "زنجیره پشتیبانی",
    description: "اتصال به بیش از ۴۵ بلاک‌چین",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    value: "2-5",
    label: "دقیقه زمان انتقال",
    description: "انتقال سریع بین زنجیره‌ها",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    value: "100%",
    label: "امنیت تراکنش",
    description: "تضمین امنیت کامل انتقال",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    value: "0.1%",
    label: "کارمزد پایین",
    description: "کارمزد رقابتی برای هر انتقال",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

const features = [
  {
    title: "انتقال سریع",
    description: "انتقال دارایی‌ها بین زنجیره‌ها در کمتر از ۵ دقیقه",
  },
  {
    title: "امنیت چندلایه",
    description: "سیستم امنیتی پیشرفته با تأیید چندمرحله‌ای",
  },
  {
    title: "کارمزد رقابتی",
    description: "کارمزد پایین و شفاف برای تمام تراکنش‌ها",
  },
  {
    title: "پشتیبانی از چندین زنجیره",
    description: "پشتیبانی از بیش از ۴۵ بلاک‌چین مختلف",
  },
  {
    title: "تاریخچه تراکنش‌ها",
    description: "مشاهده و پیگیری تمام تراکنش‌های قبلی",
  },
  {
    title: "پشتیبانی ۲۴/۷",
    description: "پشتیبانی شبانه‌روزی برای حل مشکلات احتمالی",
  },
]

export function BridgeOverview() {
  return (
    <section className="section-padding bg-background-paper" role="region" aria-labelledby="overview-title">
      <div className="container-max px-4">
        <div className="text-center mb-16">
          <h2 id="overview-title" className="text-h2 text-primary-main mb-4">
            پل بین زنجیره‌ای Q2
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            راهکار امن و سریع برای انتقال دارایی‌های دیجیتال بین زنجیره‌های مختلف بلاک‌چین
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {bridgeStats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div
                  className={`w-16 h-16 ${stat.bgColor} rounded-large flex items-center justify-center mx-auto mb-4`}
                >
                  <div className={stat.color}>{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-primary-main mb-2">{stat.value}</div>
                <div className="font-semibold text-text-primary mb-1">{stat.label}</div>
                <div className="text-sm text-text-secondary">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="bg-gradient-primary text-text-inverted rounded-large p-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">ویژگی‌های پل بین زنجیره‌ای</h3>
            <p className="text-neutral-light max-w-2xl mx-auto">
              پل بین زنجیره‌ای Q2 با ویژگی‌های پیشرفته، انتقال دارایی‌ها را آسان‌تر می‌کند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 space-x-reverse">
                <div className="w-2 h-2 bg-secondary-light rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-neutral-light">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

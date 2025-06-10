"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Shield, Clock, Coins, Users, Zap } from "lucide-react"

const stakingBenefits = [
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "پاداش جذاب",
    description: "تا 15% سالانه بازدهی از استیکینگ",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "امنیت شبکه",
    description: "کمک به امنیت و غیرمتمرکزی شبکه",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "انعطاف‌پذیری",
    description: "امکان unstake در هر زمان",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: <Coins className="w-8 h-8" />,
    title: "حداقل کم",
    description: "شروع استیکینگ از 10 Q2T",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

const stakingProcess = [
  {
    step: 1,
    title: "انتخاب Validator",
    description: "از لیست validator های معتبر یکی را انتخاب کنید",
  },
  {
    step: 2,
    title: "تعیین مقدار",
    description: "مقدار Q2T مورد نظر برای استیک را وارد کنید",
  },
  {
    step: 3,
    title: "تایید تراکنش",
    description: "تراکنش استیکینگ را در کیف پول تایید کنید",
  },
  {
    step: 4,
    title: "دریافت پاداش",
    description: "پاداش‌ها به صورت روزانه محاسبه و پرداخت می‌شوند",
  },
]

export function StakingOverview() {
  return (
    <section className="section-padding bg-background-paper" role="region" aria-labelledby="overview-title">
      <div className="container-max px-4">
        <div className="text-center mb-16">
          <h2 id="overview-title" className="text-h2 text-primary-main mb-4">
            چرا استیکینگ Q2؟
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            استیکینگ Q2T راهی امن و سودآور برای کسب درآمد از دارایی‌های دیجیتال شما است
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stakingBenefits.map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div
                  className={`w-16 h-16 ${benefit.bgColor} rounded-large flex items-center justify-center mx-auto mb-4`}
                >
                  <div className={benefit.color}>{benefit.icon}</div>
                </div>
                <h3 className="font-bold text-primary-main mb-2">{benefit.title}</h3>
                <p className="text-sm text-text-secondary">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How it Works */}
        <div className="bg-gradient-primary text-text-inverted rounded-large p-8 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">نحوه کارکرد استیکینگ</h3>
            <p className="text-neutral-light max-w-2xl mx-auto">فرآیند ساده و امن برای شروع استیکینگ در ��ند مرحله</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stakingProcess.map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-secondary-main rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-text-inverted font-bold">{process.step}</span>
                </div>
                <h4 className="font-semibold mb-2">{process.title}</h4>
                <p className="text-sm text-neutral-light">{process.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Start CTA */}
        <div className="text-center">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <Zap className="w-12 h-12 text-primary-main" />
              </div>
              <CardTitle className="text-primary-main">آماده شروع استیکینگ هستید؟</CardTitle>
              <CardDescription>همین الان شروع کنید و از پاداش‌های روزانه بهره‌مند شوید</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-primary">
                  <Users className="w-4 h-4 ml-2" />
                  مشاهده Validator ها
                </Button>
                <Button variant="outline">
                  <TrendingUp className="w-4 h-4 ml-2" />
                  محاسبه سود
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

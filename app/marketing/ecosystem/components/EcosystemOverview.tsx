"use client"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Globe, Zap, Shield, Code } from "lucide-react"

const ecosystemStats = [
  {
    icon: <Users className="w-8 h-8" />,
    value: "200+",
    label: "شرکای فعال",
    description: "در سراسر جهان",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    value: "45+",
    label: "زنجیره پشتیبانی",
    description: "اتصال چند زنجیره‌ای",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: <Code className="w-8 h-8" />,
    value: "1000+",
    label: "توسعه‌دهنده فعال",
    description: "در جامعه ما",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    value: "$5B+",
    label: "حجم تراکنش",
    description: "در اکوسیستم",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

const coreValues = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "امنیت اول",
    description: "تمام شرکا باید بالاترین استانداردهای امنیتی را رعایت کنند",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "نوآوری مداوم",
    description: "تشویق ایده‌های جدید و راه‌حل‌های خلاقانه",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "همکاری باز",
    description: "محیطی شفاف و قابل دسترس برای همه",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "دسترسی جهانی",
    description: "خدمات در دسترس کاربران سر��سر جهان",
  },
]

export function EcosystemOverview() {
  return (
    <section className="section-padding bg-background-paper" role="region" aria-labelledby="overview-title">
      <div className="container-max px-4">
        <div className="text-center mb-16">
          <h2 id="overview-title" className="text-h2 text-primary-main mb-4">
            نمای کلی اکوسیستم
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            اکوسیستم Q2 شامل شرکا، توسعه‌دهندگان و سرویس‌هایی است که با هم یک شبکه قدرتمند تشکیل می‌دهند
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {ecosystemStats.map((stat, index) => (
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

        {/* Core Values */}
        <div className="bg-gradient-primary text-text-inverted rounded-large p-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">ارزش‌های بنیادین اکوسیستم</h3>
            <p className="text-neutral-light max-w-2xl mx-auto">
              اصولی که تمام اعضای اکوسیستم Q2 بر اساس آن فعالیت می‌کنند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-secondary-main/20 rounded-large flex items-center justify-center mx-auto mb-4">
                  <div className="text-secondary-light">{value.icon}</div>
                </div>
                <h4 className="font-semibold mb-2">{value.title}</h4>
                <p className="text-sm text-neutral-light">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

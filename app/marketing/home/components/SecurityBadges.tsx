"use client"
import { Shield, Lock, Eye, FileCheck, Award, Zap } from "lucide-react"
import type React from "react"

interface SecurityBadge {
  icon: React.ReactNode
  title: string
  description: string
  certification?: string
  color: string
}

const securityBadges: SecurityBadge[] = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: "ISO 27001",
    description: "استاندارد بین‌المللی مدیریت امنیت اطلاعات",
    certification: "تایید شده",
    color: "text-blue-600",
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: "SOC 2 Type II",
    description: "گزارش کنترل‌های امنیتی سازمانی",
    certification: "تایید شده",
    color: "text-green-600",
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: "Penetration Testing",
    description: "تست نفوذ توسط شرکت‌های معتبر امنیتی",
    certification: "ماهانه",
    color: "text-purple-600",
  },
  {
    icon: <FileCheck className="w-8 h-8" />,
    title: "Smart Contract Audit",
    description: "بررسی امنیت قراردادهای هوشمند",
    certification: "CertiK",
    color: "text-orange-600",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Bug Bounty Program",
    description: "برنامه پاداش یافتن آسیب‌پذیری",
    certification: "فعال",
    color: "text-red-600",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Real-time Monitoring",
    description: "مانیتورینگ ۲۴/۷ سیستم‌های امنیتی",
    certification: "زنده",
    color: "text-teal-600",
  },
]

export function SecurityBadges() {
  return (
    <section
      className="section-padding bg-gradient-primary text-text-inverted"
      role="region"
      aria-labelledby="security-title"
    >
      <div className="container-max px-4">
        <div className="text-center mb-16">
          <h2 id="security-title" className="text-h2 text-text-inverted mb-4">
            گواهینامه‌ها و استانداردهای امنیتی
          </h2>
          <p className="text-lg text-neutral-light max-w-3xl mx-auto">
            پلتفرم Q2 با بالاترین استانداردهای امنیتی جهانی طراحی و پیاده‌سازی شده است
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityBadges.map((badge, index) => (
            <SecurityBadgeCard key={index} badge={badge} />
          ))}
        </div>

        {/* Security Promise */}
        <div className="text-center mt-16">
          <div className="card bg-background-paper/10 backdrop-blur-sm border border-text-inverted/20 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-16 h-16 text-secondary-light" />
            </div>

            <h3 className="text-2xl font-bold mb-4">تعهد امنیتی ما</h3>

            <p className="text-lg text-neutral-light mb-6 leading-relaxed">
              امنیت دارایی‌های شما اولویت اول ما است. با استفاده از پیشرفته‌ترین تکنولوژی‌های امنیتی و رعایت بالاترین
              استانداردهای بین‌المللی، محیطی امن و قابل اعتماد برای شما فراهم کرده‌ایم.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-secondary-light mb-2">$100M</div>
                <div className="text-sm text-neutral-light">بیمه امنیتی</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary-light mb-2">99.9%</div>
                <div className="text-sm text-neutral-light">آپتایم تضمینی</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary-light mb-2">24/7</div>
                <div className="text-sm text-neutral-light">مانیتورینگ امنیتی</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface SecurityBadgeCardProps {
  badge: SecurityBadge
}

function SecurityBadgeCard({ badge }: SecurityBadgeCardProps) {
  return (
    <div className="card bg-background-paper/10 backdrop-blur-sm border border-text-inverted/20 group hover:bg-background-paper/20 transition-all duration-300">
      <div className="flex items-start space-x-4 space-x-reverse mb-4">
        <div className={`p-3 rounded-large bg-background-paper/20 ${badge.color}`}>{badge.icon}</div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-text-inverted mb-1">{badge.title}</h3>
          {badge.certification && (
            <div className="inline-flex items-center bg-secondary-main/20 text-secondary-light px-2 py-1 rounded-full text-xs font-medium mb-2">
              {badge.certification}
            </div>
          )}
        </div>
      </div>

      <p className="text-neutral-light leading-relaxed">{badge.description}</p>
    </div>
  )
}

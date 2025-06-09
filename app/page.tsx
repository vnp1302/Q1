import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, AlertTriangle, FileCheck, Server } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50 dark:bg-gray-900">
      <div className="container max-w-5xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Q2 Token Platform</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">پلتفرم توکن امن با ویژگی‌های امنیتی پیشرفته</p>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">ویژگی‌های امنیتی</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SecurityFeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="احراز هویت پیشرفته"
              description="سیستم احراز هویت چند مرحله‌ای با محافظت در برابر حملات brute force"
            />

            <SecurityFeatureCard
              icon={<Lock className="h-8 w-8" />}
              title="رمزگذاری"
              description="رمزگذاری داده‌های حساس در حالت استراحت و انتقال"
            />

            <SecurityFeatureCard
              icon={<AlertTriangle className="h-8 w-8" />}
              title="محافظت XSS"
              description="سیاست‌های امنیتی محتوا (CSP) و sanitization ورودی‌ها"
            />

            <SecurityFeatureCard
              icon={<FileCheck className="h-8 w-8" />}
              title="تست‌های امنیتی"
              description="تست‌های خودکار برای شناسایی آسیب‌پذیری‌های امنیتی"
            />

            <SecurityFeatureCard
              icon={<Server className="h-8 w-8" />}
              title="مانیتورینگ"
              description="سیستم مانیتورینگ و هشدار برای شناسایی فعالیت‌های مشکوک"
            />

            <SecurityFeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="محدودیت نرخ"
              description="محافظت در برابر حملات DDoS با محدودیت نرخ درخواست"
            />
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">شروع کنید</h2>
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            برای استفاده از پلتفرم توکن Q2، ثبت‌نام کنید یا وارد شوید.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              ثبت‌نام
            </Button>
            <Button size="lg" variant="outline">
              ورود
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}

interface SecurityFeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function SecurityFeatureCard({ icon, title, description }: SecurityFeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-2 text-blue-600 dark:text-blue-400">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

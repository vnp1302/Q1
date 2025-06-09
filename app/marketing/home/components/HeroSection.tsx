"use client"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Zap, Globe, CheckCircle } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const features = ["امنیت بانکی سطح یک", "پشتیبانی از چندین زنجیره", "رابط کاربری حرفه‌ای", "API های RESTful کامل"]

  return (
    <section className="gradient-primary section-padding relative overflow-hidden" role="banner">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-32 h-32 border border-text-inverted rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 border border-text-inverted rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-text-inverted rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container-max px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-right">
            <div className="inline-flex items-center bg-secondary-main/20 text-text-inverted px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4 ml-2" />
              <span className="text-sm font-medium">پلتفرم امن توکن‌سازی</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-inverted mb-6 leading-tight">
              پلتفرم پیشرفته
              <span className="text-gradient block">توکن‌سازی Q2</span>
            </h1>

            <p className="text-xl md:text-2xl text-neutral-light mb-8 leading-relaxed">
              راهکار امن و مقیاس‌پذیر برای مدیریت دارایی‌های دیجیتال با امنیت بانکی سطح یک
            </p>

            {/* Features List */}
            <div className="mb-8">
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-center lg:justify-start space-x-3 space-x-reverse"
                  >
                    <CheckCircle className="w-5 h-5 text-secondary-light" />
                    <span className="text-neutral-light">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/auth/register">
                <Button size="lg" className="btn-secondary group">
                  شروع کنید
                  <ArrowLeft className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>

              <Link href="/developers/docs">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-text-inverted text-text-inverted hover:bg-text-inverted hover:text-primary-main"
                >
                  مشاهده مستندات
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual Elements */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="card bg-background-paper/10 backdrop-blur-sm border border-text-inverted/20 text-text-inverted">
                  <div className="flex items-center space-x-3 space-x-reverse mb-3">
                    <Shield className="w-8 h-8 text-secondary-light" />
                    <h3 className="font-semibold">امنیت بالا</h3>
                  </div>
                  <p className="text-sm text-neutral-light">امنیت بانکی سطح یک با رمزگذاری پیشرفته</p>
                </div>

                <div className="card bg-background-paper/10 backdrop-blur-sm border border-text-inverted/20 text-text-inverted mt-8">
                  <div className="flex items-center space-x-3 space-x-reverse mb-3">
                    <Globe className="w-8 h-8 text-secondary-light" />
                    <h3 className="font-semibold">چند زنجیره‌ای</h3>
                  </div>
                  <p className="text-sm text-neutral-light">پشتیبانی از چندین بلاک‌چین معتبر</p>
                </div>
              </div>

              <div className="space-y-6 mt-12">
                <div className="card bg-background-paper/10 backdrop-blur-sm border border-text-inverted/20 text-text-inverted">
                  <div className="flex items-center space-x-3 space-x-reverse mb-3">
                    <Zap className="w-8 h-8 text-secondary-light" />
                    <h3 className="font-semibold">سرعت بالا</h3>
                  </div>
                  <p className="text-sm text-neutral-light">پردازش سریع تراکنش‌ها در کمتر از ۳ ثانیه</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

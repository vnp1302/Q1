"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RegisterForm } from "./components/RegisterForm"
import { AuthMethods } from "../login/components/AuthMethods"
import { ArrowLeft, Shield, CheckCircle } from "lucide-react"

const benefits = [
  "دسترسی به تمام ویژگی‌های پلتفرم",
  "امنیت بانکی سطح یک",
  "پشتیبانی ۲۴/۷",
  "کارمزد کم و رقابتی",
  "رابط کاربری ساده و کاربرپسند",
]

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background-default flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Benefits */}
          <div className="hidden lg:flex flex-col justify-center">
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center space-x-2 space-x-reverse">
                <div className="w-12 h-12 bg-gradient-primary rounded-large flex items-center justify-center">
                  <span className="text-text-inverted font-bold text-xl">Q2</span>
                </div>
                <span className="text-2xl font-bold text-primary-main">پلتفرم Q2</span>
              </Link>
            </div>

            <div className="bg-gradient-primary text-text-inverted rounded-large p-8">
              <h2 className="text-2xl font-bold mb-6">به خانواده Q2 بپیوندید</h2>
              <p className="text-neutral-light mb-8 leading-relaxed">
                با عضویت در پلتفرم Q2، از پیشرفته‌ترین ابزارهای مدیریت دارایی‌های دیجیتال بهره‌مند شوید
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 space-x-reverse">
                    <CheckCircle className="w-5 h-5 text-secondary-light" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-background-paper/10 rounded-medium">
                <div className="flex items-center space-x-2 space-x-reverse text-secondary-light">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">امنیت تضمین شده</span>
                </div>
                <p className="text-sm text-neutral-light mt-2">
                  اطلاعات شما با بالاترین استانداردهای امنیتی محافظت می‌شود
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="flex flex-col justify-center">
            {/* Mobile Logo */}
            <div className="text-center mb-8 lg:hidden">
              <Link href="/" className="inline-flex items-center space-x-2 space-x-reverse">
                <div className="w-12 h-12 bg-gradient-primary rounded-large flex items-center justify-center">
                  <span className="text-text-inverted font-bold text-xl">Q2</span>
                </div>
                <span className="text-2xl font-bold text-primary-main">پلتفرم Q2</span>
              </Link>
            </div>

            {/* Security Notice */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-medium">
              <div className="flex items-center space-x-2 space-x-reverse text-blue-800">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">ثبت‌نام امن با رمزگذاری end-to-end</span>
              </div>
            </div>

            {/* Registration Form */}
            <Card className="shadow-high">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-primary-main">ایجاد حساب کاربری</CardTitle>
                <CardDescription className="text-text-secondary">
                  برای شروع استفاده از پلتفرم Q2 ثبت‌نام کنید
                </CardDescription>
              </CardHeader>

              <CardContent>
                <RegisterForm />

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-light"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-background-paper text-neutral-main">یا</span>
                  </div>
                </div>

                <AuthMethods />

                {/* Login Link */}
                <div className="text-center mt-6">
                  <p className="text-text-secondary">
                    قبلاً حساب کاربری دارید؟{" "}
                    <Link
                      href="/auth/login"
                      className="text-primary-main hover:text-primary-dark font-medium transition-colors duration-200 focus-visible"
                    >
                      وارد شوید
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Back to Home */}
            <div className="text-center mt-6">
              <Link
                href="/"
                className="text-neutral-main hover:text-primary-main transition-colors duration-200 focus-visible inline-flex items-center space-x-1 space-x-reverse"
              >
                <ArrowLeft className="w-4 h-4 rotate-180" />
                <span>بازگشت به صفحه اصلی</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

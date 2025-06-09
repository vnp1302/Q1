"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "./components/LoginForm"
import { AuthMethods } from "./components/AuthMethods"
import { ArrowLeft, Shield } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background-default flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
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
            <span className="text-sm font-medium">ورود امن با رمزگذاری end-to-end</span>
          </div>
        </div>

        {/* Login Form */}
        <Card className="shadow-high">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary-main">ورود به حساب کاربری</CardTitle>
            <CardDescription className="text-text-secondary">برای دسترسی به پنل کاربری خود وارد شوید</CardDescription>
          </CardHeader>

          <CardContent>
            <LoginForm />

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

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-text-secondary">
                حساب کاربری ندارید؟{" "}
                <Link
                  href="/auth/register"
                  className="text-primary-main hover:text-primary-dark font-medium transition-colors duration-200 focus-visible"
                >
                  ثبت‌نام کنید
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
  )
}

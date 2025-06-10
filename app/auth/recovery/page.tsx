"use client"
import { useState } from "react"
import type React from "react"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, Shield, CheckCircle } from "lucide-react"

export default function RecoveryPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email.trim()) {
      setError("آدرس ایمیل الزامی است")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("فرمت ایمیل نامعتبر است")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsEmailSent(true)
    } catch (error) {
      setError("خطا در ارسال ایمیل. لطفاً دوباره تلاش کنید.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-background-default flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 space-x-reverse">
              <div className="w-12 h-12 bg-gradient-primary rounded-large flex items-center justify-center">
                <span className="text-text-inverted font-bold text-xl">Q2</span>
              </div>
              <span className="text-2xl font-bold text-primary-main">پلتفرم Q2</span>
            </Link>
          </div>

          <Card className="shadow-high">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>

              <h2 className="text-2xl font-bold text-primary-main mb-4">ایمیل ارسال شد</h2>

              <p className="text-text-secondary mb-6 leading-relaxed">
                لینک بازیابی رمز عبور به آدرس <strong>{email}</strong> ارسال شد. لطفاً صندوق ورودی خود را بررسی کنید.
              </p>

              <div className="space-y-4">
                <Button onClick={() => setIsEmailSent(false)} variant="outline" className="w-full">
                  ارسال مجدد ایمیل
                </Button>

                <Link href="/auth/login">
                  <Button className="w-full btn-primary">بازگشت به صفحه ورود</Button>
                </Link>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-medium text-sm text-blue-800">
                <p>
                  <strong>نکته:</strong> اگر ایمیل را دریافت نکردید، پوشه spam خود را نیز بررسی کنید. لینک بازیابی تا ۱۵
                  دقیقه معتبر است.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

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
            <span className="text-sm font-medium">بازیابی امن رمز عبور</span>
          </div>
        </div>

        {/* Recovery Form */}
        <Card className="shadow-high">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary-main">بازیابی رمز عبور</CardTitle>
            <CardDescription className="text-text-secondary">
              آدرس ایمیل خود را وارد کنید تا لینک بازیابی برای شما ارسال شود
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-text-primary font-medium">
                  آدرس ایمیل
                </Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-main w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    className="pr-10"
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-4 h-4 border-2 border-text-inverted border-t-transparent rounded-full animate-spin"></div>
                    <span>در حال ارسال...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span>ارسال لینک بازیابی</span>
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>

            {/* Back to Login */}
            <div className="text-center mt-6">
              <p className="text-text-secondary">
                رمز عبور خود را به خاطر آوردید؟{" "}
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
  )
}

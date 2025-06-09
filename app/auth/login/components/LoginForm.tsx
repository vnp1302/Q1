"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  return (
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
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="example@domain.com"
            className="pr-10"
            required
            aria-describedby="email-error"
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-text-primary font-medium">
          رمز عبور
        </Label>
        <div className="relative">
          <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-main w-5 h-5" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange}
            placeholder="رمز عبور خود را وارد کنید"
            className="pr-10 pl-10"
            required
            aria-describedby="password-error"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-main hover:text-primary-main transition-colors duration-200"
            aria-label={showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 space-x-reverse">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="w-4 h-4 text-primary-main border-neutral-main rounded focus:ring-primary-light"
          />
          <Label htmlFor="rememberMe" className="text-sm text-text-secondary">
            مرا به خاطر بسپار
          </Label>
        </div>

        <a
          href="/auth/recovery"
          className="text-sm text-primary-main hover:text-primary-dark transition-colors duration-200 focus-visible"
        >
          فراموشی رمز عبور؟
        </a>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-4 h-4 border-2 border-text-inverted border-t-transparent rounded-full animate-spin"></div>
            <span>در حال ورود...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 space-x-reverse">
            <span>ورود</span>
            <ArrowLeft className="w-4 h-4" />
          </div>
        )}
      </Button>
    </form>
  )
}

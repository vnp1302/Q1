"use client"
import { useState } from "react"
import Link from "next/link"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Phone } from "lucide-react"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToNewsletter: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "نام الزامی است"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "نام خانوادگی الزامی است"
    }

    if (!formData.email.trim()) {
      newErrors.email = "ایمیل الزامی است"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "فرمت ایمیل نامعتبر است"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "شماره تلفن الزامی است"
    } else if (!/^09\d{9}$/.test(formData.phone)) {
      newErrors.phone = "شماره تلفن نامعتبر است"
    }

    if (!formData.password) {
      newErrors.password = "رمز عبور الزامی است"
    } else if (formData.password.length < 8) {
      newErrors.password = "رمز عبور باید حداقل ۸ کاراکتر باشد"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "رمز عبور باید شامل حروف کوچک، بزرگ و عدد باشد"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "تکرار رمز عبور الزامی است"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "رمز عبور و تکرار آن یکسان نیستند"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "پذیرش شرایط و قوانین الزامی است"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Success - redirect or show success message
      alert("ثبت‌نام با موفقیت انجام شد! لطفاً ایمیل خود را بررسی کنید.")
    } catch (error) {
      alert("خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))

    // Clear error when user checks
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-text-primary font-medium">
            نام *
          </Label>
          <div className="relative">
            <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-main w-5 h-5" />
            <Input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="نام خود را وارد کنید"
              className="pr-10"
              required
            />
          </div>
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-text-primary font-medium">
            نام خانوادگی *
          </Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="نام خانوادگی خود را وارد کنید"
            required
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-text-primary font-medium">
          آدرس ایمیل *
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
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-text-primary font-medium">
          شماره تلفن *
        </Label>
        <div className="relative">
          <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-main w-5 h-5" />
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="09123456789"
            className="pr-10"
            required
          />
        </div>
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      {/* Password Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-text-primary font-medium">
            رمز عبور *
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
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-text-primary font-medium">
            تکرار رمز عبور *
          </Label>
          <div className="relative">
            <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-main w-5 h-5" />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="رمز عبور را دوباره وارد کنید"
              className="pr-10 pl-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-main hover:text-primary-main transition-colors duration-200"
              aria-label={showConfirmPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>
      </div>

      {/* Password Requirements */}
      <div className="p-3 bg-gray-50 rounded-medium text-sm text-text-secondary">
        <p className="font-medium mb-2">الزامات رمز عبور:</p>
        <ul className="space-y-1">
          <li className="flex items-center space-x-2 space-x-reverse">
            <div className="w-1.5 h-1.5 bg-neutral-main rounded-full"></div>
            <span>حداقل ۸ کاراکتر</span>
          </li>
          <li className="flex items-center space-x-2 space-x-reverse">
            <div className="w-1.5 h-1.5 bg-neutral-main rounded-full"></div>
            <span>شامل حروف کوچک و بزرگ انگلیسی</span>
          </li>
          <li className="flex items-center space-x-2 space-x-reverse">
            <div className="w-1.5 h-1.5 bg-neutral-main rounded-full"></div>
            <span>شامل حداقل یک عدد</span>
          </li>
        </ul>
      </div>

      {/* Checkboxes */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3 space-x-reverse">
          <Checkbox
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => handleCheckboxChange("agreeToTerms", checked as boolean)}
            className="mt-1"
          />
          <Label htmlFor="agreeToTerms" className="text-sm text-text-secondary leading-relaxed">
            با{" "}
            <Link href="/terms" className="text-primary-main hover:text-primary-dark underline">
              شرایط و قوانین
            </Link>{" "}
            و{" "}
            <Link href="/privacy" className="text-primary-main hover:text-primary-dark underline">
              سیاست حریم خصوصی
            </Link>{" "}
            موافقم *
          </Label>
        </div>
        {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

        <div className="flex items-start space-x-3 space-x-reverse">
          <Checkbox
            id="agreeToNewsletter"
            checked={formData.agreeToNewsletter}
            onCheckedChange={(checked) => handleCheckboxChange("agreeToNewsletter", checked as boolean)}
            className="mt-1"
          />
          <Label htmlFor="agreeToNewsletter" className="text-sm text-text-secondary">
            مایل به دریافت اخبار و به‌روزرسانی‌های پلتفرم هستم
          </Label>
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-4 h-4 border-2 border-text-inverted border-t-transparent rounded-full animate-spin"></div>
            <span>در حال ثبت‌نام...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 space-x-reverse">
            <span>ایجاد حساب کاربری</span>
            <ArrowLeft className="w-4 h-4" />
          </div>
        )}
      </Button>
    </form>
  )
}

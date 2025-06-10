"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Save } from 'lucide-react'

export function ProfileSettings() {
  const [formData, setFormData] = useState({
    firstName: "علی",
    lastName: "احمدی",
    email: "ali@example.com",
    phone: "09123456789",
    bio: "توسعه‌دهنده بلاک‌چین و علاقه‌مند به فناوری‌های نوین",
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    alert("اطلاعات پروفایل با موفقیت به‌روزرسانی شد")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary-main">اطلاعات پروفایل</CardTitle>
          <CardDescription>مدیریت اطلاعات شخصی حساب کاربری</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="پروفایل" />
                <AvatarFallback className="text-lg">ع.ا</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 ml-2" />
                  تغییر تصویر
                </Button>
                <p className="text-sm text-text-secondary mt-2">
                  فرمت‌های مجاز: JPG, PNG (حداکثر ۲ مگابایت)
                </p>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">نام</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">نام خانوادگی</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">ایمیل</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">شماره تلفن</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Bio Field */}
            <div className="space-y-2">
              <Label htmlFor="bio">درباره من</Label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-neutral-light rounded-medium focus:outline-none focus:ring-2 focus:ring-primary-light"
                placeholder="کمی درباره خود بنویسید..."
              />
            </div>

            <Button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-4 h-4 border-2 border-text-inverted border-t-transparent rounded-full animate-spin"></div>
                  <span>در حال ذخیره...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Save className="w-4 h-4" />
                  <span>ذخیره تغییرات</span>
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

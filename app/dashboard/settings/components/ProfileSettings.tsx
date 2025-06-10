"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Upload, User } from "lucide-react"

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  bio: string
  avatar: string
}

export function ProfileSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "علی",
    lastName: "احمدی",
    email: "ali@example.com",
    phone: "+98 912 345 6789",
    bio: "توسعه‌دهنده بلاک‌چین و علاقه‌مند به فناوری‌های نوین",
    avatar: "",
  })

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "موفقیت",
        description: "اطلاعات پروفایل با موفقیت به‌روزرسانی شد",
      })
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در به‌روزرسانی اطلاعات",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Avatar Section */}
      <Card>
        <CardHeader>
          <CardTitle>تصویر پروفایل</CardTitle>
          <CardDescription>تصویر پروفایل خود را آپلود کنید</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profileData.avatar || "/placeholder.svg"} />
            <AvatarFallback>
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              آپلود تصویر
            </Button>
            <p className="text-sm text-muted-foreground">فرمت‌های مجاز: JPG, PNG (حداکثر 2MB)</p>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Personal Information */}
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">نام</Label>
            <Input
              id="firstName"
              value={profileData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              placeholder="نام خود را وارد کنید"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">نام خانوادگی</Label>
            <Input
              id="lastName"
              value={profileData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              placeholder="نام خانوادگی خود را وارد کنید"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">ایمیل</Label>
          <Input
            id="email"
            type="email"
            value={profileData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="ایمیل خود را وارد کنید"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">شماره تلفن</Label>
          <Input
            id="phone"
            value={profileData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="شماره تلفن خود را وارد کنید"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">بیوگرافی</Label>
          <Textarea
            id="bio"
            value={profileData.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            placeholder="درباره خود بنویسید..."
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </Button>
      </div>
    </div>
  )
}

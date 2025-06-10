"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Shield, Smartphone, Key } from "lucide-react"

export function SecuritySettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [loginAlerts, setLoginAlerts] = useState(true)

  const handlePasswordChange = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "موفقیت",
        description: "رمز عبور با موفقیت تغییر کرد",
      })
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در تغییر رمز عبور",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTwoFactorToggle = async (enabled: boolean) => {
    setTwoFactorEnabled(enabled)

    toast({
      title: enabled ? "فعال شد" : "غیرفعال شد",
      description: enabled ? "احراز هویت دو مرحله‌ای فعال شد" : "احراز هویت دو مرحله‌ای غیرفعال شد",
    })
  }

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            تغییر رمز عبور
          </CardTitle>
          <CardDescription>رمز عبور قوی انتخاب کنید که شامل حروف، اعداد و نمادها باشد</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">رمز عبور فعلی</Label>
            <Input id="currentPassword" type="password" placeholder="رمز عبور فعلی را وارد کنید" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">رمز عبور جدید</Label>
            <Input id="newPassword" type="password" placeholder="رمز عبور جدید را وارد کنید" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">تأیید رمز عبور جدید</Label>
            <Input id="confirmPassword" type="password" placeholder="رمز عبور جدید را مجدداً وارد کنید" />
          </div>
          <Button onClick={handlePasswordChange} disabled={isLoading}>
            {isLoading ? "در حال تغییر..." : "تغییر رمز عبور"}
          </Button>
        </CardContent>
      </Card>

      <Separator />

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            احراز هویت دو مرحله‌ای
          </CardTitle>
          <CardDescription>امنیت حساب خود را با فعال‌سازی احراز هویت دو مرحله‌ای افزایش دهید</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">احراز هویت دو مرحله‌ای</p>
              <p className="text-sm text-muted-foreground">استفاده از اپلیکیشن احراز هویت برای ورود</p>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={handleTwoFactorToggle} />
          </div>

          {twoFactorEnabled && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm">برای تکمیل تنظیمات، QR کد زیر را با اپلیکیشن احراز هویت خود اسکن کنید.</p>
              <div className="mt-2 p-4 bg-white rounded border-2 border-dashed">
                <p className="text-center text-muted-foreground">QR Code اینجا نمایش داده می‌شود</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Security Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            هشدارهای امنیتی
          </CardTitle>
          <CardDescription>مدیریت اعلان‌های مربوط به امنیت حساب</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">اعلان‌های ایمیل</p>
              <p className="text-sm text-muted-foreground">دریافت ایمیل برای فعالیت‌های مشکوک</p>
            </div>
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">هشدار ورود</p>
              <p className="text-sm text-muted-foreground">اطلاع‌رسانی ورود از دستگاه‌های جدید</p>
            </div>
            <Switch checked={loginAlerts} onCheckedChange={setLoginAlerts} />
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>جلسات فعال</CardTitle>
          <CardDescription>مدیریت دستگاه‌هایی که به حساب شما متصل هستند</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">مرورگر فعلی</p>
                <p className="text-sm text-muted-foreground">Chrome - تهران، ایران</p>
              </div>
              <span className="text-sm text-green-600">فعال</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">موبایل</p>
                <p className="text-sm text-muted-foreground">iOS App - 2 روز پیش</p>
              </div>
              <Button variant="outline" size="sm">
                قطع اتصال
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

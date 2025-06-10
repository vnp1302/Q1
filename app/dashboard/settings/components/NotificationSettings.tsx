"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Bell, Mail, MessageSquare } from "lucide-react"

interface NotificationSettings {
  email: {
    transactions: boolean
    security: boolean
    marketing: boolean
    updates: boolean
  }
  push: {
    transactions: boolean
    priceAlerts: boolean
    security: boolean
    news: boolean
  }
  sms: {
    security: boolean
    transactions: boolean
  }
}

export function NotificationSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      transactions: true,
      security: true,
      marketing: false,
      updates: true,
    },
    push: {
      transactions: true,
      priceAlerts: true,
      security: true,
      news: false,
    },
    sms: {
      security: true,
      transactions: false,
    },
  })

  const handleSettingChange = (category: keyof NotificationSettings, setting: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "موفقیت",
        description: "تنظیمات اعلان‌ها با موفقیت ذخیره شد",
      })
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در ذخیره تنظیمات",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            اعلان‌های ایمیل
          </CardTitle>
          <CardDescription>مدیریت اعلان‌هایی که از طریق ایمیل دریافت می‌کنید</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">تراکنش‌ها</p>
              <p className="text-sm text-muted-foreground">اطلاع‌رسانی تراکنش‌های ورودی و خروجی</p>
            </div>
            <Switch
              checked={settings.email.transactions}
              onCheckedChange={(value) => handleSettingChange("email", "transactions", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">امنیت</p>
              <p className="text-sm text-muted-foreground">هشدارهای امنیتی و ورود به حساب</p>
            </div>
            <Switch
              checked={settings.email.security}
              onCheckedChange={(value) => handleSettingChange("email", "security", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">بازاریابی</p>
              <p className="text-sm text-muted-foreground">اخبار محصولات و پیشنهادات ویژه</p>
            </div>
            <Switch
              checked={settings.email.marketing}
              onCheckedChange={(value) => handleSettingChange("email", "marketing", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">به‌روزرسانی‌ها</p>
              <p className="text-sm text-muted-foreground">اطلاع‌رسانی ویژگی‌های جدید و تغییرات</p>
            </div>
            <Switch
              checked={settings.email.updates}
              onCheckedChange={(value) => handleSettingChange("email", "updates", value)}
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            اعلان‌های Push
          </CardTitle>
          <CardDescription>مدیریت اعلان‌های داخل برنامه و مرورگر</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">تراکنش‌ها</p>
              <p className="text-sm text-muted-foreground">اطلاع‌رسانی فوری تراکنش‌ها</p>
            </div>
            <Switch
              checked={settings.push.transactions}
              onCheckedChange={(value) => handleSettingChange("push", "transactions", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">هشدار قیمت</p>
              <p className="text-sm text-muted-foreground">اطلاع‌رسانی تغییرات قیمت توکن‌ها</p>
            </div>
            <Switch
              checked={settings.push.priceAlerts}
              onCheckedChange={(value) => handleSettingChange("push", "priceAlerts", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">امنیت</p>
              <p className="text-sm text-muted-foreground">هشدارهای امنیتی فوری</p>
            </div>
            <Switch
              checked={settings.push.security}
              onCheckedChange={(value) => handleSettingChange("push", "security", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">اخبار</p>
              <p className="text-sm text-muted-foreground">آخرین اخبار و تحلیل‌های بازار</p>
            </div>
            <Switch
              checked={settings.push.news}
              onCheckedChange={(value) => handleSettingChange("push", "news", value)}
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* SMS Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            اعلان‌های پیامکی
          </CardTitle>
          <CardDescription>مدیریت اعلان‌های ارسالی از طریق پیامک</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">امنیت</p>
              <p className="text-sm text-muted-foreground">کدهای تأیید و هشدارهای امنیتی</p>
            </div>
            <Switch
              checked={settings.sms.security}
              onCheckedChange={(value) => handleSettingChange("sms", "security", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">تراکنش‌های مهم</p>
              <p className="text-sm text-muted-foreground">تأیید تراکنش‌های بالای حد آستانه</p>
            </div>
            <Switch
              checked={settings.sms.transactions}
              onCheckedChange={(value) => handleSettingChange("sms", "transactions", value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "در حال ذخیره..." : "ذخیره تنظیمات"}
        </Button>
      </div>
    </div>
  )
}

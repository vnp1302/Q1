"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Mail, Smartphone, TrendingUp, Shield, Wallet } from 'lucide-react'

interface NotificationSetting {
  id: string
  title: string
  description: string
  email: boolean
  push: boolean
  sms: boolean
  icon: React.ReactNode
}

export function NotificationSettings() {
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: "security",
      title: "اعلان‌های امنیتی",
      description: "ورود جدید، تغییر رمز عبور و فعالیت‌های مشکوک",
      email: true,
      push: true,
      sms: true,
      icon: <Shield className="w-5 h-5" />,
    },
    {
      id: "transactions",
      title: "تراکنش‌ها",
      description: "ارسال، دریافت و تأیید تراکنش‌ها",
      email: true,
      push: true,
      sms: false,
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      id: "price",
      title: "تغییرات قیمت",
      description: "هشدارهای قیمت و تحلیل بازار",
      email: false,
      push: true,
      sms: false,
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      id: "staking",
      title: "استیکینگ",
      description: "پاداش‌ها، انقضا و به‌روزرسانی‌های استیکینگ",
      email: true,
      push: false,
      sms: false,
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ])

  const updateNotification = (id: string, type: 'email' | 'push' | 'sms', value: boolean) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, [type]: value } : notif
      )
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary-main flex items-center space-x-2 space-x-reverse">
            <Bell className="w-5 h-5" />
            <span>تنظیمات اعلان‌ها</span>
          </CardTitle>
          <CardDescription>مدیریت نحوه دریافت اعلان‌ها</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Header */}
            <div className="grid grid-cols-4 gap-4 pb-4 border-b border-neutral-light">
              <div className="font-medium text-text-primary">نوع اعلان</div>
              <div className="text-center">
                <Mail className="w-5 h-5 mx-auto mb-1" />
                <div className="text-sm">ایمیل</div>
              </div>
              <div className="text-center">
                <Smartphone className="w-5 h-5 mx-auto mb-1" />
                <div className="text-sm">پوش</div>
              </div>
              <div className="text-center">
                <Smartphone className="w-5 h-5 mx-auto mb-1" />
                <div className="text-sm">پیامک</div>
              </div>
            </div>

            {/* Notification Settings */}
            {notifications.map((notification) => (
              <div key={notification.id} className="grid grid-cols-4 gap-4 items-center py-4 border-b border-neutral-light last:border-b-0">
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="text-primary-main mt-1">{notification.icon}</div>
                  <div>
                    <div className="font-medium text-text-primary">{notification.title}</div>
                    <div className="text-sm text-text-secondary">{notification.description}</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Switch
                    checked={notification.email}
                    onCheckedChange={(checked) => updateNotification(notification.id, 'email', checked)}
                  />
                </div>

                <div className="flex justify-center">
                  <Switch
                    checked={notification.push}
                    onCheckedChange={(checked) => updateNotification(notification.id, 'push', checked)}
                  />
                </div>

                <div className="flex justify-center">
                  <Switch
                    checked={notification.sms}
                    onCheckedChange={(checked) => updateNotification(notification.id, 'sms', checked)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary-main">تنظیمات سریع</CardTitle>
          <CardDescription>فعال/غیرفعال کردن سریع دسته‌بندی‌های اعلان</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="all-notifications" className="font-medium">
                همه اعلان‌ها
              </Label>
              <Switch
                id="all-notifications"
                checked={notifications.every(n => n.email && n.push)}
                onCheckedChange={(checked) => {
                  setNotifications(prev => 
                    prev.map(notif => ({ 
                      ...notif, 
                      email: checked, 
                      push: checked 
                    }))
                  )
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="security-only" className="font-medium">
                فقط اعلان‌های امنیتی
              </Label>
              <Switch
                id="security-only"
                checked={notifications.find(n => n.id === 'security')?.email || false}
                onCheckedChange={(checked) => {
                  setNotifications(prev => 
                    prev.map(notif => 
                      notif.id === 'security' 
                        ? { ...notif, email: checked, push: checked, sms: checked }
                        : { ...notif, email: false, push: false, sms: false }
                    )
                  )
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

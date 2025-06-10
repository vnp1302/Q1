"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Globe, Palette, DollarSign } from "lucide-react"

interface Preferences {
  language: string
  theme: string
  timezone: string
  currency: string
  dateFormat: string
  numberFormat: string
  autoRefresh: boolean
  soundEffects: boolean
  animations: boolean
}

export function PreferencesSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [preferences, setPreferences] = useState<Preferences>({
    language: "fa",
    theme: "system",
    timezone: "Asia/Tehran",
    currency: "USD",
    dateFormat: "persian",
    numberFormat: "persian",
    autoRefresh: true,
    soundEffects: false,
    animations: true,
  })

  const handlePreferenceChange = (key: keyof Preferences, value: string | boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "موفقیت",
        description: "تنظیمات با موفقیت ذخیره شد",
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
      {/* Language & Region */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            زبان و منطقه
          </CardTitle>
          <CardDescription>تنظیمات زبان، منطقه زمانی و فرمت نمایش</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">زبان</label>
              <Select value={preferences.language} onValueChange={(value) => handlePreferenceChange("language", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fa">فارسی</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">منطقه زمانی</label>
              <Select value={preferences.timezone} onValueChange={(value) => handlePreferenceChange("timezone", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Tehran">تهران (UTC+3:30)</SelectItem>
                  <SelectItem value="UTC">UTC (UTC+0)</SelectItem>
                  <SelectItem value="America/New_York">نیویورک (UTC-5)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">فرمت تاریخ</label>
              <Select
                value={preferences.dateFormat}
                onValueChange={(value) => handlePreferenceChange("dateFormat", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="persian">شمسی (۱۴۰۳/۰۱/۰۱)</SelectItem>
                  <SelectItem value="gregorian">میلادی (2024/01/01)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">فرمت اعداد</label>
              <Select
                value={preferences.numberFormat}
                onValueChange={(value) => handlePreferenceChange("numberFormat", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="persian">فارسی (۱۲۳٬۴۵۶)</SelectItem>
                  <SelectItem value="english">انگلیسی (123,456)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            ظاهر
          </CardTitle>
          <CardDescription>تنظیمات تم، انیمیشن و ظاهر برنامه</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">تم</label>
            <Select value={preferences.theme} onValueChange={(value) => handlePreferenceChange("theme", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">روشن</SelectItem>
                <SelectItem value="dark">تیره</SelectItem>
                <SelectItem value="system">خودکار (بر اساس سیستم)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">انیمیشن‌ها</p>
              <p className="text-sm text-muted-foreground">نمایش انیمیشن‌ها و انتقال‌های نرم</p>
            </div>
            <Switch
              checked={preferences.animations}
              onCheckedChange={(value) => handlePreferenceChange("animations", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">صداها</p>
              <p className="text-sm text-muted-foreground">پخش صدا برای اعلان‌ها و اقدامات</p>
            </div>
            <Switch
              checked={preferences.soundEffects}
              onCheckedChange={(value) => handlePreferenceChange("soundEffects", value)}
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Trading & Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            معاملات و نمایش
          </CardTitle>
          <CardDescription>تنظیمات مربوط به نمایش قیمت‌ها و معاملات</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">ارز پایه</label>
            <Select value={preferences.currency} onValueChange={(value) => handlePreferenceChange("currency", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">دلار آمریکا (USD)</SelectItem>
                <SelectItem value="EUR">یورو (EUR)</SelectItem>
                <SelectItem value="IRR">ریال ایران (IRR)</SelectItem>
                <SelectItem value="BTC">بیت‌کوین (BTC)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">به‌روزرسانی خودکار</p>
              <p className="text-sm text-muted-foreground">به‌روزرسانی خودکار قیمت‌ها و داده‌ها</p>
            </div>
            <Switch
              checked={preferences.autoRefresh}
              onCheckedChange={(value) => handlePreferenceChange("autoRefresh", value)}
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

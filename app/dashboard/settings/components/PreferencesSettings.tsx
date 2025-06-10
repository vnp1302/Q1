"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Globe, Palette, Clock, Download } from 'lucide-react'

export function PreferencesSettings() {
  const [preferences, setPreferences] = useState({
    language: "fa",
    theme: "light",
    timezone: "Asia/Tehran",
    currency: "USD",
    autoBackup: true,
    soundEffects: false,
    animations: true,
  })

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    // Save preferences
    alert("تنظیمات با موفقیت ذخیره شد")
  }

  const handleExportData = () => {
    // Export user data
    alert("درخواست صادرات داده‌ها ارسال شد")
  }

  return (
    <div className="space-y-6">
      {/* Display Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary-main flex items-center space-x-2 space-x-reverse">
            <Palette className="w-5 h-5" />
            <span>تنظیمات نمایش</span>
          </CardTitle>
          <CardDescription>شخصی‌سازی ظاهر و رابط کاربری</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="language">زبان</Label>
              <Select value={preferences.language} onValueChange={(value) => handlePreferenceChange('language', value)}>
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
              <Label htmlFor="theme">تم</Label>
              <Select value={preferences.theme} onValueChange={(value) => handlePreferenceChange('theme', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">روشن</SelectItem>
                  <SelectItem value="dark">تیره</SelectItem>
                  <SelectItem value="auto">خودکار</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">منطقه زمانی</Label>
              <Select value={preferences.timezone} onValueChange={(value) => handlePreferenceChange('timezone', value)}>
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

            <div className="space-y-2">
              <Label htmlFor="currency">واحد پول</Label>
              <Select value={preferences.currency} onValueChange={(value) => handlePreferenceChange('currency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">دلار آمریکا (USD)</SelectItem>
                  <SelectItem value="EUR">یورو (EUR)</SelectItem>
                  <SelectItem value="IRR">ریال ایران (IRR)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="animations" className="font-medium">
                انیمیشن‌ها
              </Label>
              <Switch
                id="animations"
                checked={preferences.animations}
                onCheckedChange={(checked) => handlePreferenceChange('animations', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="soundEffects" className="font-medium">
                جلوه‌های صوتی
              </Label>
              <Switch
                id="soundEffects"
                checked={preferences.soundEffects}
                onCheckedChange={(checked) => handlePreferenceChange('soundEffects', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary-main flex items-center space-x-2 space-x-reverse">
            <Download className="w-5 h-5" />
            <span>داده‌ها و حریم خصوصی</span>
          </CardTitle>
          <CardDescription>مدیریت داده‌های شخصی و تنظیمات حریم خصوصی</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">پشتیبان‌گیری خودکار</Label>
              <p className="text-sm text-text-secondary">پشتیبان‌گیری روزانه از تنظیمات و داده‌ها</p>
            </div>
            <Switch
              checked={preferences.autoBackup}
              onCheckedChange={(checked) => handlePreferenceChange('autoBackup', checked)}
            />
          </div>

          <div className="space-y-4">
            <Button variant="outline" onClick={handleExportData} className="w-full">
              <Download className="w-4 h-4 ml-2" />
              صادرات داده‌های شخصی
            </Button>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-medium">
              <h4 className="font-semibold text-blue-900 mb-2">درباره صادرات داده‌ها</h4>
              <p className="text-sm text-blue-800">
                شما می‌توانید کپی کاملی از داده‌های شخصی خود را دریافت کنید. این شامل اطلاعات پروفایل، 
                تاریخچه تراکنش‌ها و تنظیمات حساب می‌شود.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="btn-primary">
          ذخیره تمام تغییرات
        </Button>
      </div>
    </div>
  )
}

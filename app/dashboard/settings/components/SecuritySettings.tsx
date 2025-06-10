"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Shield, Key, Smartphone, Eye, EyeOff, AlertTriangle } from 'lucide-react'

export function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("رمز عبور جدید و تکرار آن یکسان نیستند")
      return
    }
    // Handle password change
    alert("رمز عبور با موفقیت تغییر کرد")
  }

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary-main flex items-center space-x-2 space-x-reverse">
            <Key className="w-5 h-5" />
            <span>تغییر رمز عبور</span>
          </CardTitle>
          <CardDescription>برای امنیت بیشتر، رمز عبور قوی انتخاب کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">رمز عبور فعلی</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-main"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">رمز عبور جدید</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-main"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">تکرار رمز عبور جدید</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <Button type="submit" className="btn-primary">
              تغییر رمز عبور
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary-main flex items-center space-x-2 space-x-reverse">
            <Smartphone className="w-5 h-5" />
            <span>احراز هویت دو مرحله‌ای</span>
          </CardTitle>
          <CardDescription>افزایش امنیت حساب با احراز هویت دو مرحله‌ای</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="font-medium">احراز هویت دو مرحله‌ای</span>
                <Badge className={twoFactorEnabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                  {twoFactorEnabled ? "فعال" : "غیرفعال"}
                </Badge>
              </div>
              <p className="text-sm text-text-secondary">
                {twoFactorEnabled 
                  ? "حساب شما با احراز هویت دو مرحله‌ای محافظت می‌شود"
                  : "برای امنیت بیشتر، احراز هویت دو مرحله‌ای را فعال کنید"
                }
              </p>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>

          {twoFactorEnabled && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-medium">
              <div className="flex items-center space-x-2 space-x-reverse text-green-800">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">احراز هویت دو مرحله‌ای فعال است</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                کدهای بازیابی خود را در مکان امنی نگهداری کنید
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                مشاهده کدهای بازیابی
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary-main flex items-center space-x-2 space-x-reverse">
            <Shield className="w-5 h-5" />
            <span>وضعیت امنیت حساب</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-neutral-light rounded-medium">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">رمز عبور قوی</span>
              </div>
              <Badge className="bg-green-100 text-green-800">تأیید شده</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border border-neutral-light rounded-medium">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">ایمیل تأیید شده</span>
              </div>
              <Badge className="bg-green-100 text-green-800">تأیید شده</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border border-neutral-light rounded-medium">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className={`w-2 h-2 ${twoFactorEnabled ? 'bg-green-500' : 'bg-yellow-500'} rounded-full`}></div>
                <span className="text-sm">احراز هویت دو مرحله‌ای</span>
              </div>
              <Badge className={twoFactorEnabled ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                {twoFactorEnabled ? "فعال" : "توصیه می‌شود"}
              </Badge>
            </div>
          </div>

          {!twoFactorEnabled && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-medium">
              <div className="flex items-center space-x-2 space-x-reverse text-yellow-800">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">توصیه امنیتی</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                برای افزایش امنیت حساب، احراز هویت دو مرحله‌ای را فعال کنید
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

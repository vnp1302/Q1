import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileSettings } from "./components/ProfileSettings"
import { SecuritySettings } from "./components/SecuritySettings"
import { NotificationSettings } from "./components/NotificationSettings"
import { PreferencesSettings } from "./components/PreferencesSettings"
import { Breadcrumbs } from "@/src/components/ui/breadcrumbs"

export const metadata: Metadata = {
  title: "تنظیمات | Q2 Token Platform",
  description: "مدیریت تنظیمات حساب کاربری، امنیت و اعلان‌ها",
}

export default function SettingsPage() {
  const breadcrumbItems = [
    { label: "داشبورد", href: "/dashboard" },
    { label: "تنظیمات", href: "/dashboard/settings" },
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div>
          <h1 className="text-3xl font-bold">تنظیمات</h1>
          <p className="text-muted-foreground">مدیریت تنظیمات حساب کاربری و تنظیمات سیستم</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">پروفایل</TabsTrigger>
          <TabsTrigger value="security">امنیت</TabsTrigger>
          <TabsTrigger value="notifications">اعلان‌ها</TabsTrigger>
          <TabsTrigger value="preferences">تنظیمات</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات پروفایل</CardTitle>
              <CardDescription>مدیریت اطلاعات شخصی و تنظیمات حساب کاربری</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات امنیت</CardTitle>
              <CardDescription>مدیریت رمز عبور، احراز هویت دو مرحله‌ای و تنظیمات امنیتی</CardDescription>
            </CardHeader>
            <CardContent>
              <SecuritySettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات اعلان‌ها</CardTitle>
              <CardDescription>مدیریت اعلان‌های ایمیل، SMS و اعلان‌های داخل برنامه</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات عمومی</CardTitle>
              <CardDescription>تنظیمات زبان، تم و سایر تنظیمات شخصی‌سازی</CardDescription>
            </CardHeader>
            <CardContent>
              <PreferencesSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

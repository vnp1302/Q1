"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "./components/ProfileSettings"
import { SecuritySettings } from "./components/SecuritySettings"
import { NotificationSettings } from "./components/NotificationSettings"
import { PreferencesSettings } from "./components/PreferencesSettings"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-main">تنظیمات</h1>
        <p className="text-text-secondary">مدیریت تنظیمات حساب کاربری و ترجیحات شما</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">پروفایل</TabsTrigger>
          <TabsTrigger value="security">امنیت</TabsTrigger>
          <TabsTrigger value="notifications">اعلان‌ها</TabsTrigger>
          <TabsTrigger value="preferences">ترجیحات</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="preferences">
          <PreferencesSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

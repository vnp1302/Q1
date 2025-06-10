"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletOverview } from "./components/WalletOverview"
import { TokenList } from "./components/TokenList"
import { TransactionHistory } from "./components/TransactionHistory"
import { WalletActions } from "./components/WalletActions"

export default function WalletPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-main">کیف پول</h1>
          <p className="text-text-secondary">مدیریت دارایی‌های دیجیتال شما</p>
        </div>
        <Badge className="bg-green-100 text-green-800">متصل</Badge>
      </div>

      <WalletOverview />

      <Tabs defaultValue="tokens" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tokens">توکن‌ها</TabsTrigger>
          <TabsTrigger value="history">تاریخچه تراکنش‌ها</TabsTrigger>
          <TabsTrigger value="actions">عملیات</TabsTrigger>
        </TabsList>

        <TabsContent value="tokens">
          <TokenList />
        </TabsContent>

        <TabsContent value="history">
          <TransactionHistory />
        </TabsContent>

        <TabsContent value="actions">
          <WalletActions />
        </TabsContent>
      </Tabs>
    </div>
  )
}

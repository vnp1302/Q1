"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, ArrowDownToLine, ArrowLeftRight, QrCode } from 'lucide-react'
import { useState } from "react"

export function WalletActions() {
  const [sendAmount, setSendAmount] = useState("")
  const [sendAddress, setSendAddress] = useState("")
  const [selectedToken, setSelectedToken] = useState("Q2")

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary-main flex items-center space-x-2 space-x-reverse">
            <Send className="w-5 h-5" />
            <span>ارسال توکن</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token-select">انتخاب توکن</Label>
              <Select value={selectedToken} onValueChange={setSelectedToken}>
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب توکن" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Q2">Q2 Token</SelectItem>
                  <SelectItem value="ETH">Ethereum</SelectItem>
                  <SelectItem value="USDT">Tether USD</SelectItem>
                  <SelectItem value="BNB">BNB</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="send-address">آدرس مقصد</Label>
              <div className="flex space-x-2 space-x-reverse">
                <Input
                  id="send-address"
                  placeholder="آدرس کیف پول مقصد را وارد کنید"
                  value={sendAddress}
                  onChange={(e) => setSendAddress(e.target.value)}
                />
                <Button variant="outline" size="icon">
                  <QrCode className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="send-amount">مقدار</Label>
              <div className="flex space-x-2 space-x-reverse">
                <Input
                  id="send-amount"
                  type="number"
                  placeholder="0.00"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                />
                <Button variant="outline" size="sm">
                  حداکثر
                </Button>
              </div>
              <div className="text-sm text-text-secondary">
                موجودی: 15,420.5 {selectedToken}
              </div>
            </div>

            <Button className="w-full btn-primary">
              ارسال توکن
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary-main">عملیات سریع</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <ArrowDownToLine className="w-6 h-6" />
              <span>دریافت</span>
            </Button>

            <Button variant="outline" className="h-20 flex-col space-y-2">
              <ArrowLeftRight className="w-6 h-6" />
              <span>تبدیل</span>
            </Button>

            <Button variant="outline" className="h-20 flex-col space-y-2">
              <QrCode className="w-6 h-6" />
              <span>QR Code</span>
            </Button>

            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Send className="w-6 h-6" />
              <span>ارسال سریع</span>
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-medium">
            <h4 className="font-semibold text-blue-900 mb-2">نکات امنیتی</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• همیشه آدرس مقصد را دوبار بررسی کنید</li>
              <li>• از شبکه‌های امن استفاده کنید</li>
              <li>• کلیدهای خصوصی خود را محفوظ نگه دارید</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

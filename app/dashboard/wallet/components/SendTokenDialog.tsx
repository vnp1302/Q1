"use client"

import { useState } from "react"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Scan, AlertTriangle, Check } from "lucide-react"

interface SendTokenDialogProps {
  onClose: () => void
}

export function SendTokenDialog({ onClose }: SendTokenDialogProps) {
  const [selectedToken, setSelectedToken] = useState("")
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [memo, setMemo] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [validationError, setValidationError] = useState("")
  const [step, setStep] = useState<"form" | "confirm" | "success">("form")

  // Mock data - در پیاده‌سازی واقعی از API دریافت می‌شود
  const availableTokens = [
    { id: "1", symbol: "Q2", name: "Q2 Token", balance: 1000, logo: "/tokens/q2.png" },
    { id: "2", symbol: "ETH", name: "Ethereum", balance: 2.5, logo: "/tokens/eth.png" },
    { id: "3", symbol: "USDT", name: "Tether USD", balance: 500, logo: "/tokens/usdt.png" },
  ]

  const selectedTokenData = availableTokens.find((t) => t.id === selectedToken)
  const estimatedFee = 0.001 // Mock fee
  const estimatedFeeUSD = 2.5 // Mock fee in USD

  const handleValidateRecipient = async (address: string) => {
    setIsValidating(true)
    setValidationError("")

    // Mock validation
    setTimeout(() => {
      if (address.length < 10) {
        setValidationError("آدرس نامعتبر است")
      } else {
        setValidationError("")
      }
      setIsValidating(false)
    }, 1000)
  }

  const handleSend = async () => {
    setStep("confirm")
  }

  const handleConfirm = async () => {
    // Mock API call
    setTimeout(() => {
      setStep("success")
    }, 2000)
  }

  if (step === "success") {
    return (
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">تراکنش ارسال شد</DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <p className="text-lg font-medium">تراکنش با موفقیت ارسال شد</p>
            <p className="text-sm text-muted-foreground mt-1">تراکنش شما در حال پردازش است و به زودی تأیید خواهد شد</p>
          </div>
          <div className="space-y-2">
            <Button onClick={onClose} className="w-full">
              بستن
            </Button>
            <Button variant="outline" className="w-full">
              مشاهده در اکسپلورر
            </Button>
          </div>
        </div>
      </DialogContent>
    )
  }

  if (step === "confirm") {
    return (
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>تأیید ارسال</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">مقدار</span>
                <div className="text-left">
                  <div className="font-medium">
                    {amount} {selectedTokenData?.symbol}
                  </div>
                  <div className="text-sm text-muted-foreground">≈ $120.50</div>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">گیرنده</span>
                <div className="text-left">
                  <div className="font-mono text-sm">
                    {recipient.slice(0, 6)}...{recipient.slice(-4)}
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">کارمزد شبکه</span>
                <div className="text-left">
                  <div className="text-sm">{estimatedFee} ETH</div>
                  <div className="text-xs text-muted-foreground">${estimatedFeeUSD}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>لطفاً اطلاعات تراکنش را با دقت بررسی کنید. این عمل قابل برگشت نیست.</AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep("form")} className="flex-1">
              بازگشت
            </Button>
            <Button onClick={handleConfirm} className="flex-1">
              تأیید و ارسال
            </Button>
          </div>
        </div>
      </DialogContent>
    )
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>ارسال توکن</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        {/* انتخاب توکن */}
        <div className="space-y-2">
          <Label htmlFor="token">انتخاب توکن</Label>
          <Select value={selectedToken} onValueChange={setSelectedToken}>
            <SelectTrigger>
              <SelectValue placeholder="توکن مورد نظر را انتخاب کنید" />
            </SelectTrigger>
            <SelectContent>
              {availableTokens.map((token) => (
                <SelectItem key={token.id} value={token.id}>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={token.logo || "/placeholder.svg"} alt={token.name} />
                      <AvatarFallback>{token.symbol.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span>{token.symbol}</span>
                    <Badge variant="outline" className="text-xs">
                      {token.balance.toLocaleString("fa-IR")}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* آدرس گیرنده */}
        <div className="space-y-2">
          <Label htmlFor="recipient">آدرس گیرنده</Label>
          <div className="flex gap-2">
            <Input
              id="recipient"
              placeholder="0x..."
              value={recipient}
              onChange={(e) => {
                setRecipient(e.target.value)
                if (e.target.value.length > 10) {
                  handleValidateRecipient(e.target.value)
                }
              }}
              className={validationError ? "border-red-500" : ""}
            />
            <Button variant="outline" size="icon">
              <Scan className="h-4 w-4" />
            </Button>
          </div>
          {isValidating && <p className="text-sm text-muted-foreground">در حال بررسی آدرس...</p>}
          {validationError && <p className="text-sm text-red-500">{validationError}</p>}
        </div>

        {/* مقدار */}
        <div className="space-y-2">
          <Label htmlFor="amount">مقدار</Label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                id="amount"
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button
                variant="outline"
                onClick={() => selectedTokenData && setAmount(selectedTokenData.balance.toString())}
              >
                حداکثر
              </Button>
            </div>
            {selectedTokenData && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  موجودی: {selectedTokenData.balance.toLocaleString("fa-IR")} {selectedTokenData.symbol}
                </span>
                <span>≈ ${(selectedTokenData.balance * 50).toLocaleString("en-US")}</span>
              </div>
            )}
          </div>
        </div>

        {/* یادداشت (اختیاری) */}
        <div className="space-y-2">
          <Label htmlFor="memo">یادداشت (اختیاری)</Label>
          <Input
            id="memo"
            placeholder="یادداشت برای این تراکنش..."
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            maxLength={100}
          />
          <div className="text-xs text-muted-foreground text-left">{memo.length}/100</div>
        </div>

        {/* خلاصه کارمزد */}
        {selectedToken && amount && (
          <Card className="bg-muted/50">
            <CardContent className="p-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span>کارمزد شبکه</span>
                <span>
                  {estimatedFee} ETH (${estimatedFeeUSD})
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>زمان تقریبی تأیید</span>
                <span>2-5 دقیقه</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>مجموع</span>
                <span>
                  {amount} {selectedTokenData?.symbol} + {estimatedFee} ETH
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* دکمه‌های عمل */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            انصراف
          </Button>
          <Button
            onClick={handleSend}
            className="flex-1"
            disabled={!selectedToken || !recipient || !amount || !!validationError || isValidating}
          >
            ادامه
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}

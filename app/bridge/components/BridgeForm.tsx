"use client"
import { useState, useCallback, useMemo } from "react"
import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeftRight, ArrowRight, AlertCircle, Info } from "lucide-react"
import { useApi } from "@/hooks/useApi"

interface Chain {
  id: string
  name: string
  icon: string
  tokens: Token[]
}

interface Token {
  symbol: string
  name: string
  icon: string
  decimals: number
  minAmount: string
  maxAmount: string
}

// Sample data - in a real app, this would come from an API
const chains: Chain[] = [
  {
    id: "ethereum",
    name: "اتریوم",
    icon: "/placeholder.svg?height=24&width=24",
    tokens: [
      {
        symbol: "ETH",
        name: "Ethereum",
        icon: "/placeholder.svg?height=20&width=20",
        decimals: 18,
        minAmount: "0.01",
        maxAmount: "100",
      },
      {
        symbol: "USDT",
        name: "Tether USD",
        icon: "/placeholder.svg?height=20&width=20",
        decimals: 6,
        minAmount: "10",
        maxAmount: "100000",
      },
      {
        symbol: "Q2T",
        name: "Q2 Token",
        icon: "/placeholder.svg?height=20&width=20",
        decimals: 18,
        minAmount: "1",
        maxAmount: "10000",
      },
    ],
  },
  {
    id: "bsc",
    name: "بایننس اسمارت چین",
    icon: "/placeholder.svg?height=24&width=24",
    tokens: [
      {
        symbol: "BNB",
        name: "Binance Coin",
        icon: "/placeholder.svg?height=20&width=20",
        decimals: 18,
        minAmount: "0.05",
        maxAmount: "500",
      },
      {
        symbol: "USDT",
        name: "Tether USD",
        icon: "/placeholder.svg?height=20&width=20",
        decimals: 18,
        minAmount: "10",
        maxAmount: "100000",
      },
      {
        symbol: "Q2T",
        name: "Q2 Token",
        icon: "/placeholder.svg?height=20&width=20",
        decimals: 18,
        minAmount: "1",
        maxAmount: "10000",
      },
    ],
  },
  {
    id: "polygon",
    name: "پالیگان",
    icon: "/placeholder.svg?height=24&width=24",
    tokens: [
      {
        symbol: "MATIC",
        name: "Polygon",
        icon: "/placeholder.svg?height=20&width=20",
        decimals: 18,
        minAmount: "10",
        maxAmount: "10000",
      },
      {
        symbol: "USDT",
        name: "Tether USD",
        icon: "/placeholder.svg?height=20&width=20",
        decimals: 6,
        minAmount: "10",
        maxAmount: "100000",
      },
      {
        symbol: "Q2T",
        name: "Q2 Token",
        icon: "/placeholder.svg?height=20&width=20",
        decimals: 18,
        minAmount: "1",
        maxAmount: "10000",
      },
    ],
  },
]

export function BridgeForm() {
  const [fromChain, setFromChain] = useState("ethereum")
  const [toChain, setToChain] = useState("polygon")
  const [token, setToken] = useState("Q2T")
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const { loading, error, execute } = useApi({
    onSuccess: () => {
      alert("درخواست انتقال با موفقیت ثبت شد!")
      setAmount("")
      setValidationErrors({})
    },
  })

  const fromChainData = useMemo(() => chains.find((chain) => chain.id === fromChain), [fromChain])
  const toChainData = useMemo(() => chains.find((chain) => chain.id === toChain), [toChain])

  const availableTokens = useMemo(() => {
    if (!fromChainData) return []
    return fromChainData.tokens
  }, [fromChainData])

  const selectedToken = useMemo(() => {
    return availableTokens.find((t) => t.symbol === token)
  }, [availableTokens, token])

  const estimatedFee = useMemo(() => {
    if (!amount || !selectedToken) return "0"
    // Simple fee calculation - in a real app this would be more complex
    const amountNum = Number.parseFloat(amount)
    return (amountNum * 0.001).toFixed(selectedToken.decimals)
  }, [amount, selectedToken])

  const estimatedTime = useMemo(() => {
    if (fromChain === toChain) return "0"
    // Simple time estimation - in a real app this would be more complex
    return "2-5"
  }, [fromChain, toChain])

  const swapChains = useCallback(() => {
    setFromChain(toChain)
    setToChain(fromChain)
  }, [fromChain, toChain])

  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {}

    if (!amount) {
      errors.amount = "مقدار را وارد کنید"
    } else if (selectedToken) {
      const amountNum = Number.parseFloat(amount)
      const minAmount = Number.parseFloat(selectedToken.minAmount)
      const maxAmount = Number.parseFloat(selectedToken.maxAmount)

      if (amountNum < minAmount) {
        errors.amount = `حداقل مقدار ${minAmount} ${selectedToken.symbol} است`
      } else if (amountNum > maxAmount) {
        errors.amount = `حداکثر مقدار ${maxAmount} ${selectedToken.symbol} است`
      }
    }

    if (!recipient) {
      errors.recipient = "آدرس گیرنده را وارد کنید"
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(recipient)) {
      errors.recipient = "آدرس گیرنده نامعتبر است"
    }

    if (fromChain === toChain) {
      errors.chain = "زنجیره مبدأ و مقصد نمی‌توانند یکسان باشند"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }, [amount, recipient, fromChain, toChain, selectedToken])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    await execute(async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return { success: true, txHash: "0x..." + Math.random().toString(16).substring(2, 10) }
    })
  }

  return (
    <section className="section-padding bg-background-default" role="region" aria-labelledby="bridge-form-title">
      <div className="container-max px-4">
        <div className="text-center mb-16">
          <h2 id="bridge-form-title" className="text-h2 text-primary-main mb-4">
            انتقال دارایی
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            فرم زیر را تکمیل کنید تا دارایی خود را بین زنجیره‌های مختلف منتقل کنید
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-primary-main">فرم انتقال بین زنجیره‌ای</CardTitle>
            <CardDescription>دارایی خود را بین زنجیره‌های مختلف منتقل کنید</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* From/To Chain Selector */}
              <div className="grid grid-cols-5 gap-4 items-center">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="fromChain">از زنجیره</Label>
                  <Select value={fromChain} onValueChange={setFromChain}>
                    <SelectTrigger id="fromChain">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {chains.map((chain) => (
                        <SelectItem key={chain.id} value={chain.id}>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <img src={chain.icon || "/placeholder.svg"} alt={chain.name} className="w-5 h-5" />
                            <span>{chain.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1 flex justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={swapChains}
                    className="rounded-full"
                    aria-label="تعویض زنجیره‌ها"
                  >
                    <ArrowLeftRight className="w-5 h-5" />
                  </Button>
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="toChain">به زنجیره</Label>
                  <Select value={toChain} onValueChange={setToChain}>
                    <SelectTrigger id="toChain">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {chains.map((chain) => (
                        <SelectItem key={chain.id} value={chain.id}>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <img src={chain.icon || "/placeholder.svg"} alt={chain.name} className="w-5 h-5" />
                            <span>{chain.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {validationErrors.chain && (
                <div className="text-red-500 text-sm flex items-center space-x-1 space-x-reverse">
                  <AlertCircle className="w-4 h-4" />
                  <span>{validationErrors.chain}</span>
                </div>
              )}

              {/* Token Selector */}
              <div className="space-y-2">
                <Label htmlFor="token">توکن</Label>
                <Select value={token} onValueChange={setToken}>
                  <SelectTrigger id="token">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTokens.map((token) => (
                      <SelectItem key={token.symbol} value={token.symbol}>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <img src={token.icon || "/placeholder.svg"} alt={token.name} className="w-5 h-5" />
                          <span>
                            {token.symbol} - {token.name}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="amount">مقدار</Label>
                  {selectedToken && (
                    <span className="text-xs text-text-secondary">
                      محدوده: {selectedToken.minAmount} - {selectedToken.maxAmount} {selectedToken.symbol}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="مقدار را وارد کنید"
                    className="pl-16"
                    step="any"
                  />
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background-paper px-2 py-1 rounded text-sm font-medium">
                    {token}
                  </div>
                </div>
                {validationErrors.amount && (
                  <div className="text-red-500 text-sm flex items-center space-x-1 space-x-reverse">
                    <AlertCircle className="w-4 h-4" />
                    <span>{validationErrors.amount}</span>
                  </div>
                )}
              </div>

              {/* Recipient Address */}
              <div className="space-y-2">
                <Label htmlFor="recipient">آدرس گیرنده</Label>
                <Input
                  id="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="0x..."
                />
                {validationErrors.recipient && (
                  <div className="text-red-500 text-sm flex items-center space-x-1 space-x-reverse">
                    <AlertCircle className="w-4 h-4" />
                    <span>{validationErrors.recipient}</span>
                  </div>
                )}
              </div>

              {/* Fee and Time Estimation */}
              <div className="bg-blue-50 p-4 rounded-medium space-y-3">
                <div className="flex items-center space-x-2 space-x-reverse text-blue-800">
                  <Info className="w-5 h-5" />
                  <span className="font-medium">اطلاعات انتقال</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-text-secondary">کارمزد تخمینی:</span>
                    <div className="font-medium text-text-primary">
                      {estimatedFee} {token}
                    </div>
                  </div>
                  <div>
                    <span className="text-text-secondary">زمان تخمینی:</span>
                    <div className="font-medium text-text-primary">{estimatedTime} دقیقه</div>
                  </div>
                </div>
              </div>

              {error && <div className="p-4 bg-red-50 border border-red-200 rounded-medium text-red-800">{error}</div>}

              {/* Submit Button */}
              <Button type="submit" className="w-full btn-primary" disabled={loading}>
                {loading ? (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-4 h-4 border-2 border-text-inverted border-t-transparent rounded-full animate-spin"></div>
                    <span>در حال پردازش...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span>انتقال دارایی</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

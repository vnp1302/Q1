"use client"
import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, TrendingUp, Clock, Coins } from "lucide-react"

interface CalculationResult {
  dailyReward: number
  monthlyReward: number
  yearlyReward: number
  totalValue: number
  apr: number
}

export function StakingCalculator() {
  const [amount, setAmount] = useState<string>("1000")
  const [duration, setDuration] = useState<string>("365")
  const [validatorFee, setValidatorFee] = useState<string>("5")

  const calculation = useMemo((): CalculationResult => {
    const stakingAmount = Number.parseFloat(amount) || 0
    const days = Number.parseInt(duration) || 365
    const fee = Number.parseFloat(validatorFee) || 5

    // Base APR (این مقدار از API واقعی باید بیاید)
    const baseAPR = 12.5
    const effectiveAPR = baseAPR * (1 - fee / 100)

    const dailyRate = effectiveAPR / 365 / 100
    const dailyReward = stakingAmount * dailyRate
    const monthlyReward = dailyReward * 30
    const yearlyReward = (stakingAmount * effectiveAPR) / 100
    const totalValue = stakingAmount + dailyReward * days

    return {
      dailyReward,
      monthlyReward,
      yearlyReward,
      totalValue,
      apr: effectiveAPR,
    }
  }, [amount, duration, validatorFee])

  return (
    <section className="section-padding bg-background-paper" role="region" aria-labelledby="calculator-title">
      <div className="container-max px-4">
        <div className="text-center mb-16">
          <h2 id="calculator-title" className="text-h2 text-primary-main mb-4">
            محاسبه‌گر سود استیکینگ
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            پیش‌بینی دقیق سود استیکینگ بر اساس مقدار و مدت زمان
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary-main flex items-center space-x-2 space-x-reverse">
                <Calculator className="w-5 h-5" />
                <span>پارامترهای استیکینگ</span>
              </CardTitle>
              <CardDescription>مقادیر مورد نظر خود را وارد کنید</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">مقدار Q2T برای استیک</Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="1000"
                    className="pl-12"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">Q2T</div>
                </div>
                <p className="text-xs text-text-secondary">حداقل: 10 Q2T</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">مدت زمان استیکینگ</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">1 ماه (30 روز)</SelectItem>
                    <SelectItem value="90">3 ماه (90 روز)</SelectItem>
                    <SelectItem value="180">6 ماه (180 روز)</SelectItem>
                    <SelectItem value="365">1 سال (365 روز)</SelectItem>
                    <SelectItem value="730">2 سال (730 روز)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="validatorFee">کمیسیون Validator</Label>
                <Select value={validatorFee} onValueChange={setValidatorFee}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3% (کمیسیون کم)</SelectItem>
                    <SelectItem value="5">5% (کمیسیون متوسط)</SelectItem>
                    <SelectItem value="7">7% (کمیسیون بالا)</SelectItem>
                    <SelectItem value="10">10% (کمیسیون خیلی بالا)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-medium">
                <div className="flex items-center space-x-2 space-x-reverse text-blue-800">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">APR فعلی: {calculation.apr.toFixed(2)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary-main">نتایج محاسبه</CardTitle>
                <CardDescription>پیش‌بینی سود بر اساس پارامترهای وارد شده</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-background-default rounded-medium">
                    <div className="text-2xl font-bold text-green-600">{calculation.dailyReward.toFixed(2)}</div>
                    <div className="text-sm text-text-secondary">پاداش روزانه (Q2T)</div>
                  </div>

                  <div className="text-center p-4 bg-background-default rounded-medium">
                    <div className="text-2xl font-bold text-blue-600">{calculation.monthlyReward.toFixed(2)}</div>
                    <div className="text-sm text-text-secondary">پاداش ماهانه (Q2T)</div>
                  </div>
                </div>

                <div className="text-center p-6 bg-gradient-primary text-text-inverted rounded-medium">
                  <div className="text-3xl font-bold mb-2">{calculation.yearlyReward.toFixed(2)} Q2T</div>
                  <div className="text-neutral-light">پاداش سالانه</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">مقدار اولیه:</span>
                    <span className="font-semibold">{amount} Q2T</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">کل پاداش:</span>
                    <span className="font-semibold text-green-600">
                      +{(calculation.totalValue - Number.parseFloat(amount)).toFixed(2)} Q2T
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t border-neutral-light pt-3">
                    <span className="text-text-primary font-medium">مجموع نهایی:</span>
                    <span className="text-xl font-bold text-primary-main">{calculation.totalValue.toFixed(2)} Q2T</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3 space-x-reverse">
                  <Clock className="w-5 h-5 text-yellow-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-2">نکات مهم:</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• پاداش‌ها روزانه محاسبه و پرداخت می‌شوند</li>
                      <li>• APR بر اساس شرایط شبکه متغیر است</li>
                      <li>• زمان unbonding: 21 روز</li>
                      <li>• امکان compound کردن پاداش‌ها وجود دارد</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full btn-primary">
              <Coins className="w-4 h-4 ml-2" />
              شروع استیکینگ با این مقدار
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

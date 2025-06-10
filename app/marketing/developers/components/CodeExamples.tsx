"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, CheckCircle, Play } from "lucide-react"

interface CodeExample {
  title: string
  description: string
  language: string
  code: string
  category: string
}

const codeExamples: CodeExample[] = [
  {
    title: "ایجاد کیف پول جدید",
    description: "نحوه ایجاد کیف پول جدید و دریافت آدرس",
    language: "javascript",
    category: "wallet",
    code: `import { Q2Client } from '@q2-platform/sdk'

const client = new Q2Client({
  apiKey: 'your-api-key',
  network: 'mainnet'
})

async function createWallet() {
  try {
    // ایجاد کیف پول جدید
    const wallet = await client.wallet.create({
      type: 'HD', // Hierarchical Deterministic
      entropy: 256 // bits of entropy
    })
    
    console.log('آدرس کیف پول:', wallet.address)
    console.log('کلید خصوصی:', wallet.privateKey)
    console.log('Mnemonic:', wallet.mnemonic)
    
    return wallet
  } catch (error) {
    console.error('خطا در ایجاد کیف پول:', error)
  }
}`,
  },
  {
    title: "انتقال توکن",
    description: "انتقال توکن بین دو آدرس",
    language: "javascript",
    category: "tokens",
    code: `async function transferTokens() {
  try {
    const transaction = await client.tokens.transfer({
      from: '0x1234...', // آدرس فرستنده
      to: '0x5678...', // آدرس گیرنده
      amount: '100.5', // مقدار انتقال
      token: 'Q2T', // نماد توکن
      gasPrice: 'fast' // سرعت تراکنش
    })
    
    console.log('Hash تراکنش:', transaction.hash)
    console.log('وضعیت:', transaction.status)
    
    // انتظار برای تایید
    const receipt = await transaction.wait()
    console.log('تراکنش تایید شد:', receipt.confirmed)
    
    return receipt
  } catch (error) {
    console.error('خطا در انتقال:', error)
  }
}`,
  },
  {
    title: "استیکینگ توکن",
    description: "شروع استیکینگ و دریافت پاداش",
    language: "javascript",
    category: "staking",
    code: `async function stakeTokens() {
  try {
    // شروع استیکینگ
    const staking = await client.staking.stake({
      validator: '0xvalidator...', // آدرس validator
      amount: '1000', // مقدار استیک
      duration: 30 // مدت به روز
    })
    
    console.log('استیکینگ شروع شد:', staking.id)
    
    // دریافت اطلاعات پاداش
    const rewards = await client.staking.getRewards({
      stakingId: staking.id
    })
    
    console.log('پاداش فعلی:', rewards.current)
    console.log('APR:', rewards.apr)
    
    return staking
  } catch (error) {
    console.error('خطا در استیکینگ:', error)
  }
}`,
  },
  {
    title: "پل بین زنجیره‌ها",
    description: "انتقال دارایی بین زنجیره‌های مختلف",
    language: "javascript",
    category: "bridge",
    code: `async function bridgeAssets() {
  try {
    const bridge = await client.bridge.transfer({
      fromChain: 'ethereum',
      toChain: 'polygon',
      token: 'USDT',
      amount: '500',
      recipient: '0x9876...' // آدرس گیرنده در زنجیره مقصد
    })
    
    console.log('Bridge شروع شد:', bridge.id)
    console.log('تخمین زمان:', bridge.estimatedTime)
    console.log('کارمزد:', bridge.fee)
    
    // نظارت بر وضعیت bridge
    const status = await client.bridge.getStatus(bridge.id)
    console.log('وضعیت فعلی:', status.stage)
    
    return bridge
  } catch (error) {
    console.error('خطا در bridge:', error)
  }
}`,
  },
]

const categories = [
  { key: "all", label: "همه نمونه‌ها" },
  { key: "wallet", label: "کیف پول" },
  { key: "tokens", label: "توکن‌ها" },
  { key: "staking", label: "استیکینگ" },
  { key: "bridge", label: "پل زنجیره‌ها" },
]

export function CodeExamples() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const filteredExamples =
    activeCategory === "all" ? codeExamples : codeExamples.filter((example) => example.category === activeCategory)

  const copyToClipboard = async (code: string, title: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(title)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  return (
    <section className="section-padding bg-background-paper" role="region" aria-labelledby="examples-title">
      <div className="container-max px-4">
        <div className="text-center mb-16">
          <h2 id="examples-title" className="text-h2 text-primary-main mb-4">
            نمونه کدها
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">نمونه کدهای آماده برای شروع سریع توسعه</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category.key
                  ? "bg-primary-main text-text-inverted"
                  : "bg-background-default text-text-secondary hover:bg-primary-main/10 hover:text-primary-main"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Code Examples Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredExamples.map((example, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-primary-main">{example.title}</CardTitle>
                    <CardDescription>{example.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(example.code, example.title)}>
                      {copiedCode === example.title ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="bg-gray-900 text-white p-4 rounded-medium overflow-x-auto">
                  <pre className="text-sm font-mono">{example.code}</pre>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Playground CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-primary text-text-inverted max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">محیط تست تعاملی</h3>
              <p className="text-lg text-neutral-light mb-6">کدهای خود را در محیط آنلاین تست کنید</p>
              <Button className="btn-secondary">
                <Play className="w-5 h-5 ml-2" />
                ورود به Playground
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

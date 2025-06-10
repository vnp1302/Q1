"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Star, GitBranch } from "lucide-react"

interface SDK {
  name: string
  language: string
  description: string
  version: string
  downloads: string
  stars: string
  documentation: string
  repository: string
  installation: string
  example: string
  features: string[]
}

const sdks: SDK[] = [
  {
    name: "Q2 JavaScript SDK",
    language: "JavaScript/TypeScript",
    description: "SDK کامل برای توسعه اپلیکیشن‌های وب و Node.js",
    version: "v2.1.0",
    downloads: "50K+",
    stars: "1.2K",
    documentation: "/docs/sdk/javascript",
    repository: "https://github.com/q2-platform/q2-js-sdk",
    installation: "npm install @q2-platform/sdk",
    example: `import { Q2Client } from '@q2-platform/sdk'

const client = new Q2Client({
  apiKey: 'your-api-key',
  network: 'mainnet'
})

// دریافت موجودی کیف پول
const balance = await client.wallet.getBalance('0x...')
console.log(balance)

// انتقال توکن
const tx = await client.tokens.transfer({
  to: '0x...',
  amount: '100',
  token: 'Q2T'
})`,
    features: [
      "پشتیبانی کامل TypeScript",
      "Promise-based API",
      "Built-in error handling",
      "Real-time subscriptions",
      "Multi-chain support",
    ],
  },
  {
    name: "Q2 Python SDK",
    language: "Python",
    description: "SDK قدرتمند برای توسعه اپلیکیشن‌های Python و data science",
    version: "v1.8.0",
    downloads: "25K+",
    stars: "800",
    documentation: "/docs/sdk/python",
    repository: "https://github.com/q2-platform/q2-python-sdk",
    installation: "pip install q2-platform-sdk",
    example: `from q2_platform import Q2Client

client = Q2Client(
    api_key='your-api-key',
    network='mainnet'
)

# دریافت موجودی کیف پول
balance = client.wallet.get_balance('0x...')
print(balance)

# انتقال توکن
tx = client.tokens.transfer(
    to='0x...',
    amount='100',
    token='Q2T'
)`,
    features: [
      "Async/await support",
      "Pandas integration",
      "Data analysis tools",
      "Jupyter notebook support",
      "Comprehensive logging",
    ],
  },
  {
    name: "Q2 Go SDK",
    language: "Go",
    description: "SDK سریع و کارآمد برای توسعه سرویس‌های backend",
    version: "v1.5.0",
    downloads: "15K+",
    stars: "600",
    documentation: "/docs/sdk/go",
    repository: "https://github.com/q2-platform/q2-go-sdk",
    installation: "go get github.com/q2-platform/q2-go-sdk",
    example: `package main

import (
    "github.com/q2-platform/q2-go-sdk"
)

func main() {
    client := q2.NewClient(&q2.Config{
        APIKey:  "your-api-key",
        Network: "mainnet",
    })

    // دریافت موجودی کیف پول
    balance, err := client.Wallet.GetBalance("0x...")
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Println(balance)
}`,
    features: [
      "High performance",
      "Minimal dependencies",
      "Context support",
      "Built-in retry logic",
      "Comprehensive testing",
    ],
  },
]

export function SdkShowcase() {
  const [activeSDK, setActiveSDK] = useState(0)

  return (
    <section className="section-padding bg-background-default" role="region" aria-labelledby="sdk-title">
      <div className="container-max px-4">
        <div className="text-center mb-16">
          <h2 id="sdk-title" className="text-h2 text-primary-main mb-4">
            SDK های رسمی
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            کتابخانه‌های آماده برای زبان‌های برنامه‌نویسی مختلف
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* SDK List */}
          <div className="lg:col-span-1">
            <div className="space-y-3">
              {sdks.map((sdk, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSDK(index)}
                  className={`w-full text-right p-4 rounded-medium transition-all duration-200 ${
                    activeSDK === index
                      ? "bg-primary-main text-text-inverted"
                      : "bg-background-paper text-text-secondary hover:bg-primary-main/10 hover:text-primary-main"
                  }`}
                >
                  <div className="font-semibold">{sdk.name}</div>
                  <div className="text-sm opacity-80">{sdk.language}</div>
                </button>
              ))}
            </div>
          </div>

          {/* SDK Details */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-primary-main">{sdks[activeSDK].name}</CardTitle>
                    <CardDescription>{sdks[activeSDK].description}</CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800">{sdks[activeSDK].version}</Badge>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6 space-x-reverse mt-4">
                  <div className="flex items-center space-x-2 space-x-reverse text-text-secondary">
                    <Download className="w-4 h-4" />
                    <span className="text-sm">{sdks[activeSDK].downloads} دانلود</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-text-secondary">
                    <Star className="w-4 h-4" />
                    <span className="text-sm">{sdks[activeSDK].stars} ستاره</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-text-secondary">
                    <GitBranch className="w-4 h-4" />
                    <span className="text-sm">MIT License</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Installation */}
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">نصب:</h4>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-medium">
                    <code className="text-sm font-mono">{sdks[activeSDK].installation}</code>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">ویژگی‌ها:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {sdks[activeSDK].features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 space-x-reverse">
                        <div className="w-2 h-2 bg-secondary-main rounded-full"></div>
                        <span className="text-sm text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Example */}
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">نمونه کد:</h4>
                  <div className="bg-gray-900 text-white p-4 rounded-medium overflow-x-auto">
                    <pre className="text-sm font-mono">{sdks[activeSDK].example}</pre>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button className="btn-primary">
                    <Download className="w-4 h-4 ml-2" />
                    دانلود SDK
                  </Button>
                  <Button variant="outline">مشاهده مستندات</Button>
                  <Button variant="outline">مخزن GitHub</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

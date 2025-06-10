"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, Zap, Shield, Globe, CheckCircle, ArrowRight } from "lucide-react"

interface Integration {
  name: string
  description: string
  type: "api" | "sdk" | "plugin" | "protocol"
  difficulty: "easy" | "medium" | "hard"
  timeToIntegrate: string
  documentation: string
  features: string[]
  codeExample: string
}

const integrations: Integration[] = [
  {
    name: "REST API Integration",
    description: "یکپارچگی ساده با API های RESTful",
    type: "api",
    difficulty: "easy",
    timeToIntegrate: "1-2 روز",
    documentation: "/docs/api/rest",
    features: ["احراز هویت JWT", "Rate limiting", "Webhook support", "Real-time updates"],
    codeExample: `// نمونه درخواست API
const response = await fetch('https://api.q2platform.com/v1/wallet/balance', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})

const data = await response.json()
console.log('موجودی:', data.balance)`,
  },
  {
    name: "JavaScript SDK",
    description: "SDK کامل برای اپلیکیشن‌های JavaScript",
    type: "sdk",
    difficulty: "easy",
    timeToIntegrate: "2-3 روز",
    documentation: "/docs/sdk/javascript",
    features: ["TypeScript support", "Promise-based", "Error handling", "Event subscriptions"],
    codeExample: `import { Q2Client } from '@q2-platform/sdk'

const client = new Q2Client({
  apiKey: 'your-api-key',
  network: 'mainnet'
})

// دریافت موجودی
const balance = await client.wallet.getBalance('0x...')

// انتقال توکن
const tx = await client.tokens.transfer({
  to: '0x...',
  amount: '100',
  token: 'Q2T'
})`,
  },
  {
    name: "WordPress Plugin",
    description: "افزونه آماده برای سایت‌های WordPress",
    type: "plugin",
    difficulty: "easy",
    timeToIntegrate: "1 روز",
    documentation: "/docs/plugins/wordpress",
    features: ["نصب آسان", "رابط مدیریت", "Shortcode support", "WooCommerce integration"],
    codeExample: `// استفاده در WordPress
[q2_wallet_balance address="0x..."]

// یا در PHP
<?php
$balance = q2_get_wallet_balance('0x...');
echo 'موجودی: ' . $balance;
?>`,
  },
  {
    name: "Smart Contract Protocol",
    description: "یکپارچگی مستقیم با قراردادهای هوشمند",
    type: "protocol",
    difficulty: "hard",
    timeToIntegrate: "1-2 هفته",
    documentation: "/docs/protocol/smart-contracts",
    features: ["On-chain integration", "Gas optimization", "Security audited", "Multi-chain support"],
    codeExample: `// Solidity Smart Contract
pragma solidity ^0.8.0;

import "@q2-platform/contracts/interfaces/IQ2Token.sol";

contract MyContract {
    IQ2Token public q2Token;
    
    constructor(address _q2Token) {
        q2Token = IQ2Token(_q2Token);
    }
    
    function transferQ2(address to, uint256 amount) external {
        q2Token.transfer(to, amount);
    }
}`,
  },
]

const integrationTypes = [
  { key: "all", label: "همه روش‌ها" },
  { key: "api", label: "API", icon: <Code className="w-4 h-4" /> },
  { key: "sdk", label: "SDK", icon: <Zap className="w-4 h-4" /> },
  { key: "plugin", label: "Plugin", icon: <Globe className="w-4 h-4" /> },
  { key: "protocol", label: "Protocol", icon: <Shield className="w-4 h-4" /> },
]

export function IntegrationShowcase() {
  const [activeType, setActiveType] = useState("all")
  const [selectedIntegration, setSelectedIntegration] = useState(0)

  const filteredIntegrations =
    activeType === "all" ? integrations : integrations.filter((integration) => integration.type === activeType)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "آسان"
      case "medium":
        return "متوسط"
      case "hard":
        return "پیشرفته"
      default:
        return "نامشخص"
    }
  }

  return (
    <section className="section-padding bg-background-paper" role="region" aria-labelledby="integration-title">
      <div className="container-max px-4">
        <div className="text-center mb-16">
          <h2 id="integration-title" className="text-h2 text-primary-main mb-4">
            روش‌های یکپارچگی
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            انواع مختلف روش‌های یکپارچگی با پلتفرم Q2 برای نیازهای متفاوت
          </p>
        </div>

        {/* Integration Type Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {integrationTypes.map((type) => (
            <button
              key={type.key}
              onClick={() => setActiveType(type.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 space-x-reverse ${
                activeType === type.key
                  ? "bg-primary-main text-text-inverted"
                  : "bg-background-default text-text-secondary hover:bg-primary-main/10 hover:text-primary-main"
              }`}
            >
              {type.icon && <span>{type.icon}</span>}
              <span>{type.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Integration List */}
          <div className="lg:col-span-1">
            <div className="space-y-3">
              {filteredIntegrations.map((integration, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIntegration(index)}
                  className={`w-full text-right p-4 rounded-medium transition-all duration-200 ${
                    selectedIntegration === index
                      ? "bg-primary-main text-text-inverted"
                      : "bg-background-default text-text-secondary hover:bg-primary-main/10 hover:text-primary-main"
                  }`}
                >
                  <div className="font-semibold">{integration.name}</div>
                  <div className="text-sm opacity-80 mt-1">{integration.description}</div>
                  <div className="flex items-center justify-between mt-2">
                    <Badge className={getDifficultyColor(integration.difficulty)}>
                      {getDifficultyLabel(integration.difficulty)}
                    </Badge>
                    <span className="text-xs">{integration.timeToIntegrate}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Integration Details */}
          <div className="lg:col-span-2">
            {filteredIntegrations.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-primary-main">
                        {filteredIntegrations[selectedIntegration].name}
                      </CardTitle>
                      <CardDescription>{filteredIntegrations[selectedIntegration].description}</CardDescription>
                    </div>
                    <Badge className={getDifficultyColor(filteredIntegrations[selectedIntegration].difficulty)}>
                      {getDifficultyLabel(filteredIntegrations[selectedIntegration].difficulty)}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-4 space-x-reverse mt-4 text-sm text-text-secondary">
                    <span>زمان یکپارچگی: {filteredIntegrations[selectedIntegration].timeToIntegrate}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-text-primary mb-3">ویژگی‌ها:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {filteredIntegrations[selectedIntegration].features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 space-x-reverse">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-text-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Code Example */}
                  <div>
                    <h4 className="font-semibold text-text-primary mb-3">نمونه کد:</h4>
                    <div className="bg-gray-900 text-white p-4 rounded-medium overflow-x-auto">
                      <pre className="text-sm font-mono">{filteredIntegrations[selectedIntegration].codeExample}</pre>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button className="btn-primary">
                      شروع یکپارچگی
                      <ArrowRight className="w-4 h-4 mr-2" />
                    </Button>
                    <Button variant="outline">مشاهده مستندات</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Integration Support */}
        <div className="mt-16 text-center">
          <Card className="bg-blue-50 border-blue-200 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">نیاز به کمک در یکپارچگی؟</h3>
              <p className="text-blue-800 mb-6">تیم فنی ما آماده کمک به شما در فرآیند یکپارچگی است</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">درخواست مشاوره فنی</Button>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  مشاهده نمونه پروژه‌ها
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

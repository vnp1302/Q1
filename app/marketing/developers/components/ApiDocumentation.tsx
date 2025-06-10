"use client"
import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, Copy, ExternalLink, CheckCircle } from "lucide-react"

interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE"
  path: string
  description: string
  category: string
  parameters?: Parameter[]
  response: string
  example: string
}

interface Parameter {
  name: string
  type: string
  required: boolean
  description: string
}

const apiEndpoints: ApiEndpoint[] = [
  {
    method: "GET",
    path: "/api/v1/wallet/balance",
    description: "دریافت موجودی کیف پول",
    category: "wallet",
    parameters: [
      { name: "address", type: "string", required: true, description: "آدرس کیف پول" },
      { name: "chain", type: "string", required: false, description: "نام زنجیره (پیش‌فرض: ethereum)" },
    ],
    response: `{
  "success": true,
  "data": {
    "address": "0x...",
    "balance": "1000.50",
    "symbol": "Q2T",
    "usdValue": "3450.75"
  }
}`,
    example: `curl -X GET "https://api.q2platform.com/v1/wallet/balance?address=0x..." \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
  {
    method: "POST",
    path: "/api/v1/tokens/transfer",
    description: "انتقال توکن",
    category: "tokens",
    parameters: [
      { name: "from", type: "string", required: true, description: "آدرس فرستنده" },
      { name: "to", type: "string", required: true, description: "آدرس گیرنده" },
      { name: "amount", type: "string", required: true, description: "مقدار انتقال" },
      { name: "token", type: "string", required: true, description: "آدرس قرارداد توکن" },
    ],
    response: `{
  "success": true,
  "data": {
    "txHash": "0x...",
    "status": "pending",
    "gasUsed": "21000"
  }
}`,
    example: `curl -X POST "https://api.q2platform.com/v1/tokens/transfer" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from": "0x...",
    "to": "0x...",
    "amount": "100",
    "token": "0x..."
  }'`,
  },
  {
    method: "GET",
    path: "/api/v1/staking/rewards",
    description: "دریافت پاداش‌های استیکینگ",
    category: "staking",
    parameters: [
      { name: "validator", type: "string", required: true, description: "آدرس validator" },
      { name: "delegator", type: "string", required: true, description: "آدرس delegator" },
    ],
    response: `{
  "success": true,
  "data": {
    "totalRewards": "150.75",
    "pendingRewards": "25.50",
    "claimedRewards": "125.25",
    "apr": "12.5"
  }
}`,
    example: `curl -X GET "https://api.q2platform.com/v1/staking/rewards?validator=0x...&delegator=0x..." \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
]

const categories = [
  { key: "all", label: "همه API ها" },
  { key: "wallet", label: "کیف پول" },
  { key: "tokens", label: "توکن‌ها" },
  { key: "staking", label: "استیکینگ" },
  { key: "bridge", label: "پل زنجیره‌ها" },
]

export function ApiDocumentation() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null)

  const filteredEndpoints = useMemo(() => {
    return activeCategory === "all"
      ? apiEndpoints
      : apiEndpoints.filter((endpoint) => endpoint.category === activeCategory)
  }, [activeCategory])

  const copyToClipboard = async (text: string, endpointId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedEndpoint(endpointId)
      setTimeout(() => setCopiedEndpoint(null), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-green-100 text-green-800"
      case "POST":
        return "bg-blue-100 text-blue-800"
      case "PUT":
        return "bg-yellow-100 text-yellow-800"
      case "DELETE":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <section className="section-padding bg-background-paper" role="region" aria-labelledby="api-docs-title">
      <div className="container-max px-4">
        <div className="text-center mb-16">
          <h2 id="api-docs-title" className="text-h2 text-primary-main mb-4">
            مستندات API
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">API های RESTful کامل برای تعامل با پلتفرم Q2</p>
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

        {/* API Endpoints */}
        <div className="space-y-6">
          {filteredEndpoints.map((endpoint, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Badge className={getMethodColor(endpoint.method)}>{endpoint.method}</Badge>
                    <code className="text-lg font-mono text-primary-main">{endpoint.path}</code>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(endpoint.example, `${endpoint.method}-${index}`)}
                  >
                    {copiedEndpoint === `${endpoint.method}-${index}` ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <CardDescription>{endpoint.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Parameters */}
                {endpoint.parameters && endpoint.parameters.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-text-primary mb-3">پارامترها:</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-neutral-light">
                            <th className="text-right py-2 font-medium">نام</th>
                            <th className="text-right py-2 font-medium">نوع</th>
                            <th className="text-right py-2 font-medium">ضروری</th>
                            <th className="text-right py-2 font-medium">توضیحات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {endpoint.parameters.map((param, paramIndex) => (
                            <tr key={paramIndex} className="border-b border-neutral-light/50">
                              <td className="py-2 font-mono text-primary-main">{param.name}</td>
                              <td className="py-2 text-text-secondary">{param.type}</td>
                              <td className="py-2">
                                {param.required ? (
                                  <Badge className="bg-red-100 text-red-800">ضروری</Badge>
                                ) : (
                                  <Badge className="bg-gray-100 text-gray-800">اختیاری</Badge>
                                )}
                              </td>
                              <td className="py-2 text-text-secondary">{param.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Response Example */}
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">نمونه پاسخ:</h4>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-medium overflow-x-auto">
                    <pre className="text-sm font-mono">{endpoint.response}</pre>
                  </div>
                </div>

                {/* cURL Example */}
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">نمونه درخواست:</h4>
                  <div className="bg-gray-900 text-yellow-400 p-4 rounded-medium overflow-x-auto">
                    <pre className="text-sm font-mono">{endpoint.example}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* API Key Notice */}
        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-large">
          <div className="flex items-start space-x-3 space-x-reverse">
            <Code className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">دریافت API Key</h3>
              <p className="text-blue-800 mb-4">برای استفاده از API های Q2، ابتدا باید یک API key دریافت کنید.</p>
              <Button className="btn-primary">
                <ExternalLink className="w-4 h-4 ml-2" />
                دریافت API Key
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Users, TrendingUp } from "lucide-react"

interface Partner {
  name: string
  description: string
  logo: string
  website: string
  category: string
  tier: "gold" | "silver" | "bronze"
  integration: string
  users: string
  volume: string
}

const partners: Partner[] = [
  {
    name: "CryptoExchange Pro",
    description: "صرافی پیشرو با حجم تراکنش بالا",
    logo: "/placeholder.svg?height=60&width=120",
    website: "https://cryptoexchange.pro",
    category: "exchange",
    tier: "gold",
    integration: "API کامل",
    users: "500K+",
    volume: "$2B+",
  },
  {
    name: "SecureWallet",
    description: "کیف پول امن چند زنجیره‌ای",
    logo: "/placeholder.svg?height=60&width=120",
    website: "https://securewallet.com",
    category: "wallet",
    tier: "gold",
    integration: "SDK Native",
    users: "1M+",
    volume: "$500M+",
  },
  {
    name: "DeFi Protocol",
    description: "پروتکل مالی غیرمتمرکز",
    logo: "/placeholder.svg?height=60&width=120",
    website: "https://defiprotocol.io",
    category: "defi",
    tier: "silver",
    integration: "Smart Contract",
    users: "100K+",
    volume: "$300M+",
  },
  {
    name: "BlockInfra",
    description: "زیرساخت بلاک‌چین مقیاس‌پذیر",
    logo: "/placeholder.svg?height=60&width=120",
    website: "https://blockinfra.com",
    category: "infrastructure",
    tier: "gold",
    integration: "Node Integration",
    users: "50+",
    volume: "$1B+",
  },
  {
    name: "TokenBridge",
    description: "پل ارتباطی بین زنجیره‌ها",
    logo: "/placeholder.svg?height=60&width=120",
    website: "https://tokenbridge.io",
    category: "infrastructure",
    tier: "silver",
    integration: "Bridge Protocol",
    users: "200K+",
    volume: "$800M+",
  },
  {
    name: "MetaWallet",
    description: "کیف پول وب ۳ پیشرفته",
    logo: "/placeholder.svg?height=60&width=120",
    website: "https://metawallet.app",
    category: "wallet",
    tier: "bronze",
    integration: "Web3 Provider",
    users: "300K+",
    volume: "$150M+",
  },
]

const categories = [
  { key: "all", label: "همه شرکا", count: partners.length },
  { key: "exchange", label: "صرافی‌ها", count: partners.filter((p) => p.category === "exchange").length },
  { key: "wallet", label: "کیف پول‌ها", count: partners.filter((p) => p.category === "wallet").length },
  { key: "defi", label: "DeFi", count: partners.filter((p) => p.category === "defi").length },
  { key: "infrastructure", label: "زیرساخت", count: partners.filter((p) => p.category === "infrastructure").length },
]

export function PartnerCategories() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredPartners =
    activeCategory === "all" ? partners : partners.filter((partner) => partner.category === activeCategory)

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "gold":
        return "bg-yellow-100 text-yellow-800"
      case "silver":
        return "bg-gray-100 text-gray-800"
      case "bronze":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "gold":
        return "🥇"
      case "silver":
        return "🥈"
      case "bronze":
        return "🥉"
      default:
        return "⭐"
    }
  }

  return (
    <section className="section-padding bg-background-default" role="region" aria-labelledby="partners-title">
      <div className="container-max px-4">
        <div className="text-center mb-16">
          <h2 id="partners-title" className="text-h2 text-primary-main mb-4">
            شرکای اکوسیستم
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            شرکا و سرویس‌هایی که با پلتفرم Q2 یکپارچه شده‌اند
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 space-x-reverse ${
                activeCategory === category.key
                  ? "bg-primary-main text-text-inverted"
                  : "bg-background-paper text-text-secondary hover:bg-primary-main/10 hover:text-primary-main"
              }`}
            >
              <span>{category.label}</span>
              <Badge className="bg-secondary-main text-text-inverted">{category.count}</Badge>
            </button>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPartners.map((partner, index) => (
            <Card key={index} className="hover:shadow-high transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={`لوگو ${partner.name}`}
                    className="h-12 object-contain"
                  />
                  <Badge className={getTierColor(partner.tier)}>
                    {getTierIcon(partner.tier)} {partner.tier}
                  </Badge>
                </div>
                <CardTitle className="text-primary-main">{partner.name}</CardTitle>
                <CardDescription>{partner.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Users className="w-4 h-4 text-neutral-main" />
                    <span className="text-text-secondary">{partner.users}</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <TrendingUp className="w-4 h-4 text-neutral-main" />
                    <span className="text-text-secondary">{partner.volume}</span>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-text-secondary">نوع یکپارچگی: </span>
                  <Badge variant="outline">{partner.integration}</Badge>
                </div>

                <Button variant="outline" className="w-full" onClick={() => window.open(partner.website, "_blank")}>
                  <ExternalLink className="w-4 h-4 ml-2" />
                  مشاهده وب‌سایت
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Partnership Tiers Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-4xl mb-4">🥇</div>
              <h3 className="font-bold text-primary-main mb-2">شریک طلایی</h3>
              <p className="text-sm text-text-secondary">یکپارچگی عمیق، حجم بالا، پشتیبانی اولویت‌دار</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-4xl mb-4">🥈</div>
              <h3 className="font-bold text-primary-main mb-2">شریک نقره‌ای</h3>
              <p className="text-sm text-text-secondary">یکپارچگی استاندارد، حجم متوسط، پشتیبانی عادی</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-4xl mb-4">🥉</div>
              <h3 className="font-bold text-primary-main mb-2">شریک برنزی</h3>
              <p className="text-sm text-text-secondary">یکپارچگی پایه، شروع همکاری، پشتیبانی استاندارد</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

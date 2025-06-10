"use client"
import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

interface Chain {
  id: string
  name: string
  icon: string
  category: "layer1" | "layer2" | "sidechain" | "app-specific"
  tokens: string[]
  status: "active" | "coming-soon"
}

const chains: Chain[] = [
  {
    id: "ethereum",
    name: "اتریوم",
    icon: "/placeholder.svg?height=40&width=40",
    category: "layer1",
    tokens: ["ETH", "USDT", "USDC", "Q2T", "DAI"],
    status: "active",
  },
  {
    id: "bsc",
    name: "بایننس اسمارت چین",
    icon: "/placeholder.svg?height=40&width=40",
    category: "layer1",
    tokens: ["BNB", "USDT", "BUSD", "Q2T"],
    status: "active",
  },
  {
    id: "polygon",
    name: "پالیگان",
    icon: "/placeholder.svg?height=40&width=40",
    category: "layer2",
    tokens: ["MATIC", "USDT", "USDC", "Q2T"],
    status: "active",
  },
  {
    id: "avalanche",
    name: "اولنچ",
    icon: "/placeholder.svg?height=40&width=40",
    category: "layer1",
    tokens: ["AVAX", "USDT", "USDC", "Q2T"],
    status: "active",
  },
  {
    id: "arbitrum",
    name: "آربیتروم",
    icon: "/placeholder.svg?height=40&width=40",
    category: "layer2",
    tokens: ["ETH", "USDT", "USDC", "Q2T"],
    status: "active",
  },
  {
    id: "optimism",
    name: "اپتیمیزم",
    icon: "/placeholder.svg?height=40&width=40",
    category: "layer2",
    tokens: ["ETH", "USDT", "USDC", "Q2T"],
    status: "active",
  },
  {
    id: "solana",
    name: "سولانا",
    icon: "/placeholder.svg?height=40&width=40",
    category: "layer1",
    tokens: ["SOL", "USDT", "USDC", "Q2T"],
    status: "active",
  },
  {
    id: "near",
    name: "نیر",
    icon: "/placeholder.svg?height=40&width=40",
    category: "layer1",
    tokens: ["NEAR", "USDT", "USDC"],
    status: "active",
  },
  {
    id: "cosmos",
    name: "کازموس",
    icon: "/placeholder.svg?height=40&width=40",
    category: "layer1",
    tokens: ["ATOM", "USDT"],
    status: "active",
  },
  {
    id: "polkadot",
    name: "پولکادات",
    icon: "/placeholder.svg?height=40&width=40",
    category: "layer1",
    tokens: ["DOT", "USDT"],
    status: "coming-soon",
  },
  {
    id: "aptos",
    name: "اپتوس",
    icon: "/placeholder.svg?height=40&width=40",
    category: "layer1",
    tokens: ["APT", "USDT", "USDC"],
    status: "coming-soon",
  },
  {
    id: "sui",
    name: "سویی",
    icon: "/placeholder.svg?height=40&width=40",
    category: "layer1",
    tokens: ["SUI", "USDT"],
    status: "coming-soon",
  },
]

const categories = [
  { key: "all", label: "همه زنجیره‌ها" },
  { key: "layer1", label: "لایه 1" },
  { key: "layer2", label: "لایه 2" },
  { key: "sidechain", label: "زنجیره جانبی" },
  { key: "app-specific", label: "اختصاصی اپلیکیشن" },
]

export function SupportedChains() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChains = useMemo(() => {
    let filtered = chains

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((chain) => chain.category === activeCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (chain) =>
          chain.name.toLowerCase().includes(query) ||
          chain.id.toLowerCase().includes(query) ||
          chain.tokens.some((token) => token.toLowerCase().includes(query)),
      )
    }

    return filtered
  }, [activeCategory, searchQuery])

  return (
    <section className="section-padding bg-background-paper" role="region" aria-labelledby="chains-title">
      <div className="container-max px-4">
        <div className="text-center mb-16">
          <h2 id="chains-title" className="text-h2 text-primary-main mb-4">
            زنجیره‌های پشتیبانی شده
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            پل بین زنجیره‌ای Q2 از بیش از ۴۵ زنجیره بلاک‌چین پشتیبانی می‌کند
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  variant={activeCategory === category.key ? "default" : "outline"}
                  size="sm"
                >
                  {category.label}
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-main w-5 h-5" />
              <input
                type="text"
                placeholder="جستجوی زنجیره یا توکن..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-neutral-light rounded-medium focus:outline-none focus:ring-2 focus:ring-primary-light"
              />
            </div>
          </div>
        </div>

        {/* Chains Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredChains.map((chain) => (
            <Card key={chain.id} className="hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <img src={chain.icon || "/placeholder.svg"} alt={chain.name} className="w-10 h-10" />
                    <div>
                      <h3 className="font-semibold text-primary-main">{chain.name}</h3>
                      <div className="text-xs text-text-secondary">{chain.id}</div>
                    </div>
                  </div>
                  <Badge
                    className={
                      chain.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {chain.status === "active" ? "فعال" : "به‌زودی"}
                  </Badge>
                </div>

                <div>
                  <div className="text-sm text-text-secondary mb-2">توکن‌های پشتیبانی شده:</div>
                  <div className="flex flex-wrap gap-2">
                    {chain.tokens.map((token) => (
                      <Badge key={token} variant="outline">
                        {token}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredChains.length === 0 && (
          <div className="text-center py-12 text-text-secondary">
            <p>هیچ زنجیره‌ای با معیارهای جستجوی شما یافت نشد.</p>
          </div>
        )}
      </div>
    </section>
  )
}

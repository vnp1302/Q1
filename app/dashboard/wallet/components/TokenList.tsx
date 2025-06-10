"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, TrendingUp, TrendingDown, Eye, EyeOff, Star, StarOff } from "lucide-react"
import { useApi } from "@/src/hooks/useApi"

interface Token {
  id: string
  symbol: string
  name: string
  balance: number
  valueUSD: number
  price: number
  change24h: number
  change24hPercent: number
  logo: string
  isFavorite: boolean
  isStakeable: boolean
}

export function TokenList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showBalance, setShowBalance] = useState(true)
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)

  const { data: tokens, loading, error } = useApi<Token[]>("/api/wallet/tokens")

  const filteredTokens =
    tokens?.filter((token) => {
      const matchesSearch =
        token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFavorites = !showOnlyFavorites || token.isFavorite
      return matchesSearch && matchesFavorites && token.balance > 0
    }) || []

  const handleToggleFavorite = async (tokenId: string) => {
    // API call to toggle favorite
    console.log("Toggle favorite for token:", tokenId)
  }

  if (loading) {
    return <TokenListSkeleton />
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">خطا در بارگذاری لیست توکن‌ها</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">دارایی‌ها</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setShowBalance(!showBalance)}>
              {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={showOnlyFavorites ? "text-yellow-500" : ""}
            >
              {showOnlyFavorites ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="جستجوی توکن..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {filteredTokens.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              {searchQuery ? "توکنی یافت نشد" : "هیچ دارایی‌ای موجود نیست"}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredTokens.map((token) => (
                <TokenItem
                  key={token.id}
                  token={token}
                  showBalance={showBalance}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <Button variant="outline" className="w-full" size="sm">
            <Plus className="h-4 w-4 ml-2" />
            افزودن توکن جدید
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface TokenItemProps {
  token: Token
  showBalance: boolean
  onToggleFavorite: (tokenId: string) => void
}

function TokenItem({ token, showBalance, onToggleFavorite }: TokenItemProps) {
  const isPositiveChange = token.change24hPercent >= 0

  return (
    <div className="flex items-center justify-between p-3 hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={token.logo || "/placeholder.svg"} alt={token.name} />
          <AvatarFallback>{token.symbol.slice(0, 2)}</AvatarFallback>
        </Avatar>

        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{token.symbol}</span>
            {token.isStakeable && (
              <Badge variant="secondary" className="text-xs">
                قابل استیک
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={() => onToggleFavorite(token.id)} className="h-6 w-6 p-0">
              {token.isFavorite ? (
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              ) : (
                <StarOff className="h-3 w-3" />
              )}
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">{token.name}</div>
        </div>
      </div>

      <div className="text-left">
        <div className="font-medium">
          {showBalance ? (
            <>
              {token.balance.toLocaleString("fa-IR")}
              <div className="text-sm text-muted-foreground">${token.valueUSD.toLocaleString("en-US")}</div>
            </>
          ) : (
            <div className="space-y-1">
              <div className="w-16 h-4 bg-muted rounded animate-pulse" />
              <div className="w-12 h-3 bg-muted rounded animate-pulse" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 mt-1">
          {isPositiveChange ? (
            <TrendingUp className="h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-500" />
          )}
          <span className={`text-xs ${isPositiveChange ? "text-green-500" : "text-red-500"}`}>
            {isPositiveChange ? "+" : ""}
            {token.change24hPercent.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  )
}

function TokenListSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="w-20 h-6 bg-muted rounded animate-pulse" />
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-muted rounded animate-pulse" />
            <div className="w-8 h-8 bg-muted rounded animate-pulse" />
          </div>
        </div>
        <div className="w-full h-10 bg-muted rounded animate-pulse" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-full animate-pulse" />
                <div className="space-y-1">
                  <div className="w-16 h-4 bg-muted rounded animate-pulse" />
                  <div className="w-20 h-3 bg-muted rounded animate-pulse" />
                </div>
              </div>
              <div className="text-left space-y-1">
                <div className="w-16 h-4 bg-muted rounded animate-pulse" />
                <div className="w-12 h-3 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"
import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Shield, Users, TrendingUp, ExternalLink, Star } from "lucide-react"

interface Validator {
  id: string
  name: string
  address: string
  commission: number
  apr: number
  totalStaked: string
  delegators: number
  uptime: number
  status: "active" | "inactive" | "jailed"
  description: string
  website?: string
  verified: boolean
}

const validators: Validator[] = [
  {
    id: "1",
    name: "Q2 Foundation",
    address: "q2val1abc...def",
    commission: 3,
    apr: 13.2,
    totalStaked: "2.5M",
    delegators: 1250,
    uptime: 99.9,
    status: "active",
    description: "Validator رسمی بنیاد Q2",
    website: "https://q2foundation.org",
    verified: true,
  },
  {
    id: "2",
    name: "SecureStake",
    address: "q2val1ghi...jkl",
    commission: 5,
    apr: 12.8,
    totalStaked: "1.8M",
    delegators: 890,
    uptime: 99.7,
    status: "active",
    description: "Validator حرفه‌ای با تجربه بالا",
    website: "https://securestake.com",
    verified: true,
  },
  {
    id: "3",
    name: "CryptoNodes",
    address: "q2val1mno...pqr",
    commission: 4,
    apr: 13.0,
    totalStaked: "1.2M",
    delegators: 650,
    uptime: 99.5,
    status: "active",
    description: "زیرساخت قدرتمند و پایدار",
    verified: false,
  },
  {
    id: "4",
    name: "StakePool Pro",
    address: "q2val1stu...vwx",
    commission: 7,
    apr: 12.3,
    totalStaked: "950K",
    delegators: 420,
    uptime: 98.9,
    status: "active",
    description: "سرویس استیکینگ با پشتیبانی 24/7",
    website: "https://stakepoolpro.io",
    verified: true,
  },
  {
    id: "5",
    name: "BlockValidator",
    address: "q2val1yz1...234",
    commission: 6,
    apr: 12.5,
    totalStaked: "750K",
    delegators: 320,
    uptime: 99.2,
    status: "active",
    description: "Validator مستقل با کمیسیون متعادل",
    verified: false,
  },
  {
    id: "6",
    name: "NodeMaster",
    address: "q2val1abc...xyz",
    commission: 8,
    apr: 12.0,
    totalStaked: "600K",
    delegators: 280,
    uptime: 98.5,
    status: "active",
    description: "Validator با پشتیبانی فنی قوی",
    verified: false,
  },
]

const sortOptions = [
  { value: "apr", label: "بازدهی (APR)" },
  { value: "commission", label: "کمیسیون" },
  { value: "totalStaked", label: "کل استیک شده" },
  { value: "uptime", label: "آپتایم" },
  { value: "delegators", label: "تعداد delegator" },
]

const statusFilters = [
  { value: "all", label: "همه" },
  { value: "active", label: "فعال" },
  { value: "verified", label: "تأیید شده" },
]

export function ValidatorList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("apr")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredAndSortedValidators = useMemo(() => {
    const filtered = validators.filter((validator) => {
      const matchesSearch =
        validator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        validator.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        validator.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "active" && validator.status === "active") ||
        (filterStatus === "verified" && validator.verified)

      return matchesSearch && matchesStatus
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "apr":
          return b.apr - a.apr
        case "commission":
          return a.commission - b.commission
        case "totalStaked":
          return (
            Number.parseFloat(b.totalStaked.replace(/[KM]/g, "")) -
            Number.parseFloat(a.totalStaked.replace(/[KM]/g, ""))
          )
        case "uptime":
          return b.uptime - a.uptime
        case "delegators":
          return b.delegators - a.delegators
        default:
          return 0
      }
    })
  }, [searchTerm, sortBy, filterStatus])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "jailed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "فعال"
      case "inactive":
        return "غیرفعال"
      case "jailed":
        return "محبوس"
      default:
        return "نامشخص"
    }
  }

  const handleStake = (validatorId: string) => {
    // Handle staking logic
    console.log(`Staking to validator: ${validatorId}`)
  }

  return (
    <section className="section-padding bg-background-default" role="region" aria-labelledby="validators-title">
      <div className="container-max px-4">
        <div className="text-center mb-16">
          <h2 id="validators-title" className="text-h2 text-primary-main mb-4">
            لیست Validator ها
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Validator مناسب خود را انتخاب کنید و استیکینگ را شروع کنید
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-main">Validator های فعال</CardTitle>
            <CardDescription>انتخاب Validator برای شروع استیکینگ</CardDescription>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-main w-5 h-5" />
                <Input
                  placeholder="جستجوی validator..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="مرتب‌سازی بر اساس" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="فیلتر وضعیت" />
                </SelectTrigger>
                <SelectContent>
                  {statusFilters.map((filter) => (
                    <SelectItem key={filter.value} value={filter.value}>
                      {filter.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {filteredAndSortedValidators.map((validator) => (
                <div
                  key={validator.id}
                  className="border border-neutral-light rounded-medium p-6 hover:shadow-medium transition-all duration-200"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Validator Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start space-x-4 space-x-reverse">
                        <div className="w-12 h-12 bg-primary-main/10 rounded-large flex items-center justify-center">
                          <Shield className="w-6 h-6 text-primary-main" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-2 space-x-reverse mb-2">
                            <h3 className="text-lg font-bold text-primary-main">{validator.name}</h3>
                            {validator.verified && (
                              <Badge className="bg-blue-100 text-blue-800">
                                <Star className="w-3 h-3 ml-1" />
                                تأیید شده
                              </Badge>
                            )}
                            <Badge className={getStatusColor(validator.status)}>
                              {getStatusLabel(validator.status)}
                            </Badge>
                          </div>

                          <p className="text-sm text-text-secondary mb-2">{validator.description}</p>

                          <div className="flex items-center space-x-4 space-x-reverse text-sm text-text-secondary">
                            <span className="font-mono">{validator.address}</span>
                            {validator.website && (
                              <a
                                href={validator.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-main hover:text-primary-dark flex items-center space-x-1 space-x-reverse"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>وب‌سایت</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                      <div className="text-center lg:text-right">
                        <div className="text-2xl font-bold text-green-600">{validator.apr}%</div>
                        <div className="text-xs text-text-secondary">APR</div>
                      </div>

                      <div className="text-center lg:text-right">
                        <div className="text-lg font-semibold text-text-primary">{validator.commission}%</div>
                        <div className="text-xs text-text-secondary">کمیسیون</div>
                      </div>

                      <div className="text-center lg:text-right">
                        <div className="text-lg font-semibold text-text-primary">{validator.totalStaked}</div>
                        <div className="text-xs text-text-secondary">کل استیک</div>
                      </div>

                      <div className="text-center lg:text-right">
                        <div className="text-lg font-semibold text-text-primary">{validator.uptime}%</div>
                        <div className="text-xs text-text-secondary">آپتایم</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col justify-center space-y-3">
                      <div className="flex items-center space-x-2 space-x-reverse text-sm text-text-secondary">
                        <Users className="w-4 h-4" />
                        <span>{validator.delegators.toLocaleString()} delegator</span>
                      </div>

                      <Button
                        onClick={() => handleStake(validator.id)}
                        className="btn-primary"
                        disabled={validator.status !== "active"}
                      >
                        <TrendingUp className="w-4 h-4 ml-2" />
                        انتخاب برای استیک
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredAndSortedValidators.length === 0 && (
              <div className="text-center py-12 text-text-secondary">
                <Shield className="w-16 h-16 mx-auto mb-4 text-neutral-main" />
                <p>هیچ validator ای با معیارهای جستجوی شما یافت نشد.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-large">
          <h3 className="font-bold text-blue-900 mb-4">نکات مهم انتخاب Validator:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div className="flex items-start space-x-2 space-x-reverse">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <span>APR بالاتر به معنای سود بیشتر است</span>
            </div>
            <div className="flex items-start space-x-2 space-x-reverse">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <span>کمیسیون کمتر سود شما را افزایش می‌دهد</span>
            </div>
            <div className="flex items-start space-x-2 space-x-reverse">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <span>آپتایم بالا نشان‌دهنده قابلیت اعتماد است</span>
            </div>
            <div className="flex items-start space-x-2 space-x-reverse">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <span>Validator های تأیید شده امنیت بیشتری دارند</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

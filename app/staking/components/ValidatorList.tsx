"use client"
import { useState, useMemo } from "react"

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
]

export function ValidatorList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("apr")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredAndSortedValidators = useMemo(() => {
    const filtered = validators.filter(validator => {
      const matchesSearch = validator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           validator.address.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === "all" || validator.status === filterStatus
      return matchesSearch && matchesStatus
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "apr":
          return b.apr - a.apr
        case "commission":
          return a.commission - b.commission
        case "totalStaked":
          return Number.parseFloat(b.totalStaked.replace(/[KM]/g, "")) - Number.parseFloat(a.totalStaked.replace(/[KM]/g, ""))
        case "uptime":
          return b.uptime - a.uptime
        default:
          return 0
      }
    })
  }, [searchTerm, sortBy, filterStatus])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "inactive": return "bg-gray-100 text-gray-800"
      case "jailed": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "فعال"
      case "inactive": return "غیرفعال"
      case "jailed": return "محبوس"
      default: return "نامشخص"
    }
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

        { /* Filters

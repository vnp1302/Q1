"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

interface Partner {
  id: string
  name: string
  logo: string
  description: string
  category: "exchange" | "wallet" | "defi" | "infrastructure"
  website: string
}

const partners: Partner[] = [
  {
    id: "1",
    name: "CryptoExchange Pro",
    logo: "/placeholder.svg?height=60&width=120",
    description: "صرافی پیشرو در منطقه",
    category: "exchange",
    website: "https://example.com",
  },
  {
    id: "2",
    name: "SecureWallet",
    logo: "/placeholder.svg?height=60&width=120",
    description: "کیف پول امن چند زنجیره‌ای",
    category: "wallet",
    website: "https://example.com",
  },
  {
    id: "3",
    name: "DeFi Protocol",
    logo: "/placeholder.svg?height=60&width=120",
    description: "پروتکل مالی غیرمتمرکز",
    category: "defi",
    website: "https://example.com",
  },
  {
    id: "4",
    name: "BlockInfra",
    logo: "/placeholder.svg?height=60&width=120",
    description: "زیرساخت بلاک‌چین",
    category: "infrastructure",
    website: "https://example.com",
  },
  {
    id: "5",
    name: "TokenBridge",
    logo: "/placeholder.svg?height=60&width=120",
    description: "پل ارتباطی زنجیره‌ها",
    category: "infrastructure",
    website: "https://example.com",
  },
  {
    id: "6",
    name: "MetaWallet",
    logo: "/placeholder.svg?height=60&width=120",
    description: "کیف پول وب ۳",
    category: "wallet",
    website: "https://example.com",
  },
]

const categories = [
  { key: "all", label: "همه شرکا" },
  { key: "exchange", label: "صرافی‌ها" },
  { key: "wallet", label: "کیف پول‌ها" },
  { key: "defi", label: "DeFi" },
  { key: "infrastructure", label: "زیرساخت" },
]

export function PartnersShowcase() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [currentSlide, setCurrentSlide] = useState(0)

  const filteredPartners =
    activeCategory === "all" ? partners : partners.filter((partner) => partner.category === activeCategory)

  const partnersPerSlide = 3
  const totalSlides = Math.ceil(filteredPartners.length / partnersPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const getCurrentPartners = () => {
    const start = currentSlide * partnersPerSlide
    return filteredPartners.slice(start, start + partnersPerSlide)
  }

  return (
    <section className="section-padding bg-background-paper" role="region" aria-labelledby="partners-title">
      <div className="container-max px-4">
        <div className="text-center mb-16">
          <h2 id="partners-title" className="text-h2 text-primary-main mb-4">
            شرکای اکوسیستم
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            با بهترین پلتفرم‌ها و سرویس‌های بلاک‌چین همکاری می‌کنیم
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => {
                setActiveCategory(category.key)
                setCurrentSlide(0)
              }}
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

        {/* Partners Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getCurrentPartners().map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
          </div>

          {/* Navigation */}
          {totalSlides > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-4 space-x-reverse">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-primary-main text-text-inverted hover:bg-primary-dark transition-colors duration-200"
                aria-label="شریک قبلی"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="flex space-x-2 space-x-reverse">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === currentSlide ? "bg-primary-main" : "bg-neutral-light"
                    }`}
                    aria-label={`اسلاید ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-primary-main text-text-inverted hover:bg-primary-dark transition-colors duration-200"
                aria-label="شریک بعدی"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

interface PartnerCardProps {
  partner: Partner
}

function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <div className="card group hover:shadow-high transition-all duration-300 hover:-translate-y-1">
      <div className="text-center">
        <div className="mb-6">
          <img
            src={partner.logo || "/placeholder.svg"}
            alt={`لوگو ${partner.name}`}
            className="h-16 mx-auto object-contain"
          />
        </div>

        <h3 className="text-xl font-bold text-primary-main mb-2">{partner.name}</h3>
        <p className="text-text-secondary mb-4">{partner.description}</p>

        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary-main hover:text-primary-dark transition-colors duration-200 focus-visible"
        >
          <span className="ml-2">مشاهده وب‌سایت</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}

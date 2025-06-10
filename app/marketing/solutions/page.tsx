import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { SolutionCard } from "./components/SolutionCard"
import { ComparisonTable } from "./components/ComparisonTable"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

const solutions = [
  {
    id: "tokenization",
    title: "توکن‌سازی دارایی‌ها",
    description: "تبدیل دارایی‌های فیزیکی و دیجیتال به توکن‌های قابل معامله با پشتیبانی حقوقی کامل",
    features: ["پشتیبانی حقوقی", "انطباق با قوانین", "امنیت بالا", "شفافیت کامل"],
    pricing: "از ۱۰۰ دلار",
    href: "/solutions/tokenization",
  },
  {
    id: "wallet",
    title: "مدیریت کیف پول",
    description: "سیستم مدیریت کیف پول چند زنجیره‌ای با رابط کاربری ساده و امکانات پیشرفته",
    features: ["چند زنجیره‌ای", "رابط ساده", "امنیت چندلایه", "پشتیبانی ۲۴/۷"],
    pricing: "رایگان",
    href: "/solutions/wallet",
  },
  {
    id: "staking",
    title: "استیکینگ هوشمند",
    description: "سیستم استیکینگ خودکار با بازدهی بهینه و مدیریت ریسک پیشرفته",
    features: ["بازدهی بالا", "مدیریت ریسک", "استیکینگ خودکار", "گزارش‌های دقیق"],
    pricing: "کمیسیون ۵٪",
    href: "/solutions/staking",
  },
  {
    id: "bridge",
    title: "پل بین زنجیره‌ها",
    description: "انتقال امن و سریع دارایی‌ها بین زنجیره‌های مختلف بلاک‌چین",
    features: ["انتقال سریع", "امنیت بالا", "کمیسیون کم", "پشتیبانی ۴۵+ زنجیره"],
    pricing: "از ۰.۱٪",
    href: "/solutions/bridge",
  },
]

export default function SolutionsPage() {
  const breadcrumbItems = [
    { label: "خانه", href: "/" },
    { label: "راهکارها", href: "/solutions" },
  ]

  return (
    <div className="min-h-screen bg-background-default">
      <Header />

      <main role="main">
        {/* Page Header */}
        <section className="bg-primary-dark text-text-inverted py-16">
          <div className="container-max px-4">
            <Breadcrumbs items={breadcrumbItems} className="mb-8 text-neutral-light" />

            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">راهکارهای جامع پلتفرم Q2</h1>
              <p className="text-xl text-neutral-light leading-relaxed">
                مجموعه کاملی از ابزارها و خدمات برای تبدیل، مدیریت و بهینه‌سازی دارایی‌های دیجیتال شما با بالاترین
                استانداردهای امنیتی و کیفیت.
              </p>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="section-padding">
          <div className="container-max px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {solutions.map((solution) => (
                <SolutionCard key={solution.id} solution={solution} />
              ))}
            </div>

            <ComparisonTable />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

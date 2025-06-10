import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { StakingOverview } from "./components/StakingOverview"
import { ValidatorList } from "./components/ValidatorList"
import { StakingCalculator } from "./components/StakingCalculator"
import { StakingStats } from "./components/StakingStats"

export default function StakingPage() {
  const breadcrumbItems = [
    { label: "خانه", href: "/" },
    { label: "استیکینگ", href: "/staking" },
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">استیکینگ Q2</h1>
              <p className="text-xl text-neutral-light leading-relaxed">
                با استیک کردن توکن‌های Q2T، از امنیت شبکه حمایت کنید و پاداش دریافت کنید
              </p>
            </div>
          </div>
        </section>

        <StakingOverview />
        <StakingStats />
        <StakingCalculator />
        <ValidatorList />
      </main>

      <Footer />
    </div>
  )
}

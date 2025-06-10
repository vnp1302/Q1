import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { EcosystemOverview } from "./components/EcosystemOverview"
import { PartnerCategories } from "./components/PartnerCategories"
import { IntegrationShowcase } from "./components/IntegrationShowcase"
import { JoinEcosystem } from "./components/JoinEcosystem"

export default function EcosystemPage() {
  const breadcrumbItems = [
    { label: "خانه", href: "/" },
    { label: "اکوسیستم", href: "/ecosystem" },
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">اکوسیستم Q2</h1>
              <p className="text-xl text-neutral-light leading-relaxed">
                شبکه‌ای از شرکا، توسعه‌دهندگان و سرویس‌هایی که پلتفرم Q2 را قدرتمندتر می‌کنند
              </p>
            </div>
          </div>
        </section>

        <EcosystemOverview />
        <PartnerCategories />
        <IntegrationShowcase />
        <JoinEcosystem />
      </main>

      <Footer />
    </div>
  )
}

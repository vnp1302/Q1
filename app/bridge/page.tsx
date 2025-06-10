import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { BridgeOverview } from "./components/BridgeOverview"
import { BridgeForm } from "./components/BridgeForm"
import { SupportedChains } from "./components/SupportedChains"
import { TransactionHistory } from "./components/TransactionHistory"
import { BridgeFAQ } from "./components/BridgeFAQ"

export default function BridgePage() {
  const breadcrumbItems = [
    { label: "خانه", href: "/" },
    { label: "پل بین زنجیره‌ها", href: "/bridge" },
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">پل بین زنجیره‌ها</h1>
              <p className="text-xl text-neutral-light leading-relaxed">
                انتقال سریع و امن دارایی‌های دیجیتال بین زنجیره‌های مختلف بلاک‌چین
              </p>
            </div>
          </div>
        </section>

        <BridgeOverview />
        <BridgeForm />
        <SupportedChains />
        <TransactionHistory />
        <BridgeFAQ />
      </main>

      <Footer />
    </div>
  )
}

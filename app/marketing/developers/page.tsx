import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { ApiDocumentation } from "./components/ApiDocumentation"
import { SdkShowcase } from "./components/SdkShowcase"
import { CodeExamples } from "./components/CodeExamples"
import { DeveloperResources } from "./components/DeveloperResources"

export default function DevelopersPage() {
  const breadcrumbItems = [
    { label: "خانه", href: "/" },
    { label: "توسعه‌دهندگان", href: "/developers" },
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">مرکز توسعه‌دهندگان</h1>
              <p className="text-xl text-neutral-light leading-relaxed">
                ابزارها، مستندات و منابع کاملی برای ساخت اپلیکیشن‌های قدرتمند روی پلتفرم Q2
              </p>
            </div>
          </div>
        </section>

        <ApiDocumentation />
        <SdkShowcase />
        <CodeExamples />
        <DeveloperResources />
      </main>

      <Footer />
    </div>
  )
}

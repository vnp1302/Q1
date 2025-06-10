import { HeroSection } from "./components/HeroSection"
import { PartnersShowcase } from "./components/PartnersShowcase"
import { NetworkStats } from "./components/NetworkStats"
import { SecurityBadges } from "./components/SecurityBadges"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-default">
      <Header />

      <main role="main">
        <HeroSection />
        <NetworkStats />
        <PartnersShowcase />
        <SecurityBadges />
      </main>

      <Footer />
    </div>
  )
}

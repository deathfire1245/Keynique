
import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/sections/Hero"
import { Products } from "@/components/sections/Products"
import { WhyKeynique } from "@/components/sections/WhyKeynique"
import { Lifestyle } from "@/components/sections/Lifestyle"
import { CTA } from "@/components/sections/CTA"
import { Footer } from "@/components/layout/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Products />
      <WhyKeynique />
      <Lifestyle />
      <CTA />
      <Footer />
    </main>
  )
}

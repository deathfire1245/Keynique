import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/sections/Hero"
import { Products } from "@/components/sections/Products"
import { WhyKeynique } from "@/components/sections/WhyKeynique"
import { CTA } from "@/components/sections/CTA"
import { Footer } from "@/components/layout/Footer"
import { FirebaseClientProvider } from "@/firebase/client-provider"

export default function Home() {
  return (
    <FirebaseClientProvider>
      <main className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <Products />
        <WhyKeynique />
        <CTA />
        <Footer />
      </main>
    </FirebaseClientProvider>
  )
}

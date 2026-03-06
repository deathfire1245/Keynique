"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/sections/Hero"
import { Products } from "@/components/sections/Products"
import { WhyKeynique } from "@/components/sections/WhyKeynique"
import { CTA } from "@/components/sections/CTA"
import { Footer } from "@/components/layout/Footer"
import { FirebaseClientProvider } from "@/firebase/client-provider"
import { Loader } from "@/components/ui/Loader"
import { AnimatePresence } from "framer-motion"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <FirebaseClientProvider>
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>
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

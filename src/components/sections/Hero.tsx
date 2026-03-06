
"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { NeonButton } from "@/components/ui/neon-button"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { ChevronDown } from "lucide-react"

export function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 100])
  const heroImg = PlaceHolderImages.find(img => img.id === "hero-keychain")

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4">
      {/* Background Neon Gradients */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse-glow" />

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold tracking-[0.2em] uppercase mb-6"
          >
            Premium Accessories
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Small Detail. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary neon-glow-purple">
              Massive Personality.
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mb-10 mx-auto lg:mx-0">
            Premium keychains designed to upgrade your everyday carry. Collectible, minimal, and unapologetically modern.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <NeonButton size="lg" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
              Shop the Collection
            </NeonButton>
            <button 
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 text-sm font-headline font-semibold text-foreground/70 hover:text-foreground transition-colors"
            >
              Explore Drops
            </button>
          </div>
        </motion.div>

        <motion.div
          style={{ y: y1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex justify-center items-center"
        >
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-[80px] scale-75" />
          {heroImg && (
            <div className="relative w-full max-w-[500px] aspect-square">
              <Image
                src={heroImg.imageUrl}
                alt={heroImg.description}
                fill
                priority
                className="object-contain drop-shadow-[0_0_30px_rgba(139,92,246,0.2)]"
                data-ai-hint={heroImg.imageHint}
              />
            </div>
          )}
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  )
}

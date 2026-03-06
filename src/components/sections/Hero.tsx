
"use client"

import { motion } from "framer-motion"
import { NeonButton } from "@/components/ui/neon-button"
import { ChevronDown } from "lucide-react"

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4">
      {/* Background Neon Gradients */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse-glow" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold tracking-[0.2em] uppercase mb-6"
          >
            Premium Accessories
          </motion.span>
          <h1 className="text-5xl md:text-8xl font-bold leading-tight mb-8 font-headline tracking-tighter">
            Small Detail. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary neon-glow-purple">
              Massive Personality.
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-12 mx-auto">
            Premium keychains designed to upgrade your everyday carry. Collectible, minimal, and unapologetically modern.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <NeonButton size="lg" className="px-12 py-6 text-lg" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
              Shop the Collection
            </NeonButton>
            <button 
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-4 text-lg font-headline font-semibold text-foreground/70 hover:text-foreground transition-colors"
            >
              Explore Drops
            </button>
          </div>
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

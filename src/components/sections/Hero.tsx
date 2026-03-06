
"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { NeonButton } from "@/components/ui/neon-button"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import React, { useRef } from "react"

const FloatingParticle = ({ delay = 0, x = 0, y = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.1, 0.3, 0.1],
      scale: [1, 1.1, 1],
      x: [x, x + 10, x],
      y: [y, y - 20, y]
    }}
    transition={{ 
      duration: 8, 
      repeat: Infinity,
      delay 
    }}
    className="absolute w-1 h-1 bg-primary rounded-full blur-[1px]"
  />
)

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const heroImage = PlaceHolderImages.find(img => img.id === "hero-keychain")

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient pt-20 px-6"
    >
      {/* Background Subtle Accents */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px]" />

      {/* Subtle Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <FloatingParticle 
            key={i} 
            delay={i * 0.5} 
            x={Math.random() * 800 - 400} 
            y={Math.random() * 800 - 400} 
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ y: y1 }}
          className="text-left relative"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Identity Lab
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold leading-[1.1] mb-8 font-headline tracking-tighter">
            Carry Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              Identity Everywhere.
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-lg mb-12 leading-relaxed font-body font-light">
            Premium customizable keychains designed for style, durability, and everyday convenience. Engineered for the modern collective.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <NeonButton 
              size="lg" 
              className="px-12 py-7 text-lg group"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Shop Keychains
            </NeonButton>
            <button 
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative px-12 py-4 text-lg font-headline font-semibold text-foreground/70 hover:text-white transition-all group overflow-hidden rounded-md"
            >
              <span className="relative z-10">Explore Drops</span>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </button>
          </div>
        </motion.div>

        {/* Right Side: Visual - Independent Rotating Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative perspective-1000 hidden lg:block group"
        >
          <div className="relative w-full aspect-square max-w-[600px] mx-auto">
            {/* Subtle glow background without container borders */}
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-[120px] group-hover:bg-primary/10 transition-all duration-700 pointer-events-none" />
            
            <motion.div 
              animate={{ 
                rotateY: [0, 360],
                y: [0, -15, 0]
              }}
              transition={{ 
                rotateY: { duration: 25, repeat: Infinity, ease: "linear" },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative w-full h-full flex items-center justify-center p-4"
            >
              {heroImage && (
                <div className="relative w-full h-full">
                  <Image
                    src={heroImage.imageUrl}
                    alt="Premium Keychain"
                    fill
                    className="object-contain filter transition-all duration-700 group-hover:drop-shadow-[0_0_40px_rgba(139,92,246,0.5)]"
                    priority
                    data-ai-hint="rotating keychain"
                  />
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity }}
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 cursor-pointer"
        onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown size={16} className="text-primary" />
      </motion.div>
    </section>
  )
}

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

const FloatingSmallKeychain = ({ delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.4, 0.7, 0.4],
      y: [0, -10, 0],
      rotate: [0, 10, 0]
    }}
    transition={{ 
      duration: 7, 
      repeat: Infinity,
      delay 
    }}
    className="absolute -left-10 md:-left-20 top-0 w-16 h-16 md:w-24 md:h-24 pointer-events-none z-20"
  >
    <Image 
      src="https://i.postimg.cc/SsvJZtyx/keychain-removebg-preview.png" 
      alt="Detail Keychain" 
      fill 
      className="object-contain filter drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]"
    />
  </motion.div>
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
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-hero-gradient pt-24 md:pt-20 px-4 md:px-6"
    >
      {/* Background Subtle Accents */}
      <div className="absolute top-1/4 -left-40 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/5 rounded-full blur-[80px] md:blur-[120px]" />
      <div className="absolute bottom-1/4 -right-40 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-secondary/5 rounded-full blur-[80px] md:blur-[120px]" />

      {/* Subtle Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <FloatingParticle 
            key={i} 
            delay={i * 0.5} 
            x={Math.random() * 400 - 200} 
            y={Math.random() * 400 - 200} 
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ y: y1 }}
          className="text-left relative z-20"
        >
          {/* Restore small floating keychain */}
          <FloatingSmallKeychain delay={1} />

          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-[8px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-6 md:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Identity Lab
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold leading-[1.1] mb-6 md:mb-8 font-headline tracking-tighter">
            Carry Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              Identity Everywhere.
            </span>
          </h1>
          
          <p className="text-base md:text-xl text-muted-foreground max-w-lg mb-8 md:mb-12 leading-relaxed font-body font-light">
            Premium customizable keychains designed for style, durability, and everyday convenience. Engineered for the modern collective.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            <NeonButton 
              size="lg" 
              className="px-8 md:px-12 py-5 md:py-7 text-base md:text-lg group"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Shop Keychains
            </NeonButton>
            <button 
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-headline font-semibold text-foreground/70 hover:text-white transition-all group overflow-hidden rounded-md text-center"
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
          className="relative perspective-1000 mt-8 lg:mt-0"
        >
          <div className="relative w-full aspect-square max-w-[300px] md:max-w-[600px] mx-auto">
            {/* Subtle glow background */}
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-[80px] md:blur-[120px] group-hover:bg-primary/10 transition-all duration-700 pointer-events-none" />
            
            <motion.div 
              animate={{ 
                rotateY: [0, 360],
                y: [0, -10, 0]
              }}
              transition={{ 
                rotateY: { duration: 25, repeat: Infinity, ease: "linear" },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative w-full h-full flex items-center justify-center p-2 md:p-4"
            >
              {heroImage && (
                <div className="relative w-full h-full">
                  <Image
                    src={heroImage.imageUrl}
                    alt="Premium Keychain"
                    fill
                    className="object-contain filter transition-all duration-700 drop-shadow-[0_0_20px_rgba(139,92,246,0.3)] md:group-hover:drop-shadow-[0_0_40px_rgba(139,92,246,0.5)]"
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
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 cursor-pointer"
        onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown size={14} className="text-primary md:w-4 md:h-4" />
      </motion.div>
    </section>
  )
}

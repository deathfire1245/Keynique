"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { NeonButton } from "@/components/ui/neon-button"
import { ChevronDown, Key } from "lucide-react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import React, { useRef } from "react"

const FloatingParticle = ({ delay = 0, x = 0, y = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.2, 1],
      x: [x, x + 20, x],
      y: [y, y - 40, y]
    }}
    transition={{ 
      duration: 5 + Math.random() * 5, 
      repeat: Infinity,
      delay 
    }}
    className="absolute w-1 h-1 bg-primary rounded-full blur-[1px]"
  />
)

const FloatingKey = ({ delay = 0, left = "10%", top = "20%" }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0.1, 0.3, 0.1],
      y: [0, -30, 0],
      rotate: [0, 10, 0]
    }}
    transition={{ 
      duration: 8 + Math.random() * 4, 
      repeat: Infinity,
      delay 
    }}
    className="absolute text-primary/20 pointer-events-none"
    style={{ left, top }}
  >
    <Key size={24} />
  </motion.div>
)

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const heroImage = PlaceHolderImages.find(img => img.id === "hero-keychain")
  const smallKeyImage = PlaceHolderImages.find(img => img.id === "product-1")

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient animate-bg-move pt-20 px-6"
    >
      {/* Background Animated Accents */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] animate-pulse-glow" />

      {/* Floating Particles and Keys */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <FloatingParticle 
            key={i} 
            delay={i * 0.5} 
            x={Math.random() * 1000 - 500} 
            y={Math.random() * 1000 - 500} 
          />
        ))}
        <FloatingKey left="15%" top="25%" delay={1} />
        <FloatingKey left="80%" top="15%" delay={2} />
        <FloatingKey left="70%" top="75%" delay={0.5} />
        <FloatingKey left="10%" top="80%" delay={3} />
      </div>

      <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ y: y1 }}
          className="text-left relative"
        >
          {/* Small Decorative Keychain Detail */}
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 15, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 -left-20 w-32 h-32 pointer-events-none hidden xl:block"
          >
            {smallKeyImage && (
              <div className="relative w-full h-full">
                <Image
                  src={smallKeyImage.imageUrl}
                  alt="Small Keychain Detail"
                  fill
                  className="object-contain filter grayscale opacity-40 blur-[1px] hover:blur-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-[10px] font-bold tracking-[0.3em] uppercase mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
            Identity Lab
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-bold leading-[1.1] mb-8 font-headline tracking-tighter">
            Carry Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary neon-glow-purple">
              Identity Everywhere.
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-lg mb-12 leading-relaxed font-body font-light">
            Premium customizable keychains designed for style, durability, and everyday convenience. Engineered for the modern collective.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <NeonButton 
              size="lg" 
              className="px-12 py-7 text-lg group-hover:shadow-[0_0_40px_rgba(139,92,246,0.6)]"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Shop Keychains
            </NeonButton>
            <button 
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative px-12 py-4 text-lg font-headline font-semibold text-foreground/70 hover:text-white transition-all group overflow-hidden rounded-md"
            >
              <span className="relative z-10">Explore Drops</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </button>
          </div>
        </motion.div>

        {/* Right Side: 3D Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          style={{ y: y2 }}
          className="relative perspective-1000 hidden lg:block"
        >
          <motion.div
            animate={{ 
              rotateY: [0, 360],
              y: [0, -20, 0]
            }}
            transition={{ 
              rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative w-full aspect-square max-w-[500px] mx-auto group"
          >
            {/* Glowing background behind image */}
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-all duration-700" />
            
            <div className="relative w-full h-full rounded-[40px] overflow-hidden border border-white/5 bg-card/10 backdrop-blur-md shadow-2xl flex items-center justify-center p-12">
              {heroImage && (
                <div className="relative w-full h-full">
                  <Image
                    src={heroImage.imageUrl}
                    alt="Premium Keychain Mockup"
                    fill
                    className="object-contain filter drop-shadow-[0_0_30px_rgba(139,92,246,0.4)] group-hover:drop-shadow-[0_0_50px_rgba(139,92,246,0.6)] transition-all duration-700"
                    data-ai-hint="3d keychain"
                  />
                  {/* Neon Edge Highlight Effect */}
                  <div className="absolute inset-0 border border-primary/20 rounded-full animate-pulse pointer-events-none" />
                </div>
              )}
            </div>

            {/* Orbiting particles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                 className="w-full h-full relative"
               >
                 <div className="absolute top-0 left-1/2 w-2 h-2 bg-secondary rounded-full blur-[2px] shadow-[0_0_10px_#22D3EE]" />
                 <div className="absolute bottom-0 right-1/4 w-1.5 h-1.5 bg-primary rounded-full blur-[2px] shadow-[0_0_10px_#8B5CF6]" />
               </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 cursor-pointer"
        onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">Explore Drops</span>
        <ChevronDown size={16} className="text-primary" />
      </motion.div>
    </section>
  )
}

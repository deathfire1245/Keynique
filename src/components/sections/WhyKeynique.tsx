"use client"

import { motion } from "framer-motion"
import { Shield, Sparkles, Zap, Box } from "lucide-react"

const FEATURES = [
  {
    icon: <Shield className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Premium Materials",
    description: "Built with aerospace-grade titanium, carbon fiber, and surgical steel to last a lifetime."
  },
  {
    icon: <Sparkles className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Unique Designs",
    description: "Every piece follows a strict minimalist geometry, ensuring yours stands out in the details."
  },
  {
    icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />,
    title: "The EDC Standard",
    description: "Lightweight, functional, and ergonomically designed to perfect your everyday carry."
  },
  {
    icon: <Box className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Collectible Drops",
    description: "Limited series runs. Once they are gone, they never return to the store."
  }
]

export function WhyKeynique() {
  return (
    <section id="about" className="py-20 md:py-24 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6">Why Keynique?</h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">We don't just make keychains. We engineer personality into the smallest objects you own.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, borderColor: "hsl(var(--primary) / 0.3)" }}
              className="group p-6 md:p-8 bg-card border border-border rounded-xl md:rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-background border border-border flex items-center justify-center mb-4 md:mb-6 text-primary group-hover:text-secondary group-hover:border-secondary transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold font-headline mb-3 md:mb-4">{feature.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

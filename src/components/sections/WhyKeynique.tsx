
"use client"

import { motion } from "framer-motion"
import { Shield, Sparkles, Zap, Box } from "lucide-react"

const FEATURES = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Premium Materials",
    description: "Built with aerospace-grade titanium, carbon fiber, and surgical steel to last a lifetime."
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Unique Designs",
    description: "Every piece follows a strict minimalist geometry, ensuring yours stands out in the details."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "The EDC Standard",
    description: "Lightweight, functional, and ergonomically designed to perfect your everyday carry."
  },
  {
    icon: <Box className="w-8 h-8" />,
    title: "Collectible Drops",
    description: "Limited series runs. Once they are gone, they never return to the store."
  }
]

export function WhyKeynique() {
  return (
    <section id="about" className="py-24 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Why Keynique?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">We don't just make keychains. We engineer personality into the smallest objects you own.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 bg-card border border-border rounded-2xl hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-xl bg-background border border-border flex items-center justify-center mb-6 text-primary group-hover:text-secondary group-hover:border-secondary transition-colors group-hover:neon-border-cyan">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold font-headline mb-4">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

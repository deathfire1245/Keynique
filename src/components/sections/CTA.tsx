
"use client"

import { motion } from "framer-motion"
import { NeonButton } from "@/components/ui/neon-button"

export function CTA() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-background">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[200px] md:h-[400px] bg-primary/5 rounded-full blur-[80px] md:blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ borderColor: "hsl(var(--primary) / 0.2)" }}
          className="max-w-4xl mx-auto text-center border border-border p-8 md:p-16 rounded-[30px] md:rounded-[40px] bg-card/50 backdrop-blur-sm shadow-2xl overflow-hidden group transition-all duration-500"
        >
          <div className="relative z-10">
            <h2 className="text-3xl md:text-7xl font-bold mb-6 md:mb-8 font-headline tracking-tighter">
              Upgrade Your Keys.
            </h2>
            <p className="text-base md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-lg mx-auto">
              Join the collective of individuals who care about the details. Premium keychains are just one click away.
            </p>
            <NeonButton 
              size="lg" 
              variant="purple" 
              className="w-full sm:w-auto text-base md:text-lg py-4 md:py-5 px-8 md:px-12 md:group-hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
              onClick={() => window.open('https://mydukaan.io/keynique', '_blank')}
            >
              Enter the Store
            </NeonButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

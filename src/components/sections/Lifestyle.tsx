
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const IMAGES = [
  { id: "lifestyle-1", size: "col-span-1 row-span-2", label: "Automotive" },
  { id: "lifestyle-2", size: "col-span-1 row-span-1", label: "Everyday Carry" },
  { id: "lifestyle-3", size: "col-span-1 row-span-1", label: "Travel" },
]

export function Lifestyle() {
  return (
    <section className="py-24 bg-secondary-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Elevate Your Presence</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Wherever life takes you, your keys tell a story. Make it a premium one.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {IMAGES.map((item, index) => {
            const img = PlaceHolderImages.find(i => i.id === item.id)
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative group overflow-hidden rounded-2xl ${item.size}`}
              >
                {img && (
                  <Image
                    src={img.imageUrl}
                    alt={img.description}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    data-ai-hint={img.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">{item.label}</span>
                    <h4 className="text-xl font-bold mt-2">Aesthetic Integration</h4>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

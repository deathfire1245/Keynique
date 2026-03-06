"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export function Loader() {
  const mark = PlaceHolderImages.find(img => img.id === "brand-mark")

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center gap-6"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotateY: [0, 180, 360]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-24 h-24"
      >
        {mark && (
          <Image
            src={mark.imageUrl}
            alt="Keynique Loader"
            fill
            className="object-contain"
          />
        )}
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 200 }}
        transition={{ duration: 1.5, ease: "linear" }}
        className="h-[1px] bg-primary/30 relative"
      >
        <div className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)] w-full" />
      </motion.div>
      <span className="text-xs font-bold tracking-[0.5em] text-primary uppercase animate-pulse">Initializing Lab</span>
    </motion.div>
  )
}

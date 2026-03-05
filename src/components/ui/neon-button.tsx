
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "purple" | "cyan"
  size?: "sm" | "md" | "lg"
  glow?: boolean
}

export function NeonButton({
  className,
  variant = "purple",
  size = "md",
  glow = true,
  children,
  ...props
}: NeonButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-headline font-semibold transition-all duration-300 rounded-md overflow-hidden group"
  
  const variants = {
    purple: "bg-primary text-white hover:bg-primary/90 shadow-[0_0_10px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]",
    cyan: "bg-secondary text-background hover:bg-secondary/90 shadow-[0_0_10px_rgba(34,211,238,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
  }

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-10 py-4 text-base tracking-wider"
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {glow && (
        <div 
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl",
            variant === "purple" ? "bg-primary/40" : "bg-secondary/40"
          )}
        />
      )}
    </motion.button>
  )
}

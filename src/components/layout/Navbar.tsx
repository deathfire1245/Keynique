
"use client"

import { motion } from "framer-motion"
import { ShoppingBag, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-3" : "bg-transparent"
    )}>
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold font-headline tracking-tighter group flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-background font-bold text-lg">K</div>
          <span className="group-hover:text-primary transition-colors">Keynique</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <a href="#products" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Shop</a>
          <a href="#" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Drops</a>
          <a href="#" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">About</a>
          <a href="#" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Journal</a>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative text-foreground/80 hover:text-primary transition-colors">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-[10px] text-background font-bold flex items-center justify-center rounded-full">2</span>
          </button>
          <button 
            className="md:hidden text-foreground/80"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: mobileMenuOpen ? 1 : 0,
          height: mobileMenuOpen ? "auto" : 0
        }}
        className="md:hidden bg-background border-b border-border overflow-hidden"
      >
        <div className="flex flex-col gap-6 p-8">
          <a href="#products" className="text-lg font-bold" onClick={() => setMobileMenuOpen(false)}>Shop</a>
          <a href="#" className="text-lg font-bold" onClick={() => setMobileMenuOpen(false)}>Drops</a>
          <a href="#" className="text-lg font-bold" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#" className="text-lg font-bold" onClick={() => setMobileMenuOpen(false)}>Journal</a>
        </div>
      </motion.div>
    </nav>
  )
}

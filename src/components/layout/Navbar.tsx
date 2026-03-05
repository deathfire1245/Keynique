
"use client"

import { motion } from "framer-motion"
import { ShoppingBag, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { getCartCount } from "@/lib/cart"
import { CartSheet } from "@/components/cart/CartSheet"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  const logo = PlaceHolderImages.find(img => img.id === "brand-logo")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    const updateCartCount = () => {
      setCartCount(getCartCount())
    }

    updateCartCount()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("cart-updated", updateCartCount)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("cart-updated", updateCartCount)
    }
  }, [])

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-3" : "bg-transparent"
    )}>
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold font-headline tracking-tighter group flex items-center gap-3">
          {logo && (
            <div className="relative w-10 h-10 overflow-hidden rounded-lg border border-border/50 group-hover:border-primary/50 transition-colors">
              <Image 
                src={logo.imageUrl} 
                alt="Keynique Logo" 
                fill 
                className="object-cover"
                data-ai-hint={logo.imageHint}
              />
            </div>
          )}
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
          <CartSheet>
            <button className="relative text-foreground/80 hover:text-primary transition-colors group">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-[10px] text-white font-bold flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)] group-hover:scale-110 transition-transform"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </CartSheet>
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

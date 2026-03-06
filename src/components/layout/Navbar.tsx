
"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon, Home, ShoppingBag, Sparkles, Info, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { getCartCount } from "@/lib/cart"
import { CartSheet } from "@/components/cart/CartSheet"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { name: "Home", url: "/", icon: Home },
  { name: "Shop", url: "#products", icon: ShoppingBag },
  { name: "Custom", url: "#custom", icon: Sparkles },
  { name: "About", url: "#about", icon: Info },
]

export function Navbar() {
  const [activeTab, setActiveTab] = useState(NAV_ITEMS[0].name)
  const [cartCount, setCartCount] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

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
    <>
      {/* Top Header for Logo and Cart */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-[60] px-6 py-4 flex justify-between items-center transition-all duration-300",
        isScrolled ? "bg-background/40 backdrop-blur-md" : "bg-transparent"
      )}>
        <Link href="/" className="flex items-center gap-3 group">
          {logo && (
            <div className="relative w-10 h-10 overflow-hidden rounded-lg border border-border/50 group-hover:border-primary transition-colors">
              <Image 
                src={logo.imageUrl} 
                alt="Keynique Logo" 
                fill 
                className="object-cover"
              />
            </div>
          )}
          <span className="text-xl font-bold font-headline tracking-tighter group-hover:text-primary transition-colors">Keynique</span>
        </Link>

        <CartSheet>
          <button className="relative p-2 text-foreground/80 hover:text-primary transition-colors group bg-card border border-border rounded-full">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={cartCount}
                className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-[10px] text-white font-bold flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </CartSheet>
      </div>

      {/* Floating Center NavBar */}
      <div className="fixed bottom-6 md:bottom-auto md:top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 bg-background/20 border border-border/50 backdrop-blur-xl py-1.5 px-1.5 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "relative cursor-pointer text-xs md:text-sm font-semibold px-4 md:px-6 py-2.5 rounded-full transition-all duration-300",
                  "text-foreground/70 hover:text-white",
                  isActive && "text-white"
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-primary/10 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full">
                      <div className="absolute w-12 h-6 bg-primary/30 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-4 bg-primary/20 rounded-full blur-sm top-0" />
                    </div>
                  </motion.div>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

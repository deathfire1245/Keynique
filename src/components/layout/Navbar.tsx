"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon, Home, ShoppingBag, Info, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { getCartCount } from "@/lib/cart"
import { CartSheet } from "@/components/cart/CartSheet"

interface NavItem {
  name: string
  url: string
  id: string
  icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { name: "Home", url: "#hero", id: "hero", icon: Home },
  { name: "Shop", url: "#products", id: "products", icon: ShoppingBag },
  { name: "About", url: "#about", id: "about", icon: Info },
]

export function Navbar() {
  const [activeTab, setActiveTab] = useState(NAV_ITEMS[0].name)
  const [cartCount, setCartCount] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  const logo = PlaceHolderImages.find(img => img.id === "brand-logo")
  const mark = PlaceHolderImages.find(img => img.id === "brand-mark")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    const updateCartCount = () => {
      setCartCount(getCartCount())
    }

    // Scroll Spy Logic
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Trigger when section is in the middle of the viewport
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matchingItem = NAV_ITEMS.find(item => item.id === entry.target.id)
          if (matchingItem) {
            setActiveTab(matchingItem.name)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    updateCartCount()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("cart-updated", updateCartCount)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("cart-updated", updateCartCount)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Top Header for Logo and Cart */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-[60] px-6 py-4 flex justify-between items-center transition-all duration-500 will-change-transform",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-3" 
          : "bg-transparent"
      )}>
        <Link href="#hero" className="flex items-center gap-3 group">
          <div className="flex items-center gap-2">
            {mark && (
              <div className="relative w-10 h-10 overflow-hidden rounded-lg border border-border/50 group-hover:border-primary transition-colors">
                <Image 
                  src={mark.imageUrl} 
                  alt="Keynique Mark" 
                  fill 
                  className="object-cover"
                />
              </div>
            )}
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
          </div>
          <span className="text-xl font-bold font-headline tracking-tighter group-hover:text-primary transition-colors">
            Keynique<span className="text-primary">.</span>
          </span>
        </Link>

        <CartSheet>
          <button className="relative p-2 text-foreground/80 hover:text-primary transition-colors group bg-card/40 backdrop-blur-md border border-border rounded-full shadow-lg">
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
      <div className="fixed bottom-6 md:bottom-auto md:top-6 left-1/2 -translate-x-1/2 z-50 transform-gpu">
        <div className={cn(
          "flex items-center gap-1 border transition-all duration-500 py-1.5 px-1.5 rounded-full shadow-[0_0_40px_rgba(0,0,0,0.6)] will-change-transform",
          isScrolled 
            ? "bg-background/60 border-primary/20 backdrop-blur-xl scale-95 md:scale-100" 
            : "bg-background/20 border-border/30 backdrop-blur-sm"
        )}>
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
                  "text-foreground/60 hover:text-white transform-gpu",
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
                      stiffness: 350,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full">
                      <div className="absolute w-12 h-6 bg-primary/40 rounded-full blur-md -top-2 -left-2" />
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
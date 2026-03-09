"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Home, ShoppingBag, Info, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { getCartCount } from "@/lib/cart"
import { CartSheet } from "@/components/cart/CartSheet"

const NAV_ITEMS = [
  { name: "Home", href: "#hero", id: "hero", icon: Home },
  { name: "Shop", href: "#products", id: "products", icon: ShoppingBag },
  { name: "About", href: "#about", id: "about", icon: Info },
]

export function Navbar() {
  const [activeTab, setActiveTab] = useState("Home")
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Update blur state
      setIsScrolled(window.scrollY > 20)
      
      // Manual Scroll Spy Logic
      const scrollPosition = window.scrollY + 100 // Buffer for offset

      const sections = NAV_ITEMS.map(item => {
        const element = document.getElementById(item.id)
        return {
          name: item.name,
          offsetTop: element ? element.offsetTop : 0,
          height: element ? element.offsetHeight : 0
        }
      })

      const currentSection = sections.reduce((acc, section) => {
        if (scrollPosition >= section.offsetTop - 50) {
          return section.name
        }
        return acc
      }, "Home")

      setActiveTab(currentSection)
    }

    const updateCartCount = () => {
      setCartCount(getCartCount())
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("cart-updated", updateCartCount)
    
    // Initial checks
    handleScroll()
    updateCartCount()
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("cart-updated", updateCartCount)
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)
    
    if (element) {
      const offset = 80 // Height of navbar + padding
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 transform-gpu",
      isScrolled 
        ? "bg-background/80 backdrop-blur-xl border-b border-white/10 py-2 md:py-3 shadow-2xl" 
        : "bg-transparent py-4 md:py-5"
    )}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Branding Area */}
        <Link 
          href="#hero" 
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-2 md:gap-3 group shrink-0"
        >
          <Image 
            src="https://i.postimg.cc/JnVkm2fY/IMG-20260305-234455-127-removebg-preview.png" 
            alt="Keynique Logo" 
            width={28} 
            height={28} 
            className="object-contain md:w-8 md:h-8"
          />
          <span className="text-lg md:text-xl font-bold font-headline tracking-tighter group-hover:text-primary transition-colors">
            Keynique<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Centered Moving Navigation Bar */}
        <div className="flex items-center gap-0.5 md:gap-1 bg-card/40 backdrop-blur-md border border-white/10 p-0.5 md:p-1 rounded-full shadow-lg">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.name
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "relative px-3 md:px-6 py-1.5 md:py-2 text-[10px] md:text-sm font-semibold rounded-full transition-all duration-300 transform-gpu",
                  isActive ? "text-white" : "text-foreground/60 hover:text-white"
                )}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <item.icon size={12} className={cn("md:hidden", isActive && "text-primary")} />
                  <span className="hidden md:inline">{item.name}</span>
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="nav-lamp"
                    className="absolute inset-0 bg-primary/20 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-4 md:w-8 h-1 bg-primary rounded-full shadow-[0_0_15px_hsl(var(--primary))]" />
                  </motion.div>
                )}
              </Link>
            )
          })}
        </div>

        {/* Actions Area */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <CartSheet>
            <button className="relative p-2 md:p-2.5 text-foreground/90 hover:text-primary transition-colors bg-card/60 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
              <ShoppingCart size={18} className="md:w-5 md:h-5" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-primary text-[8px] md:text-[10px] text-white font-bold flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </CartSheet>
        </div>
      </div>
    </nav>
  )
}

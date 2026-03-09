
"use client"

import { useState, useEffect } from "react"
import { ShoppingBag, X, Plus, Minus, Trash2, ExternalLink } from "lucide-react"
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet"
import { getCart, removeFromCart, updateQuantity, getCartTotal, type CartItem } from "@/lib/cart"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { NeonButton } from "@/components/ui/neon-button"

export function CartSheet({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)

  const refreshCart = () => {
    setItems(getCart())
    setTotal(getCartTotal())
  }

  useEffect(() => {
    refreshCart()
    window.addEventListener('cart-updated', refreshCart)
    return () => window.removeEventListener('cart-updated', refreshCart)
  }, [])

  const handleCheckoutRedirect = () => {
    window.open('https://mydukaan.io/keynique', '_blank')
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-background border-l border-border flex flex-col p-0">
        <SheetHeader className="p-6 border-b border-border">
          <SheetTitle className="font-headline flex items-center gap-2">
            <ShoppingBag size={20} className="text-primary" />
            Your Collection
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="popLayout">
            {items.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  <ShoppingBag size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Your cart is empty</h3>
                  <p className="text-sm text-muted-foreground">Start adding some technical artistry to your carry.</p>
                </div>
                <NeonButton 
                  size="sm" 
                  variant="purple" 
                  onClick={handleCheckoutRedirect}
                  className="mt-4"
                >
                  Visit the Lab Store
                </NeonButton>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 group"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-border bg-card">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-sm">{item.name}</h4>
                          <p className="text-primary text-xs font-bold">{item.displayPrice}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-border rounded-md overflow-hidden bg-muted/50">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-border transition-colors text-muted-foreground"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-bold px-2 w-6 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-border transition-colors text-muted-foreground"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {items.length > 0 && (
          <SheetFooter className="p-6 border-t border-border bg-card/50">
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Subtotal</span>
                <span className="text-primary">Rs. {total.toLocaleString()}</span>
              </div>
              <p className="text-xs text-muted-foreground">Finish your order on our secure platform.</p>
              <NeonButton 
                className="w-full py-6 text-base" 
                variant="purple"
                onClick={handleCheckoutRedirect}
              >
                <ExternalLink size={18} className="mr-2" />
                Checkout Now
              </NeonButton>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}

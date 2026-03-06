
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { NeonButton } from "@/components/ui/neon-button"
import { ShoppingCart, ExternalLink } from "lucide-react"
import { addToCart } from "@/lib/cart"

const PRODUCTS = [
  { 
    id: "product-1", 
    name: "The Obsidian", 
    price: 13999, 
    displayPrice: "Rs. 13,999", 
    tag: "Limited",
    material: "Black Titanium"
  },
  { 
    id: "product-2", 
    name: "Cyber Iris", 
    price: 16499, 
    displayPrice: "Rs. 16,499", 
    tag: "New",
    material: "Iridescent Alloy"
  },
  { 
    id: "product-3", 
    name: "Titan Geometric", 
    price: 12599, 
    displayPrice: "Rs. 12,599", 
    tag: "Classic",
    material: "Surgical Steel"
  },
]

export function Products() {
  const handleAddToCartAction = (product: typeof PRODUCTS[0]) => {
    const imgData = PlaceHolderImages.find(img => img.id === product.id)
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      displayPrice: product.displayPrice,
      image: imgData?.imageUrl || "https://picsum.photos/seed/placeholder/400/400"
    })
  }

  return (
    <section id="products" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-headline tracking-tighter">Featured Collection</h2>
            <p className="text-muted-foreground">Meticulously crafted from aerospace-grade materials. Every drop is a unique expression of technical artistry in Pakistan.</p>
          </div>
          <NeonButton variant="cyan" size="sm" className="hidden md:flex">View All Drops</NeonButton>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product, index) => {
            const imgData = PlaceHolderImages.find(img => img.id === product.id)
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-card border border-border rounded-[24px] overflow-hidden p-4 hover:border-primary/50 transition-all duration-500"
              >
                <div className="absolute top-6 right-6 z-20">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-3 py-1 bg-primary/10 border border-primary/20 rounded-full backdrop-blur-md">
                    {product.tag}
                  </span>
                </div>
                
                <div className="relative aspect-square mb-6 overflow-hidden rounded-[20px] bg-background">
                  {imgData && (
                    <Image
                      src={imgData.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      data-ai-hint={imgData.imageHint}
                    />
                  )}
                  {/* Overlay for Desktop */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-6">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full flex flex-col gap-3">
                      <button 
                        onClick={() => handleAddToCartAction(product)}
                        className="w-full bg-primary text-white font-headline font-bold py-3.5 rounded-xl text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                      >
                        <ShoppingCart size={18} />
                        Quick Shop
                      </button>
                    </div>
                  </div>
                </div>

                <div className="px-2 pb-2">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold font-headline group-hover:text-primary transition-colors">{product.name}</h3>
                      <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{product.material}</p>
                    </div>
                    <span className="text-lg font-bold text-primary font-headline">{product.displayPrice}</span>
                  </div>
                  
                  {/* Mobile Action Button */}
                  <button 
                    onClick={() => handleAddToCartAction(product)}
                    className="md:hidden w-full bg-primary/10 border border-primary/20 text-primary font-headline font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all active:scale-95"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

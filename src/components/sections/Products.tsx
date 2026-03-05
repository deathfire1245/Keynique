
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { NeonButton } from "@/components/ui/neon-button"
import { ShoppingCart } from "lucide-react"
import { addToCart } from "@/lib/cart"

const PRODUCTS = [
  { 
    id: "product-1", 
    name: "The Obsidian", 
    price: 13999, 
    displayPrice: "Rs. 13,999", 
    tag: "Limited" 
  },
  { 
    id: "product-2", 
    name: "Cyber Iris", 
    price: 16499, 
    displayPrice: "Rs. 16,499", 
    tag: "New" 
  },
  { 
    id: "product-3", 
    name: "Titan Geometric", 
    price: 12599, 
    displayPrice: "Rs. 12,599", 
    tag: "Classic" 
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
      image: imgData?.imageUrl || "https://picsum.photos/seed/placeholder/200/200"
    })
  }

  return (
    <section id="products" className="py-24 bg-secondary-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Collection</h2>
            <p className="text-muted-foreground">Meticulously crafted from aerospace-grade materials. Every drop is a unique expression of technical artistry in Pakistan.</p>
          </div>
          <NeonButton variant="cyan" size="sm">View All Drops</NeonButton>
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
                className="group relative bg-background border border-border rounded-xl overflow-hidden p-6 hover:border-primary/50 transition-all duration-500"
              >
                <div className="absolute top-4 right-4 z-20">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-secondary px-2 py-1 bg-secondary/10 border border-secondary/20 rounded">
                    {product.tag}
                  </span>
                </div>
                
                <div className="relative aspect-square mb-6 overflow-hidden rounded-lg bg-card">
                  {imgData && (
                    <Image
                      src={imgData.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      data-ai-hint={imgData.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                    <button 
                      onClick={() => handleAddToCartAction(product)}
                      className="bg-primary text-white font-headline font-bold py-3 px-6 rounded-full text-xs hover:bg-primary/90 transition-all flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 duration-500"
                    >
                      <ShoppingCart size={14} />
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold font-headline group-hover:text-primary transition-colors">{product.name}</h3>
                      <p className="text-muted-foreground text-sm font-medium">Aerospace Grade Aluminum</p>
                    </div>
                    <span className="text-xl font-bold text-foreground whitespace-nowrap">{product.displayPrice}</span>
                  </div>
                  
                  <button 
                    onClick={() => handleAddToCartAction(product)}
                    className="md:hidden w-full bg-primary/10 border border-primary/20 text-primary font-headline font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all"
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

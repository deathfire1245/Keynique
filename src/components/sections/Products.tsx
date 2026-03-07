
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
    name: "Cute Teddy Couple", 
    price: 399, 
    displayPrice: "Rs. 399", 
    tag: "Trending",
    material: "Soft Adorable Pair"
  },
  { 
    id: "product-2", 
    name: "Romantic Couple Hug", 
    price: 399, 
    displayPrice: "Rs. 399", 
    tag: "Top Choice",
    material: "Stylish Affection"
  },
  { 
    id: "product-3", 
    name: "Love Memory", 
    price: 399, 
    displayPrice: "Rs. 399", 
    tag: "New Drop",
    material: "Elegant Keepsake"
  },
  { 
    id: "product-4", 
    name: "Sweet Love Cartoon", 
    price: 399, 
    displayPrice: "Rs. 399", 
    tag: "Playful",
    material: "Fun & Cheerful"
  },
  { 
    id: "product-5", 
    name: "Couple Bond", 
    price: 399, 
    displayPrice: "Rs. 399", 
    tag: "Bestseller",
    material: "Strong Connection"
  },
  { 
    id: "product-6", 
    name: "Cute Love Charm", 
    price: 399, 
    displayPrice: "Rs. 399", 
    tag: "Essential",
    material: "Sweet Aesthetic"
  },
  { 
    id: "product-7", 
    name: "Romantic Gift", 
    price: 399, 
    displayPrice: "Rs. 399", 
    tag: "Gift Choice",
    material: "Heartfelt Symbol"
  },
  { 
    id: "product-8", 
    name: "Adorable Couple", 
    price: 399, 
    displayPrice: "Rs. 399", 
    tag: "Modern",
    material: "Stylish Detail"
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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-headline tracking-tighter">Featured Collection</h2>
          </div>
          <NeonButton variant="cyan" size="sm" className="hidden md:flex">View All Drops</NeonButton>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product, index) => {
            const imgData = PlaceHolderImages.find(img => img.id === product.id)
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-card border border-border rounded-[24px] overflow-hidden p-4 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
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
                  {/* Subtle Glow on Hover Effect */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-6">
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

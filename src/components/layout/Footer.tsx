import { Instagram, Twitter, Mail } from "lucide-react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export function Footer() {
  return (
    <footer className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        {/* Neon Line Separator Top */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-20" />

        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <a href="/" className="text-3xl font-bold font-headline tracking-tighter mb-6 flex items-center gap-3">
              <span>Keynique<span className="text-primary">.</span></span>
            </a>
            <p className="text-muted-foreground max-w-sm mb-8">
              Redefining the standard of everyday essentials through technical artistry and minimalist design. Based in the future, built for now.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:border-primary transition-all group">
                <Instagram size={18} className="group-hover:text-background" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:border-primary transition-all group">
                <Twitter size={18} className="group-hover:text-background" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:border-primary transition-all group">
                <Mail size={18} className="group-hover:text-background" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold font-headline mb-6 text-sm uppercase tracking-widest">Brand</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">The Lab</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold font-headline mb-6 text-sm uppercase tracking-widest">Support</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/50 text-xs text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} Keynique Limited. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

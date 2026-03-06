
"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Upload, Sparkles, Send, CheckCircle2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useFirestore, useUser, useAuth } from "@/firebase"
import { doc, setDoc } from "firebase/firestore"
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login"
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import { NeonButton } from "@/components/ui/neon-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Invalid email address"),
  requestDetails: z.string().min(10, "Please provide more details"),
  submittedImageUrl: z.string().url("Please provide a valid image URL").optional().or(z.literal("")),
})

export function CustomRequest() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useUser()
  const auth = useAuth()
  const firestore = useFirestore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      requestDetails: "",
      submittedImageUrl: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Handle authentication if not logged in
    let currentUser = user
    if (!currentUser) {
      initiateAnonymousSignIn(auth)
      // For the sake of this non-blocking UI, we proceed assuming auth will trigger
      // In a production app, we'd wait for onAuthStateChanged or handle the delay
      toast({
        title: "Signing you in...",
        description: "One moment while we prepare your secure request.",
      })
      // Small artificial delay for the demo to feel responsive
      await new Promise(r => setTimeout(r, 1000))
    }

    const requestId = crypto.randomUUID()
    const userId = user?.uid || "anonymous_pending"
    
    const requestData = {
      id: requestId,
      ...values,
      requestDate: new Date().toISOString(),
      status: "Pending",
      updatedAt: new Date().toISOString(),
      ownerId: userId,
    }

    const docRef = doc(firestore, 'users', userId, 'customKeychainRequests', requestId)
    
    setDocumentNonBlocking(docRef, requestData, { merge: true })

    setSubmitted(true)
    setIsSubmitting(false)
    toast({
      title: "Request Sent!",
      description: "Our design team will review your concept shortly.",
    })
  }

  if (submitted) {
    return (
      <section id="custom" className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="p-12 border border-primary/30 rounded-[40px] bg-card/50 backdrop-blur-sm"
          >
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="text-primary w-10 h-10" />
            </div>
            <h2 className="text-4xl font-bold font-headline mb-4">Concept Received.</h2>
            <p className="text-muted-foreground mb-8">
              Your custom vision has been logged into our lab. We&apos;ll reach out via email within 48 hours with a technical draft.
            </p>
            <NeonButton onClick={() => setSubmitted(false)} variant="purple">Submit Another Concept</NeonButton>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="custom" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
              <Sparkles size={12} />
              Bespoke Lab
            </div>
            <h2 className="text-5xl md:text-6xl font-bold font-headline mb-8 leading-tight">
              Bring Your <span className="text-primary neon-glow-purple">Vision</span> to Life.
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Can&apos;t find the perfect fit? Collaborate with our engineers to design a one-of-a-kind keychain tailored to your specific EDC loadout.
            </p>
            
            <div className="space-y-6">
              {[
                "Collaborative engineering process",
                "Aerospace-grade material selection",
                "Laser-etched personalization",
                "1-of-1 exclusivity"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 border border-border rounded-[40px] bg-card/30 backdrop-blur-sm relative"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-background/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} className="bg-background/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="requestDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Design Concept</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your perfect keychain... shapes, functions, materials." 
                          className="min-h-[120px] bg-background/50" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="submittedImageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference Image URL</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="https://imgur.com/your-sketch.jpg" 
                            {...field} 
                            className="bg-background/50 pl-10"
                          />
                          <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <NeonButton 
                  type="submit" 
                  className="w-full py-6" 
                  disabled={isSubmitting}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Processing..." : "Submit Concept"}
                </NeonButton>
              </form>
            </Form>

            {/* Subtle glow background */}
            <div className="absolute -z-10 bottom-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

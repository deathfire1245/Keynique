
"use client"

export type CartItem = {
  id: string
  name: string
  price: number
  displayPrice: string
  image: string
  quantity: number
}

const CART_STORAGE_KEY = 'keynique-cart'

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem(CART_STORAGE_KEY)
  return saved ? JSON.parse(saved) : []
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  window.dispatchEvent(new Event('cart-updated'))
}

export function addToCart(product: Omit<CartItem, 'quantity'>) {
  const cart = getCart()
  const existingItem = cart.find(item => item.id === product.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }

  saveCart(cart)
}

export function removeFromCart(productId: string) {
  const cart = getCart().filter(item => item.id !== productId)
  saveCart(cart)
}

export function updateQuantity(productId: string, delta: number) {
  const cart = getCart()
  const item = cart.find(i => i.id === productId)
  if (item) {
    item.quantity = Math.max(1, item.quantity + delta)
    saveCart(cart)
  }
}

export function getCartCount(): number {
  return getCart().reduce((acc, item) => acc + item.quantity, 0)
}

export function getCartTotal(): number {
  return getCart().reduce((acc, item) => acc + (item.price * item.quantity), 0)
}

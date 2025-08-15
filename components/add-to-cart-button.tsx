"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { ShoppingBag, Check } from "lucide-react"
import { useState } from "react"

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    image: string
    category: string
  }
  size?: string
  color?: string
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  children?: React.ReactNode
}

export function AddToCartButton({
  product,
  size,
  color,
  className,
  variant = "default",
  children,
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      size,
      color,
    })

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <Button onClick={handleAddToCart} variant={variant} className={className} disabled={isAdded}>
      {isAdded ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Ajouté !
        </>
      ) : (
        <>
          <ShoppingBag className="h-4 w-4 mr-2" />
          {children || "Ajouter au panier"}
        </>
      )}
    </Button>
  )
}

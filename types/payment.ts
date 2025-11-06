import { z } from 'zod'
import { StaticImageData } from 'next/image'

// Zod schemas for validation
export const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

// Type exports
export type EmailInput = z.infer<typeof emailSchema>
export type LoginInput = z.infer<typeof loginSchema>

// Payment flow types
export type PaymentStep = 'email' | 'payment' | 'wallet-payment' | 'confirmed'

export interface PaymentData {
  brandName: string
  brandLogo: string | StaticImageData
  tokenLogo: string | StaticImageData
  totalAmount: string
  planName: string
  billingPeriod: string
  planPrice: string
  subtotal: string
  tax: string
  totalDue: string
  walletAddress?: string
  qrCode?: string
}

export interface UserWallet {
  username: string
  balance: number
  token: string
  hasInsufficientBalance: boolean
}

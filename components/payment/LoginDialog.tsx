'use client'
import { useState } from 'react'
import { z } from 'zod'
import { loginSchema } from '@/types/payment'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FiEye, FiEyeOff } from 'react-icons/fi'
import Link from 'next/link'

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLoginSuccess: () => void
}

const LoginDialog = ({ open, onOpenChange, onLoginSuccess }: LoginDialogProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      loginSchema.parse({ email, password })
      // TODO: Implement actual login API call
      onLoginSuccess()
      setErrors({})
      onOpenChange(false)
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: { email?: string; password?: string } = {}
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as 'email' | 'password'] = error.message
          }
        })
        setErrors(fieldErrors)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center font-sora font-[600] text-[20px] text-primary">
            Login to Strimz
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
          {/* Email */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="login-email" className="font-poppins text-[14px] text-[#58556A] leading-[24px]">
              Email
            </label>
            <input
              type="email"
              id="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="gregory@gmail.com"
              className="w-full rounded-[8px] border bg-[#F9FAFB] border-[#E5E7EB] shadow-navbarShadow h-[44px] font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-primary px-4 outline-none transition duration-300 focus:border-accent"
            />
            {errors.email && <p className="text-xs text-rose-600">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="login-password" className="font-poppins text-[14px] text-[#58556A] leading-[24px]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-[8px] border bg-[#F9FAFB] border-[#E5E7EB] shadow-navbarShadow h-[44px] font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-primary px-4 pr-12 outline-none transition duration-300 focus:border-accent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#58556A] hover:text-primary transition-colors"
              >
                {showPassword ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-xs text-rose-600">{errors.password}</p>}
          </div>

          {/* Forgot Password */}
          <div className="w-full flex justify-end">
            <Link
              href="/auth/user/reset-password"
              className="font-poppins text-[14px] text-[#58556A] hover:text-accent transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-[44px] flex justify-center items-center rounded-[8px] bg-accent text-white font-poppins font-[500] text-[14px] hover:opacity-90 transition-opacity mt-2"
          >
            Log in
          </button>

          {/* Terms */}
          <p className="text-center font-poppins text-[12px] text-[#58556A] mt-2">
            By continuing you agree to{' '}
            <Link href="/" className="underline text-accent">
              Strimz Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/" className="underline text-accent">
              Privacy Policy
            </Link>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog

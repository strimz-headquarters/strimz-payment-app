'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginInput } from '@/types/payment'
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
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    reset,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: LoginInput) => {
    try {
      console.log('Login data:', data)
      // TODO: Implement actual login API call
      onLoginSuccess()
      onOpenChange(false)
      reset()
    } catch (error) {
      console.error('Failed to login:', error)
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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 py-4">
          {/* Email */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="login-email" className="font-poppins text-[14px] text-[#58556A] leading-[24px]">
              Email
            </label>
            <input
              type="email"
              id="login-email"
              {...register('email')}
              placeholder="gregory@gmail.com"
              className="w-full rounded-[8px] border bg-[#F9FAFB] border-[#E5E7EB] shadow-navbarShadow h-[44px] font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-primary px-4 outline-none transition duration-300 focus:border-accent"
            />
            {errors.email && <p className="text-xs text-rose-600">{errors.email.message}</p>}
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
                {...register('password')}
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
            {errors.password && <p className="text-xs text-rose-600">{errors.password.message}</p>}
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
            disabled={!isDirty || !isValid || isSubmitting}
            className={`w-full h-[44px] flex justify-center items-center rounded-[8px] font-poppins font-[500] text-[14px] mt-2 transition-opacity ${
              !isDirty || !isValid || isSubmitting
                ? 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                : 'bg-accent text-white hover:opacity-90'
            }`}
          >
            {isSubmitting ? 'Logging in...' : 'Log in'}
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

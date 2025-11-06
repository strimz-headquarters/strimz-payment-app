'use client'
import { useState } from 'react'
import { z } from 'zod'
import { emailSchema } from '@/types/payment'

interface EmailStepProps {
  onProceed: () => void
  onLoginClick: () => void
}

const EmailStep = ({ onProceed, onLoginClick }: EmailStepProps) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      emailSchema.parse({ email })
      // TODO: Send email to API or save to state
      onProceed()
      setError('')
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0]?.message || 'Invalid email')
      }
    }
  }

  return (
    <div className="w-full md:w-[480px] flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="email" className="font-poppins text-[14px] text-[#58556A] leading-[24px]">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="w-full rounded-[8px] border bg-[#F9FAFB] border-[#E5E7EB] shadow-navbarShadow h-[44px] font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-primary px-4 outline-none transition duration-300 focus:border-accent"
          />
          {error && <p className="text-xs text-rose-600">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full h-[44px] flex justify-center items-center rounded-[8px] bg-accent text-white font-poppins font-[500] text-[14px] hover:opacity-90 transition-opacity"
        >
          Proceed to pay
        </button>
      </form>

      <p className="text-center font-poppins text-[14px] text-[#58556A]">
        Have a Strimz account?{' '}
        <button
          type="button"
          onClick={onLoginClick}
          className="text-accent font-[500] hover:underline"
        >
          Log in
        </button>{' '}
        to make payment
      </p>
    </div>
  )
}

export default EmailStep

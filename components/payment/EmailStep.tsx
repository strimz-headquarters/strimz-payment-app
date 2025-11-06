'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailSchema, EmailInput } from '@/types/payment'

interface EmailStepProps {
  onProceed: () => void
  onLoginClick: () => void
}

const EmailStep = ({ onProceed, onLoginClick }: EmailStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<EmailInput>({
    resolver: zodResolver(emailSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: EmailInput) => {
    try {
      console.log('Email submitted:', data.email)
      // TODO: Send email to API or save to state
      onProceed()
    } catch (error) {
      console.error('Failed to submit email:', error)
    }
  }

  return (
    <div className="w-full lg:w-[480px] flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="email" className="font-poppins text-[14px] text-[#58556A] leading-[24px]">
            Email address
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            placeholder="Enter email address"
            className="w-full rounded-[8px] border bg-[#F9FAFB] border-[#E5E7EB] shadow-navbarShadow h-[44px] font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-primary px-4 outline-none transition duration-300 focus:border-accent"
          />
          {errors.email && <p className="text-xs text-rose-600">{errors.email.message}</p>}
        </div>

        <button
          type="submit"
          disabled={!isDirty || !isValid || isSubmitting}
          className={`w-full h-[44px] flex justify-center items-center rounded-[8px] font-poppins font-[500] text-[14px] transition-opacity ${!isDirty || !isValid || isSubmitting
              ? 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
              : 'bg-accent text-white hover:opacity-90'
            }`}
        >
          {isSubmitting ? 'Processing...' : 'Proceed to pay'}
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

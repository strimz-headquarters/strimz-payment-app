'use client'
import { useState, useEffect } from 'react'
import { FiCopy } from 'react-icons/fi'
import { toast } from 'sonner'

interface PaymentStepProps {
  walletAddress: string
  qrCode: string
  onPaymentConfirmed: () => void
  onLoginClick: () => void
  initialTime?: number
}

const PaymentStep = ({
  walletAddress,
  qrCode,
  onPaymentConfirmed,
  onLoginClick,
  initialTime = 300 // 5 minutes in seconds
}: PaymentStepProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress)
    toast.success('Wallet address copied to clipboard', {
      position: 'top-right',
    })
  }

  return (
    <div className="w-full md:w-[480px] flex flex-col gap-6">
      {/* QR Code */}
      <div className="w-full flex justify-center">
        <div className="w-[160px] h-[160px] bg-white p-2 rounded-[8px] border border-[#E5E7EB]">
          {/* QR code placeholder - in production, use actual QR code generator */}
          <div className="w-full h-full bg-[#F9FAFB] flex items-center justify-center text-xs text-[#6B7280]">
            QR Code
          </div>
        </div>
      </div>

      {/* Wallet Address */}
      <div className="w-full bg-[#F9FAFB] rounded-[8px] border border-[#E5E7EB] p-4 flex items-center justify-between gap-2">
        <span className="text-[#050020] font-poppins text-sm font-[500] truncate">
          {walletAddress}
        </span>
        <button
          onClick={copyToClipboard}
          className="flex-shrink-0 flex items-center gap-1 text-[#58556A] hover:text-accent transition-colors"
        >
          <FiCopy className="w-4 h-4" />
          <span className="text-sm font-poppins font-[400]">Copy</span>
        </button>
      </div>

      {/* Timer */}
      <p className="text-center font-poppins text-sm text-[#58556A]">
        Send payment within{' '}
        <span className={`font-[600] ${timeLeft < 60 ? 'text-rose-600' : 'text-accent'}`}>
          {formatTime(timeLeft)}
        </span>
      </p>

      {/* Confirm Button */}
      <button
        type="button"
        onClick={onPaymentConfirmed}
        className="w-full h-[44px] flex justify-center items-center rounded-[8px] bg-accent text-white font-poppins font-[500] text-[14px] hover:opacity-90 transition-opacity"
      >
        I&apos;ve made the payment
      </button>

      {/* Instructions */}
      <div className="w-full flex flex-col gap-4">
        <h6 className="font-sora font-[600] text-[16px] text-primary">How to make payment</h6>
        <ol className="list-decimal list-inside space-y-2 text-sm font-poppins text-[#58556A]">
          <li>Scan the QR code or copy the wallet address above to make payment.</li>
          <li>Once the transfer is complete, click on the I&apos;ve made the payment button to confirm payment.</li>
        </ol>
      </div>

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

export default PaymentStep

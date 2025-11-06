'use client'
import { UserWallet } from '@/types/payment'
import { FiAlertTriangle } from 'react-icons/fi'
import Image, { StaticImageData } from 'next/image'

interface WalletPaymentStepProps {
  userWallet: UserWallet
  tokenLogo: string | StaticImageData
  onPayWithWallet: () => void
  onLogout: () => void
}

const WalletPaymentStep = ({
  userWallet,
  tokenLogo,
  onPayWithWallet,
  onLogout
}: WalletPaymentStepProps) => {
  return (
    <div className="w-full md:w-[480px] flex flex-col gap-6">
      {/* User Info */}
      <div className="w-full flex items-center gap-2 px-4 py-2 bg-[#F9FAFB] rounded-[8px] border border-[#E5E7EB]">
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-poppins font-[600] text-sm">
          {userWallet.username.charAt(0).toUpperCase()}
        </div>
        <span className="text-[#050020] font-poppins text-sm font-[500]">
          {userWallet.username}
        </span>
      </div>

      {/* Wallet Balance */}
      <div className="w-full flex flex-col gap-2">
        <h6 className="font-poppins text-[14px] text-[#58556A]">Wallet balance</h6>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 overflow-hidden rounded-full">
            <Image
              src={tokenLogo}
              alt='token'
              className='w-full h-full'
              width={96}
              height={96}
              quality={100}
              priority
            />
          </div>
          <span className="text-primary font-sora font-[600] text-[20px]">
            {userWallet.balance} {userWallet.token}
          </span>
        </div>
      </div>

      {/* Insufficient Balance Warning */}
      {userWallet.hasInsufficientBalance && (
        <div className="w-full bg-[#FEF2F2] border border-[#FEE2E2] rounded-[8px] p-4 flex items-start gap-3">
          <FiAlertTriangle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
          <p className="text-sm font-poppins text-[#991B1B]">
            Insufficient balance. Please top up account.
          </p>
        </div>
      )}

      {/* Pay Button */}
      <button
        type="button"
        onClick={onPayWithWallet}
        disabled={userWallet.hasInsufficientBalance}
        className={`w-full h-[44px] flex justify-center items-center rounded-[8px] font-poppins font-[500] text-[14px] transition-opacity ${
          userWallet.hasInsufficientBalance
            ? 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
            : 'bg-accent text-white hover:opacity-90'
        }`}
      >
        Pay with Wallet
      </button>

      {/* Instructions */}
      <div className="w-full flex flex-col gap-4">
        <h6 className="font-sora font-[600] text-[16px] text-primary">How to make payment</h6>
        <ol className="list-decimal list-inside space-y-2 text-sm font-poppins text-[#58556A]">
          <li>Click Pay button to initiate payment to the biller</li>
        </ol>
      </div>

      {/* Logout */}
      <p className="text-center">
        <button
          type="button"
          onClick={onLogout}
          className="text-accent font-poppins text-[14px] font-[500] hover:underline"
        >
          Log out
        </button>
      </p>
    </div>
  )
}

export default WalletPaymentStep

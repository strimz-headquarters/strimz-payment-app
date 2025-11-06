'use client'
import { useState } from 'react'
import Netflixlogo from "@/public/pay/netflix.png"
import usdc from "@/public/pay/usdc.png"
import PaymentSummary from './PaymentSummary'
import EmailStep from './EmailStep'
import PaymentStep from './PaymentStep'
import WalletPaymentStep from './WalletPaymentStep'
import ConfirmedStep from './ConfirmedStep'
import LoginDialog from './LoginDialog'
import { PaymentStep as PaymentStepType, UserWallet } from '@/types/payment'
import { useRouter } from 'next/navigation'

const UserPaymentPage = () => {
    const [currentStep, setCurrentStep] = useState<PaymentStepType>('email')
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
    const [userWallet, setUserWallet] = useState<UserWallet | null>(null)

    const router = useRouter()

    // Payment data - this would come from props or API in production
    const paymentData = {
        brandName: 'Netflix',
        brandLogo: Netflixlogo,
        tokenLogo: usdc,
        totalAmount: '20.00',
        planName: 'Standard plan',
        billingPeriod: 'Billed monthly',
        planPrice: '20',
        subtotal: '20',
        tax: '0.00',
        totalDue: '20',
        walletAddress: '0x020425...5c6752',
        qrCode: 'QR_CODE_DATA_HERE'
    }

    const handleEmailProceed = () => {
        setCurrentStep('payment')
    }

    const handleLoginClick = () => {
        setIsLoginDialogOpen(true)
    }

    const handleLoginSuccess = () => {

        // Mock user wallet data - in production, this would come from API
        setUserWallet({
            username: 'Adam Smith',
            balance: 1200,
            token: 'USDC',
            hasInsufficientBalance: false
        })

        setCurrentStep('wallet-payment')
    }

    const handlePaymentConfirmed = () => {
        setCurrentStep('confirmed')
    }

    const handlePayWithWallet = () => {
        // TODO: Implement wallet payment API call
        setCurrentStep('confirmed')
    }

    const handleLogout = () => {
        setUserWallet(null)
        setCurrentStep('email')
    }

    return (
        <>
            <section className="w-full h-full flex flex-col gap-4 p-4 md:p-8">
                {/* Back Button - Hide on confirmed step */}
                {currentStep !== 'confirmed' && (
                    <div className="w-full">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex items-center gap-1 text-[#050020] font-poppins text-[14px] font-[400] hover:text-accent transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                        </button>
                    </div>
                )}

                <div className="w-full flex-1 grid lg:grid-cols-5 md:grid-cols-2 gap-4">
                    {/* Payment Summary */}
                    <PaymentSummary
                        brandLogo={paymentData.brandLogo}
                        brandName={paymentData.brandName}
                        tokenLogo={paymentData.tokenLogo}
                        totalAmount={paymentData.totalAmount}
                        planName={paymentData.planName}
                        billingPeriod={paymentData.billingPeriod}
                        planPrice={paymentData.planPrice}
                        subtotal={paymentData.subtotal}
                        tax={paymentData.tax}
                        totalDue={paymentData.totalDue}
                    />

                    {/* Payment Steps */}
                    <aside className='w-full lg:col-span-3 flex flex-col items-center justify-center p-4 md:p-8'>
                        {currentStep === 'email' && (
                            <EmailStep
                                onProceed={handleEmailProceed}
                                onLoginClick={handleLoginClick}
                            />
                        )}

                        {currentStep === 'payment' && (
                            <PaymentStep
                                walletAddress={paymentData.walletAddress!}
                                qrCode={paymentData.qrCode!}
                                onPaymentConfirmed={handlePaymentConfirmed}
                                onLoginClick={handleLoginClick}
                            />
                        )}

                        {currentStep === 'wallet-payment' && userWallet && (
                            <WalletPaymentStep
                                userWallet={userWallet}
                                tokenLogo={paymentData.tokenLogo}
                                onPayWithWallet={handlePayWithWallet}
                                onLogout={handleLogout}
                            />
                        )}

                        {currentStep === 'confirmed' && <ConfirmedStep />}
                    </aside>
                </div>
            </section>

            {/* Login Dialog */}
            <LoginDialog
                open={isLoginDialogOpen}
                onOpenChange={setIsLoginDialogOpen}
                onLoginSuccess={handleLoginSuccess}
            />
        </>
    )
}

export default UserPaymentPage
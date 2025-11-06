import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import logo from "@/public/logo/blueLogo.png"

interface PaymentSummaryProps {
    brandLogo: string | StaticImageData
    brandName: string
    tokenLogo: string | StaticImageData
    totalAmount: string
    planName: string
    billingPeriod: string
    planPrice: string
    subtotal: string
    tax: string
    totalDue: string
}

const PaymentSummary = ({
    brandLogo,
    brandName,
    tokenLogo,
    totalAmount,
    planName,
    billingPeriod,
    planPrice,
    subtotal,
    tax,
    totalDue
}: PaymentSummaryProps) => {
    return (
        <main className='w-full lg:col-span-2 flex flex-col'>
            <div className='w-full flex flex-col bg-[#F9FAFB] p-8 rounded-lg gap-10 flex-1'>
                <div className='flex items-center gap-2'>
                    <div className='w-8 h-8 overflow-hidden rounded-full'>
                        <Image src={brandLogo} alt='brand' className='w-full h-full' width={128} height={128} quality={100} priority />
                    </div>
                    <h4 className='text-[#050020] font-poppins font-[500] text-base md:text-lg'>{brandName}</h4>
                </div>

                <div className='flex flex-col gap-1.5'>
                    <h6 className='text-[#6B7280] text-xs font-[400] font-poppins uppercase'>Total Amount</h6>
                    <div className='flex items-center gap-2'>
                        <div className='w-7 h-7 overflow-hidden rounded-full'>
                            <Image src={tokenLogo} alt='token' className='w-full h-full' width={112} height={112} quality={100} priority />
                        </div>
                        <h4 className='text-[#050020] font-sora font-[600] text-base md:text-2xl'>{totalAmount}</h4>
                    </div>
                </div>

                <div className='w-full flex flex-col gap-6'>
                    <div className='w-full flex items-center justify-between'>
                        <div className='flex flex-col'>
                            <h5 className='text-[#58556A] text-base font-poppins font-[400]'>{planName}</h5>
                            <span className='text-[#6B7280] font-poppins text-xs font-[400] uppercase'>{billingPeriod}</span>
                        </div>
                        <span className='text-[#050020] font-[500] font-poppins text-base'>${planPrice}</span>
                    </div>

                    <hr className='text-[#E5E7EB]' />

                    <div className='w-full flex flex-col gap-6'>
                        <div className='w-full flex items-center justify-between'>
                            <h5 className='text-[#58556A] text-sm font-poppins font-[400]'>Subtotal</h5>
                            <span className='text-[#050020] font-[500] font-poppins text-sm'>${subtotal}</span>
                        </div>
                        <div className='w-full flex items-center justify-between'>
                            <h5 className='text-[#58556A] text-sm font-poppins font-[400]'>Tax</h5>
                            <span className='text-[#58556A] font-[400] font-poppins text-sm'>${tax}</span>
                        </div>
                    </div>

                    <hr className='text-[#E5E7EB]' />

                    <div className='w-full flex items-center justify-between'>
                        <h5 className='text-[#050020] text-sm font-poppins font-[500]'>Total due</h5>
                        <span className='text-[#050020] font-[600] font-poppins text-sm'>${totalDue}</span>
                    </div>
                </div>
            </div>

            <div className='w-full h-[60px] hidden md:flex justify-start items-center'>
                <div className='w-full flex items-center justify-between px-3'>
                    <div className='flex items-center gap-2'>
                        <span className='text-[#58556A] font-[400] font-poppins text-sm'>Powered by</span>
                        <Image src={logo} alt='logo' className='w-[64px] h-[20px]' width={407} height={128} quality={100} priority />
                    </div>

                    <div className='flex items-center gap-3'>
                        <Link href={'/'} className='text-[#58556A] text-xs font-[400] font-poppins'>Privacy</Link>
                        <Link href={'/'} className='text-[#58556A] text-xs font-[400] font-poppins'>Terms</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default PaymentSummary

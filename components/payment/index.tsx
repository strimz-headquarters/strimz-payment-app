import Image from 'next/image'
import React from 'react'
import Netflixlogo from "@/public/pay/netflix.png"
import usdc from "@/public/pay/usdc.png"
import logo from "@/public/logo/blueLogo.png"
import Link from 'next/link'

const UserPaymentPage = () => {
    return (
        <section className="w-full h-full grid lg:grid-cols-5 md:grid-cols-2 gap-4">
            {/* checkout */}
            <main className='w-full lg:col-span-2 flex flex-col'>
                <div className='w-full flex flex-col bg-[#F9FAFB] p-8 rounded-lg gap-10 flex-1'>
                    <div className='flex items-center gap-2'>
                        <div className='w-8 h-8 overflow-hidden rounded-full'>
                            <Image src={Netflixlogo} alt='brand' className='w-full h-full' width={128} height={128} quality={100} priority />
                        </div>
                        <h4 className='text-[#050020] font-poppins font-[500] text-base md:text-lg'>Netflix</h4>
                    </div>

                    <div className='flex flex-col gap-1.5'>
                        <h6 className='text-[#6B7280] text-xs font-[400] font-poppins uppercase'>Total Amount</h6>
                        <div className='flex items-center gap-2'>
                            <div className='w-7 h-7 overflow-hidden rounded-full'>
                                <Image src={usdc} alt='brand' className='w-full h-full' width={112} height={112} quality={100} priority />
                            </div>
                            <h4 className='text-[#050020] font-sora font-[600] text-base md:text-2xl'>20.00</h4>
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-6'>
                        <div className='w-full flex items-center justify-between'>
                            <div className='flex flex-col'>
                                <h5 className='text-[#58556A] text-base font-poppins font-[400]'>Standard plan</h5>
                                <span className='text-[#6B7280] font-poppins text-xs font-[400] uppercase'>Billed monthly</span>
                            </div>
                            <span className='text-[#050020] font-[500] font-poppins text-base'>$20</span>
                        </div>

                        <hr className='text-[#E5E7EB]' />

                        <div className='w-full flex flex-col gap-6'>
                            <div className='w-full flex items-center justify-between'>
                                <h5 className='text-[#58556A] text-sm font-poppins font-[400]'>Subtotal</h5>
                                <span className='text-[#050020] font-[500] font-poppins text-sm'>$20</span>
                            </div>
                            <div className='w-full flex items-center justify-between'>
                                <h5 className='text-[#58556A] text-sm font-poppins font-[400]'>Tax</h5>
                                <span className='text-[#58556A] font-[400] font-poppins text-sm'>$0.00</span>
                            </div>
                        </div>

                        <hr className='text-[#E5E7EB]' />


                        <div className='w-full flex items-center justify-between'>
                            <h5 className='text-[#050020] text-sm font-poppins font-[500]'>Total due</h5>
                            <span className='text-[#050020] font-[600] font-poppins text-sm'>$20</span>
                        </div>
                    </div>
                </div>

                <div className='w-full h-[60px] flex justify-start items-center'>
                    <div className='w-full flex items-center justify-between px-3'>
                        <div className='flex items-center gap-2'>
                            <span className='text-[#58556A] font-[400] font-poppins text-sm'>Powered by</span>
                            <Image src={logo} alt='logo' className='w-[64px] h-[20px]' width={407} height={128} quality={100} priority />
                        </div>

                        <div className='flex items-center gap-3'>
                            <Link href={'/payment'} className='text-[#58556A] text-xs font-[400] font-poppins'>Privacy</Link>
                            <Link href={'/payment'} className='text-[#58556A] text-xs font-[400] font-poppins'>Terms</Link>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default UserPaymentPage
import { FEATURE_COLUMN } from '@/constants'
import React from 'react'

const Footer = () => {
    return (
        <footer>
            <div className='flexAround w-full max-md:justify-center max-md:flex-col'>
                <div className='flex flex-col'>
                    <p className='font-bold text-2xl text-green-800 max-md:text-center'>GREEN</p>
                    <p className='max-md:text-sm max-md:text-center'>
                        We Deliver fresh grociries and snacks straight to your door.
                        <br />
                        Trusted by thousands, We aim to make your shopping
                        <br />
                        experince simple and affordable
                    </p>
                </div>
                <div className='flex justify-center items-start gap-10 max-md:gap-5'>
                    {
                        FEATURE_COLUMN.map((column, index) => (
                            <div key={index} className='flex flex-col gap-3'>
                                <p className='font-bold mb-3 max-md:mb-1'>{column.title}</p>
                                {
                                    column.links.map((link, index) => (
                                        <p className='text-sm max-md:text-xs text-gray-800' key={index}>{link}</p>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            <p className='font-bold text-sm max-md:text-xs mt-3'>Copyright 2025 @MO-GBR All Right Reserved</p>
        </footer>
    )
}

export default Footer
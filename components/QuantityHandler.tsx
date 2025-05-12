'use client';

import { useQuantityStore } from '@/Lib/zustand/Quantity'
import Image from 'next/image'
import React, { useEffect } from 'react'

const QuantityHandler = () => {
    const { quantity, increase, decrease, setQuantity } = useQuantityStore();

    useEffect(() => {
        setQuantity(1);
    }, []);

    return (
        <div className='w-full'>
            <div className='border-2 border-black rounded-full flexBetween w-[40%]'>
                <div className='flexCenter p-1 border rounded-full cursor-pointer' onClick={increase}>
                    <Image src='/icons/add.svg' alt='add' width={30} height={30} />
                </div>
                <div>{quantity}</div>
                <div className='flexCenter p-1 border rounded-full cursor-pointer' onClick={decrease}>
                    <Image src='/icons/remove.svg' alt='add' width={30} height={30} />
                </div>
            </div>
        </div>
    )
}

export default QuantityHandler
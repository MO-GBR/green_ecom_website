'use client';

import React from 'react'
import { useCartStore } from '@/Lib/zustand/Cart';
import Image from 'next/image'
import Link from 'next/link';

const CartIcon = () => {
    const { items } = useCartStore();
    return (
        <Link href='/cart' className='hover:bg-green-900 hover:rounded-full cursor-pointer p-3 flex justify-end items-start'>
            <Image src="/icons/cart.svg" alt='cart' width={30} height={30} />
            <span className='p-1 bg-green-900 text-white font-semibold rounded-full absolute'>{items.length}</span>
        </Link>
    )
}

export default CartIcon
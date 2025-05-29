'use client';

import { RemoveItemFromCart } from '@/Lib/actions/CartActions';
import { useCartStore } from '@/Lib/zustand/Cart';
import { Product } from '@/types';
import Image from 'next/image'
import React from 'react'

const options = Array(10).fill(null);

const CartItem = ({ product, quantity }: { product: Product, quantity: number }) => {
    const { removeItem, setTotalPrice } = useCartStore();

    const handleClick = async () => {
        removeItem(product.id!);
        const cartData = await RemoveItemFromCart(product.id!);
        const tp = cartData?.totalPrice as number;
        setTotalPrice(tp);
    };

    if (!product) return <p>Loading...</p>;
    
    return (
        <div className='flexBetween w-full max-md:justify-center mt-2'>
            <div className='flexCenter'>
                <div className='border p-2 border-gray-400 rounded-lg flex justify-end items-start'>
                    <Image src={product.img} alt={product.title} width={80} height={80} className='max-md:w-[250px]' />
                    <Image src='/icons/red-x.svg' alt='close' width={25} height={25} className='hidden max-md:block absolute w-[30px] cursor-pointer' onClick={handleClick} />
                </div>
                <div className='flex flex-col ml-2'>
                    <p className='font-bold'>{product.title}</p>
                    <p className='text-gray-600'>Weight: 500g</p>
                    <div className='flex'>
                        <p className='text-gray-600'>Qty:</p>
                        <select defaultValue={quantity} className='border-0 outline-0'>
                            {
                                options.map((_, i) => (
                                    <option key={i}>{i + 1}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
            </div>
            <p className='mr-16'>{`$${product.price}`}</p>
            <div>
                <Image src='/icons/red-x.svg' alt='close' width={25} height={25} className='max-md:hidden cursor-pointer' onClick={handleClick} />
            </div>
        </div>
    )
}

export default CartItem
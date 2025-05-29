'use client';

import { ClearUserCart } from '@/Lib/actions/CartActions';
import { useCartStore } from '@/Lib/zustand/Cart';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import CartItem from './CartItem';
import Link from 'next/link';

const Cart = () => {
    const { items, loading, clearCart } = useCartStore();
    const [ productData, setProductData ] = useState<any[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await Promise.all(
                items.map(async (item) => {
                    const res = await fetch(`/api/product/${item.productId}`);
                    const json = await res.json();
                    return {
                        ...json.product,
                        quantity: item.quantity,
                        productId: item.productId
                    };
                })
            );
            setProductData(products);
        };
    
        fetchProducts();
    }, [items]);

    const handleClick = async () => {
        clearCart();
        await ClearUserCart();
    };

    return (
        <div className='flex flex-col w-[80%] m-5'>
            <button className='grayBtn' onClick={handleClick}>{ loading ? 'Processing ...' : 'Empty Cart' }</button>
            <div className='flex items-baseline justify-start mb-5'>
                <h1 className='font-bold text-3xl'>Shopping Cart</h1>
                <p className='text-sm text-green-600 font-bold ml-3'>{items.length} Items</p>
            </div>
            <div className='flexBetween'>
                <p className='max-md:hidden'>Product Details</p>
                <p className='max-md:hidden'>Subtotal</p>
                <p className='max-md:hidden'>Action</p>
            </div>
            <div className='flexCenter w-full flex-col'>
                {
                    productData.map((item, index) => (
                        <CartItem key={index} product={item} quantity={item.quantity} />
                    ))
                }
            </div>
            <Link href="/" className='flex items-center mt-10'>
                <Image src='/icons/green-arrow.svg' alt='back to shopping' width={25} height={25} />
                <p className='text-[#75FB4C] font-bold'>Continue Shopping</p>
            </Link>
        </div>
    )
}

export default Cart
'use client';

import { AddItemToCart } from '@/Lib/actions/CartActions';
import { useCartStore } from '@/Lib/zustand/Cart'
import { CartItemType } from '@/types'
import Image from 'next/image';
import React, { useState } from 'react'

const CartActionsHandler = ({ cartItem } : { cartItem: { cartId: string, productId: string } }) => {
    const [ quantity, setQuantity ] = useState(1);

    const handleQuantity = (handleType: string) => {
        if(handleType === 'plus') {
            setQuantity(quantity + 1);
        }
        if(handleType === 'minus') {
            if(quantity === 1) return;
            setQuantity(quantity - 1);
        }
    };

    const { addItem, loading, setTotalPrice } = useCartStore();

    const item: CartItemType = {
        cartId: cartItem?.cartId,
        productId: cartItem?.productId,
        quantity,
    };

    const handleClick = async () => {
        addItem(item);
        const cartData = await AddItemToCart(item);
        const tp = cartData?.totalPrice as number;
        setTotalPrice(tp);
    };
    return (
        <>
            <div className='border-2 border-black rounded-full flexBetween w-[40%]'>
                <div className='flexCenter p-1 border rounded-full cursor-pointer' onClick={() => handleQuantity('plus')}>
                    <Image src='/icons/add.svg' alt='add' width={30} height={30} />
                </div>
                <div>{quantity}</div>
                <div className='flexCenter p-1 border rounded-full cursor-pointer' onClick={() => handleQuantity('minus')}>
                    <Image src='/icons/remove.svg' alt='add' width={30} height={30} />
                </div>
            </div>
            <div className='flex gap-2'>
                <button type='submit' className='grayBtn' onClick={handleClick}>
                    { loading ? 'Processing ...' : 'Add to Cart' }
                </button>
                <button className='greenBtn'>
                    Buy Now
                </button>
            </div>
        </>
    )
}

export default CartActionsHandler
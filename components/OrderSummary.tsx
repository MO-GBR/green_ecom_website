'use client';

import { useCartStore } from '@/Lib/zustand/Cart';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { loadStripe } from '@stripe/stripe-js';
import { OrderType } from '@/types';
import { CheckoutOrder } from '@/Lib/actions/OrderAction';
import { CurrentUser } from '@/Lib/utils/HandleCurrentUser';
import { formatLineItems, formatterNumber } from '@/Lib/utils/Format';
import { handleJSON } from '@/Lib/utils/HandleResponse';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const OrderSummary = ({ userId }: { userId: string }) => {
    const { totalPrice, items } = useCartStore();
    const [ address, setAddress ] = useState('');

    console.log(items);

    const taxes: number = totalPrice / 50;

    const totalAmount: number = totalPrice + taxes;

    const viewPrice: number = Number(formatterNumber.format(totalPrice + taxes));

    const jsonItems = handleJSON(items);

    const onCheckout = async () => {
        const res = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId,
                address,
                items: formatLineItems(userId, totalAmount),
                orderList: JSON.stringify(jsonItems)
            })
        });
        const data = await res.json();
        if (data.url) window.location.href = data.url;
    };
    return (
        <div className='OrderSummary'>
            <h1 className='font-bold text-2xl mb-3'>Order Summary</h1>
            <hr className='text-gray-500 mb-5' />
            <h2 className='font-semibold text-xl mb-2'>DELIVERY ADDRESS</h2>
            <div className='bg-white p-2 mb-5 rounded-full flex items-center'>
                <Image src='/icons/location-grey.svg' alt='location' width={20} height={20} />
                <input type='text' value={address} onChange={e => setAddress(e.target.value)} />
            </div>
            <h2 className='font-semibold text-xl mb-2'>PAYMENT METHOD</h2>
            <select className='w-full bg-white p-3 outline-0'>
                <option>Cash On Delivery</option>
                <option>Online Using Card</option>
            </select>
            <hr className='text-gray-500' />
            <div className='flexBetween'>
                <p>Price</p>
                <p>${totalPrice}</p>
            </div>
            <div className='flexBetween'>
                <p>Shipping Fee</p>
                <p className='text-green-500'>Free</p>
            </div>
            <div className='flexBetween'>
                <p>Tax (2%)</p>
                <p>${taxes}</p>
            </div>
            <div className='flexBetween'>
                <p className='font-semibold'>Total Amount:</p>
                <p className='font-semibold'>${viewPrice}</p>
            </div>
            <button className='greenBtn' type='button' onClick={onCheckout} role='link'>
                Place Order
            </button>
        </div>
    )
}

export default OrderSummary
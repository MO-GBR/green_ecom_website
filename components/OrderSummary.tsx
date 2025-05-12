'use client';

import { useCartStore } from '@/Lib/zustand/Cart';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { loadStripe } from '@stripe/stripe-js';
import { OrderType } from '@/types';
import { CheckoutOrder } from '@/Lib/actions/OrderAction';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const OrderSummary = () => {
    const { totalPrice } = useCartStore();
    const [ address, setAddress ] = useState('');

    const taxes: number = totalPrice / 50;
    const totalAmount: number = totalPrice + taxes;

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');
        };
        if (query.get('canceled')) {
            console.log("Order canceled -- continue to shop around and checkout when you're ready.");
        }
    }, []);

    const onCheckout = async () => {
        const order: OrderType = {
            amount: totalAmount,
            address,
        };

        await CheckoutOrder(order);
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
                <p className='font-semibold'>${totalAmount}</p>
            </div>
            <form action={onCheckout} method='post'>
                <button className='greenBtn' type='submit' role='link'>
                    Place Order
                </button>
            </form>
        </div>
    )
}

export default OrderSummary
'use client';

import React, { useEffect } from 'react'

import { useRouter } from "next/navigation";
import { useCartStore } from '@/Lib/zustand/Cart';

type Props = {
    cart: any;
};

const ClientCartSync = ({ cart }: Props) => {
    const { setCart } = useCartStore();
    const router = useRouter();

    useEffect(() => {
        if(cart) setCart(cart);
        router.push("/");
    }, [cart, setCart, router]);

    return <p>process ...</p>;
}

export default ClientCartSync
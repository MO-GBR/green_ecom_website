export const dynamic = "force-dynamic";

import Cart from '@/components/Cart';
import OrderSummary from '@/components/OrderSummary'
import { CurrentUser } from '@/Lib/utils/HandleCurrentUser';
import React from 'react'

const CartPage = async () => {
    const user = await CurrentUser();
    const userId = user?.dbUser?.id || '';
    return (
        <div className='flex justify-center items-center h-fit min-h-screen max-md:flex-col max-md:mt-[10rem]'>
            <Cart />
            <OrderSummary userId={userId} />
        </div>
    )
}

export default CartPage
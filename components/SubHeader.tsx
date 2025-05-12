'use client';

import { usePathname } from 'next/navigation';
import React from 'react'

const Announcement = () => {
    return (
        <div className='bg-green-600 rounded-b-2xl h-[6rem] max-md:h-[10rem] w-full p-1 flex items-end justify-center fixed top-0 right-0 left-0'>
            <p className='text-white font-bold'>Free Shipping on Orders Over $50</p>
        </div>
    )
};

const SubHeader = () => {
    const pathname = usePathname();
    if (pathname !== '/') return (
        <div className='h-[6rem] max-md:h-[10rem]'>
            <Announcement />
        </div>
    )
}

export default SubHeader
"use client";

import Image from 'next/image';
import React from 'react'

const error = () => {
    const handleReload = () => {
        window.location.reload();
    };
    
    return (
        <div className='h-screen flexCenter w-full'>
            <div className='border border-gray-400 rounded-2xl shadow-2xl p-4 w-fit h-fit flexCenter'>
                <div className='flexCenter flex-col gap-2'>
                    <Image src="/images/leaves.png" alt="error" width={200} height={200} className='w-[200px]' />
                    <p className='text-3xl font-bold text-green-600'>Error</p>
                    <p className='text-lg font-semibold'>Something went wrong</p>
                    <button className='p-2 bg-green-300 border border-green-500 outline-none rounded-lg m-2 cursor-pointer' onClick={handleReload}>Try Again</button>
                </div>
            </div>
        </div>
    )
}

export default error
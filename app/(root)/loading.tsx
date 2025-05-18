import Image from 'next/image'
import React from 'react'

const loading = () => {
    return (
        <div className='w-full h-screen flexCenter bg-white'>
            <div className='p-5 w-fit h-fit border border-gray-400 rounded-2xl shadow-xl flexCenter flex-col gap-7'>
                <div className='p-2 bg-green-950 rounded-xl'>
                    <h1 className='text-white font-bold text-3xl'>GREEN</h1>
                </div>
                <div className='p-5 bg-green-700 rounded-full'>
                    <Image src="/icons/spinner.svg" alt='loading' width={100} height={100} />
                </div>
            </div>
        </div>
    )
}

export default loading
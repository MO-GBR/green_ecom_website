import React from 'react'

const Newsletter = () => {
    return (
        <div className='w-full flexCenter flex-col'>
            <h1 className='font-bold text-3xl'>Never Mess a Deal!</h1>
            <h2 className='text-lg text-gray-700 max-md:text-sm max-md:text-center'>Subscribe to get the latest offers, new arrivals, and exclusive discounts</h2>
            <div className='border border-gray-300 rounded-md flexAround h-[50px] w-[60%] max-md:w-[90%] my-5'>
                <input placeholder='youremail@email.com' className='m-2' />
                <button className='bg-green-800 text-white rounded-r-md h-[50px] p-2'>Subscribe</button>
            </div>
        </div>
    )
}

export default Newsletter
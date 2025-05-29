import { FEATURES } from '@/constants'
import Image from 'next/image'
import React from 'react'

const Features = () => {
    return (
        <section className='flexAround bg-green-100 m-10 rounded-2xl w-[90%] max-md:flex-col'>
            <Image src='/images/features.png' alt='features' height={500} width={500} />
            <div className='flex justify-center items-start flex-col'>
                <h1 className='font-bold text-3xl text-green-700 mb-2 max-md:text-xl max-md:text-center max-md:w-full'>Why We Are The Best?</h1>
                {
                    FEATURES.map((item, index) => (
                        <div key={index} className='flex justify-start items-center max-md:m-2'>
                            <div className='bg-green-700 p-2 rounded-md'>
                                <Image src={item.img} alt={item.feature} width={30} height={30} />
                            </div>
                            <div className='flex flex-col justify-center items-start ml-2'>
                                <p className='font-bold text-xl max-md:text-lg'>{item.feature}</p>
                                <p className='text-gray-700 max-md:text-sm'>{item.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default Features
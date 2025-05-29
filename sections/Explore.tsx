import { CATEGORIES } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Explore = () => {
    return (
        <section className='flexCenter w-full flex-col'>
            <h1 className='text-3xl font-bold my-5 max-md:text-xl max-md:text-center'>Explore An Amazing World Here</h1>
            <div className='w-full flexCenter gap-3 max-md:flex-col'>
                {
                    CATEGORIES.map((item, index) => (
                        <Link href={`/products/${item.category}`} className={`exploreCard ${item.bgColor}`} key={index}>
                            <Image src={item.img} width={200} height={200} alt={item.title} className='w-[200px]' />
                            <p className='text-xl font-semibold'>{item.title}</p>
                        </Link>
                    ))
                }
            </div>
        </section>
    )
}

export default Explore
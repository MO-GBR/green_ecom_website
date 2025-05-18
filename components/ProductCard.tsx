'use client'

import { motion } from 'motion/react';
import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const ProductCard = ({ productData }: { productData: Product }) => {
    const { img, title, category, rating, price, id } = productData;
    const productTitle = category !== 'drinks' ? `${title} 500g` : title;
    const discount: number = Math.round(price + price / 2);
    return (
        <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} className='productCard'>
            <Image src={img} width={90} height={90} alt={title} />
            <p className='w-full text-left ml-5 text-sm text-gray-700'>{category}</p>
            <p className='w-full text-left ml-5 font-bold'>{productTitle}</p>
            <div className='w-full flex'>
                <div className='flexCenter ml-2 p-3 border border-green-500 rounded-xl'>
                    <Image src='/icons/green-star.svg' width={20} height={20} alt='rating' />
                    <p>{rating}</p>
                </div>
            </div>
            <div className='flexBetween w-full'>
                <div className='flex items-baseline ml-2'>
                    <p className='font-bold text-xl text-green-700 mr-1'>{`$${price}`}</p>
                    <p className='text-xs text-gray-600'>${discount}</p>
                </div>
                <Link href={`/product/${id}`} className='p-2 border border-green-400 bg-green-200 font-bold mr-2 rounded-xl'>Details</Link>
            </div>
        </motion.div>
    )
}

export default ProductCard
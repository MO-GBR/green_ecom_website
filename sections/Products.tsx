import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'
import React from 'react'

const Products = ({ products }: { products: Product[] }) => {
    return (
        <section className='flexCenter w-full flex-col mb-3'>
            <h1 className='text-3xl font-bold my-5'>Our Products</h1>
            <div className='w-full flexCenter gap-3'>
                <div className='grid grid-cols-4 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1'>
                    {
                        products?.map((product: Product, index: number) => (
                            <ProductCard key={index} productData={product} />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Products
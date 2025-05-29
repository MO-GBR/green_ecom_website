import prisma from '@/Lib/prisma'
import Products from '@/sections/Products';
import { PageProps } from '@/types';
import React from 'react'

const AllProducts = async ({ params }: PageProps) => {
  const { category } = await params;

  const categoryProducts = await prisma.product.findMany({
    where: {
      category: category
    }
  });

  const products = category === 'all' ? await prisma.product.findMany() : categoryProducts;

  return (
    <div className='flexCenter min-h-screen w-full'>
      <Products products={products} />
    </div>
  )
}

export default AllProducts
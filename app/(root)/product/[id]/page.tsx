import CartActionsHandler from '@/components/CartActionsHandler';
import { getUserCart } from '@/Lib/actions/CartActions';
import { auth } from '@/Lib/auth';
import prisma from '@/Lib/prisma';
import { handleJSON } from '@/Lib/utils/HandleResponse';
import Products from '@/sections/Products';
import { PageProps, Product } from '@/types'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const ProductPage = async ({ params }: PageProps) => {
    const { id }= await params;

    const session = await auth();

    const fetchProduct = await prisma.product.findUnique({
        where: { id }
    });

    const { title, img, price, rating, description, category }: Product = handleJSON(fetchProduct);

    const AllProductsInCategory = await prisma.product.findMany({
        where: {
            category: category
        }
    });

    const relatedProducts: Product[] = AllProductsInCategory.filter((p: Product) => p.id !== id);

    const discount: number = Math.round(price + price / 2);

    const cart = await getUserCart() || { id: '' };

    const cartItem: { cartId: string, productId: string } = {
        cartId: cart?.id as string,
        productId: id,
    };
    
    return (
        <div className='min-h-screen flexCenter flex-col gap-10 max-md:mt-[10rem]'>
            <div className='flex justify-center gap-10 items-start w-full max-md:flex-col'>
                <div className='flex flex-col max-md:items-center max-md:w-full'>
                    <div className='flex max-md:text-sm'>
                        <Link href='/'>Home</Link>/<Link href='/products/all'>Products</Link>/<Link href={`/products/${category}`}>{category}</Link>/<p className='text-green-600'>{title} 500g</p>
                    </div>
                    <div className='p-5 border border-gray-500'>
                        <Image src={img} alt={title} width={400} height={400} className='max-md:w-[200px]' />
                    </div>
                </div>
                <div className='flex flex-col gap-8 w-[50%] max-md:w-full max-md:m-2'>
                    <div className='flex flex-col gap-3 mt-5'>
                        <h1 className='text-3xl font-semibold'>{`${title} 500g`}</h1>
                        <div className='flexCenter p-3 border w-fit border-green-500 rounded-xl'>
                            <Image src='/icons/green-star.svg' width={30} height={30} alt='rating' />
                            <p>({rating})</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-md line-through text-gray-600'>MRP: ${discount}</p>
                        <div className='font-semibold text-2xl'>MRP: ${price}</div>
                        <p className='text-md text-gray-600'>(Inclusive of all taxes)</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='font-semibold text-2xl'>About Product</p>
                        <ul>
                            {
                                description.split('. ').map((desc, index) => (
                                    <li key={index}>{desc}.</li>
                                ))
                            }
                        </ul>
                    </div>
                    {
                        session?.user
                            ?   (
                                <>
                                    <CartActionsHandler cartItem={cartItem} />
                                </>
                            )   :   (
                                <Link href='/signin' className='w-full bg-red-300 text-red-800 font-bold border border-red-600 p-2 rounded-lg text-center'>You need to sign in to be able to buy this <br /> Click Here</Link>
                            )
                    }
                </div>
            </div>
            <h1 className='font-bold text-3xl'>Related Products</h1>
            <hr className='text-green-600 w-[20%]' />
            <Products products={relatedProducts} />
        </div>
    )
}

export default ProductPage
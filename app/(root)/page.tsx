import Button from '@/components/Button'
import prisma from '@/Lib/prisma'
import Explore from '@/sections/Explore'
import Features from '@/sections/Features'
import MobileHero from '@/sections/MobileHero'
import Newsletter from '@/sections/Newsletter'
import Products from '@/sections/Products'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <>
      <Image src='/images/banner.jpg' width={1000} height={500} alt='hero' className='w-screen top-0 max-md:hidden' />
      <Image src='/images/mobile-banner.jpg' width={1000} height={500} alt='hero' className='hidden w-screen top-0 max-md:block' />
      <MobileHero />
      <h1 className='green'>Green</h1>
      <p className='hero-caption'>
        Fuel Your Day - From Farm to Fridge.
        <br />
        Fresh Greens. Bold Energy. All in One Place.
        <br />
        Energize Naturally - Fresh Veggies Delivered.
        <br />
        <Button href='#' text='Shop Now' icon='/icons/flower.svg' type='button' />
      </p>
    </>
  )
};

const Home = async () => {
  const allProducts = await prisma.product.findMany();

  return (
    <div>
      <div className='w-full flexCenter flex-col'>
        <Hero />
        <Explore />
        <Products products={allProducts} />
        <Features />
        <Newsletter />
      </div>
    </div>
  )
}

export default Home
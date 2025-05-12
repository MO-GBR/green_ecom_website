import Button from '@/components/Button'
import React from 'react'

const MobileHero = () => {
    return (
        <section className='hidden max-md:flex flex-col justify-center items-center'>
            <p className='text-xl m-2 bg-green-300 p-5 rounded-3xl text-center'>
                Fuel Your Day - From Farm to Fridge
                <br />
                <span className='font-bold text-green-900 text-sm'>
                    Fresh Greens. Bold Energy. All in One Place
                </span>
                <br />
                Energize Naturally - Fresh Veggies Delivered
                <br />
            </p>
            <Button href='#' text='Shop Now' icon='/icons/flower.svg' type='button' />
        </section>
    )
}

export default MobileHero
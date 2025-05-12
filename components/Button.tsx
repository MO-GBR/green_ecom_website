"use client";

import { GreenButton } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Button = ({ href, icon, type, text, event }: GreenButton) => {
    const handleClick = () => {
        if(event) event();
        console.log('Clicked');
    };
    return (
        <button className='GreenButton' type={type} onClick={handleClick}>
            {
                icon && (
                    <Image src={icon} width={30} height={30} alt={text}/>
                )
            }
            {
                href ? (
                    <Link href={href}>{text}</Link>
                ) : (
                    <span>{text}</span>
                )
            }
        </button>
    )
}

export default Button
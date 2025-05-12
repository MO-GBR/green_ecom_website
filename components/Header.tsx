import React from 'react'
import UserButton from './UserButton'
import Link from 'next/link'
import { auth } from '@/Lib/auth'

const Header = async () => {
    const session = await auth();
    console.log(session?.user);
    return (
        <header>
            <Link href='/' className='logo'>GREEN</Link>
            <div className='search'>
                <input
                    placeholder='Search'
                    className='text-white placeholder:text-white'
                />
            </div>
            <UserButton />
        </header>
    )
}

export default Header
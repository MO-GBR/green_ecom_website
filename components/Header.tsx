import React from 'react'
import UserButton from './UserButton'
import Link from 'next/link'

const Header = async () => {
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
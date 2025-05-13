import React from 'react'
import UserButton from './UserButton'
import Link from 'next/link'
import SearchProduct from './SearchProduct'

const Header = async () => {
    return (
        <header>
            <Link href='/' className='logo'>GREEN</Link>
            <SearchProduct />
            <UserButton />
        </header>
    )
}

export default Header
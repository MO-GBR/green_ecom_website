import React from 'react'
import UserButton from './UserButton'
import Link from 'next/link'
import SearchProduct from './SearchProduct'
import MobileWrapper from './MobileWrapper'
import * as motion from 'motion/react-client';
import GreenHeader from './GreenHeader'

const Header = async () => {
    return (
        <>
            <GreenHeader>
                <Link href='/' className='logo'>GREEN</Link>
                <MobileWrapper />
                <SearchProduct />
                <UserButton />
            </GreenHeader>
        </>
    )
}

export default Header
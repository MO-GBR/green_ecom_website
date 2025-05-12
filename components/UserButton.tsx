export const dynamic = 'force-dynamic';

import { auth, signOut } from '@/Lib/auth'
import { handleJSON } from '@/Lib/utils/HandleResponse';
import { User } from '@/types'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import CartIcon from './CartIcon';
import { ProtectSession } from '@/Lib/utils/ProtectSession';

const UserButton = async () => {
    const session = await auth();
    
    const userData = () => {
        ProtectSession(session)
        const user: User = {
            id: session?.user.id,
            username: session?.user.name,
            email: session?.user.email
        };
        return user;
    }

    const { username, email } = handleJSON(userData);

    return (
        <div className={`flexCenter gap-3 max-md:p-1 max-md:rounded-xl max-md:w-[85%] ${session?.user && 'max-md:bg-green-800/30'}`}>
            {
                session?.user
                    ?   (
                            <>
                                <p className='text-white font-semibold' title={email}>Hi, {username}</p>
                                <CartIcon />
                                <div className='hover:bg-green-900 hover:rounded-full cursor-pointer p-3' onClick={async () => {
                                    'use server';
                                    await signOut();
                                }}>
                                    <Image src="/icons/logout.svg" alt='logout' width={30} height={30} />
                                </div>
                            </>
                    )   :   (
                        <Link href='/signin' className='bg-gray-500/25 text-white font-bold w-full p-5 mt-2 rounded-2xl text-center'>Sign In</Link>
                    )
            }
        </div>
    )
}

export default UserButton
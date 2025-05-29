import { signOut } from '@/Lib/auth';
import Image from 'next/image'
import { redirect } from 'next/navigation';
import React from 'react'

const LogoutButtom = () => {
    return (
        <form className='hover:bg-green-900 hover:rounded-full cursor-pointer p-3 flexCenter' action={
            async () => {
                "use server";
                await signOut({ redirect: false });
                redirect("/");
            }
        }>
            <button type='submit' className='flexCenter cursor-pointer'>
                <Image src="/icons/logout.svg" alt='logout' width={30} height={30} />
            </button>
        </form>
    )
}

export default LogoutButtom
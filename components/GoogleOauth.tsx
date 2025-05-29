import { signIn } from '@/Lib/auth';
import React from 'react'

const GoogleOauth = () => {
    return (
        <form className='AuthContainer' action={
            async () => {
                "use server";
                await signIn("google");
            }
        }>
            <button className='w-[80%] cursor-pointer mt-2 bg-green-200 border border-green-400 rounded-lg p-2 font-bold' type='submit'>Sign In With Google</button>
        </form>
    )
}

export default GoogleOauth
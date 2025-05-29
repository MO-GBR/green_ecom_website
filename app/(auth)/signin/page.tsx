import React from 'react'
import SignInForm from '@/components/SignInForm';
import GoogleOauth from '@/components/GoogleOauth';
import { auth } from '@/Lib/auth';
import { redirect } from 'next/navigation';

const SignUserIn = async () => {
    const session = await auth();
    if (session?.user) redirect("/auth/callback");

    return (
        <div className='allScreen flex-col gap-2'>
            <SignInForm />
            <GoogleOauth />
        </div>
    )
}

export default SignUserIn
'use client';

import React, { useEffect, useActionState } from 'react'
import Button from './Button'
import { LoginUser } from '@/Lib/actions/UserActions'
import { toast } from "react-hot-toast";
import { ActionState } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignInForm = () => {
    const router = useRouter();
    const intialState: ActionState = {
        success: false,
        message: ''
    };
    
    const [ state, formAction, isPending ] = useActionState(LoginUser, intialState);
    
    useEffect(() => {
        if (state?.message) {
            state.success ? toast.success(state.message) : toast.error(state.message);
        }
    }, [state]);

    useEffect(() => {
        if(state.success) router.push("/auth/callback");
    }, [state, router]);

    return (
        <form className='AuthContainer' action={formAction}>
            <div className='flexCenter gap-1'>
                <p className='font-bold text-3xl text-green-600'>User</p>
                <p className='font-bold text-3xl'>Login</p>
            </div>
            <label className='mt-2'>
                <span className='font-semibold'>Email</span>
                <div className='AuthInput'>
                    <input placeholder='Write your email' type='email' name='email' />
                </div>
            </label>
            <label className='mt-2'>
                <span className='font-semibold'>Password</span>
                <div className='AuthInput'>
                    <input placeholder='Write your password' type='password' name='password' />
                </div>
            </label>
            <div className='flexCenter gap-1'>
                <p>Don't have account?</p>
                <Link href='/signup' className='text-green-600'>Sign up</Link>
            </div>
            <div className='flexCenter gap-1'>
                <p>Forget your password?</p>
                <Link href='/forgetpassword' className='text-green-600'>Reset</Link>
            </div>
            <Button text={isPending ? 'Processing ...' : 'Sign In'} type='submit' icon='/icons/login.svg' />
        </form>
    )
}

export default SignInForm
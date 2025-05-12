'use client';

import Button from '@/components/Button'
import React, { useActionState, useState, useEffect } from 'react'
import { toast } from "react-hot-toast";
import { ActionState } from '@/types';
import { RegisterUser } from '@/Lib/actions/UserActions';

const SignUserUp = () => {
    const [ hasMounted, setHasMounted ] = useState(false);
    
    useEffect(() => {
        setHasMounted(true);
    }, []);
    
    const intialState: ActionState = {
        success: false,
        message: ''
    };

    const [ state, formAction, isPending ] = useActionState(RegisterUser, intialState);

    useEffect(() => {
        if (state?.message) {
            state.success ? toast.success(state.message) : toast.error(state.message);
        }
    }, [state]);

    return (
        <div className='allScreen'>
            <form className='AuthContainer' action={formAction}>
                <div className='flexCenter gap-1'>
                    <p className='font-bold text-3xl text-green-600'>User</p>
                    <p className='font-bold text-3xl'>Sign Up</p>
                </div>
                <label className='mt-2'>
                    <span className='font-semibold'>Name</span>
                    <div className='AuthInput'>
                        <input placeholder='Write your name' type='text' name='username' />
                    </div>
                </label>
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
                <label className='mt-2'>
                    <span className='font-semibold'>Confirm Password</span>
                    <div className='AuthInput'>
                        <input placeholder='Confirm your password' type='password' name='confirmPassword' />
                    </div>
                </label>
                <div className='flexCenter gap-1'>
                    <p>Alread have account?</p>
                    <p className='text-green-600'>Sign in</p>
                </div>
                <Button text={ isPending ? 'Processing ...' : 'Create Account' } type='submit' icon='/icons/signup.svg' />
            </form>
        </div>
    )
}

export default SignUserUp
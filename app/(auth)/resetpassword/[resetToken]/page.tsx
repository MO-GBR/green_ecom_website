'use client';

import Button from '@/components/Button'
import { ResetUserPassword } from '@/Lib/actions/UserActions';
import { PageProps, ActionState } from '@/types'
import { redirect } from 'next/navigation';
import React, { useActionState, useEffect } from 'react'
import { toast } from "react-hot-toast";

const ResetPassword = ({ params }: PageProps) => {
    const { resetToken } = React.use(params);
    
    const HandleAction = ResetUserPassword.bind(null, { token: resetToken });

    const intialState: ActionState = {
        success: false,
        message: ''
    };

    const [ state, formAction, isPending ] = useActionState(HandleAction, intialState);

    useEffect(() => {
        if (state?.message) {
            state.success ? toast.success(state.message) : toast.error(state.message);
        }
    }, [state]);

    if(state.success) {
        setTimeout(() => redirect('/'), 500);
    };

    return (
        <div className='allScreen'>
            <form className='AuthContainer' action={formAction}>
                <div className='flexCenter gap-1'>
                    <p className='font-bold text-3xl text-green-600'>User</p>
                    <p className='font-bold text-3xl'>Reset Password</p>
                </div>
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
                <Button text={ isPending ? 'Processing...' : 'Reset Password' } type='submit' icon='/icons/reset.svg' />
            </form>
        </div>
    )
}

export default ResetPassword
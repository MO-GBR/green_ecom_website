'use client';

import Button from '@/components/Button'
import React, { useActionState, useState, useEffect } from 'react'
import { toast } from "react-hot-toast";
import { ActionState } from '@/types';
import { SendResetPasswordEmail } from '@/Lib/actions/UserActions';

const ForgetPassword = () => {
    const intialState: ActionState = {
        success: false,
        message: ''
    };
    
    const [ state, formAction, isPending ] = useActionState(SendResetPasswordEmail, intialState);

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
                    <p className='font-bold text-3xl'>Reset Password</p>
                </div>
                <label className='mt-2'>
                    <span className='font-semibold'>Email</span>
                    <div className='AuthInput'>
                        <input placeholder='Write your email' type='email' name='email' />
                    </div>
                </label>
                <Button text={isPending ? 'Processing ...' : 'Send Email'} icon='/icons/mail.svg' type='submit' />
            </form>
        </div>
    )
}

export default ForgetPassword
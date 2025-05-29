'use client';

import Button from '@/components/Button'
import React, { useState, type FormEvent } from 'react'
import { toast } from "react-hot-toast";

const ForgetPassword = () => {
    const [ loading, setLoading ] = useState(false);
    const [ email, setEmail ] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const fetchProcess = await fetch('/api/resetmail', {
                method: "PUT",
                body: JSON.stringify({ email })
            });
            const data = await fetchProcess.json();

            console.log("RESET DATA: ", data);

            if (data.success) {
                toast.success(data.message);
                setLoading(false);
            } else {
                toast.error(data.message);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
        e.currentTarget.reset();
    };

    return (
        <div className='allScreen'>
            <form className='AuthContainer' onSubmit={handleSubmit}>
                <div className='flexCenter gap-1'>
                    <p className='font-bold text-3xl text-green-600'>User</p>
                    <p className='font-bold text-3xl'>Reset Password</p>
                </div>
                <label className='mt-2'>
                    <span className='font-semibold'>Email</span>
                    <div className='AuthInput'>
                        <input placeholder='Write your email' type='email' name='email' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                </label>
                <Button text={loading ? 'Processing ...' : 'Send Email'} icon='/icons/mail.svg' type='submit' />
            </form>
        </div>
    )
}

export default ForgetPassword
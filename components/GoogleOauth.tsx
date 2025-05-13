// 'use client';

import { signIn } from '@/Lib/auth';
import React from 'react'
// import { useRouter } from 'next/navigation';
// import { LoginUser_Google } from '@/Lib/actions/UserActions';
// import { ActionState } from '@/types';
// import { toast } from "react-hot-toast";

const GoogleOauth = () => {
    // const router = useRouter();
    // const intialState: ActionState = {
    //     success: false,
    //     message: ''
    // };
    
    // const [ state, formAction, isPending ] = useActionState(LoginUser_Google, intialState);

    // useEffect(() => {
    //     if (state?.message) {
    //         state.success ? toast.success(state.message) : toast.error(state.message);
    //     }
    // }, [state]);

    // useEffect(() => {
    //     if(state.success) router.push("/auth/callback");
    // }, [state]);

    return (
        <form className='AuthContainer' action={
            async () => {
                "use server";
                await signIn("google", { callbackUrl: "/auth/callback" });
            }
        }>
            <button className='w-[80%] cursor-pointer mt-2 bg-green-200 border border-green-400 rounded-lg p-2 font-bold' type='submit'>Sign In With Google</button>
        </form>
    )
}

export default GoogleOauth
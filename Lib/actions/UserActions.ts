"use server";

import { ActionState, RegisterRawDataType, UpdatePasswordType } from "@/types";
import { handleError } from "../utils/HandleResponse";
import { ForgetPasswordSchema, LoginSchema, RegisterSchema, ResetPasswordSchema } from "../Zod";
import prisma from "../prisma";
import { comparePassword, getResetPasswordToken, hashPassword, resetTokenValue } from "../utils/HandlePassword";
import { CredentialsSignin } from 'next-auth';
import { auth, signIn } from "../auth";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
import { SendEmail } from "../utils/HandleEmail";
import { ProtectSession } from "../utils/ProtectSession";

export const RegisterUser = async (
    prevState: ActionState | null | undefined,
    formData: FormData
) => {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    try {
        if(!username || !email || !password || !confirmPassword) return { success: false, message: 'All fields are required' };

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(existingUser) return { success: false, message: 'This Email has been already used' };

        if(password !== confirmPassword) return { success: false, message: "Your passwords don't match" };

        const rawData: RegisterRawDataType = {
            username,
            email,
            password,
            confirmPassword
        };

        const parsed = RegisterSchema.safeParse(rawData);

        if (!parsed.success) {
            const message = parsed.error.errors[0].message;
            return { success: false, message };
        };

        if (parsed.success) {
            const hashedPassword: string = hashPassword(password);

            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    cart: {
                        create: {}
                    },
                    password: hashedPassword
                },
                include: {
                    cart: true
                }
            });

            console.log('New User Created: ', newUser);
        };

        return { success: true, message: 'Done' };
    } catch (error) {
        handleError(error);
        return { success: false, message: 'Unexpected error occurred' };
    }
};

export const LoginUser = async (
    prevState: ActionState | null | undefined,
    formData: FormData
): Promise<ActionState> => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        if(!email || !password) return { success: false, message: 'All fields are required' };

        const parsed = LoginSchema.safeParse({email, password});

        if (!parsed.success) {
            const message = parsed.error.errors[0].message;
            return { success: false, message };
        };

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(!existingUser) return { success: false, message: 'Please write your correct email' };

        const isMatched: boolean = comparePassword(password, existingUser.password as string);

        if(!isMatched) return { success: false, message: 'Please write your correct password' };

        await signIn("credentials", {
            email,
            password,
            redirect: false
        });

        console.log("signed in successfuly");
        return { success: true, message: 'Welcome' };
    } catch (error) {
        const credentialsError = error as CredentialsSignin;
        handleError(credentialsError);
        return { success: false, message: 'Unexpected error occurred' };
    }
};

export const ResetUserPassword = async (
    { token }: { token: string },
    prevState: ActionState | null | undefined,
    formData: FormData
) => {
    const rawData = {
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
    };
    try {
        if(!rawData) return { success: false, message: 'Missing required field' };
        if(rawData.password !== rawData.confirmPassword) return { success: false, message: "Your passwords don't match" };

        const parsed = ResetPasswordSchema.safeParse(rawData);

        if (!parsed.success) {
            const message = parsed.error.errors[0].message;
            return { success: false, message };
        };

        const tokenTxt = resetTokenValue(token);

        console.log(token, tokenTxt)

        const existingUser = await prisma.user.findUnique({
            where: {
                resetPasswordToken: tokenTxt,
            }
        });

        if(!existingUser) return { success: false, message: 'User not found' };

        const hashedPassword = hashPassword(rawData.password);

        const updates: UpdatePasswordType = {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpire: null
        };

        await prisma.user.update({
            where: {
                id: existingUser.id
            },
            data: updates
        });

        return{ success: true, message: 'Reset Password Done' };
    } catch (error) {
        handleError(error);
        return { success: false, message: 'Unexpected error occurred' };
    }
};

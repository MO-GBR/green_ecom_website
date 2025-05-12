import { z } from "zod"

export const RegisterSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters').max(70),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters').max(70),
});

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters').max(70),
});

export const ForgetPasswordSchema = z.object({
    email: z.string().email(),
});

export const ResetPasswordSchema = z.object({
    password: z.string().min(6, 'Password must be at least 6 characters').max(70),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters').max(70),
});
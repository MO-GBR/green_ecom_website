import prisma from '@/Lib/prisma';
import { SendEmail } from '@/Lib/utils/HandleEmail';
import { getResetPasswordToken } from '@/Lib/utils/HandlePassword';
import { ForgetPasswordSchema } from '@/Lib/Zod';
import { NextResponse } from 'next/server';

export const PUT = async (request: Request) => {
    try {
        const { email } = await request.json();

        if (!email) return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });

        const parsed = ForgetPasswordSchema.safeParse({ email });

        if (!parsed.success) {
            const message = parsed.error.errors[0].message;
            return NextResponse.json({ success: false, message }, { status: 400 });
        };

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!existingUser) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });

        const ApplyResetPasswordToken = await getResetPasswordToken(existingUser.id);

        const resetURL = `${process.env.CLIENT_URL}/resetpassword/${ApplyResetPasswordToken}`;

        const message = `
           <h1>You have requested a password reset</h1>
           <p>Please use this link to reset your password</p>
           <a href = ${resetURL} clicktracking = off>CLICK HERE</a>
        `;

        try {
            await SendEmail({
                to: existingUser.email,
                subject: 'Password reset request',
                html: message
            });
        } catch (error) {
            console.error('Error sending email:', error);
            return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
        };

        console.log("sent successfuly");

        return NextResponse.json({ success: true, message: 'Reset password email sent' }, { status: 200 });

    } catch (error) {
        console.error('Error in PUT request:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
};
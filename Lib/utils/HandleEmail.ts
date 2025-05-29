import { EmailOptionsType } from '@/types';
import nodemailer from 'nodemailer';

export const SendEmail = async (options: EmailOptionsType) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions: EmailOptionsType = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.html
    };

    await transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(`Email could not be sent: ${err.message}`);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });
};
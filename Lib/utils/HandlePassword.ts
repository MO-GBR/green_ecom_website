import { randomBytes, pbkdf2Sync, createHash } from 'node:crypto';
import { handleError } from './HandleResponse';
import prisma from '../prisma';
import { UpdatePasswordType } from '@/types';

export const hashPassword = (password: string): string =>  {
    const salt = randomBytes(16).toString('hex');
    const iterations: number = 100000;
    const keyLength: number = 64;
    const digest: string = 'sha512';
    const hash: string = pbkdf2Sync(password, salt, iterations, keyLength, digest).toString('hex');
    const process: string = `${iterations}:${salt}:${hash}`;
    return process;
};

export const comparePassword = (inputPassword: string, storedProcess: string) => {
    const [iterations, salt, storedHash] = storedProcess.split(':');
    const keyLength: number = 64;
    const digest: string = 'sha512';

    const inputHash: string = pbkdf2Sync(
        inputPassword,
        salt,
        parseInt(iterations),
        keyLength,
        digest
    ).toString('hex');

    return inputHash === storedHash;
};

export const getResetPasswordToken = async (id: string): Promise<string> => {
    const resetToken: string = randomBytes(20).toString("hex");
    const resetPasswordToken: string = createHash("sha256").update(resetToken).digest("hex");
    const resetPasswordExpire: Date = new Date(Date.now() + 10 * 60 * 1000);

    try {
        const updates: UpdatePasswordType = {
            resetPasswordToken,
            resetPasswordExpire,
        };

        await prisma.user.update({
            where: {
                id: id
            },
            data: updates
        });

        return resetToken;
    } catch (error) {
        handleError(error);
        return 'Error in reset password processs';
    }
};

export const resetTokenValue = (resetToken: string) => {
    return createHash("sha256").update(resetToken).digest("hex");
};
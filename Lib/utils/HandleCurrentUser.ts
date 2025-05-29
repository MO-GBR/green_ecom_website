import { AuthSession } from "@/types";
import { auth } from "../auth";
import { handleError } from "./HandleResponse";
import { ProtectSession } from "./ProtectSession";
import prisma from "../prisma";

export const CurrentUser = async () => {
    try {
        const session = await auth();
        
        if (!session) return null;
        ProtectSession(session);

        const { id, name, email, image } = session.user;

        const UserSession: AuthSession = {
            user: {
                id: id as string,
                name: name as string,
                email: email as string,
                image: image as string || "",
            },
            expires: session.expires,
        };

        const user =  await prisma.user.findUnique({
            where: { email: UserSession.user.email },
            include: {
                cart: {
                    include: {
                        cartItems: true
                    }
                }
            }
        });

        return {
            sessionUser: UserSession,
            dbUser: user
        };
    } catch (error) {
        handleError(error);
        return null;
    }
};
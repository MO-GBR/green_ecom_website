//NextAuth Setup  
import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import prisma from "./prisma";
import { comparePassword } from "./utils/HandlePassword";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!
        }),

        Credentials({
            name: "Credentials",
            
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Write your email here"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Write your password here"
                }
            },
            
            authorize: async (credentials) => {
                const email = credentials.email as string | undefined;
                const password = credentials.password as string | undefined;
                
                if(!email || !password) {
                    throw new CredentialsSignin("Please provide both email & password");
                };

                const user = await prisma.user.findUnique({
                    where: {
                        email: email
                    }
                });

                if(!user || !user?.password) throw new CredentialsSignin("Invalid email or password");

                const isMatched: boolean = comparePassword(password, user?.password);

                if(!isMatched) throw new CredentialsSignin("Your passwords doesn't match");
                
                const returnedData = {
                    id: user?.id,
                    name: user?.username,
                    email: user?.email,
                    image: null
                };
                
                return returnedData;
            }
        }),
    ],
	secret: process.env.AUTH_SECRET,
	session: {
	    strategy: 'jwt',
	},
    pages: {
        signIn: '/signin'
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) token.id = user.id;
            return token;
        },
        session: async ({ session, token }) => {
            if (session.user && token.id) session.user.id = token.id as string;
            return session
        },
        signIn: async ({ user, account }) => {
            if(account?.provider === "google") {
                const { email, name, id } = user;
                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: email as string
                    }
                });

                if(!existingUser) {
                    const newUser = await prisma.user.create({
                        data: {
                            providerAccountId: id as string,
                            email: email as string,
                            username: name as string,
                            cart: {
                                create: {}
                            }
                        },
                        include: {
                            cart: true
                        }
                    });

                    console.log(newUser);
                } else {
                    return true;
                }
            };

            if(account?.provider === "credentials"){
                return true;
            } else {
                return false;
            }
        }
    }
});
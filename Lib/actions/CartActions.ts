'use server';

import { CartItemType } from "@/types";
import { handleError } from "../utils/HandleResponse";
import { auth } from "../auth";
import prisma from "../prisma";
import { calculateTotalPrice } from "../utils/HandleTotalPrice";
import { ProtectSession } from "../utils/ProtectSession";

export const getUserCart = async () => {
    try {
        const session = await auth();

        if (!session?.user?.email) return null;

        ProtectSession(session);

        const user = await prisma.user.findUnique({
            where: {
                email: session?.user.email as string
            },
            include: {
                cart: {
                    include: {
                        cartItems: true
                    }
                }
            }
        });
        return user?.cart;
    } catch (error) {
        handleError(error);
    }
};

export const AddItemToCart = async (cartItem: CartItemType) => {
    try {
        const cart = await getUserCart();

        const existingItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart?.id,
                productId: cartItem.productId
            }
        });

        if(existingItem) {
            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: {
                    quantity: existingItem.quantity + cartItem.quantity
                }
            });
        } else {
            await prisma.cartItem.create({
                data: cartItem
            });
        };

        const updatedCartItems = await prisma.cartItem.findMany({
            where: { cartId: cart?.id }
        });

        const totalPrice = await calculateTotalPrice(updatedCartItems);

        const updatedCart = await prisma.cart.update({
            where: { id: cart?.id },
            data: { totalPrice },
        });

        if(updatedCart) console.log(`Product with id ${cartItem.productId} added, total price is: ${totalPrice}`, updatedCart);
        return updatedCart;
    } catch (error) {
        handleError(error);
    }
};

export const RemoveItemFromCart = async (productId: string) => {
    try {
        const cart = await getUserCart();

        const itemToRemove = cart?.cartItems.find((item: CartItemType) => item.productId.toString() === productId);

        if (!itemToRemove) throw new Error('Cart item not found');

        await prisma.cartItem.delete({
            where: {
                id: itemToRemove.id
            }
        });

        const updatedCartItems = await prisma.cartItem.findMany({
            where: { cartId: cart?.id }
        });

        const totalPrice = await calculateTotalPrice(updatedCartItems);

        const updatedCart = await prisma.cart.update({
            where: { id: cart?.id },
            data: { totalPrice },
        });

        if(updatedCart) console.log(`Product with id ${productId} removed, total price is: ${totalPrice}`);

        return updatedCart;
    } catch (error) {
        handleError(error);
    }
};

export const ClearUserCart = async () => {
    try {
        const cart = await getUserCart();

        await prisma.cartItem.deleteMany({
            where: {
                cartId: cart?.id
            }
        });

        await prisma.cart.update({
            where: { id: cart?.id },
            data: { totalPrice: 0 },
        });

        console.log('Cart has been cleared !!!');
    } catch (error) {
        handleError(error);
    }
};
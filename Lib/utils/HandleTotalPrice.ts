import { CartItemType } from "@/types";
import prisma from "../prisma";

export const calculateTotalPrice = async (cartItems: CartItemType[]): Promise<number> => {
    let total: number = 0;
    if(!cartItems || cartItems.length === 0) return total;

    for (const item of cartItems) {
        const product = await prisma.product.findUnique({
            where: {
                id: item.productId
            }
        });
        if(product) total += product.price * item.quantity;
    };
    
    return total;
};
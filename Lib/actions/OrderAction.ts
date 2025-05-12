'use server';

import { OrderType } from "@/types";
import { handleError, handleJSON } from "../utils/HandleResponse";
import Stripe from 'stripe';
import { formatPrice } from "../utils/Format";
import { redirect } from 'next/navigation';
import { getUserCart } from "./CartActions";
import prisma from "../prisma";

export const CheckoutOrder = async (order: OrderType) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2025-04-30.basil'
    });

    const amount: number = formatPrice(order.amount);
    let stripeURL;
    try {
        const params: Stripe.Checkout.SessionCreateParams = {
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: amount,
                        product_data: {
                            name: order.id as string
                        }
                    },
                  quantity: 1
                }
            ],
            metadata: {
                buyerId: order.buyerId as string,
                address: order.address
            },
            mode: 'payment',
            success_url: process.env.CLIENT_URL!,
            cancel_url: `${process.env.CLIENT_URL}/cart`
        };
        const session = await stripe.checkout.sessions.create(params);

        stripeURL = session.url!;
    } catch (error) {
        handleError(error);
    }

    redirect(stripeURL!);
};

export const CreateOrder = async (order: OrderType) => {
    try {
        const cart = await getUserCart();

        const createdOrder: OrderType = {
            ...order,
            list: cart?.cartItems
        };

        const newOrder = await prisma.order.create({
            data: createdOrder
        });

        return handleJSON(createdOrder);
    } catch (error) {
        handleError(error);
    }
};
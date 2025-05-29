import prisma from '@/Lib/prisma';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-04-30.basil'
});

export const POST = async (req: Request) => {
    const rawBody = await req.text();
    const sig = req.headers.get('stripe-signature') as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
        return new NextResponse(`Webhook Error: ${(err as Error).message}`, { status: 400 });
    };

    if(event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        try {
            await prisma.order.create({
                data: {
                    amount: session.amount_total! / 100,
                    stripeId: session.id,
                    buyerId: session.metadata?.buyerId || null,
                    address: session.metadata?.address || '',
                    list: JSON.parse(session.metadata?.orderList || '[]')
                }
            });
        } catch (error) {
            console.error('Order creation failed:', error);
        };

        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: session.metadata?.buyerId
                },
                include: {
                    cart: true
                }
            });
            await prisma.cartItem.deleteMany({
                where: {
                    cartId: user?.cart?.id
                }
            });
        } catch (error) {
            console.error('Clear cart failed:', error);
        }

        return new NextResponse('Received', { status: 200 });
    };
};
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-04-30.basil'
});

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: body.items,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/auth/callback`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
            metadata: {
                buyerId: body.userId,
                address: body.address,
                orderList: body.orderList
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error(error);
        return new NextResponse('Failed to create checkout session', { status: 500 });
    }
};
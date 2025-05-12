import stripe from 'stripe'
import { NextResponse } from 'next/server'
import { CreateOrder } from '@/Lib/actions/OrderAction'
import { OrderType } from '@/types';

export const POST = async (request: Request) => {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature') as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    console.log("body >>>>>> ", body, "sig >>>>>> ", sig, "endpointSecret >>>>>>> ", endpointSecret);

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (error) {
        return NextResponse.json({ message: 'Webhook error', error: error });
    }

    const eventType = event.type;
    if(eventType === 'checkout.session.completed') {
        const { id, amount_total, metadata } = event.data.object;
        const order: OrderType = {
            buyerId: metadata?.buyerId || '',
            address: metadata?.address || '',
            stripeId: id,
            amount: (amount_total! / 100),
        }

        const newOrder = await CreateOrder(order);

        console.log('OK >>> ', newOrder);
        return NextResponse.json({ message: 'OK', order: newOrder });
    };

    return new Response('-OK-', { status: 200 });
};
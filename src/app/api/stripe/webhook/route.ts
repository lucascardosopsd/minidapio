import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object;
        await prisma.subscription.update({
          where: {
            stripeId: subscription.id,
          },
          data: {
            status: subscription.status,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object;
        await prisma.subscription.update({
          where: {
            stripeId: deletedSubscription.id,
          },
          data: {
            status: 'canceled',
          },
        });
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        if (!invoice.metadata?.planId || !invoice.metadata?.userId) {
          throw new Error('Missing required metadata fields');
        }

        await prisma.payment.create({
          data: {
            stripeId: invoice.id,
            amount: invoice.amount_paid / 100,
            currency: invoice.currency,
            status: invoice.status ?? 'succeeded',
            subscription: {
              connect: {
                stripeId: invoice.subscription as string
              }
            },
            plan: {
              connect: {
                id: invoice.metadata.planId
              }
            },
            user: {
              connect: {
                id: invoice.metadata.userId
              }
            }
          },
        });
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    );
  }
} 
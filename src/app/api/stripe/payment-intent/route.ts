import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency, paymentMethod, planId, userId } = body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: [paymentMethod],
      metadata: {
        planId,
        userId,
      },
    });

    if (paymentMethod === 'pix') {
      const paymentIntentWithPix = await stripe.paymentIntents.retrieve(
        paymentIntent.id,
        {
          expand: ['payment_method'],
        }
      );

      // Check if payment_method is an object and has pix property
      const pixPaymentMethod = paymentIntentWithPix.payment_method as any;
      const qrCode = pixPaymentMethod?.pix?.qr_code;

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        qrCode,
      });
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Error creating payment intent' },
      { status: 500 }
    );
  }
} 
import { axiosStripe } from "@/lib/axiosStripe";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data } = await axiosStripe.post("/subscriptions", body);

    return Response.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
    } else {
      console.log("An unknown error occurred");
    }

    return Response.json({ error: "Failed to create subscription", status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const subscription = await stripe.subscriptions.cancel(id);

    return NextResponse.json({ subscription });
  } catch (error) {
    console.error('Error canceling Stripe subscription:', error);
    return NextResponse.json(
      { error: 'Error canceling subscription' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const customer = searchParams.get("customer");

    const { data } = await axiosStripe.get(`/subscriptions?customer=${customer}`);

    return Response.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
    } else {
      console.log("An unknown error occurred");
    }

    return Response.json({ error: "Failed to fetch subscriptions", status: 500 });
  }
} 
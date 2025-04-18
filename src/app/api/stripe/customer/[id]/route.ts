import { axiosStripe } from "@/lib/axiosStripe";
import { NextResponse as Response } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { data } = await axiosStripe.get(`/customers/${id}`);

    return Response.json({ customer: data });
  } catch (error) {
    console.error('Error retrieving Stripe customer:', error);
    return Response.json(
      { error: 'Error retrieving customer' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();

    const customer = await axiosStripe.post(`/customers/${id}`, data);

    return Response.json({ customer: customer.data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }

    return Response.json({ error: "Failed to update customer", status: 500 });
  }
} 
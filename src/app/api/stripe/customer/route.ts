import { axiosStripe } from "@/lib/axiosStripe";
import { NextResponse as Response } from "next/server";

export async function GET() {
  try {
    const { data } = await axiosStripe.get("/customers");

    return Response.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }

    return Response.json({ error: "Failed to fetch customers", status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const customer = await axiosStripe.post("/customers", body);

    return Response.json({ customer: customer.data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error when create customer");
    } else {
      console.log("An unknown error occurred");
    }

    return Response.json({ error: "Failed to create customer", status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { email, name, phone, address } = body;
    const { id } = params;

    const customer = await axiosStripe.put(`/customers/${id}`, {
      email,
      name,
      phone,
      address: {
        line1: address.line1,
        line2: address.line2,
        city: address.city,
        state: address.state,
        postal_code: address.postal_code,
        country: address.country,
      },
    });

    return Response.json({ customer: customer.data });
  } catch (error) {
    console.error('Error updating Stripe customer:', error);
    return Response.json(
      { error: 'Error updating customer' },
      { status: 500 }
    );
  }
} 
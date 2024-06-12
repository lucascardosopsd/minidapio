import { axiosAsaas } from "@/lib/axiosAsaas";
import { NextResponse as Response } from "next/server";

export async function GET() {
  try {
    const { data } = await axiosAsaas.get("/customers");

    return Response.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }

    return Response.json({});
  }
}

export async function POST(req: Request) {
  try {
    const { name, cpfCnpj, email, mobilePhone } = await req.json();

    const customer = await axiosAsaas.post(`/customers`, {
      name,
      cpfCnpj,
      email,
      mobilePhone,
    });

    return Response.json({ customer: customer.data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
    } else {
      console.log("An unknown error occurred");
    }

    return Response.json({ error: error });
  }
}

import { axiosAsaas } from "@/lib/axiosAsaas";
import { NextResponse as Response } from "next/server";

export async function GET() {
  try {
    const { data } = await axiosAsaas.get(
      "https://sandbox.asaas.com/api/v3/customers"
    );

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

    const costumer = await axiosAsaas.post(
      "https://sandbox.asaas.com/api/v3/customers",
      {
        name,
        cpfCnpj,
        email,
        mobilePhone,
      }
    );

    return Response.json({ costumer: costumer.data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }

    return Response.json({});
  }
}

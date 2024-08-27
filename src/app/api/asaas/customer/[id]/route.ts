import { axiosAsaas } from "@/lib/axiosAsaas";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log(params);
    const customer = await axiosAsaas.get(`/customers/${params.id}`);

    return Response.json({ customer: customer.data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }

    return Response.json({});
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();

    const customer = await axiosAsaas.put(`/customers/${params.id}`, data);

    return Response.json({ customer: customer.data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }

    // @ts-ignore
    return Response.json({ error: error.response.data, status: 500 });
  }
}

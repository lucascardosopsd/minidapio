import { axiosAsaas } from "@/lib/axiosAsaas";

export async function GET(
  req: Request,
  { params }: { params: { customerId: string } }
) {
  try {
    const { data } = await axiosAsaas.get(
      `subscriptions?customer=${params.customerId}`
    );

    return Response.json(data);
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
